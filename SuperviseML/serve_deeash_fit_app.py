from __future__ import annotations

import pickle
from pathlib import Path

import pandas as pd


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "results" / "deeash_fit_model.pkl"


def load_model_payload() -> dict[str, object]:
    if not MODEL_PATH.exists():
        raise FileNotFoundError("Missing SuperviseML/results/deeash_fit_model.pkl.")
    with MODEL_PATH.open("rb") as file:
        return pickle.load(file)


MODEL_PAYLOAD = load_model_payload()


def score_level(score: float) -> str:
    if score >= 75:
        return "เหมาะมาก"
    if score >= 50:
        return "ค่อนข้างเหมาะ"
    if score >= 25:
        return "อาจเหมาะในบางสถานการณ์"
    return "ยังไม่ใช่กลุ่มหลักตอนนี้"


def choose_persona(data: dict[str, object]) -> str:
    moment = str(data.get("moment", ""))
    concern = str(data.get("concern", ""))
    need = str(data.get("need", ""))
    product_mixing_cream = bool(data.get("product_mixing_cream"))

    if moment in {"event", "friends", "work"}:
        return "สายกู้ความมั่นใจก่อนเจอคน"
    if concern in {"scalp_irritation", "dry_hair", "strong_smell"}:
        return "สายกลัวผมเสีย"
    if concern == "expensive" or need == "value":
        return "สายคุ้มค่า"
    if need in {"natural_color", "smooth_coverage"}:
        return "สายต้องการลุคธรรมชาติ"
    if product_mixing_cream:
        return "สายทำเองแทนเข้าร้าน"
    return "สายเริ่มดูแลผมขาวด้วยตัวเอง"


def build_recommendation(data: dict[str, object], persona: str, level: str) -> tuple[str, str]:
    moment_text = {
        "event": "ก่อนออกงาน",
        "friends": "ก่อนเจอเพื่อนหรือคนรู้จัก",
        "work": "ก่อนประชุมหรือทำงาน",
        "confidence": "วันที่รู้สึกไม่มั่นใจ",
        "routine": "ใช้เป็นประจำ",
    }.get(str(data.get("moment", "")), "ในวันที่ต้องการจัดการผมขาว")
    concern_text = {
        "strong_smell": "กลิ่นฉุน",
        "scalp_irritation": "แสบหนังศีรษะ",
        "dry_hair": "ผมแห้งเสีย",
        "not_durable": "สีไม่ทน",
        "stain": "สีเปื้อนมือหรือผิว",
        "expensive": "ราคาแพง",
    }.get(str(data.get("concern", "")), "ความมั่นใจในการใช้")
    need_text = {
        "smooth_coverage": "ปิดเนียน",
        "natural_color": "สีธรรมชาติ",
        "easy": "ใช้ง่าย",
        "fast": "เร็ว",
        "value": "คุ้มค่า",
        "mild_smell": "ไม่ฉุน",
        "nourishing": "มีสารบำรุง",
    }.get(str(data.get("need", "")), "ผลลัพธ์ที่ดูเป็นธรรมชาติ")

    if persona == "สายกู้ความมั่นใจก่อนเจอคน":
        message = "กู้ความมั่นใจก่อนเจอคนสำคัญใน 10 นาที"
    elif persona == "สายทำเองแทนเข้าร้าน":
        message = "ทำเองได้ก่อนออกงาน ไม่ต้องรอร้าน"
    elif persona == "สายกลัวผมเสีย":
        message = "ปิดผมขาวแบบดูแลเส้นผมและหนังศีรษะไปพร้อมกัน"
    elif persona == "สายคุ้มค่า":
        message = "จัดการผมขาวด้วยตัวเอง คุ้มกว่าและพร้อมกว่าในวันที่ต้องรีบ"
    elif persona == "สายต้องการลุคธรรมชาติ":
        message = "ปิดเนียนแบบไม่ต้องให้ใครรู้ว่าย้อมมา"
    else:
        message = "เริ่มดูแลผมขาวได้ง่ายขึ้นในวันที่ต้องการความมั่นใจ"

    recommendation = (
        f"ระดับ {level}: คุณอยู่ในกลุ่ม {persona} เพราะให้ความสำคัญกับ {need_text} "
        f"และมักต้องการจัดการผมขาว{moment_text} โดยมีความกังวลเรื่อง{concern_text}"
    )
    return recommendation, message


def build_model_input(data: dict[str, object]) -> pd.DataFrame:
    product_flags = {
        "product_shampoo_color": int(bool(data.get("product_shampoo_color"))),
        "product_mixing_cream": int(bool(data.get("product_mixing_cream"))),
        "product_sachet_cream": int(bool(data.get("product_sachet_cream"))),
        "product_never_used": int(bool(data.get("product_never_used"))),
    }
    if product_flags["product_never_used"] and any(
        product_flags[key] for key in ["product_shampoo_color", "product_mixing_cream", "product_sachet_cream"]
    ):
        product_flags["product_never_used"] = 0

    row = {
        "gender": str(data.get("gender") or "ไม่ระบุ"),
        "age_group": str(data.get("age_group") or "ไม่ระบุ"),
        "region": str(data.get("region") or "ไม่ระบุ"),
        **product_flags,
    }
    return pd.DataFrame([row], columns=MODEL_PAYLOAD["model_features"])


def predict(data: dict[str, object]) -> dict[str, object]:
    model_input = build_model_input(data)
    probability = float(MODEL_PAYLOAD["model"].predict_proba(model_input)[0, 1])
    score = round(probability * 100, 1)
    level = score_level(score)
    persona = choose_persona(data)
    recommendation, marketing_message = build_recommendation(data, persona, level)
    return {
        "score": score,
        "probability": probability,
        "level": level,
        "persona": persona,
        "recommendation": recommendation,
        "marketing_message": marketing_message,
        "model_input": model_input.iloc[0].to_dict(),
    }
