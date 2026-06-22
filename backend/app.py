import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS

# Add current directory to python path to resolve sub-packages correctly
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.append(CURRENT_DIR)

app = Flask(__name__)
# Enable CORS globally for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Import and register blueprints
try:
    from routes.prediction import prediction_bp
    app.register_blueprint(prediction_bp)
    print("Prediction blueprint registered successfully!")
except Exception as e:
    print(f"Error registering blueprints: {e}")

@app.route("/health", methods=["GET"])
def health():
    # Basic health-check endpoint
    try:
        from routes.prediction import model
        model_status = model is not None
    except Exception:
        model_status = False
    return jsonify({"status": "healthy", "model_loaded": model_status})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
