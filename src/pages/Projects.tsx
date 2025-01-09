import React from 'react';
import { useParams } from 'react-router-dom';

const Projects: React.FC = () => {
  const { 'projectName': projectName } = useParams<{ 'projectName': string }>();

  return (
    <>
      <h1>Project: {projectName}</h1>
      <p>Content for the project: {projectName}</p>
    </>
  );
};

export default Projects;
