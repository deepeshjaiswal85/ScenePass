// ScenePass High-Performance In-Memory & DB Data Adapter
// Ensures instant, zero-configuration backend execution with pre-populated demo data

const initialMovies = [
  {
    _id: "m1",
    title: "Cyberpunk 2099: Neon Horizon",
    slug: "cyberpunk-2099",
    tagline: "The Future Is Code. Freedom Is The Glitch.",
    description: "In a sprawling mega-city ruled by neural syndicates, a rogue netrunner unravels a secret that could restart human consciousness or erase it forever.",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Sci-Fi", "Action", "Thriller"],
    languages: ["Hindi", "English", "Telugu", "Tamil"],
    formats: ["2D", "3D", "IMAX 3D", "4DX"],
    durationMinutes: 154,
    releaseDate: "2026-09-18",
    rating: 4.8,
    votesCount: 14200,
    certification: "UA",
    director: "Anya Vance",
    cast: [
      { name: "Dev Patel", role: "Kaelen Voss", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
      { name: "Florence Pugh", role: "Sora Dax", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
      { name: "Manoj Bajpayee", role: "Commander Thorne", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    startingPrice: 250,
    featured: true
  },
  {
    _id: "m2",
    title: "Shadows of Rajasthan",
    slug: "shadows-of-rajasthan",
    tagline: "Legends Live in the Desert Dust.",
    description: "An ancient royal key surfaces during a festival in Jaisalmer, triggering a high-stakes race through forgotten forts and hidden subterranean passages.",
    posterUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Adventure", "Mystery", "Drama"],
    languages: ["Hindi", "Rajasthani"],
    formats: ["2D", "IMAX"],
    durationMinutes: 138,
    releaseDate: "2026-09-12",
    rating: 4.6,
    votesCount: 8900,
    certification: "U",
    director: "Vikramaditya Motwane",
    cast: [
      { name: "Ranbir Kapoor", role: "Ranveer Singh Rathore", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80" },
      { name: "Sobhita Dhulipala", role: "Meera Bai", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Jaipur", "Delhi", "Mumbai", "Pune"],
    startingPrice: 200,
    featured: true
  },
  {
    _id: "m3",
    title: "Starlight Velocity",
    slug: "starlight-velocity",
    tagline: "Beyond speed lies survival.",
    description: "The interstellar grand prix pits galactic pilots against unstable gravity wells and hidden saboteurs across six solar systems.",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Sci-Fi", "Action"],
    languages: ["English", "Hindi"],
    formats: ["3D", "IMAX 3D", "4DX"],
    durationMinutes: 145,
    releaseDate: "2026-09-20",
    rating: 4.7,
    votesCount: 11000,
    certification: "UA",
    director: "Christopher Nolan",
    cast: [
      { name: "John David Washington", role: "Ace Pilot Vance", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" },
      { name: "Zendaya", role: "Lyra Starling", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai"],
    startingPrice: 300,
    featured: true
  },
  {
    _id: "m4",
    title: "Kingdom of Ashes",
    slug: "kingdom-of-ashes",
    tagline: "Thrones crumble. Honor endures.",
    description: "An epic medieval fantasy of broken alliances, ancient dragons, and a forgotten heir rising from the northern wastes.",
    posterUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Fantasy", "Action", "Drama"],
    languages: ["Hindi", "English", "Telugu", "Kannada"],
    formats: ["2D", "3D"],
    durationMinutes: 162,
    releaseDate: "2026-09-05",
    rating: 4.5,
    votesCount: 9400,
    certification: "UA",
    director: "S.S. Rajamouli",
    cast: [
      { name: "Prabhas", role: "Prince Amarendra", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    startingPrice: 220,
    featured: false
  },
  {
    _id: "m5",
    title: "Chai & Conversations",
    slug: "chai-and-conversations",
    tagline: "Love happens when least expected.",
    description: "Two strangers stranded at a charming Old Delhi tea shop during an unexpected monsoon evening discover life-changing connections.",
    posterUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Romance", "Comedy"],
    languages: ["Hindi"],
    formats: ["2D"],
    durationMinutes: 120,
    releaseDate: "2026-09-14",
    rating: 4.4,
    votesCount: 6100,
    certification: "U",
    director: "Zoya Akhtar",
    cast: [
      { name: "Ayushmann Khurrana", role: "Kabir", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80" },
      { name: "Sanya Malhotra", role: "Ananya", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Pune"],
    startingPrice: 180,
    featured: false
  },
  {
    _id: "m6",
    title: "Chronicles of Titan: Rebirth",
    slug: "chronicles-of-titan",
    tagline: "The Titan awakens in October.",
    description: "Humanity's first colony on Saturn's moon Titan faces a planetary cataclysm when ancient alien monoliths reactivate.",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Sci-Fi", "Mystery"],
    languages: ["English", "Hindi"],
    formats: ["3D", "IMAX 3D"],
    durationMinutes: 150,
    releaseDate: "2026-10-15",
    rating: 4.9,
    votesCount: 200,
    certification: "UA",
    director: "Denis Villeneuve",
    cast: [
      { name: "Timothée Chalamet", role: "Leo Vance", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "coming_soon",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    startingPrice: 280,
    featured: true
  },
  {
    _id: "m7",
    title: "The Golden Heist",
    slug: "the-golden-heist",
    tagline: "Rule #1: Trust Nobody.",
    description: "A mastermind crew attempts to infiltrate the world's most guarded vault floating in international waters during a super-yacht gala.",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Action", "Crime", "Thriller"],
    languages: ["Hindi", "English"],
    formats: ["2D", "4DX"],
    durationMinutes: 132,
    releaseDate: "2026-10-02",
    rating: 4.5,
    votesCount: 340,
    certification: "UA",
    director: "Farhan Akhtar",
    cast: [
      { name: "Hrithik Roshan", role: "Arya", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "coming_soon",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru"],
    startingPrice: 240,
    featured: false
  },
  {
    _id: "m8",
    title: "Pulse of Mumbai",
    slug: "pulse-of-mumbai",
    tagline: "10 Million Stories. One Rhythm.",
    description: "An uplifting musical drama celebrating underdog underground hip-hop artists collaborating across the gullies of Dharavi.",
    posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Drama", "Music"],
    languages: ["Hindi", "Marathi"],
    formats: ["2D"],
    durationMinutes: 128,
    releaseDate: "2026-09-10",
    rating: 4.7,
    votesCount: 7800,
    certification: "UA",
    director: "Zoya Akhtar",
    cast: [
      { name: "Ranveer Singh", role: "MC Blaze", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Mumbai", "Pune", "Delhi", "Jaipur"],
    startingPrice: 190,
    featured: false
  },
  {
    _id: "m9",
    title: "Quantum Paradox",
    slug: "quantum-paradox",
    tagline: "Time is a fragile mirror.",
    description: "A theoretical physicist discovers how to communicate with her alternate self, only to destabilize the fabric of present reality.",
    posterUrl: "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["Sci-Fi", "Thriller"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX"],
    durationMinutes: 140,
    releaseDate: "2026-09-01",
    rating: 4.6,
    votesCount: 10400,
    certification: "UA",
    director: "Alex Garland",
    cast: [
      { name: "Natalie Portman", role: "Dr. Elena Vance", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "now_showing",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad"],
    startingPrice: 260,
    featured: false
  },
  {
    _id: "m10",
    title: "Tales of the Silk Road",
    slug: "tales-of-the-silk-road",
    tagline: "An Odyssey Across Continents.",
    description: "A visually breathtaking saga following merchants, scholars, and swordsmen traveling through 14th-century Central Asia.",
    posterUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1476514525535-ce74f458177d?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    genres: ["History", "Drama", "Adventure"],
    languages: ["Hindi", "English"],
    formats: ["2D", "IMAX"],
    durationMinutes: 158,
    releaseDate: "2026-10-25",
    rating: 4.8,
    votesCount: 150,
    certification: "U",
    director: "Ashutosh Gowariker",
    cast: [
      { name: "Vicky Kaushal", role: "Tariq Khan", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" }
    ],
    status: "coming_soon",
    cities: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai"],
    startingPrice: 230,
    featured: true
  }
];

const initialCinemas = [
  { _id: "c1", name: "ScenePass Luxe Multiplex - World Trade Park", city: "Jaipur", address: "WTP South Block, Malviya Nagar", landmark: "Near Gaurav Tower", facilities: ["Recliners", "Dolby Atmos", "Gourmet F&B", "Valet Parking"], formats: ["2D", "3D", "IMAX 3D"], rating: 4.9 },
  { _id: "c2", name: "ScenePass Cineplex - Raj Mandir Precinct", city: "Jaipur", address: "Bhagwan Das Road, C Scheme", landmark: "Near Panch Batti", facilities: ["Heritage Lounge", "Dolby Digital 7.1", "Popcorn Bar"], formats: ["2D"], rating: 4.8 },
  { _id: "c3", name: "ScenePass Grand - Select CITYWALK", city: "Delhi", address: "A-3 District Centre, Saket", landmark: "Saket Metro Station", facilities: ["VIP Recliners", "Laser Projection", "Atmos 360"], formats: ["2D", "3D", "IMAX 3D", "4DX"], rating: 4.9 },
  { _id: "c4", name: "ScenePass Pavilion - Connaught Place", city: "Delhi", address: "Block B, Inner Circle", landmark: "Rajiv Chowk Gate 2", facilities: ["Classic Balcony", "Dolby Surround", "Snack Bar"], formats: ["2D", "3D"], rating: 4.7 },
  { _id: "c5", name: "ScenePass Crown - Phoenix Palladium", city: "Mumbai", address: "462 Senapati Bapat Marg, Lower Parel", landmark: "High Street Phoenix", facilities: ["Director's Cut Lounge", "IMAX Laser", "Butler Service"], formats: ["2D", "3D", "IMAX 3D", "4DX"], rating: 4.9 },
  { _id: "c6", name: "ScenePass Iconic - Juhu Beachfront", city: "Mumbai", address: "Juhu Tara Road", landmark: "Opposite JW Marriott", facilities: ["Oceanview Café", "Dolby Atmos", "Recliners"], formats: ["2D", "3D"], rating: 4.8 },
  { _id: "c7", name: "ScenePass Zenith - UB City", city: "Bengaluru", address: "24 Vittal Mallya Road", landmark: "UB City Mall", facilities: ["Luxury Gold Class", "Dolby Atmos", "Wine & Dine"], formats: ["2D", "3D", "IMAX 3D"], rating: 4.9 },
  { _id: "c8", name: "ScenePass Arena - Forum Mall Koramangala", city: "Bengaluru", address: "Hosur Road, Koramangala", landmark: "Checkpost Junction", facilities: ["4DX Motion Seats", "Dolby 7.1"], formats: ["2D", "3D", "4DX"], rating: 4.7 },
  { _id: "c9", name: "ScenePass Epic - Inorbit Mall Hitec City", city: "Hyderabad", address: "Mindspace IT Park, Madhapur", landmark: "Durgam Cheruvu", facilities: ["Large Format Screen", "Dolby Atmos"], formats: ["2D", "3D", "IMAX 3D"], rating: 4.8 },
  { _id: "c10", name: "ScenePass Starlight - Phoenix Marketcity", city: "Pune", address: "Viman Nagar, Nagar Road", landmark: "Near Clover Park", facilities: ["Plush Seats", "Gourmet Snacks"], formats: ["2D", "3D"], rating: 4.7 },
  { _id: "c11", name: "ScenePass Heritage - Express Avenue", city: "Chennai", address: "Whites Road, Royapettah", landmark: "Near Anna Salai", facilities: ["Dolby Atmos 64 Ch", "Comfort Seating"], formats: ["2D", "3D", "IMAX 3D"], rating: 4.8 }
];

const initialShows = [
  { _id: "s1", movieId: "m1", cinemaId: "c1", date: "Today", startTime: "10:30 AM", format: "IMAX 3D", language: "Hindi", pricing: { regular: 250, premium: 380, vip: 550 }, bookedSeats: ["A3", "A4", "C5", "C6", "E1"] },
  { _id: "s2", movieId: "m1", cinemaId: "c1", date: "Today", startTime: "02:15 PM", format: "IMAX 3D", language: "English", pricing: { regular: 280, premium: 420, vip: 600 }, bookedSeats: ["B2", "B3", "D4"] },
  { _id: "s3", movieId: "m1", cinemaId: "c1", date: "Today", startTime: "06:45 PM", format: "3D", language: "Hindi", pricing: { regular: 260, premium: 400, vip: 580 }, bookedSeats: ["F1", "F2", "F3"] },
  { _id: "s4", movieId: "m1", cinemaId: "c1", date: "Today", startTime: "10:15 PM", format: "2D", language: "Hindi", pricing: { regular: 220, premium: 350, vip: 500 }, bookedSeats: [] },
  { _id: "s5", movieId: "m1", cinemaId: "c2", date: "Today", startTime: "11:00 AM", format: "2D", language: "Hindi", pricing: { regular: 200, premium: 300, vip: 450 }, bookedSeats: ["D1", "D2"] },
  { _id: "s6", movieId: "m1", cinemaId: "c2", date: "Today", startTime: "04:30 PM", format: "2D", language: "Hindi", pricing: { regular: 220, premium: 320, vip: 480 }, bookedSeats: [] },
  { _id: "s7", movieId: "m2", cinemaId: "c1", date: "Today", startTime: "01:00 PM", format: "2D", language: "Hindi", pricing: { regular: 200, premium: 320, vip: 480 }, bookedSeats: ["A1"] },
  { _id: "s8", movieId: "m2", cinemaId: "c2", date: "Today", startTime: "07:15 PM", format: "2D", language: "Hindi", pricing: { regular: 180, premium: 280, vip: 420 }, bookedSeats: [] },
  { _id: "s9", movieId: "m3", cinemaId: "c1", date: "Today", startTime: "03:30 PM", format: "IMAX 3D", language: "English", pricing: { regular: 300, premium: 450, vip: 650 }, bookedSeats: ["C10", "C11"] },
  { _id: "s10", movieId: "m1", cinemaId: "c3", date: "Today", startTime: "05:00 PM", format: "IMAX 3D", language: "Hindi", pricing: { regular: 300, premium: 450, vip: 650 }, bookedSeats: ["B5", "B6"] }
];

const initialEvents = [
  {
    _id: "e1",
    title: "Neon Pulse Music Festival 2026",
    category: "Concerts",
    description: "An electrifying 8-hour electronic dance music festival featuring top international DJs, holographic laser stages, and interactive art installations.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-10",
    time: "04:00 PM - Midnight",
    venue: "JECC Exhibition Grounds, Sitapura",
    city: "Jaipur",
    startingPrice: 1499,
    language: "English / Hindi",
    duration: "8 Hours",
    ageLimit: "18yrs+",
    artists: [
      { name: "DJ Nucleya", role: "Headliner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
      { name: "Lost Frequencies", role: "Special Guest", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" }
    ],
    ticketTiers: [
      { name: "Early Bird General Access", price: 1499, availableSeats: 120 },
      { name: "VIP Fan Pit Pass", price: 3499, availableSeats: 40 },
      { name: "Backstage Ultra Pass", price: 7999, availableSeats: 15 }
    ],
    featured: true,
    rating: 4.9
  },
  {
    _id: "e2",
    title: "Unfiltered: Live Standup by Zakir Khan",
    category: "Comedy",
    description: "Catch India's favorite Sakht Launda live on stage with brand-new stories, heart-warming poetry, and side-splitting humor.",
    imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-04",
    time: "07:30 PM",
    venue: "Birla Auditorium, Statue Circle",
    city: "Jaipur",
    startingPrice: 799,
    language: "Hindi",
    duration: "120 Mins",
    ageLimit: "16yrs+",
    artists: [{ name: "Zakir Khan", role: "Comedian", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80" }],
    ticketTiers: [
      { name: "Silver Section", price: 799, availableSeats: 80 },
      { name: "Gold Section", price: 1299, availableSeats: 50 },
      { name: "Platinum VIP Front Row", price: 2499, availableSeats: 20 }
    ],
    featured: true,
    rating: 4.9
  },
  {
    _id: "e3",
    title: "Delhi Indie Symphony & Jazz Night",
    category: "Concerts",
    description: "An intimate candlelit orchestral performance blending classic jazz standards with iconic Indian indie movie soundscapes.",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-12",
    time: "08:00 PM",
    venue: "Siri Fort Auditorium",
    city: "Delhi",
    startingPrice: 999,
    language: "Instrumental",
    duration: "150 Mins",
    ageLimit: "All Ages",
    ticketTiers: [
      { name: "Balcony Pass", price: 999, availableSeats: 60 },
      { name: "Premium Stalls", price: 1899, availableSeats: 30 }
    ],
    featured: false,
    rating: 4.8
  },
  {
    _id: "e4",
    title: "Pottery & Clay Art Masterclass",
    category: "Workshops",
    description: "Unwind on a Sunday morning learning hand-building and wheel pottery techniques under master ceramic artisans. Supplies included.",
    imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-08",
    time: "10:30 AM",
    venue: "Studio Clay, C-Scheme",
    city: "Jaipur",
    startingPrice: 1200,
    language: "English / Hindi",
    duration: "3 Hours",
    ageLimit: "12yrs+",
    ticketTiers: [{ name: "Single Workshop Pass", price: 1200, availableSeats: 15 }],
    featured: false,
    rating: 4.7
  }
];

const initialPlays = [
  {
    _id: "p1",
    title: "Mughal-e-Azam: The Grand Musical Play",
    category: "Musical",
    description: "The timeless love story of Prince Salim and Anarkali brought alive on stage with lavish costumes, live Kathak performances, and soul-stirring songs.",
    imageUrl: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-18",
    time: "07:00 PM",
    venue: "NCPA Mumbai - Jamshed Bhabha Theatre",
    city: "Mumbai",
    startingPrice: 1500,
    language: "Hindi / Urdu",
    duration: "150 Mins",
    director: "Feroz Abbas Khan",
    rating: 4.9,
    featured: true,
    ticketTiers: [
      { name: "Silver Seats", price: 1500 },
      { name: "Gold Circle", price: 3000 },
      { name: "Royal VIP Box", price: 6500 }
    ]
  },
  {
    _id: "p2",
    title: "Court Martial: A Gripping Military Drama",
    category: "Drama",
    description: "A hard-hitting courtroom thriller exposing deeply entrenched prejudices, honor, and truth inside a army military trial.",
    imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-11",
    time: "06:30 PM",
    venue: "Ravindra Bharathi Auditorium",
    city: "Hyderabad",
    startingPrice: 500,
    language: "Hindi",
    duration: "110 Mins",
    director: "Ranjit Kapoor",
    rating: 4.8,
    featured: false,
    ticketTiers: [
      { name: "General Entry", price: 500 },
      { name: "Front Stalls", price: 900 }
    ]
  }
];

const initialSports = [
  {
    _id: "sp1",
    title: "India vs Australia T20 International Derby",
    category: "Cricket",
    description: "Catch the world champions battle under lights in a high-octane T20 clash packed with boundary sixes and fiery bowling.",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&auto=format&fit=crop&q=80",
    date: "2026-10-22",
    time: "07:00 PM",
    venue: "Sawai Mansingh Stadium, Tonk Road",
    city: "Jaipur",
    startingPrice: 1250,
    ticketTiers: [
      { name: "North Stand", price: 1250, availableSeats: 300 },
      { name: "Pavilion Terrace", price: 3500, availableSeats: 80 },
      { name: "Corporate Hospitality Suite", price: 9999, availableSeats: 20 }
    ],
    featured: true,
    rating: 4.9
  },
  {
    _id: "sp2",
    title: "Bengaluru Midnight Marathon 2026",
    category: "Running",
    description: "Run under the stars along tree-lined boulevards in Bengaluru's iconic annual night run supporting youth sports charities.",
    imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=80",
    date: "2026-11-05",
    time: "10:00 PM",
    venue: "Kanteerava Stadium",
    city: "Bengaluru",
    startingPrice: 850,
    ticketTiers: [
      { name: "10K Run Bib Pass", price: 850, availableSeats: 500 },
      { name: "21K Half Marathon Pass", price: 1400, availableSeats: 250 }
    ],
    featured: false,
    rating: 4.7
  }
];

const initialActivities = [
  {
    _id: "a1",
    title: "Hot Air Balloon Safari over Amber Fort",
    category: "Adventure activities",
    description: "Soar 1,000 feet high as sunrise illuminates the golden palaces, Aravali hills, and heritage lakes of Jaipur. Includes sparkling juice.",
    imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=80",
    city: "Jaipur",
    venue: "Amber Fort Launch Site",
    startingPrice: 6500,
    operatingHours: "06:00 AM - 09:30 AM",
    highlights: ["Aerial Views of Forts", "Certified Pilots", "Buffet Breakfast Included", "Safety Flight Certificate"],
    rating: 4.9,
    ticketTiers: [
      { name: "Standard Flight Pass", price: 6500 },
      { name: "Private Couple Basket Flight", price: 18000 }
    ],
    featured: true
  },
  {
    _id: "a2",
    title: "World of Wonders Theme Park - Day Pass",
    category: "Amusement parks",
    description: "Enjoy over 30 thrilling roller coasters, water slides, wave pools, and live street performances for the ultimate family outing.",
    imageUrl: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    city: "Delhi",
    venue: "Noida Sector 38A",
    startingPrice: 999,
    operatingHours: "10:30 AM - 07:00 PM",
    highlights: ["Unlimited Ride Access", "Wave Pool Access", "Free Locker Pass"],
    rating: 4.7,
    ticketTiers: [
      { name: "Adult Day Ticket", price: 999 },
      { name: "Child Ticket (Under 4ft)", price: 699 },
      { name: "FastTrack Express Pass", price: 1799 }
    ],
    featured: false
  }
];

const initialUsers = [
  {
    _id: "u_demo",
    name: "Aarav Sharma",
    email: "user@scenepass.com",
    phone: "+91 98765 43210",
    password: "$2a$10$wN1S11kXJc10mQ7g5d3oYe5u3J5O2a8h1g1f1e1d1c1b1a1", // demo hashed
    role: "user",
    city: "Jaipur"
  },
  {
    _id: "u_admin",
    name: "ScenePass Director",
    email: "admin@scenepass.com",
    phone: "+91 99999 88888",
    password: "$2a$10$wN1S11kXJc10mQ7g5d3oYe5u3J5O2a8h1g1f1e1d1c1b1a1",
    role: "admin",
    city: "Mumbai"
  }
];

const initialBookings = [
  {
    bookingId: "SP-9204-X1",
    user: "u_demo",
    bookingType: "movie",
    itemTitle: "Cyberpunk 2099: Neon Horizon",
    itemImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    venueName: "ScenePass Luxe Multiplex - World Trade Park",
    city: "Jaipur",
    date: "Today",
    time: "06:45 PM",
    seats: ["F1", "F2"],
    ticketQuantity: 2,
    ticketPrice: 520,
    convenienceFee: 35,
    taxes: 18,
    totalAmount: 573,
    paymentMethod: "UPI",
    paymentStatus: "completed",
    createdAt: new Date().toISOString()
  }
];

const initialReviews = [
  {
    _id: "r1",
    userId: "u_demo",
    userName: "Aarav Sharma",
    itemId: "m1",
    itemType: "movie",
    rating: 5,
    comment: "Mind-blowing visuals and incredible sound design in IMAX 3D! Dev Patel gives a standout performance.",
    createdAt: "2026-09-20T14:30:00.000Z"
  },
  {
    _id: "r2",
    userId: "u_demo2",
    userName: "Priya Malhotra",
    itemId: "m1",
    itemType: "movie",
    rating: 4.5,
    comment: "Visually captivating cyberpunk atmosphere. Loved the musical score!",
    createdAt: "2026-09-21T18:15:00.000Z"
  }
];

const initialFavorites = [];

// In-Memory storage state holder
const store = {
  movies: [...initialMovies],
  cinemas: [...initialCinemas],
  shows: [...initialShows],
  events: [...initialEvents],
  plays: [...initialPlays],
  sports: [...initialSports],
  activities: [...initialActivities],
  users: [...initialUsers],
  bookings: [...initialBookings],
  reviews: [...initialReviews],
  favorites: [...initialFavorites]
};

module.exports = store;
