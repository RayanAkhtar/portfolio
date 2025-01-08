import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import fs from 'fs'; 
import * as firebaseConfig from "./api/firebaseConfig.json";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load JSON data
const loadJson = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return [];
  }
};

// insert or update a project in Firestore
const insertProject = async (project) => {
  try {
    const projectRef = doc(db, "projects", project.name);
    await setDoc(projectRef, project);
    console.log(`Inserted/Updated project: ${project.name}`);
  } catch (error) {
    console.error(`Error processing project '${project.name}':`, error);
  }
};

// insert or update a property in Firestore
const insertProperty = async (property) => {
  try {
    const propertyRef = doc(db, "properties", property.name);
    await setDoc(propertyRef, property);
    console.log(`Inserted/Updated property: ${property.name}`);
  } catch (error) {
    console.error(`Error processing property '${property.name}':`, error);
  }
};

// upload to Firestore
const processFiles = async (projectsFile, propertiesFile) => {
  const projects = loadJson(projectsFile);
  const properties = loadJson(propertiesFile);

  for (const project of projects) {
    await insertProject(project);
  }

  for (const property of properties) {
    await insertProperty(property);
  }
};

// Main function
(async () => {
  const projectsFile = 'projects.json';
  const propertiesFile = 'properties.json';

  await processFiles(projectsFile, propertiesFile);
})();
