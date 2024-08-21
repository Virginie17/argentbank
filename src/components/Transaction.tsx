import { FC } from "react";

import Button from "../components/Button";

interface TransactionProps {
  title: string;
  amount: string;
  state: string;
}

const Transaction: FC<TransactionProps> = ({ title, amount, state }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="acount-amount-description">{state}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className="transaction-button" label="View transaction button">
          View transactions
        </Button>
      </div>
    </section>
  );
};

export default Transaction;