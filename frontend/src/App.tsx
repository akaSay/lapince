import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Layout from "./components/layout/Layout";
import { FilterProvider } from "./contexts/FilterContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FilterProvider>
        <ProfileProvider>
          <BrowserRouter>
            <Routes>
              {/* Routes publiques */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Routes protégées */}
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Routes>
                        <Route
                          path="/"
                          element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                          path="/transactions"
                          element={<Transactions />}
                        />
                        <Route path="/budget" element={<Budget />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route
                          path="*"
                          element={<Navigate to="/dashboard" replace />}
                        />
                      </Routes>
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ProfileProvider>
      </FilterProvider>
    </ThemeProvider>
  );
};

export default App;
