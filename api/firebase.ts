import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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

interface IProject {
  name: string;
  description: string;
  spotlight: boolean;
  startDate: string;
  endDate: string;
  currentlyWorkingOn: boolean;
  thumbnailImage: string;
  propertyNames: string[];
  achievements: string[];
  projectLinks: {
    repo: string;
    website: string;
  };
  role: string;
  outcome: string;
  keyLearning: string;
  industry: string;
}

interface IExperience {
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnailImage?: string;
  achievements?: string[];
  websiteLinks?: string[];
  type: "work" | "other" | "education";
}

// Fetches spotlight projects
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

// Fetches projects currently being worked on
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

// Fetches projects that are neither spotlight nor being worked on
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

// Fetches all projects
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


const getProject = async (name: string): Promise<IProject | null> => {
  try {
    const q = query(collection(db, "projects"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const projectDoc = querySnapshot.docs[0];
      return projectDoc.data() as IProject;
    }
    return null;
  } catch (error) {
    console.error("Error fetching project by name:", error);
    return null;
  }
};



const getIndustryDescription = async (industryName: string): Promise<string | null> => {
  try {
    const q = query(collection(db, "properties"), where("name", "==", industryName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data().description;
    }
    return null;
  } catch (error) {
    console.error("Error fetching industry description:", error);
    return null;
  }
};

// Fetches all experiences
const getExperiences = async (): Promise<IExperience[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "experiences"));
    const experiences: IExperience[] = [];
    querySnapshot.forEach((doc) => {
      experiences.push(doc.data() as IExperience);
    });
    return experiences;
  } catch (error) {
    console.error("Error fetching all experiences:", error);
    return [];
  }
};


// Fetches experiences by type
const getExperiencesByType = async (type: "work" | "other" | "education"): Promise<IExperience[]> => {
  try {
    const q = query(collection(db, "experiences"), where("type", "==", type));
    const querySnapshot = await getDocs(q);
    const experiences: IExperience[] = [];
    querySnapshot.forEach((doc) => {
      experiences.push(doc.data() as IExperience);
    });
    return experiences;
  } catch (error) {
    console.error(`Error fetching experiences of type '${type}':`, error);
    return [];
  }
};

// Gets all work experiences
const getAllExperience = async (): Promise<IExperience[]> => {
  try {
    const q = query(collection(db, "experiences"), where("type", "==", "work"));
    const querySnapshot = await getDocs(q);
    const experiences: IExperience[] = [];
    querySnapshot.forEach((doc) => {
      experiences.push(doc.data() as IExperience);
    });
    return experiences;
  } catch (error) {
    console.error("Error fetching all work experiences:", error);
    return [];
  }
};

// Fetches a specific experience by name
const getExperienceByName = async (name: string): Promise<IExperience | null> => {
  try {
    const q = query(collection(db, "experiences"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const experienceDoc = querySnapshot.docs[0];
      return experienceDoc.data() as IExperience;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching experience by name '${name}':`, error);
    return null;
  }
};

// Export functions for use elsewhere
export {
  getSpotlightProjects,
  getCurrentlyWorkingOnProjects,
  getOtherProjects,
  getProjects,
  getProject,
  getIndustryDescription,
  getExperiences,
  getExperienceByName,
  getExperiencesByType,
  getAllExperience
};
