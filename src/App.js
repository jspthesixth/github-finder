import React, { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';

const App = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prevState) => !prevState);
    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);

    const fetchData = async () => {
      const response = await fetch(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await response.json();
      setUserInfo(data);
      setLoading((prevState) => !prevState);
    };

    fetchData();

    return () => {
      setUserInfo([]);
    };
  }, []);

  return (
    <div className='app'>
      <Navbar />
      <div className='container'>
        <Users loading={loading} users={userInfo} />
      </div>
    </div>
  );
};

export default App;
