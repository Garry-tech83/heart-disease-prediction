import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)

from xgboost import XGBClassifier

from preprocessing import PROJECT_ROOT, load_data, create_preprocessor


DATA_PATH = PROJECT_ROOT / "dataset" / "heart.csv"
MODEL_DIR = PROJECT_ROOT / "ml" / "models"


def evaluate_model(model, X_test, y_test):

    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)[:, 1]

    return {
        "accuracy": accuracy_score(y_test, predictions),
        "precision": precision_score(y_test, predictions),
        "recall": recall_score(y_test, predictions),
        "f1": f1_score(y_test, predictions),
        "roc_auc": roc_auc_score(y_test, probabilities),
    }


def main():

    print("=" * 60)
    print("HEART DISEASE PREDICTION - MODEL TRAINING")
    print("=" * 60)

    print("\nLoading dataset...")

    X, y = load_data(DATA_PATH)

    print(f"Dataset shape: {X.shape}")
    print(f"Target distribution:\n{y.value_counts()}")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y,
    )

    print(f"\nTraining samples: {len(X_train)}")
    print(f"Testing samples: {len(X_test)}")

    models = {

        "Logistic Regression": LogisticRegression(
            max_iter=2000,
            random_state=42
        ),

        "Random Forest": RandomForestClassifier(
            n_estimators=300,
            max_depth=None,
            random_state=42,
            n_jobs=-1
        ),

        "XGBoost": XGBClassifier(
            n_estimators=300,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42,
            eval_metric="logloss",
            n_jobs=-1
        ),
    }

    results = {}
    trained_models = {}

    for name, model in models.items():

        print("\n" + "-" * 60)
        print(f"Training: {name}")
        print("-" * 60)

        preprocessor = create_preprocessor()

        pipeline = Pipeline(
            steps=[
                ("preprocessor", preprocessor),
                ("model", model),
            ]
        )

        pipeline.fit(X_train, y_train)

        metrics = evaluate_model(
            pipeline,
            X_test,
            y_test
        )

        results[name] = metrics
        trained_models[name] = pipeline

        print(f"Accuracy : {metrics['accuracy']:.4f}")
        print(f"Precision: {metrics['precision']:.4f}")
        print(f"Recall   : {metrics['recall']:.4f}")
        print(f"F1 Score : {metrics['f1']:.4f}")
        print(f"ROC-AUC  : {metrics['roc_auc']:.4f}")

    print("\n" + "=" * 60)
    print("MODEL COMPARISON")
    print("=" * 60)

    results_df = pd.DataFrame(results).T

    print(results_df.round(4))

    # Select using ROC-AUC rather than accuracy alone
    best_model_name = results_df["roc_auc"].idxmax()

    best_model = trained_models[best_model_name]

    print("\n" + "=" * 60)
    print(f"SELECTED MODEL: {best_model_name}")
    print("=" * 60)

    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    model_path = MODEL_DIR / "heart_disease_model.pkl"

    joblib.dump(best_model, model_path)

    results_df.to_csv(MODEL_DIR / "model_results.csv")

    print(f"\nModel saved to:")
    print(model_path)

    print("\nTraining completed successfully!")


if __name__ == "__main__":
    main()