# 🎬 ScenePass — Full-Stack Entertainment & Ticket Booking Platform

ScenePass is a full-stack web application designed for discovering and booking tickets for **Movies, Live Concerts, Theatre Plays, Sports Events, and Local Activities**.

Built with an original brand identity (Dark Charcoal `#0B0F17` base, Electric Emerald `#10B981` & Cyber Cyan `#06B6D4` accents, rounded glassmorphism cards, and modern typography), ScenePass provides a fast, responsive user workflow for ticketing.

---

## 🚀 Key Features

1. **Location Selection**: Switch cities (**Jaipur, Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Chennai**) with automatic persistence and location-based showtime filtering.
2. **Hero Spotlight Carousel**: Auto-rotating cinematic banners with trailer player triggers.
3. **Interactive Seat Selection Engine**: Curved cinema screen visualization, seat categories (**VIP, Premium, Regular**), seat reservation status, and real-time fee calculation.
4. **Multi-Category Booking Workflows**:
   - 🍿 **Movies**: Now Showing, Coming Soon, Genre tags, IMDb ratings, Cast & Crew details.
   - 🎸 **Events**: Concerts, Comedy shows, Workshops, Festivals.
   - 🎭 **Plays**: Theatre, Musicals, Stand-up.
   - ⚽ **Sports**: Cricket derby matches, Marathons.
   - 🎈 **Activities**: Hot air balloon safaris, Theme parks.
5. **Global Search & Filter**: Real-time auto-suggestions as you type, and dedicated search results page.
6. **Payment Gateway Sandbox**: Simulated payments supporting **UPI (with QR Code)**, **Credit/Debit Card**, **Net Banking**, and **Wallets** with festive confetti celebration.
7. **Digital Pass & QR Tickets**: Printable/downloadable e-tickets with unique Booking IDs and scannable QR codes.
8. **User Reviews & Ratings**: Submit ratings (1–5 stars) and comments on movies and events.
9. **Saved Favorites**: Bookmark movies and events across browsing sessions.
10. **Admin Dashboard**: Revenue charts, booking logs, user accounts, and CRUD modals to add/edit/delete movies & events.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router DOM v6, Tailwind CSS, Lucide Icons, Canvas Confetti, QR Code Generator (`qrcode.react`), Axios.
- **Backend**: Node.js, Express.js, Mongoose / MongoDB (with embedded fallback data adapter for instant zero-configuration runtime).
- **Authentication**: JWT (JSON Web Tokens), bcryptjs password hashing, localStorage persistence.

---

## 🔑 Demo Credentials

To test the platform immediately:

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Regular User** | `user@scenepass.com` | `scenepass123` | Ticket booking, Reviews, Favorites, My Bookings |
| **Admin Director** | `admin@scenepass.com` | `scenepass123` | Admin Dashboard, Analytics, Movie & Event CRUD |

*Note: Quick demo buttons are available on the Sign In page for one-click access.*

---

## 📦 Project Structure

```
bookMyShow/
├── backend/
│   ├── config/          # Database connector & fallback
│   ├── controllers/     # Auth, Movies, Cinemas, Shows, Bookings, Admin controllers
│   ├── middleware/      # JWT Protect & Admin Authorization
│   ├── models/          # Mongoose Schemas (User, Movie, Cinema, Show, Booking, etc.)
│   ├── routes/          # REST API Endpoints
│   ├── seed/            # Pre-seeded realistic dataset
│   ├── store.js         # High-performance state store
│   └── server.js        # Express API Server
│
└── frontend/
    ├── public/
    └── src/
        ├── components/  # Navbar, HeroBanner, MovieCard, EventCard, SeatGrid, PaymentModal, LocationModal
        ├── context/     # AuthContext, CityContext, FavoritesContext
        ├── pages/       # Home, Movies, Details, Showtimes, SeatSelection, Checkout, Confirmation, Admin
        ├── services/    # Axios API client
        └── App.jsx      # Router & Provider wrapper
```

---

## ⚡ Quick Start Guide

### 1. Run Backend Server
```bash
cd backend
npm install
npm start
```
*The server will start on `http://localhost:5000`.*

### 2. Run Frontend App
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:3000` in your browser.*
