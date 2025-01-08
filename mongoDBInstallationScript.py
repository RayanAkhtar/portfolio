import json
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in the .env file!")

client = MongoClient(MONGO_URI)
db = client["portfolio"]  # portfolio cluster

projects_collection = db["projects"]  # Projects collection
properties_collection = db["properties"]  # Properties collection

# Function to load JSON from a file
def load_json(file_path):
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from {file_path}: {e}")
        return []

# Function to add or update a project
def insert_project(project):
    try:
        result = projects_collection.update_one(
            {"name": project["name"]},  # Match on name
            {"$set": project},  # Update fields or insert
            upsert=True
        )
        if result.matched_count > 0:
            print(f"Updated project: {project['name']}")
        else:
            print(f"Inserted new project: {project['name']}")
    except Exception as e:
        print(f"Error processing project '{project.get('name', 'Unknown')}': {e}")

# Function to add or update a property
def insert_property(property_):
    try:
        result = properties_collection.update_one(
            {"name": property_["name"]},  # Match on name
            {"$set": property_},  # Update fields or insert
            upsert=True
        )
        if result.matched_count > 0:
            print(f"Updated property: {property_['name']}")
        else:
            print(f"Inserted new property: {property_['name']}")
    except Exception as e:
        print(f"Error processing property '{property_.get('name', 'Unknown')}': {e}")

def process_files(projects_file, properties_file):
    projects = load_json(projects_file)
    properties = load_json(properties_file)

    for project in projects:
        insert_project(project)

    for property_ in properties:
        insert_property(property_)

if __name__ == "__main__":
    projects_file = "projects.json"
    properties_file = "properties.json"

    process_files(projects_file, properties_file)
