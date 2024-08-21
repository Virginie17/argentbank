
import React from "react";

interface InputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onBlur, ...rest }, ref) => {
    return <input ref={ref} value={value} onChange={onChange} onBlur={onBlur} {...rest} />;
  }
);

export default Input;