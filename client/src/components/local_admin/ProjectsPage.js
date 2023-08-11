import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([  ]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.post('/api/localadmin/projects', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('localtoken'),
        },
      });
      
      const projects = response.data
      setProjects(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <h3>Show Projects</h3>
          <div>
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <img src={project.imageURL} alt={project.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
