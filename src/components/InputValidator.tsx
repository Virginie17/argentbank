import React from "react";

interface InputValidatorI {
  children: React.ReactNode;
  className: string;
}

const InputValidator: React.FC<InputValidatorI> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export default InputValidator;