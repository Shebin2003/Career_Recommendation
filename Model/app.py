from flask import Flask, request, jsonify
from model import predict_role

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        data = request.json
        input_features = data.get('features')  # Ensure 'features' contains the input list

        if not input_features or not isinstance(input_features, list):
            return jsonify({"error": "Invalid input. Please provide a list of features."}), 400

        # Get predictions
        top_3_predictions = predict_role(input_features)
        return top_3_predictions

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
