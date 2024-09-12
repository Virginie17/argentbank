import { FC, useState, useEffect, ChangeEvent } from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import EditUserForm from '../components/EditUserForm';
import AccountSection from '../components/AccountSection';


const User: FC = () => {
  const dispatch = useDispatch(); // Utilisation du hook useDispatch pour dispatcher des actions Redux
  const user = useSelector((state: RootState) => state.auth?.user) as {
    token: string | null;
    id: string | null;
    displayableName: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  }; // Utilisation du hook useSelector pour accéder à l'état utilisateur dans le store Redux

  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    userName: user?.displayableName || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  }); 
  useEffect(() => {
    const fetchUserData = async (token: string) => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        dispatch(authActions.getProfile(data.body)); 
      } catch (error) {
        console.error(error);
      }
    };
    if (user?.token) fetchUserData(user.token); 
  }, [user?.token, dispatch]);

  useEffect(() => setFormData({
    userName: user?.displayableName || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  }), [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => formData.userName.trim().length >= 2 && formData.firstName.trim().length >= 2 && formData.lastName.trim().length >= 2;

  const handleSave = async () => {
    if (!validateForm()) return; 
    try {
      await updateUserData(); 
      setIsEditing(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserData = async () => {
    if (!user?.token) return; 
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      dispatch(authActions.getProfile(data.body)); // Mise à jour du store Redux avec les nouvelles données utilisateur
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
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
            <EditUserForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <h1>Welcome back <br />{user?.displayableName || "[Username]"}!</h1>
              <button className="edit-button" onClick={handleEdit}>Edit Name</button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <AccountSection title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <AccountSection title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <AccountSection title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
    </div>
  );
};

export default User;