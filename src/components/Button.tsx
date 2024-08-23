import { ButtonHTMLAttributes, Dispatch, FC, ReactNode, SetStateAction, memo } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label?: string;
  onClick?: () => Dispatch<SetStateAction<boolean>> | void;
}

const Button: FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  return (
    <button onClick={() => (onClick ? onClick : null)} {...rest}>
      {children}
    </button>
  );
};

export default memo(Button);