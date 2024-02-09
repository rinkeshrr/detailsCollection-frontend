import { Navigate, Route, Routes } from 'react-router';
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
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={authenticated} />} >

          <Route path="/register/:id" element={<RegisterForm/>} />
          <Route path="/status/:id" element={<StatusPage/>} />
          <Route path="/update/:id/:objId" element={<Update/>} />

        </Route>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} />
        <Route path="/" element={<Navigate to="/login" replace />}/>
      </Routes>
      {/* <RegisterForm /> */}
    </div>
  );
}

export default App;
