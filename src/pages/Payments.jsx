import React, { useState } from 'react';

const Payments = ({ bills, onPayBill }) => {
  const [activeTab, setActiveTab] = useState('bills');

  const getIcon = (iconName) => {
    const icons = {
      Home: (
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      Wifi: (
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      CreditCard: (
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    };
    return icons[iconName];
  };

  const pendingBills = bills.filter(bill => bill.status === 'pending');
  const paidBills = bills.filter(bill => bill.status === 'paid');

  const handlePayBill = (billId) => {
    if (window.confirm('Are you sure you want to pay this bill?')) {
      onPayBill(billId);
      alert('Bill paid successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Bill Payments</h1>

      <div className="bg-white rounded-xl shadow border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('bills')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'bills'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Bills ({pendingBills.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment History ({paidBills.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'bills' && (
            <div className="space-y-4">
              {pendingBills.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No pending bills</p>
              ) : (
                pendingBills.map(bill => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        {getIcon(bill.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                        <p className="text-sm text-gray-500">{bill.provider}</p>
                        <p className="text-sm text-red-600">Due: {bill.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${bill.amount.toFixed(2)}</p>
                      <button 
                        onClick={() => handlePayBill(bill.id)}
                        className="mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {paidBills.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No payment history</p>
              ) : (
                paidBills.map(bill => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-green-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        {getIcon(bill.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                        <p className="text-sm text-gray-500">{bill.provider}</p>
                        <p className="text-sm text-green-600">Paid on {bill.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 line-through">${bill.amount.toFixed(2)}</p>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Paid
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;