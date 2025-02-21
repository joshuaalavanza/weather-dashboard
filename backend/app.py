from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os  # Added for environment variables

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")  # Fetch API key from environment
BASE_URL = "https://api.openweathermap.org/data/2.5/"

@app.route("/", methods=["GET"])
def home():
    return "Flask API is running!", 200  # Added a default route

@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    url = f"{BASE_URL}weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if response.status_code != 200:
        return jsonify({"error": data.get("message", "Unable to fetch weather data")}), response.status_code

    return jsonify({
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

