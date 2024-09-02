import React, { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Input from "./Input";
import InputValidator from "./InputValidator";
import useInput from "../hook/useInput";

// Interface pour les props du composant EditForm
interface EditFormProps {
  setstate: Dispatch<SetStateAction<boolean>>;
  onclick: () => void;
}

// Fonction de validation pour le nom
const isValidName = (value: string) => value.trim() !== "";

const EditForm: React.FC<EditFormProps> = ({ setstate, onclick }) => {
  // Utilisation du hook personnalisé pour gérer l'état de l'input "Nom"
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isValidName);
// Utilisation du hook personnalisé pour gérer l'état de l'input "Prénom"
  const {
    value: enteredFirstname,
    isValid: enteredFirstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstnameInput,
  } = useInput(isValidName);

 // Variable pour vérifier si le formulaire est valide
  let formIsValid = false;
// Vérification de la validité des champs
  if (enteredFirstnameIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  // Gestionnaire de soumission du formulaire
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();// Empêche le rechargement de la page

    if (!formIsValid) return; // Si le formulaire n'est pas valide, on arrête la soumission

     // Création de l'objet contenant les valeurs du formulaire
    const formValues = {
      firstName: enteredFirstname,
      lastName: enteredName,
    };

    
    console.log("Form submitted", formValues);

    // Réinitialisation des champs du formulaire
    resetFirstnameInput();
    resetNameInput();
    setstate(false);// Mise à jour de l'état pour fermer le formulaire
    onclick();// Appel de la fonction onClick
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="edit-form">
        {/* Champ de saisie pour le prénom */}
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
        {/* Champ de saisie pour le nom */}
        <InputValidator className="input-wrapper">
          <Input id="lastname" className="edit-input" placeholder="LastName" value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
          {nameInputHasError && <p className="error-input">Invalid field</p>}
        </InputValidator>
      </div>
      <div className="flex">
         {/* Bouton pour soumettre le formulaire */}
        <Button type="submit" label="Save modifications" className="edit-button">
          Save
        </Button>
                {/* Bouton pour annuler les modifications */}
        <Button label="Cancel modifications" className="edit-button" onClick={() => setstate(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditForm;