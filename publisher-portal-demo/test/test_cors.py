from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)

# Enable CORS
CORS(app)

# API endpoint to fetch ranked colleges
@app.route('/rank_colleges', methods=['POST'])
def rank_colleges():
    # Get data from the request
    data = request.json
    # for i, j in data.items():
    #     if i not in ['state', 'city', 'rankingType']:
    #         data[i] = 1

    print(data)
    # Define the API endpoint URL for the third-party API
    url = "https://edulot-api.netlify.app/ranker"

    # Send POST request to the third-party API
    response = requests.post(url, json=data)
    
    print(response)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        result = response.json()
        return jsonify(result), 200
    else:
        return jsonify({"error": f"Error: {response.status_code}"}), 500

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
