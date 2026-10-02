from pydantic import BaseModel, Field


class HeartDiseaseInput(BaseModel):

    Age: int = Field(..., ge=1, le=120)

    Gender: str

    Weight: float = Field(..., ge=1, le=300)

    Height: float = Field(..., ge=50, le=250)

    BMI: float = Field(..., ge=5, le=80)

    Smoking: str

    Alcohol_Intake: str | None = None

    Physical_Activity: str

    Diet: str

    Stress_Level: str

    Hypertension: int = Field(..., ge=0, le=1)

    Diabetes: int = Field(..., ge=0, le=1)

    Hyperlipidemia: int = Field(..., ge=0, le=1)

    Family_History: int = Field(..., ge=0, le=1)

    Previous_Heart_Attack: int = Field(..., ge=0, le=1)

    Systolic_BP: int = Field(..., ge=50, le=300)

    Diastolic_BP: int = Field(..., ge=30, le=200)

    Heart_Rate: int = Field(..., ge=20, le=250)

    Blood_Sugar_Fasting: int = Field(..., ge=20, le=500)

    Cholesterol_Total: int = Field(..., ge=50, le=700)