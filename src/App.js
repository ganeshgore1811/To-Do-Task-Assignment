import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Transfers from './pages/Transfers';
import Payments from './pages/Payments';
import Profile from './pages/Profile';

function App() {
  const [accounts, setAccounts] = useState([
    { 
      id: 1, 
      name: 'Sajan Hirave', 
      number: '4832', 
      balance: 12540.50, 
      currency: 'USD', 
      type: 'Checking',
      isActive: true
    },
    { 
      id: 2, 
      name: 'Ramesh More', 
      number: '7641', 
      balance: 32500.75, 
      currency: 'USD', 
      type: 'Savings',
      isActive: true
    },
    { 
      id: 3, 
      name: 'Smith Hande', 
      number: '2198', 
      balance: 87500.00, 
      currency: 'USD', 
      type: 'Investment',
      isActive: true
    },
    { 
      id: 4, 
      name: 'Goraksh Javale', 
      number: '5521', 
      balance: -1250.30, 
      currency: 'USD', 
      type: 'Credit',
      isActive: true
    },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Store', amount: -85.40, date: '2024-01-15', type: 'debit', category: 'Shopping', accountId: 1 },
    { id: 2, description: 'Salary Deposit', amount: 4500.00, date: '2024-01-10', type: 'credit', category: 'Income', accountId: 1 },
    { id: 3, description: 'Online Shopping', amount: -120.30, date: '2024-01-08', type: 'debit', category: 'Shopping', accountId: 1 },
    { id: 4, description: 'Utility Bill', amount: -150.75, date: '2024-01-05', type: 'debit', category: 'Bills', accountId: 1 },
    { id: 5, description: 'Stock Dividend', amount: 245.50, date: '2024-01-03', type: 'credit', category: 'Investment', accountId: 3 },
  ]);

  const [transfers, setTransfers] = useState([
    { id: 1, fromAccount: 'Main Checking', toAccount: 'Jane Smith', amount: 500.00, date: '2024-01-12', status: 'Completed' },
    { id: 2, fromAccount: 'Main Checking', toAccount: 'Rent Payment', amount: 1200.00, date: '2024-01-05', status: 'Completed' },
  ]);

  const [bills, setBills] = useState([
    { id: 1, name: 'Electricity Bill', provider: 'Power Company', amount: 85.50, dueDate: '2024-01-20', status: 'pending', icon: 'Home' },
    { id: 2, name: 'Internet Bill', provider: 'NetConnect', amount: 65.00, dueDate: '2024-01-25', status: 'pending', icon: 'Wifi' },
    { id: 3, name: 'Credit Card', provider: 'BankCard', amount: 450.00, dueDate: '2024-01-30', status: 'pending', icon: 'CreditCard' },
  ]);

  const [user, setUser] = useState({
    firstName: 'Ganesh',
    lastName: 'Gore',
    email: 'ganesh@gmail.com',
    phone: '8857892345',
    address: 'karvenagar',
    memberSince: '2020'
  });

  const addAccount = (newAccount) => {
    const account = {
      ...newAccount,
      id: accounts.length + 1,
      isActive: true
    };
    setAccounts([...accounts, account]);
  };


  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([newTransaction, ...transactions]);
  };


  const transferMoney = (transferData) => {
    const { fromAccountId, toAccountNumber, amount, description } = transferData;
    

    const updatedAccounts = accounts.map(account => {
      if (account.id === fromAccountId) {
        return { ...account, balance: account.balance - amount };
      }
      return account;
    });


    const newTransaction = {
      id: transactions.length + 1,
      description: `Transfer to ${toAccountNumber}`,
      amount: -amount,
      date: new Date().toISOString().split('T')[0],
      type: 'debit',
      category: 'Transfer',
      accountId: fromAccountId
    };

    setAccounts(updatedAccounts);
    setTransactions([newTransaction, ...transactions]);


    const fromAccount = accounts.find(acc => acc.id === fromAccountId);
    const newTransfer = {
      id: transfers.length + 1,
      fromAccount: fromAccount.name,
      toAccount: toAccountNumber,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      description
    };
    setTransfers([newTransfer, ...transfers]);
  };

  const payBill = (billId) => {
    const updatedBills = bills.map(bill => 
      bill.id === billId ? { ...bill, status: 'paid' } : bill
    );
    

    const bill = bills.find(b => b.id === billId);
    const newTransaction = {
      id: transactions.length + 1,
      description: `Bill Payment - ${bill.name}`,
      amount: -bill.amount,
      date: new Date().toISOString().split('T')[0],
      type: 'debit',
      category: 'Bills',
      accountId: 1 
    };


    const updatedAccounts = accounts.map(account => {
      if (account.id === 1) {
        return { ...account, balance: account.balance - bill.amount };
      }
      return account;
    });

    setBills(updatedBills);
    setAccounts(updatedAccounts);
    setTransactions([newTransaction, ...transactions]);
  };

  const updateUserProfile = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar user={user} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  accounts={accounts} 
                  transactions={transactions.slice(0, 5)}
                  user={user}
                />
              } />
              <Route path="/accounts" element={
                <Accounts 
                  accounts={accounts} 
                  onAddAccount={addAccount}
                />
              } />
              <Route path="/transactions" element={
                <Transactions 
                  transactions={transactions}
                  accounts={accounts}
                  onAddTransaction={addTransaction}
                />
              } />
              <Route path="/transfers" element={
                <Transfers 
                  accounts={accounts}
                  transfers={transfers}
                  onTransfer={transferMoney}
                />
              } />
              <Route path="/payments" element={
                <Payments 
                  bills={bills}
                  onPayBill={payBill}
                />
              } />
              <Route path="/profile" element={
                <Profile 
                  user={user}
                  onUpdateProfile={updateUserProfile}
                />
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;