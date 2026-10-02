import { Link } from "react-router-dom";

import {
  Activity,
  Brain,
  Database,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="app">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">

            <div className="hero-badge">
              <Activity size={16} />
              Machine Learning Prototype
            </div>

            <h1>
              Understand your
              <span> heart health.</span>
            </h1>

            <p className="hero-description">
              Analyze health and lifestyle parameters using a machine
              learning model to generate a heart disease risk assessment.
            </p>

            <Link to="/prediction" className="primary-button">
  Start Assessment
  <ArrowRight size={19} />
</Link>

            <p className="hero-note">
              For educational and prototype purposes only.
            </p>
          </div>

          {/* HEART VISUAL */}
          <div className="hero-visual">
            <div className="heart-glow"></div>

            <div className="heart-card">
              <Activity size={100} strokeWidth={1.3} />

              <div className="pulse-line">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>Heart Health</p>
              <strong>Assessment</strong>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">

          <div className="stat-card">
            <div className="stat-icon">
              <Database size={22} />
            </div>

            <div>
              <strong>50K+</strong>
              <span>Dataset Records</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Brain size={22} />
            </div>

            <div>
              <strong>20</strong>
              <span>Health Features</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <strong>ML</strong>
              <span>Prediction Model</span>
            </div>
          </div>

        </section>

        {/* INFORMATION */}
        <section className="info-section">

          <div className="section-heading">
            <p>HOW IT WORKS</p>
            <h2>Three simple steps</h2>
          </div>

          <div className="steps">

            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Enter your information</h3>
              <p>
                Provide basic health, lifestyle and clinical measurements.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Model analysis</h3>
              <p>
                Your information is processed by the trained ML prediction
                pipeline.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>View your result</h3>
              <p>
                Receive a model-estimated heart disease risk assessment.
              </p>
            </div>

          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="disclaimer">
          <ShieldCheck size={20} />

          <div>
            <strong>Important</strong>

            <p>
              This application is a machine-learning prototype for
              educational purposes. It does not provide medical diagnosis,
              treatment or professional medical advice.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;