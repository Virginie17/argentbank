import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, ...props }, ref) => (
  <input id={id} ref={ref} {...props} />
));

export default Input;