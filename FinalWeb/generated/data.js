window.DEEASH_FINAL_DATA = {
  "supervised": {
    "heroStats": [
      {
        "value": "113",
        "label": "คำตอบแบบสอบถาม"
      },
      {
        "value": "82.8%",
        "label": "Accuracy"
      },
      {
        "value": "93.3%",
        "label": "ROC-AUC"
      },
      {
        "value": "2",
        "label": "กลุ่มลูกค้า"
      }
    ],
    "metricStrip": [
      {
        "label": "Accuracy",
        "value": "82.8%"
      },
      {
        "label": "Precision",
        "value": "78.9%"
      },
      {
        "label": "Recall",
        "value": "93.8%"
      },
      {
        "label": "F1 Score",
        "value": "85.7%"
      },
      {
        "label": "ROC-AUC",
        "value": "93.3%"
      }
    ],
    "bestModel": {
      "name": "Random Forest",
      "title": "โมเดลที่แนะนำ: Random Forest",
      "description": "จากการเปรียบเทียบโมเดล 4 แบบ Random Forest ให้ผลทดสอบดีที่สุดในภาพรวม โดยมี F1-Score 0.89, Accuracy 0.86 และ Recall 1.00 จึงเหมาะกับโจทย์นี้ที่ต้องการจับกลุ่มลูกค้าที่มีโอกาสสนใจให้ครอบคลุมก่อนนำไปทำแคมเปญ",
      "stats": [
        {
          "label": "F1-Score",
          "value": "0.89"
        },
        {
          "label": "Accuracy",
          "value": "0.86"
        },
        {
          "label": "Recall",
          "value": "1.00"
        }
      ]
    },
    "fitModel": {
      "rows": 113,
      "used": 63,
      "notUsed": 50
    },
    "modelPerformance": [
      {
        "name": "Logistic Regression",
        "theme": "linear",
        "test": {
          "accuracy": 0.83,
          "precision": 0.79,
          "recall": 0.94,
          "f1": 0.86
        },
        "train": {
          "accuracy": 0.89,
          "precision": 0.85,
          "recall": 0.98,
          "f1": 0.91
        }
      },
      {
        "name": "Decision Tree",
        "theme": "tree",
        "test": {
          "accuracy": 0.86,
          "precision": 0.93,
          "recall": 0.81,
          "f1": 0.87
        },
        "train": {
          "accuracy": 0.83,
          "precision": 0.88,
          "recall": 0.81,
          "f1": 0.84
        }
      },
      {
        "name": "Random Forest",
        "theme": "forest",
        "test": {
          "accuracy": 0.86,
          "precision": 0.8,
          "recall": 1.0,
          "f1": 0.89
        },
        "train": {
          "accuracy": 0.87,
          "precision": 0.81,
          "recall": 1.0,
          "f1": 0.9
        }
      },
      {
        "name": "Gradient Boosting",
        "theme": "boost",
        "test": {
          "accuracy": 0.83,
          "precision": 0.76,
          "recall": 1.0,
          "f1": 0.86
        },
        "train": {
          "accuracy": 0.94,
          "precision": 0.9,
          "recall": 1.0,
          "f1": 0.95
        }
      }
    ]
  },
  "modelPerformance": [
    {
      "name": "Logistic Regression",
      "theme": "linear",
      "test": {
        "accuracy": 0.83,
        "precision": 0.79,
        "recall": 0.94,
        "f1": 0.86
      },
      "train": {
        "accuracy": 0.89,
        "precision": 0.85,
        "recall": 0.98,
        "f1": 0.91
      }
    },
    {
      "name": "Decision Tree",
      "theme": "tree",
      "test": {
        "accuracy": 0.86,
        "precision": 0.93,
        "recall": 0.81,
        "f1": 0.87
      },
      "train": {
        "accuracy": 0.83,
        "precision": 0.88,
        "recall": 0.81,
        "f1": 0.84
      }
    },
    {
      "name": "Random Forest",
      "theme": "forest",
      "test": {
        "accuracy": 0.86,
        "precision": 0.8,
        "recall": 1.0,
        "f1": 0.89
      },
      "train": {
        "accuracy": 0.87,
        "precision": 0.81,
        "recall": 1.0,
        "f1": 0.9
      }
    },
    {
      "name": "Gradient Boosting",
      "theme": "boost",
      "test": {
        "accuracy": 0.83,
        "precision": 0.76,
        "recall": 1.0,
        "f1": 0.86
      },
      "train": {
        "accuracy": 0.94,
        "precision": 0.9,
        "recall": 1.0,
        "f1": 0.95
      }
    }
  ],
  "demographics": {
    "total": 113,
    "age": [
      {
        "label": "55 ปีขึ้นไป",
        "value": 78,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "35–44 ปี",
        "value": 13,
        "percent": 16.7,
        "color": "purple"
      },
      {
        "label": "30–34 ปี",
        "value": 11,
        "percent": 14.1,
        "color": "pink"
      },
      {
        "label": "45–54 ปี",
        "value": 9,
        "percent": 11.5,
        "color": "red"
      },
      {
        "label": "ต่ำกว่า 30 ปี",
        "value": 2,
        "percent": 2.6,
        "color": "green"
      }
    ],
    "gender": [
      {
        "label": "หญิง",
        "value": 81,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "ชาย",
        "value": 29,
        "percent": 35.8,
        "color": "purple"
      },
      {
        "label": "LGBTQ+",
        "value": 3,
        "percent": 3.7,
        "color": "pink"
      }
    ],
    "region": [
      {
        "label": "กทม. & ปริมณฑล",
        "value": 76,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "ภาคอีสาน",
        "value": 17,
        "percent": 22.4,
        "color": "purple"
      },
      {
        "label": "ภาคเหนือ",
        "value": 7,
        "percent": 9.2,
        "color": "pink"
      },
      {
        "label": "ภาคกลาง",
        "value": 5,
        "percent": 6.6,
        "color": "red"
      },
      {
        "label": "ภาคตะวันออก",
        "value": 5,
        "percent": 6.6,
        "color": "green"
      },
      {
        "label": "ภาคตะวันตก",
        "value": 2,
        "percent": 2.6,
        "color": "cyan"
      },
      {
        "label": "ภาคใต้",
        "value": 1,
        "percent": 1.3,
        "color": "mint"
      }
    ],
    "usedShare": {
      "used": 63,
      "notUsed": 50
    }
  },
  "brandFactors": {
    "brands": [
      {
        "label": "HerbaSure",
        "value": 22,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "Kronwald",
        "value": 8,
        "percent": 36.4,
        "color": "purple"
      },
      {
        "label": "other",
        "value": 6,
        "percent": 27.3,
        "color": "pink"
      },
      {
        "label": "Lyora",
        "value": 6,
        "percent": 27.3,
        "color": "red"
      },
      {
        "label": "DeeAsh",
        "value": 5,
        "percent": 22.7,
        "color": "green"
      },
      {
        "label": "Phumflora",
        "value": 4,
        "percent": 18.2,
        "color": "cyan"
      },
      {
        "label": "Lorisse",
        "value": 4,
        "percent": 18.2,
        "color": "mint"
      },
      {
        "label": "Aromkesha",
        "value": 2,
        "percent": 9.1,
        "color": "gold"
      }
    ],
    "choiceReasons": [
      {
        "label": "easy_to_use",
        "value": 34,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "good_price",
        "value": 7,
        "percent": 20.6,
        "color": "purple"
      },
      {
        "label": "mild_smell",
        "value": 5,
        "percent": 14.7,
        "color": "pink"
      },
      {
        "label": "natural_or_safe",
        "value": 5,
        "percent": 14.7,
        "color": "red"
      },
      {
        "label": "trusted_or_recommended",
        "value": 3,
        "percent": 8.8,
        "color": "green"
      },
      {
        "label": "effective",
        "value": 3,
        "percent": 8.8,
        "color": "cyan"
      },
      {
        "label": "brand_familiarity",
        "value": 2,
        "percent": 5.9,
        "color": "mint"
      },
      {
        "label": "color_option",
        "value": 2,
        "percent": 5.9,
        "color": "gold"
      }
    ],
    "benefits": [
      {
        "label": "ปิดผมหงอกเนียนสนิท",
        "value": 51,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "ได้สีผมเป็นธรรมชาติ",
        "value": 47,
        "percent": 92.2,
        "color": "purple"
      },
      {
        "label": "กลิ่นไม่ฉุน",
        "value": 47,
        "percent": 92.2,
        "color": "pink"
      },
      {
        "label": "ไม่แสบหนังศีรษะ",
        "value": 46,
        "percent": 90.2,
        "color": "red"
      },
      {
        "label": "สีไม่หลุดง่าย",
        "value": 44,
        "percent": 86.3,
        "color": "green"
      },
      {
        "label": "รวดเร็ว ใช้เวลาน้อยในการทำ",
        "value": 42,
        "percent": 82.4,
        "color": "cyan"
      },
      {
        "label": "หาซื้อง่าย / มีขายใกล้บ้าน",
        "value": 40,
        "percent": 78.4,
        "color": "mint"
      },
      {
        "label": "ราคาดี / คุ้มค่า",
        "value": 39,
        "percent": 76.5,
        "color": "gold"
      },
      {
        "label": "มีสารบำรุง",
        "value": 34,
        "percent": 66.7,
        "color": "blue"
      },
      {
        "label": "ใช้งานง่าย ไม่ต้องผสม",
        "value": 34,
        "percent": 66.7,
        "color": "purple"
      }
    ]
  },
  "segments": [
    {
      "cluster": 0,
      "name": "Confidence Seeker",
      "share": 79.0,
      "count": 49,
      "description": "current brand HerbaSure, post-use feeling younger, desired compliment gray hair hidden, pain point smell issue",
      "painPoint": "Concern about strong smell or unpleasant usage experience",
      "motivation": "Trust, familiarity, and social proof",
      "message": "Look ready before the moments where people notice you.",
      "platform": "TikTok, Facebook Reels, workplace/social occasion content",
      "features": [
        {
          "label": "current brand standardized HerbaSure",
          "value": 60
        },
        {
          "label": "feeling after use category younger",
          "value": 80
        },
        {
          "label": "desired compliment category gray hair hidden",
          "value": 92
        },
        {
          "label": "dissatisfaction category smell issue",
          "value": 92
        }
      ]
    },
    {
      "cluster": 1,
      "name": "Budget-Smart Buyer",
      "share": 21.0,
      "count": 13,
      "description": "online channel preference, desired compliment younger, usage motivation confidence, pain point price issue",
      "painPoint": "Price sensitivity and value justification",
      "motivation": "Best perceived value for a low-risk trial",
      "message": "Cover gray hair confidently at a price that feels worth trying.",
      "platform": "TikTok Shop, Shopee/Lazada, price comparison content",
      "features": [
        {
          "label": "online channel preference",
          "value": 62
        },
        {
          "label": "desired compliment category younger",
          "value": 79
        },
        {
          "label": "usage moment reason category confidence",
          "value": 92
        },
        {
          "label": "dissatisfaction category price issue",
          "value": 92
        }
      ]
    }
  ],
  "brandUserDemographics": {
    "title": "DeeAsh / HerbaSure User Demographics",
    "subtitle": "ผู้ใช้แบรนด์ในกลุ่มตัวอย่าง",
    "total": 27,
    "gender": [
      {
        "label": "หญิง",
        "value": 21,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "ชาย",
        "value": 5,
        "percent": 23.8,
        "color": "purple"
      },
      {
        "label": "LGBTQ+",
        "value": 1,
        "percent": 4.8,
        "color": "pink"
      }
    ],
    "age": [
      {
        "label": "55 ปีขึ้นไป",
        "value": 20,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "45–54 ปี",
        "value": 4,
        "percent": 20.0,
        "color": "purple"
      },
      {
        "label": "35–44 ปี",
        "value": 2,
        "percent": 10.0,
        "color": "pink"
      },
      {
        "label": "30–34 ปี",
        "value": 1,
        "percent": 5.0,
        "color": "red"
      }
    ],
    "region": [
      {
        "label": "กทม. & ปริมณฑล",
        "value": 15,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "ภาคอีสาน",
        "value": 5,
        "percent": 33.3,
        "color": "purple"
      },
      {
        "label": "ภาคตะวันออก",
        "value": 3,
        "percent": 20.0,
        "color": "pink"
      },
      {
        "label": "ภาคเหนือ",
        "value": 3,
        "percent": 20.0,
        "color": "red"
      },
      {
        "label": "ภาคตะวันตก",
        "value": 1,
        "percent": 6.7,
        "color": "green"
      }
    ],
    "purchaseChannel": [
      {
        "label": "convenience_store",
        "value": 10,
        "percent": 100.0,
        "color": "blue"
      },
      {
        "label": "supermarket",
        "value": 8,
        "percent": 80.0,
        "color": "purple"
      },
      {
        "label": "pharmacy_beauty",
        "value": 3,
        "percent": 30.0,
        "color": "pink"
      },
      {
        "label": "online",
        "value": 3,
        "percent": 30.0,
        "color": "red"
      },
      {
        "label": "traditional_trade",
        "value": 3,
        "percent": 30.0,
        "color": "green"
      }
    ]
  },
  "recommendations": [
    {
      "type": "BRANDING",
      "title": "สื่อสาร \"ปิดผมหงอกเนียนสนิท\" เป็นจุดขายหลัก",
      "body": "ผู้ตอบให้ความสำคัญกับ ปิดผมหงอกเนียนสนิท สูง ควรใช้เป็น Key Message ในคอนเทนต์ทุกช่องทาง"
    },
    {
      "type": "PRODUCT",
      "title": "ลดความกังวลเรื่องกลิ่นและประสบการณ์หลังใช้",
      "body": "กลุ่ม Confidence Seeker ให้ความสำคัญกับผลลัพธ์ที่มั่นใจและประสบการณ์ใช้งาน จึงควรโชว์รีวิวจริงและ before/after"
    },
    {
      "type": "MARKETING",
      "title": "โฟกัสกลุ่มอายุ \"55 ปีขึ้นไป\" เป็นหลัก",
      "body": "ฐานข้อมูลปัจจุบันมีผู้ตอบกลุ่ม 55 ปีขึ้นไป มากที่สุด ควรออกแบบข้อความและภาพให้ตรงบริบทชีวิตของกลุ่มนี้"
    },
    {
      "type": "CHANNEL",
      "title": "ใช้ supermarket เป็นช่องทางหลักของแคมเปญ",
      "body": "ผสาน marketplace/short-form commerce กับรีวิวที่พิสูจน์ความคุ้มค่าเพื่อเร่ง conversion"
    },
    {
      "type": "STRATEGY",
      "title": "ต่อยอดฐานผู้ใช้แบรนด์ HerbaSure",
      "body": "สร้าง loyalty หรือ bundle ทดลองใช้ เพื่อรักษาฐานลูกค้าปัจจุบันและเพิ่มโอกาสซื้อซ้ำ"
    }
  ]
};
