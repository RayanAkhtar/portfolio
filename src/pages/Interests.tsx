import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import '../styles/Interests.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCivUgf1CwjNjJX7PGZkL607Zpcde9gsgo',
  authDomain: 'portfolio-2e98e.firebaseapp.com',
  projectId: 'portfolio-2e98e',
  storageBucket: 'portfolio-2e98e.firebasestorage.app',
  messagingSenderId: '311757536682',
  appId: '1:311757536682:web:469b801078f92fa4087fd3',
  measurementId: 'G-C6CB1F03Y1',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Interest {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  thumbnailImage: string;
}

const Interests = () => {
  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      const interestsRef = collection(db, 'interests');
      const querySnapshot = await getDocs(interestsRef);
      const fetchedInterests: Interest[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedInterests.push({
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description,
          achievements: data.achievements,
          thumbnailImage: data.thumbnailImage,
        });
      });

      fetchedInterests.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB.getTime() - dateA.getTime();
      });

      setInterests(fetchedInterests);
    };

    fetchInterests();
  }, []);

  return (
    <div className="interests-container">
      {interests.map((interest) => (
        <div key={interest.name} className="interest-card">
          <img src={interest.thumbnailImage} alt={interest.name} className="interest-thumbnail" />
          <div className="interest-info">
            <h3>{interest.name}</h3>
            <p>{interest.description}</p>
            <p>
              <strong>Start Date:</strong> {interest.startDate} | <strong>End Date:</strong> {interest.endDate}
            </p>
            <div>
              <strong>Achievements:</strong>
              <ul className="achievements-list">
                {interest.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Interests;
