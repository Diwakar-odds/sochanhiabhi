// frontend/src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues, // To manually set all values if needed
    handleInputChange,
    resetForm,
  };
};