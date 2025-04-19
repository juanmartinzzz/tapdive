import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NewTapScreen from './screens/NewTapScreen/NewTapScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { SpaceProvider } from './contexts/SpaceContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TapScreen from './screens/TapScreen/TapScreen';
import AppLayout from './components/layout/AppLayout';
import NewSpaceScreen from './screens/NewSpaceScreen/NewSpaceScreen';
import SpaceScreen from './screens/SpaceScreen/SpaceScreen';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SpaceProvider>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />

            <Route path="/signup" element={<SignupScreen />} />

            <Route
              path="/"
              element={
                <div className="test">
                  <Sidebar />
                  <div className="test">
                    <Header />
                    <HomeScreen />
                  </div>
                </div>
              }
            />

            <Route
              path="/tap/:tapId"
              element={
                <AppLayout>
                  <TapScreen />
                </AppLayout>
              }
            />

            <Route
              path="/new-tap"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <NewTapScreen />
                  </AppLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/new-space"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <NewSpaceScreen />
                  </AppLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/space/:spaceId"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <SpaceScreen />
                  </AppLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </SpaceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
