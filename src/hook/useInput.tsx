import { useState } from "react";
const useInput = (validateValue: (value: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isValid, setIsValid] = useState(false);
  
    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEnteredValue(event.target.value);
      setIsValid(validateValue(event.target.value));
    };
  
    const inputBlurHandler = () => {
      setIsValid(validateValue(enteredValue));
    };
  
    const reset = () => {
      setEnteredValue("");
      setIsValid(false);
    };
  
    return {
      value: enteredValue,
      isValid,
      hasError: !isValid && enteredValue.trim() !== "",
      valueChangeHandler,
      inputBlurHandler,
      reset,
    };
  };
  export default useInput