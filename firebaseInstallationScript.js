import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import fs from 'fs'; 

const firebaseConfig = {
  "apiKey": "AIzaSyCivUgf1CwjNjJX7PGZkL607Zpcde9gsgo",
  "authDomain": "portfolio-2e98e.firebaseapp.com",
  "projectId": "portfolio-2e98e",
  "storageBucket": "portfolio-2e98e.firebasestorage.app",
  "messagingSenderId": "311757536682",
  "appId": "1:311757536682:web:469b801078f92fa4087fd3",
  "measurementId": "G-C6CB1F03Y1"
};

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

// Insert or update a project in Firestore
const insertProject = async (project) => {
  try {
    const projectRef = doc(db, "projects", project.name);
    await setDoc(projectRef, project);
    console.log(`Inserted/Updated project: ${project.name}`);
  } catch (error) {
    console.error(`Error processing project '${project.name}':`, error);
  }
};

// Insert or update a property in Firestore
const insertProperty = async (property) => {
  try {
    const propertyRef = doc(db, "properties", property.name);
    await setDoc(propertyRef, property);
    console.log(`Inserted/Updated property: ${property.name}`);
  } catch (error) {
    console.error(`Error processing property '${property.name}':`, error);
  }
};

// Check if an experience with the same name and role already exists in Firestore
const experienceExists = async (name, role) => {
  const experiencesRef = collection(db, "experiences");
  const q = query(experiencesRef, where("name", "==", name), where("role", "==", role));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Insert or update an experience in Firestore (with the "role" and "name" check)
const insertExperience = async (experience) => {
  try {
    const exists = await experienceExists(experience.name, experience.role);
    if (exists) {
      // Experience exists, update it
      const experienceRef = doc(db, "experiences", `${experience.name}-${experience.role}`);
      await setDoc(experienceRef, experience);
      console.log(`Updated experience: ${experience.name} - ${experience.role}`);
    } else {
      // Experience does not exist, insert new one
      const experienceRef = doc(db, "experiences", `${experience.name}-${experience.role}`);
      await setDoc(experienceRef, experience);
      console.log(`Inserted new experience: ${experience.name} - ${experience.role}`);
    }
  } catch (error) {
    console.error(`Error processing experience '${experience.name}' - '${experience.role}':`, error);
  }
};

// Upload to Firestore
const processFiles = async (projectsFile, propertiesFile, experiencesFile) => {
  const projects = loadJson(projectsFile);
  const properties = loadJson(propertiesFile);
  const experiences = loadJson(experiencesFile);

  for (const project of projects) {
    await insertProject(project);
  }

  for (const property of properties) {
    await insertProperty(property);
  }

  for (const experience of experiences) {
    await insertExperience(experience);
  }
};

// Main function
(async () => {
  const projectsFile = 'projects.json';
  const propertiesFile = 'properties.json';
  const experiencesFile = 'experiences.json';

  await processFiles(projectsFile, propertiesFile, experiencesFile);
})();
