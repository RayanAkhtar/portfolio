import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import * as firebaseConfig from "./firebaseConfig.json"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Interface for Project (Optional, for TypeScript)
interface IProject {
  name: string;
  description: string;
  spotlight: boolean;
  startDate: string;
  endDate: string;
  currentlyWorkingOn: boolean;
  thumbnailImage: string;
  propertyNames: string[];
}

// Function to fetch spotlight projects
const getSpotlightProjects = async (): Promise<IProject[]> => {
  try {
    const q = query(collection(db, "projects"), where("spotlight", "==", true));
    const querySnapshot = await getDocs(q);
    const projects: IProject[] = [];
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as IProject);
    });
    return projects;
  } catch (error) {
    console.error("Error fetching spotlight projects:", error);
    return [];
  }
};

// Function to fetch projects currently being worked on
const getCurrentlyWorkingOnProjects = async (): Promise<IProject[]> => {
  try {
    const q = query(collection(db, "projects"), where("currentlyWorkingOn", "==", true));
    const querySnapshot = await getDocs(q);
    const projects: IProject[] = [];
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as IProject);
    });
    return projects;
  } catch (error) {
    console.error("Error fetching currently working on projects:", error);
    return [];
  }
};

// Function to fetch projects that are neither spotlight nor being worked on
const getOtherProjects = async (): Promise<IProject[]> => {
  try {
    const q = query(
      collection(db, "projects"),
      where("currentlyWorkingOn", "==", false),
      where("spotlight", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const projects: IProject[] = [];
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as IProject);
    });
    return projects;
  } catch (error) {
    console.error("Error fetching other projects:", error);
    return [];
  }
};

// Function to fetch all projects
const getProjects = async (): Promise<IProject[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: IProject[] = [];
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as IProject);
    });
    return projects;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
};


// Export functions for use elsewhere
export {
  getSpotlightProjects,
  getCurrentlyWorkingOnProjects,
  getOtherProjects,
  getProjects,
};
