import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';

function sample() {
  const authUser = useAuthStore(state => state.authUser);
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/signup' element={<Signup /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/settings' element={<Settings /> } />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default sample;