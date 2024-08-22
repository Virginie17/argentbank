
import React from "react";

interface InputProps {
  id?: string;
  value?: string;
  type?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({ id, value, onChange, onBlur }) => {
    return <input id={id} value={value} onChange={onChange} onBlur={onBlur} />;
  }


export default Input;
