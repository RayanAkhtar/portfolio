import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";

const firebaseConfig = {
  "apiKey": "AIzaSyCivUgf1CwjNjJX7PGZkL607Zpcde9gsgo",
  "authDomain": "portfolio-2e98e.firebaseapp.com",
  "projectId": "portfolio-2e98e",
  "storageBucket": "portfolio-2e98e.firebasestorage.app",
  "messagingSenderId": "311757536682",
  "appId": "1:311757536682:web:469b801078f92fa4087fd3",
  "measurementId": "G-C6CB1F03Y1"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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

// fetches spotlight projects
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

// fetches projects currently being worked on
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

// fetches projects that are neither spotlight nor being worked on
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

// fetches all projects
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
