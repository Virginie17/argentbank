import React, { useState } from "react";

interface EditFormProps {
  id: number;
  name: string;
  amount: number;
  onEdit: (id: number, name: string, amount: number) => void;
}

const EditForm = ({ id, name, amount, onEdit }: EditFormProps) => {
  const [newName, setNewName] = useState(name);
  const [newAmount, setNewAmount] = useState(amount);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEdit(id, newName, newAmount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <input
        type="number"
        value={newAmount}
        onChange={(event) => setNewAmount(Number(event.target.value))}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;