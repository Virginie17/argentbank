import { FC } from "react";


interface NavI {
  children: React.ReactNode;
}

const Navbar: FC<NavI> = (props) => {
  return <nav className="main-nav">{props.children}</nav>;
};

export default Navbar;