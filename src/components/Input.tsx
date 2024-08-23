interface InputProps {
  id: string;
  className?: string; 
  placeholder?: string;
  value?: string;
  type?: string;
 ref?: React.RefObject<HTMLInputElement>;
 token?: string 

  
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, className, placeholder, value, type = "text", onChange, onBlur }, ref) => {
  return (
    <input
      id={id}
      className={className}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
    />
  );
};

export default Input;