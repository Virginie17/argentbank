import React, { useState } from "react";

// Déclaration du hook personnalisé useInput
const useInput = (validateValue: (value: string) => boolean) => {
  // État pour stocker la valeur saisie
  const [enteredValue, setEnteredValue] = useState<string>("");
  // État pour vérifier si le champ a été touché (perte de focus)
  const [isTouched, setIsTouched] = useState<boolean>(false);

  // Validation de la valeur saisie en utilisant la fonction de validation passée en paramètre
  const valueIsValid = validateValue(enteredValue);
  // Détermination de l'état d'erreur (si la valeur n'est pas valide et que le champ a été touché)
  const hasError = !valueIsValid && isTouched;

  // Gestionnaire de changement de valeur
  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value); // Mise à jour de la valeur saisie
  };

  // Gestionnaire de perte de focus
  const inputBlurHandler = () => {
    setIsTouched(true); // Mise à jour de l'état pour indiquer que le champ a été touché
  };

  // Fonction de réinitialisation des états
  const reset = () => {
    setEnteredValue(""); 
    setIsTouched(false); 
  };

  // Retourne les valeurs et fonctions nécessaires pour gérer l'input
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