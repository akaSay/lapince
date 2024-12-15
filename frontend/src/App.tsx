import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics } from "./components/analytics/GoogleAnalytics";
import PrivateRoute from "./components/auth/PrivateRoute";
import { LandingPage } from "./components/landing/LandingPage";
import Layout from "./components/layout/Layout";
import { Loading } from "./components/ui/loading";
import { FilterProvider } from "./contexts/FilterContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";

// Lazy loading des pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Budget = lazy(() => import("./pages/Budget"));
const Settings = lazy(() => import("./pages/Settings"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Reports = lazy(() => import("./pages/Reports"));
const Profile = lazy(() => import("./pages/Profile"));

export const App = () => {
  return (
    <ThemeProvider>
      <FilterProvider>
        <ProfileProvider>
          <BrowserRouter>
            <GoogleAnalytics />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPassword />}
              />

              {/* Routes protégées */}
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Dashboard />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/transactions"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Transactions />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/budget"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Budget />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/reports"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Reports />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Profile />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/settings"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Settings />
                            </Suspense>
                          }
                        />
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
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        </ProfileProvider>
      </FilterProvider>
    </ThemeProvider>
  );
};
