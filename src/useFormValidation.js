// src/components/useFormValidation.js
import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'fullName':
        if (!value.trim()) newErrors.fullName = 'Full Name is required';
        else delete newErrors.fullName;
        break;
      case 'email':
        if (!value.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Email is invalid';
        else delete newErrors.email;
        break;
      case 'phoneNumber':
        if (!value.trim()) newErrors.phoneNumber = 'Phone Number is required';
        else if (!/^\d+$/.test(value)) newErrors.phoneNumber = 'Phone Number is invalid';
        else delete newErrors.phoneNumber;
        break;
      case 'applyingForPosition':
        if (!value) newErrors.applyingForPosition = 'Position is required';
        else delete newErrors.applyingForPosition;
        break;
      case 'relevantExperience':
        if (!value.trim()) newErrors.relevantExperience = 'Relevant Experience is required';
        else if (isNaN(value) || value <= 0) newErrors.relevantExperience = 'Experience must be a number greater than 0';
        else delete newErrors.relevantExperience;
        break;
      case 'portfolioURL':
        if (!value.trim()) newErrors.portfolioURL = 'Portfolio URL is required';
        else if (!/^https?:\/\/.+\..+$/.test(value)) newErrors.portfolioURL = 'URL is invalid';
        else delete newErrors.portfolioURL;
        break;
      case 'managementExperience':
        if (!value.trim()) newErrors.managementExperience = 'Management Experience is required';
        else delete newErrors.managementExperience;
        break;
      case 'additionalSkills':
        if (!value.length) newErrors.additionalSkills = 'At least one skill must be selected';
        else delete newErrors.additionalSkills;
        break;
      case 'preferredInterviewTime':
        if (!value) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
        else delete newErrors.preferredInterviewTime;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const isValid = () => {
    return Object.keys(errors).length === 0;
  };

  return [errors, validate, isValid];
};

export default useFormValidation;
