import { FC, ChangeEvent } from 'react';

interface EditUserFormProps {
  formData: {
    userName: string;
    firstName: string;
    lastName: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const EditUserForm: FC<EditUserFormProps> = ({ formData, handleInputChange, handleSave, handleCancel }) => {
  return (
    <div className="edit-user-info-container">
      <div className="edit-user-info">
        <h1>Edit user info</h1>
        {(['userName', 'firstName', 'lastName'] as const).map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}:</label>
            <input
              className="edit-username-input"
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              readOnly={field !== 'userName'}
              autoFocus={field === 'userName'}
            />
          </div>
        ))}
      </div>
      <div className="edit-button-container">
        <button className="edit-button edit-button--save" onClick={handleSave}>Save</button>
        <button className="edit-button edit-button--cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditUserForm;