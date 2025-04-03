import { useRouter } from "next/navigation";

interface ButtonProps {
  id: string;
  title: string;
  rightIcon?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ id, title, rightIcon, containerClass, onClick }) => {
  return (
    <button id={id} className={containerClass} onClick={onClick}>
      {title} {rightIcon}
    </button>
  );
};

export default Button;
