# deeashml-render

Render-only runtime repo for the DeeAsh Insight Studio web app.

This repo is intentionally stripped down. It contains only the files needed to serve the final web UI and run the DeeAsh Fit Score prediction endpoint on Render. It does not include data-prep scripts, training scripts, clustering pipelines, source survey data, intermediate CSV outputs, or generated report sources.

## Runtime Contents

```text
.
├── render.yaml
├── requirements.txt
├── serve_final_app.py
├── FinalWeb/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── generated/data.js
│   └── assets/
└── SuperviseML/
    ├── __init__.py
    ├── serve_deeash_fit_app.py
    └── results/deeash_fit_model.pkl
```

## Deploy On Render

Create a Render Blueprint from this repository, or create a Python Web Service manually with:

```text
Build Command: pip install -r requirements.txt
Start Command: python serve_final_app.py
Health Check Path: /health
```

`render.yaml` already contains these settings.

## Local Run

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python serve_final_app.py
```

Open:

```text
http://127.0.0.1:8002
```

## API

The web form calls:

```text
POST /predict
```

The endpoint loads `SuperviseML/results/deeash_fit_model.pkl` and returns `score`, `level`, `persona`, `recommendation`, and `marketing_message`.
