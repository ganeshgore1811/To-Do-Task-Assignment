import React, { useState } from 'react';

const Transfers = ({ accounts, transfers, onTransfer }) => {
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toAccountNumber: '',
    amount: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fromAccountId && formData.toAccountNumber && formData.amount) {
      onTransfer({
        fromAccountId: parseInt(formData.fromAccountId),
        toAccountNumber: formData.toAccountNumber,
        amount: parseFloat(formData.amount),
        description: formData.description || `Transfer to ${formData.toAccountNumber}`
      });
      setFormData({
        fromAccountId: '',
        toAccountNumber: '',
        amount: '',
        description: ''
      });
      alert('Transfer completed successfully!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedAccount = accounts.find(acc => acc.id === parseInt(formData.fromAccountId));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Money Transfer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Form */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">New Transfer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Account
              </label>
              <select
                name="fromAccountId"
                value={formData.fromAccountId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select account</option>
                {accounts.filter(acc => acc.isActive && acc.balance > 0).map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} (****{account.number}) - ${account.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {selectedAccount && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  Available balance: <strong>${selectedAccount.balance.toLocaleString()}</strong>
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Account Number
              </label>
              <input
                type="text"
                name="toAccountNumber"
                value={formData.toAccountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                step="0.01"
                max={selectedAccount ? selectedAccount.balance : undefined}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Transfer description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.fromAccountId || !formData.toAccountNumber || !formData.amount}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Transfer Money
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transfers</h2>
          <div className="space-y-4">
            {transfers.slice(0, 5).map(transfer => (
              <div key={transfer.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">To: {transfer.toAccount}</p>
                  <p className="text-sm text-gray-500">{transfer.date}</p>
                  {transfer.description && (
                    <p className="text-sm text-gray-600">{transfer.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">-${transfer.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transfer.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transfer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;