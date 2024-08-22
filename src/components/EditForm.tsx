import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import InputValidator from "./InputValidator";
import useInput from "../hook/useInput";

interface EditFormProps {
 setstate: React.Dispatch<React.SetStateAction<boolean>>;
 onclick: () => void;
}


const EditForm: React.FC<EditFormProps> = () => {
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

  const token = localStorage.getItem("token");

  let formIsValid: boolean = false;

  if (enteredFirstnameIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) return;

    
    try {
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PATCH",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
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
        <Button label="Cancel modifications" className="edit-button" onClick={}>
          Cancel
        </Button>
      </div>
    </form>
  );
  }
};



export default EditForm
