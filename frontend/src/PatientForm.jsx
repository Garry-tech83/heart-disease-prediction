import { useMemo, useState } from "react";
import axios from "axios";
import {
  User,
  HeartPulse,
  Activity,
  Stethoscope,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import PredictionResult from "./PredictionResult";

const initialForm = {
  Age: "",
  Gender: "",
  Weight: "",
  Height: "",
  BMI: "",
  Smoking: "",
  Alcohol_Intake: "",
  Physical_Activity: "",
  Diet: "",
  Stress_Level: "",
  Hypertension: "",
  Diabetes: "",
  Hyperlipidemia: "",
  Family_History: "",
  Previous_Heart_Attack: "",
  Systolic_BP: "",
  Diastolic_BP: "",
  Heart_Rate: "",
  Blood_Sugar_Fasting: "",
  Cholesterol_Total: "",
};

function PatientForm() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bmi = useMemo(() => {
    const weight = Number(form.Weight);
    const height = Number(form.Height);

    if (!weight || !height) {
      return "";
    }

    const heightMeters = height / 100;
    const calculated = weight / (heightMeters * heightMeters);

    return calculated.toFixed(1);
  }, [form.Weight, form.Height]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setResult(null);

    setLoading(true);

    try {
      const payload = {
        Age: Number(form.Age),
        Gender: form.Gender,

        Weight: Number(form.Weight),
        Height: Number(form.Height),
        BMI: Number(bmi),

        Smoking: form.Smoking,
        Alcohol_Intake: form.Alcohol_Intake || null,
        Physical_Activity: form.Physical_Activity,
        Diet: form.Diet,
        Stress_Level: form.Stress_Level,

        Hypertension: Number(form.Hypertension),
        Diabetes: Number(form.Diabetes),
        Hyperlipidemia: Number(form.Hyperlipidemia),
        Family_History: Number(form.Family_History),
        Previous_Heart_Attack: Number(form.Previous_Heart_Attack),

        Systolic_BP: Number(form.Systolic_BP),
        Diastolic_BP: Number(form.Diastolic_BP),
        Heart_Rate: Number(form.Heart_Rate),
        Blood_Sugar_Fasting: Number(form.Blood_Sugar_Fasting),
        Cholesterol_Total: Number(form.Cholesterol_Total),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        payload
      );

      setResult(response.data);

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError(
          "Unable to connect to the prediction server. Make sure FastAPI is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setResult(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <form className="assessment-form" onSubmit={handleSubmit}>

        {/* PERSONAL INFORMATION */}

        <section className="form-section">
          <div className="form-section-heading">
            <div className="form-icon">
              <User size={20} />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Basic physical information</p>
            </div>
          </div>

          <div className="form-grid">

            <Field label="Age" required>
              <input
                type="number"
                name="Age"
                value={form.Age}
                onChange={handleChange}
                placeholder="e.g. 52"
                min="1"
                max="120"
                required
              />
            </Field>

            <Field label="Gender" required>
              <select
                name="Gender"
                value={form.Gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>

            <Field label="Weight (kg)" required>
              <input
                type="number"
                name="Weight"
                value={form.Weight}
                onChange={handleChange}
                placeholder="e.g. 78"
                min="1"
                max="300"
                required
              />
            </Field>

            <Field label="Height (cm)" required>
              <input
                type="number"
                name="Height"
                value={form.Height}
                onChange={handleChange}
                placeholder="e.g. 175"
                min="50"
                max="250"
                required
              />
            </Field>

            <Field label="BMI">
              <input
                type="number"
                value={bmi}
                readOnly
                placeholder="Calculated automatically"
              />

              <small className="field-hint">
                Calculated from weight and height
              </small>
            </Field>

          </div>
        </section>


        {/* LIFESTYLE */}

        <section className="form-section">
          <div className="form-section-heading">
            <div className="form-icon">
              <Activity size={20} />
            </div>

            <div>
              <h2>Lifestyle</h2>
              <p>Daily habits and lifestyle information</p>
            </div>
          </div>

          <div className="form-grid">

            <Field label="Smoking" required>
              <select
                name="Smoking"
                value={form.Smoking}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Never">Never</option>
                <option value="Former">Former</option>
                <option value="Current">Current</option>
              </select>
            </Field>

            <Field label="Alcohol Intake">
              <select
                name="Alcohol_Intake"
                value={form.Alcohol_Intake}
                onChange={handleChange}
              >
                <option value="">Not specified</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </Field>

            <Field label="Physical Activity" required>
              <select
                name="Physical_Activity"
                value={form.Physical_Activity}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
            </Field>

            <Field label="Diet" required>
              <select
                name="Diet"
                value={form.Diet}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Healthy">Healthy</option>
                <option value="Average">Average</option>
                <option value="Unhealthy">Unhealthy</option>
              </select>
            </Field>

            <Field label="Stress Level" required>
              <select
                name="Stress_Level"
                value={form.Stress_Level}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </Field>

          </div>
        </section>


        {/* MEDICAL HISTORY */}

        <section className="form-section">
          <div className="form-section-heading">
            <div className="form-icon">
              <Stethoscope size={20} />
            </div>

            <div>
              <h2>Medical History</h2>
              <p>Existing conditions and family history</p>
            </div>
          </div>

          <div className="form-grid">

            <BooleanField
              label="Hypertension"
              name="Hypertension"
              value={form.Hypertension}
              onChange={handleChange}
            />

            <BooleanField
              label="Diabetes"
              name="Diabetes"
              value={form.Diabetes}
              onChange={handleChange}
            />

            <BooleanField
              label="Hyperlipidemia"
              name="Hyperlipidemia"
              value={form.Hyperlipidemia}
              onChange={handleChange}
            />

            <BooleanField
              label="Family History"
              name="Family_History"
              value={form.Family_History}
              onChange={handleChange}
            />

            <BooleanField
              label="Previous Heart Attack"
              name="Previous_Heart_Attack"
              value={form.Previous_Heart_Attack}
              onChange={handleChange}
            />

          </div>
        </section>


        {/* CLINICAL DATA */}

        <section className="form-section">
          <div className="form-section-heading">
            <div className="form-icon">
              <HeartPulse size={20} />
            </div>

            <div>
              <h2>Clinical Measurements</h2>
              <p>Enter your measured health values</p>
            </div>
          </div>

          <div className="form-grid">

            <Field label="Systolic BP (mmHg)" required>
              <input
                type="number"
                name="Systolic_BP"
                value={form.Systolic_BP}
                onChange={handleChange}
                placeholder="e.g. 130"
                required
              />
            </Field>

            <Field label="Diastolic BP (mmHg)" required>
              <input
                type="number"
                name="Diastolic_BP"
                value={form.Diastolic_BP}
                onChange={handleChange}
                placeholder="e.g. 80"
                required
              />
            </Field>

            <Field label="Heart Rate (BPM)" required>
              <input
                type="number"
                name="Heart_Rate"
                value={form.Heart_Rate}
                onChange={handleChange}
                placeholder="e.g. 75"
                required
              />
            </Field>

            <Field label="Fasting Blood Sugar" required>
              <input
                type="number"
                name="Blood_Sugar_Fasting"
                value={form.Blood_Sugar_Fasting}
                onChange={handleChange}
                placeholder="e.g. 95"
                required
              />
            </Field>

            <Field label="Total Cholesterol" required>
              <input
                type="number"
                name="Cholesterol_Total"
                value={form.Cholesterol_Total}
                onChange={handleChange}
                placeholder="e.g. 200"
                required
              />
            </Field>

          </div>
        </section>


        {/* ERROR */}

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        {/* SUBMIT */}

        <div className="submit-area">

          <button
            className="analyze-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="spin" size={19} />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Heart Risk
                <ArrowRight size={19} />
              </>
            )}
          </button>

          <p>
            Your information is processed locally through the prototype API.
          </p>

        </div>

      </form>


      {/* RESULT */}

      {result && (
        <PredictionResult
          result={result}
          onReset={resetForm}
        />
      )}
    </>
  );
}


function Field({ label, required, children }) {
  return (
    <label className="field">
      <span>
        {label}

        {required && (
          <b>*</b>
        )}
      </span>

      {children}
    </label>
  );
}


function BooleanField({ label, name, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Select</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>
    </label>
  );
}


export default PatientForm;