import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../store/index';
import { Link, useNavigate } from "react-router-dom";
import { authActions } from '../store/auth';
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const firstName = useSelector((state: RootState) => state.auth.user.displayableName?.split(" ")[0]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/sign-in", { replace: true });
  };

  return (
    <Navbar>
      <Logo />
      <div>
        <Link to={isAuthenticated ? "/user" : "/sign-in"} className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          {isAuthenticated ? firstName : "Sign in"}
        </Link>
        {isAuthenticated && (
          <Link to="/" className="main-nav-item" onClick={logoutHandler}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        )}
      </div>
    </Navbar>
  );
};

export default Header;