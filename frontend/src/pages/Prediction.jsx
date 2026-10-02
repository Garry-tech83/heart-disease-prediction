import Navbar from "../components/Navbar";
import PatientForm from "../components/PatientForm";

function Prediction() {
  return (
    <div className="app">
      <Navbar />

      <main className="prediction-page">
        <div className="prediction-header">
          <p>HEART HEALTH ASSESSMENT</p>

          <h1>Tell us about your health</h1>

          <span>
            Enter the information below to generate a model-estimated
            heart disease risk assessment.
          </span>
        </div>

        <PatientForm />
      </main>
    </div>
  );
}

export default Prediction;