import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { UsersProvider } from './context/usersContext';

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <UsersProvider>
        <Routes>
          <Route path="/" element={<StatisticsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
