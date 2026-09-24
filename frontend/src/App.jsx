import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import ShowtimesPage from './pages/ShowtimesPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import EventsPage from './pages/EventsPage';
import PlaysPage from './pages/PlaysPage';
import SportsPage from './pages/SportsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { CityProvider } from './context/CityContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Protected Admin Route wrapper
const ProtectedAdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100 font-sans selection:bg-emerald-500 selection:text-black">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<MoviesPage />} />
                  <Route path="/movie/:id" element={<MovieDetailsPage />} />
                  <Route path="/movie/:id/shows" element={<ShowtimesPage />} />
                  <Route path="/show/:id/seats" element={<SeatSelectionPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/confirmation/:id" element={<ConfirmationPage />} />

                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:id" element={<EventsPage />} />
                  <Route path="/plays" element={<PlaysPage />} />
                  <Route path="/plays/:id" element={<PlaysPage />} />
                  <Route path="/sports" element={<SportsPage />} />
                  <Route path="/sports/:id" element={<SportsPage />} />
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/activities/:id" element={<ActivitiesPage />} />

                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  <Route
                    path="/admin"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboardPage />
                      </ProtectedAdminRoute>
                    }
                  />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
