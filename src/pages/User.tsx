import { FC, useState, useEffect, ChangeEvent } from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const User: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth?.user) as {
    token: string | null;
    id: string | null;
    displayableName: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(user?.displayableName || '');

  useEffect(() => {
    if (user?.token) {
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(authActions.login(data));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [user?.token, dispatch]);

  const handleEditing = () => {
    setNewUsername(user?.displayableName || '');
    setIsEditing(true);
  };

  const changeUsername = async () => {
    try {
      console.log("fetch method PUT changeUserName"); 
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          displayableName: newUsername,
        }),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const data = await response.json();
      dispatch(authActions.login(data));
      setIsEditing(false);
      console.log('Username updated successfully:', data);
    } catch (error) {
      console.error('Failed to change username:', error);
    }
  };

  const handleSaveNewUsername = async () => {
    if (newUsername.trim().length < 2) {
      return;
    }
    try {
      await changeUsername();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save new username:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <h1 className="sr-only">Argent Bank</h1>
        </a>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br/>
            {isEditing ? (
              <input
                className="edit-username-input"
                type="text"
                value={newUsername}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveNewUsername();
                  }
                  if (e.key === "Escape" || e.key === "Esc") {
                    setIsEditing(false);
                  }
                }}
                autoFocus
              />
            ) : (
              `${user?.displayableName || "[Pseudo]"}`
            )}
          !</h1>
          {isEditing ? (
            <button
              className="edit-button edit-button--save"
              onClick={handleSaveNewUsername}>
              Save Name
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditing}>
              Edit Name
            </button>
          )}
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
    </div>
  );
};

export default User;