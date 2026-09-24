const store = require('../store');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = store.users.length;
    const totalBookings = store.bookings.length;
    const totalMovies = store.movies.length;
    const totalEvents = store.events.length + store.plays.length + store.sports.length + store.activities.length;
    
    const totalRevenue = store.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const analytics = [
      { month: 'May', revenue: 145000, bookings: 280 },
      { month: 'Jun', revenue: 192000, bookings: 360 },
      { month: 'Jul', revenue: 230000, bookings: 440 },
      { month: 'Aug', revenue: 310000, bookings: 580 },
      { month: 'Sep', revenue: 425000, bookings: 790 }
    ];

    res.json({
      stats: {
        totalUsers,
        totalBookings,
        totalMovies,
        totalEvents,
        totalRevenue
      },
      analytics,
      recentBookings: store.bookings.slice(0, 5),
      recentUsers: store.users.map(({ password, ...u }) => u)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const safeUsers = store.users.map(({ password, ...u }) => u);
    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    res.json(store.bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardStats, getAllUsers, getAllBookings };
