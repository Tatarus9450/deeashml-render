from __future__ import annotations

import json
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote

from SuperviseML.serve_deeash_fit_app import model_name, predict


PROJECT_DIR = Path(__file__).resolve().parent
FINAL_WEB_DIR = PROJECT_DIR / "FinalWeb"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8002"))


def content_type_for(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".html":
        return "text/html; charset=utf-8"
    if suffix == ".css":
        return "text/css; charset=utf-8"
    if suffix == ".js":
        return "application/javascript; charset=utf-8"
    if suffix == ".png":
        return "image/png"
    if suffix == ".mp3":
        return "audio/mpeg"
    return "application/octet-stream"


class FinalAppHandler(BaseHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def do_HEAD(self) -> None:
        request_path = unquote(self.path.split("?", 1)[0])
        if request_path == "/health":
            self.write_json(
                {"status": "ok", "service": "DeeAsh Insight Studio", "model_name": model_name()},
                send_body=False,
            )
            return
        if request_path in {"/", "/index.html"}:
            self.serve_file(FINAL_WEB_DIR / "index.html", send_body=False)
            return

        final_web_path = (FINAL_WEB_DIR / request_path.lstrip("/")).resolve()
        if FINAL_WEB_DIR.resolve() in final_web_path.parents and final_web_path.exists() and final_web_path.is_file():
            self.serve_file(final_web_path, send_body=False)
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Not found")

    def do_GET(self) -> None:
        request_path = unquote(self.path.split("?", 1)[0])
        if request_path == "/health":
            self.write_json({"status": "ok", "service": "DeeAsh Insight Studio", "model_name": model_name()})
            return
        if request_path in {"/", "/index.html"}:
            self.serve_file(FINAL_WEB_DIR / "index.html")
            return

        final_web_path = (FINAL_WEB_DIR / request_path.lstrip("/")).resolve()
        if FINAL_WEB_DIR.resolve() in final_web_path.parents and final_web_path.exists() and final_web_path.is_file():
            self.serve_file(final_web_path)
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Not found")

    def do_POST(self) -> None:
        if self.path != "/predict":
            self.send_error(HTTPStatus.NOT_FOUND, "Not found")
            return
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            data = json.loads(self.rfile.read(content_length).decode("utf-8"))
            self.write_json(predict(data))
        except Exception as exc:
            self.write_json({"error": str(exc)}, status=HTTPStatus.BAD_REQUEST)

    def serve_file(self, path: Path, send_body: bool = True) -> None:
        data = path.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type_for(path))
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if send_body:
            self.wfile.write(data)

    def write_json(
        self,
        payload: dict[str, object],
        status: HTTPStatus = HTTPStatus.OK,
        send_body: bool = True,
    ) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if send_body:
            self.wfile.write(data)


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), FinalAppHandler)
    display_host = "127.0.0.1" if HOST == "0.0.0.0" else HOST
    print(f"เว็บรันแล้ว ไปที่ URL นี้: http://{display_host}:{PORT}", flush=True)
    print("กด Ctrl+C ใน terminal นี้เพื่อหยุด server", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
