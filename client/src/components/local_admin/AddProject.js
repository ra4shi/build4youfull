import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localRequest } from '../../axios';
import '../local_admin/AddProject.css';

const AddProject = () => {
  const [name, setName] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [category, setCategory] = useState('');
  const [aboutProject, setAboutProject] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('CompanyName', companyname);
      formData.append('category', category);
      formData.append('aboutproject', aboutProject);
      for (let i = 0; i < images.length; i++) {
        formData.append('image', images[i]);
      }

      const response = await localRequest({
        url: '/api/localadmin/addcompanydetails',
        method: 'POST',
        data: formData,
      });

      console.log(response);
      console.log('Project added successfully!');
      navigate('/projects');
      // Reset form fields and state after successful submission
      setName('');
      setCompanyname('');
      setCategory('');
      setAboutProject('');
      setImages([]);
      navigate('/localadmin/projects');

    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="companyname">Company Name:</label>
          <input
            type="text"
            id="companyname"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="aboutProject">About Project:</label>
          <textarea
            id="aboutProject"
            value={aboutProject}
            onChange={(e) => setAboutProject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
