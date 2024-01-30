import { Route, Routes } from 'react-router';
import './App.css';
import RegisterForm from './components/RegisterForm';
import StatusPage from './components/StatusPage';
import Login from './components/Login';
import Update from './components/Update';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className='App'>
      <h1 className='text-center white'>Device Registration</h1>
      <Routes>
        <Route path="/" element={<RegisterForm/>} />
        <Route element={<ProtectedRoute isAuthenticated={authenticated} />} >

          <Route path="/status/:id" element={<StatusPage/>} />
          <Route path="/update/:id" element={<Update/>} />

        </Route>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} />
      </Routes>
      {/* <RegisterForm /> */}
    </div>
  );
}

export default App;
