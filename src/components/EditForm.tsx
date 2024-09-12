import React, { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Input from "./Input";
import InputValidator from "./InputValidator";
import useInput from "../hook/useInput";


interface EditFormProps {
  setstate: Dispatch<SetStateAction<boolean>>;
  onclick: () => void;
}


const isValidName = (value: string) => value.trim() !== "";

const EditForm: React.FC<EditFormProps> = ({ setstate, onclick }) => {
 
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isValidName);

  const {
    value: enteredFirstname,
    isValid: enteredFirstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstnameInput,
  } = useInput(isValidName);

 
  let formIsValid = false;

  if (enteredFirstnameIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) return; 
    const formValues = {
      firstName: enteredFirstname,
      lastName: enteredName,
    };

    
    console.log("Form submitted", formValues);

   
    resetFirstnameInput();
    resetNameInput();
    setstate(false);
    onclick();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="edit-form">
        <InputValidator className="input-wrapper">
          <Input
            id="firstName"
            className="edit-input"
            placeholder="FirstName"
            value={enteredFirstname}
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
          />
          {firstnameInputHasError && <p className="error-input">Invalid field</p>}
        </InputValidator>
        <InputValidator className="input-wrapper">
          <Input id="lastname" className="edit-input" placeholder="LastName" value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
          {nameInputHasError && <p className="error-input">Invalid field</p>}
        </InputValidator>
      </div>
      <div className="flex">
        <Button type="submit" label="Save modifications" className="edit-button">
          Save
        </Button>
        <Button label="Cancel modifications" className="edit-button" onClick={() => setstate(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditForm;