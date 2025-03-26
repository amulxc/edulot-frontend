import requests
import json

# Define the API endpoint URL
url = "https://edulot-api.netlify.app/ranker"

# Define the payload data
data = {
    "state": "Tamil Nadu",
    "city": "Chennai",
    "rankingType": "EngineeringRanking",
    "researchScore": 1,
    "theoryScore": 1,
    "campusLifeScore": 1,
    "internationalExposureScore": 1,
    "placementRecordScore": 1,
    "academicScore": 1,
    "infrastructureScore": 1,
    "researchOpportunitiesScore": 0,
    "industryConnectionScore": 0,
    "costEffectivenessScore": 0,
    "influenceFactor": 0
}

# Send POST request
response = requests.post(url, json=data)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    result = response.json()
    print("Ranked Colleges:", json.dumps(result, indent=4))
else:
    print(f"Error: {response.status_code}")
