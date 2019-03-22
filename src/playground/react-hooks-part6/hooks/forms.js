import { useState, useRef } from 'react';

export const useFormInput = () => {
  const ref = useRef();
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = event => {
    if (event.target.value.trim() === '') {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  return { ref, onChange: inputChangeHandler, validity };
};
