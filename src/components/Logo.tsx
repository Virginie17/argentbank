import { FC } from "react";
import LogoBank from "../assets/img/argentBankLogo.webp";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link to="/" className="main-nav-logo">
      <img src={LogoBank} alt="Logo" className="main-nav-logo-image" />
    </Link>
  );
};

export default Logo;