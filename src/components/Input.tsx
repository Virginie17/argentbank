import React, { forwardRef } from 'react';

// Interface pour les props du composant Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}
// Déclaration du composant fonctionnel Input avec forwardRef pour transférer la référence
const Input = forwardRef<HTMLInputElement, InputProps>(({ id, ...props }, ref) => (
   // Élément input avec les props et la référence transférée
  <input id={id} ref={ref} {...props} />
));

export default Input;