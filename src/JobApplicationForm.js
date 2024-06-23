import React, { useState } from 'react';
import './App.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedSkills = [...formData.additionalSkills];
    if (checked && !updatedSkills.includes(value)) {
      updatedSkills.push(value);
    } else {
      updatedSkills = updatedSkills.filter((skill) => skill !== value);
    }
    setFormData({ ...formData, additionalSkills: updatedSkills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setSummaryData(formData);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email must be a valid format';
    }
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (!data.applyingForPosition.trim()) {
      errors.applyingForPosition = 'Applying for Position is required';
    }
    if (
      (data.applyingForPosition === 'Developer' || data.applyingForPosition === 'Designer') &&
      !data.relevantExperience.trim()
    ) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (data.relevantExperience.trim() && isNaN(Number(data.relevantExperience))) {
      errors.relevantExperience = 'Relevant Experience must be a number';
    } else if (Number(data.relevantExperience) <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }
    if (data.applyingForPosition === 'Designer' && !data.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (
      data.portfolioURL.trim() &&
      !/(http(s)?:\/\/[^\s]+)/.test(data.portfolioURL)
    ) {
      errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (data.applyingForPosition === 'Manager' && !data.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (data.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!data.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (isNaN(Date.parse(data.preferredInterviewTime))) {
      errors.preferredInterviewTime = 'Preferred Interview Time must be a valid date and time';
    }
    return errors;
  };

  return (
    <div>
      {formSubmitted ? (
        <div>
          <h2>Summary</h2>
          <p>Full Name: {summaryData.fullName}</p>
          <p>Email: {summaryData.email}</p>
          <p>Phone Number: {summaryData.phoneNumber}</p>
          <p>Applying for Position: {summaryData.applyingForPosition}</p>
          {summaryData.applyingForPosition === 'Developer' ||
          summaryData.applyingForPosition === 'Designer' ? (
            <p>Relevant Experience: {summaryData.relevantExperience} years</p>
          ) : null}
          {summaryData.applyingForPosition === 'Designer' ? (
            <p>Portfolio URL: {summaryData.portfolioURL}</p>
          ) : null}
          {summaryData.applyingForPosition === 'Manager' ? (
            <p>Management Experience: {summaryData.managementExperience}</p>
          ) : null}
          <p>Additional Skills: {summaryData.additionalSkills.join(', ')}</p>
          <p>Preferred Interview Time: {summaryData.preferredInterviewTime}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {formErrors.phoneNumber && <span className="error">{formErrors.phoneNumber}</span>}
          </label>
          <label>
            Applying for Position:
            <select
              name="applyingForPosition"
              value={formData.applyingForPosition}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {formErrors.applyingForPosition && (
              <span className="error">{formErrors.applyingForPosition}</span>
            )}
          </label>
          {formData.applyingForPosition === 'Developer' ||
          formData.applyingForPosition === 'Designer' ? (
            <label>
              Relevant Experience (years):
              <input
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleInputChange}
              />
              {formErrors.relevantExperience && (
                <span className="error">{formErrors.relevantExperience}</span>
              )}
            </label>
          ) : null}
          {formData.applyingForPosition === 'Designer' ? (
            <label>
              Portfolio URL:
              <input
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleInputChange}
              />
              {formErrors.portfolioURL && <span className="error">{formErrors.portfolioURL}</span>}
            </label>
          ) : null}
          {formData.applyingForPosition === 'Manager' ? (
            <label>
              Management Experience:
              <input
                type="text"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleInputChange}
              />
              {formErrors.managementExperience && (
                <span className="error">{formErrors.managementExperience}</span>
              )}
            </label>
          ) : null}
          <label>
            Additional Skills:
            <div>
              <label>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value="JavaScript"
                  checked={formData.additionalSkills.includes('JavaScript')}
                  onChange={handleCheckboxChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value="CSS"
                  checked={formData.additionalSkills.includes('CSS')}
                  onChange={handleCheckboxChange}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value="Python"
                  checked={formData.additionalSkills.includes('Python')}
                  onChange={handleCheckboxChange}
                />
                Python
              </label>
             
            </div>
            {formErrors.additionalSkills && (
              <span className="error">{formErrors.additionalSkills}</span>
            )}
          </label>
          <label>
            Preferred Interview Time:
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleInputChange}
            />
            {formErrors.preferredInterviewTime && (
              <span className="error">{formErrors.preferredInterviewTime}</span>
            )}
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default JobApplicationForm;
