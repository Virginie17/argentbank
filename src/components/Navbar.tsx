import { FC } from "react";

//interfce pour les props du composant Navbar
interface NavI {
  children: React.ReactNode;
}

const Navbar: FC<NavI> = (props) => {
  return <nav className="main-nav">{props.children}</nav>;
};

export default Navbar;