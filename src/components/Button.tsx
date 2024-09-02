import { ButtonHTMLAttributes, Dispatch, FC, ReactNode, SetStateAction, memo } from "react";

// Définition de l'interface des props pour le composant Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label?: string;
  onClick?: () => Dispatch<SetStateAction<boolean>> | void;
}
// Définition du composant fonctionnel Button
const Button: FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  return (
    // Rendu de l'élément button avec les props passées
    <button onClick={() => (onClick ? onClick : null)} {...rest}>
      {children}
    </button>
  );
};
// Exportation du composant Button en utilisant memo pour optimiser les performances
export default memo(Button);