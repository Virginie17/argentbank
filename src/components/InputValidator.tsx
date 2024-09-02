import React from "react";

// Interface pour les props du composant InputValidator
interface InputValidatorI {
  children: React.ReactNode; 
  className: string; 
}


const InputValidator: React.FC<InputValidatorI> = (props) => {
  return (
    // Élément div avec la classe CSS et les enfants passés en props
    <div className={props.className}>
      {props.children}
    </div>
  );
};


export default InputValidator;