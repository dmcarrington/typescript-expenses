import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import UserDashboard from './UserDashboard';
import LoginForm from './LoginForm';


function App() {
  const [user, setUser] = useState("")
  return (
    <div className="App">
      <h1>Expenses Demo App</h1>
      {user ? (
        <UserDashboard user={user} setUser={setUser} />
      ) : (
          <LoginForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
