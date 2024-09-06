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
  const [formData, setFormData] = useState<{
    userName: string;
    firstName: string;
    lastName: string;
  }>({
    userName: user?.displayableName || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      try {
        console.log("API Request: Fetching user data with token:", token);
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        console.log("User data fetched successfully:", data);
        dispatch(authActions.getProfile(data.body));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user?.token) {
      console.log("Fetching user data...");
      fetchUserData(user.token);
    } else {
      console.log("User token not found");
    }
  }, [user?.token, dispatch]);

  useEffect(() => {
    console.log("User data updated:", user);
    setFormData({
      userName: user?.displayableName || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    });
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Input change detected:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!validateForm()) {
      console.log("Form validation failed:", formData);
      return;
    }

    try {
      console.log("Saving user data:", formData);
      await updateUserData();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };
  

  const updateUserData = async () => {
    console.log(formData)
  }
  const validateForm = () => {
    const isValid = formData.userName.trim().length >= 2 &&
                    formData.firstName.trim().length >= 2 &&
                    formData.lastName.trim().length >= 2;

    console.log("Form validation result:", isValid);
    return isValid;
  };

  const handleEdit = () => {
    console.log("Edit mode activated");
    setIsEditing(true);
    setFormData({
      userName: user?.displayableName || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    });
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
          {isEditing ? (
            <div className="edit-user-info-container">
              <div className="edit-user-info">
                <h1>Edit user info</h1>
                {(['username', 'firstName', 'lastName'] as const).map((field) => (
                  <div key={field}>
                    <label htmlFor={field}>{field}:</label>
                    <input
                      className="edit-username-input"
                      type="text"
                      name={field}
                      value={formData[field === 'username' ? 'userName' : field]}
                      onChange={handleInputChange}
                      readOnly={field !== 'username'}
                      autoFocus={field === 'username'}
                    />
                  </div>
                ))}
              </div>
              <div className="edit-button-container">
                <button className="edit-button edit-button--save" onClick={handleSave}>
                  Save
                </button>
                <button className="edit-button edit-button--cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1>Welcome back <br />{user?.displayableName || "[Username]"}!</h1>
              <button className="edit-button" onClick={handleEdit}>Edit Name</button>
            </>
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