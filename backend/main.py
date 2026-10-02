import os
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas import HeartDiseaseInput


# --------------------------------------------------
# APP
# --------------------------------------------------

app = FastAPI(
    title="Heart Disease Prediction API",
    description="Prototype API for heart disease risk prediction",
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

# Comma-separated list of extra allowed origins, e.g.
# ALLOWED_ORIGINS=https://your-app.vercel.app,https://yourdomain.com
extra_origins = [
    origin.strip().rstrip("/")
    for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        *extra_origins,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# MODEL
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "heart_disease_model.pkl"
)

model = joblib.load(MODEL_PATH)


# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Heart Disease Prediction API",
        "status": "running",
        "model": "loaded",
    }


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
    }


# --------------------------------------------------
# PREDICTION
# --------------------------------------------------

@app.post("/predict")
def predict(data: HeartDiseaseInput):

    try:

        # Optional fields arrive as None; sklearn imputers expect NaN
        row = {
            key: (np.nan if value is None else value)
            for key, value in data.model_dump().items()
        }

        input_data = pd.DataFrame([row])

        prediction = int(
            model.predict(input_data)[0]
        )

        probability = float(
            model.predict_proba(input_data)[0][1]
        )

        return {
            "prediction": prediction,
            "probability": round(probability * 100, 2),
            "result": (
                "Elevated model-estimated risk"
                if prediction == 1
                else "Lower model-estimated risk"
            ),
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )