import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const AccountCard = ({ account }) => {
  const [showBalance, setShowBalance] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
          <p className="text-gray-600 text-sm">{account.number}</p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-gray-500 hover:text-gray-700"
        >
          {showBalance ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">
          {showBalance ? `$${account.balance.toLocaleString()}` : '•••••'}
        </p>
        <p className="text-green-600 text-sm font-medium">{account.currency}</p>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>Available Balance</span>
        <span>{account.type}</span>
      </div>
    </div>
  );
};

export default AccountCard;