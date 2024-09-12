import React, { useState } from "react";

// Déclaration du hook personnalisé useInput
const useInput = (validateValue: (value: string) => boolean) => {
  
  const [enteredValue, setEnteredValue] = useState<string>("");
 
  const [isTouched, setIsTouched] = useState<boolean>(false);

  
  const valueIsValid = validateValue(enteredValue);
 
  const hasError = !valueIsValid && isTouched;

  
  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value);
  };

  
  const inputBlurHandler = () => {
    setIsTouched(true); 
  };

  
  const reset = () => {
    setEnteredValue(""); 
    setIsTouched(false); 
  };

  
  return {
    value: enteredValue, 
    isValid: valueIsValid, 
    hasError, 
    valueChangeHandler, 
    inputBlurHandler, 
    reset, 
  };
};


export default useInput;