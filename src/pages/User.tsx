import { FC, useState, useEffect } from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import EditForm from '../components/EditForm';

const User: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as { token: string | null; id: string | null; displayableName: string | null; email: string | null; firstName: string | null; lastName: string | null; };
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(authActions.Login(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch('http://localhost:3001/api/v1/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(authActions.setTransactions(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [dispatch, user?.token]);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./user.html">
            <i className="fa fa-user-circle"></i>
            {user?.firstName || 'User'}
          </a>
          <a className="main-nav-item" href="./index.html" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
          <button className="edit-button" onClick={handleEditClick}>
            {isEditing ? 'Cancel' : 'Edit Name'}
          </button>
          {isEditing && <EditForm setstate={setIsEditing} onclick={handleEditClick} />}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default User;