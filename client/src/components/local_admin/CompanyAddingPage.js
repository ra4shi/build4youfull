import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localRequest } from '../../axios';

const AddCompanyPage = () => {
  const [formData, setFormData] = useState({
    companyname: '',
    companyusername: '',
    companycategories: '',
    aboutcompany: '',
    certifications: '',
    license: '',
  });

  const history = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await localRequest({
        url: '/api/localadmin/addcompanydetails',
        method: 'POST',
        data: formData,
      });

      if (response && response.data) {
        const { redirectTo, company } = response.data;
        if (redirectTo) {
          history(redirectTo);
        } else {
          console.log('Company details added:', company);
          // You can set some state or show a success message here
        }
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Error adding company details:', error);
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
    <div className="row d-flex justify-content-center">
      <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <h3>Company Details</h3>
        <p className="blue-text">
          <br /> Enter company details properly
        </p>
        <div className="card">
          <h5 className="text-center mb-4"></h5>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Enter your company name:</label>
              <input
                type="text"
                id="name"
                name="companyname"
                value={formData.companyname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Enter your company username:</label>
              <input
                type="text"
                id="username"
                name="companyusername"
                value={formData.companyusername}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Enter your company category:</label>
              <input
                type="text"
                id="category"
                name="companycategories"
                value={formData.companycategories}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="about">Enter About your Company:</label>
              <input
                type="text"
                id="about"
                name="aboutcompany"
                value={formData.aboutcompany}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="certification">Company Certification:</label>
              <input
                type="text"
                id="certification"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="license">Company license:</label>
              <input
                type="text"
                id="license"
                name="license"
                value={formData.license}
                onChange={handleChange}
              />
            </div>
            <div className="row justify-content-end">
              <div className="form-group col-sm-6">
                <button type="submit" className="btn-block btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default AddCompanyPage;



