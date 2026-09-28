const destinations = [
  {
    id: "destination-1",
    name: "Paris",
    country: "France",
    region: "Europe",
    latitude: 48.8566,
    longitude: 2.3522,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover iconic landmarks, charming streets, world-class museums, and unforgettable French cuisine.",
    activities: [
      "Visit the Eiffel Tower",
      "Explore the Louvre",
      "Walk along the Seine",
      "Enjoy French cuisine",
    ],
    bestTime: "April – October",
    averageBudget: 180,
    rating: 4.9,
  },
  {
    id: "destination-2",
    name: "Istanbul",
    country: "Türkiye",
    region: "Europe & Asia",
    latitude: 41.0082,
    longitude: 28.9784,
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience a unique blend of European and Asian culture, historic mosques, bazaars, and Bosphorus views.",
    activities: [
      "Visit Hagia Sophia",
      "Explore the Grand Bazaar",
      "Cruise the Bosphorus",
      "Visit the Blue Mosque",
    ],
    bestTime: "April – May",
    averageBudget: 95,
    rating: 4.8,
  },
  {
    id: "destination-3",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    latitude: 25.2048,
    longitude: 55.2708,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enjoy futuristic architecture, luxury shopping, desert adventures, and spectacular city views.",
    activities: [
      "Visit Burj Khalifa",
      "Explore Dubai Mall",
      "Desert safari",
      "Dubai Marina cruise",
    ],
    bestTime: "November – March",
    averageBudget: 220,
    rating: 4.7,
  },
  {
    id: "destination-4",
    name: "Cappadocia",
    country: "Türkiye",
    region: "Europe & Asia",
    latitude: 38.6431,
    longitude: 34.8289,
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore magical valleys, cave hotels, underground cities, and iconic hot-air balloon rides.",
    activities: [
      "Hot-air balloon ride",
      "Explore Göreme",
      "Visit underground cities",
      "Hike Red Valley",
    ],
    bestTime: "April – June",
    averageBudget: 120,
    rating: 4.9,
  },
  {
    id: "destination-5",
    name: "Interlaken",
    country: "Switzerland",
    region: "Europe",
    latitude: 46.6863,
    longitude: 7.8632,
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80",
    description:
      "Surrounded by the Swiss Alps, Interlaken is perfect for mountain adventures, lakes, and scenic train journeys.",
    activities: [
      "Visit Jungfraujoch",
      "Paragliding",
      "Explore Lake Thun",
      "Mountain hiking",
    ],
    bestTime: "June – September",
    averageBudget: 240,
    rating: 4.9,
  },
  {
    id: "destination-6",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    latitude: 51.5074,
    longitude: -0.1278,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore historic landmarks, royal palaces, museums, modern neighborhoods, and vibrant British culture.",
    activities: [
      "Visit Big Ben",
      "Explore Tower Bridge",
      "Visit the British Museum",
      "Ride the London Eye",
    ],
    bestTime: "May – September",
    averageBudget: 210,
    rating: 4.7,
  },
  {
    id: "destination-7",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    latitude: 35.6762,
    longitude: 139.6503,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Experience a fascinating mix of traditional Japanese culture, technology, food, and energetic city life.",
    activities: [
      "Visit Shibuya Crossing",
      "Explore Asakusa",
      "Visit Tokyo Skytree",
      "Try Japanese cuisine",
    ],
    bestTime: "March – May",
    averageBudget: 190,
    rating: 4.8,
  },
  {
    id: "destination-8",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    latitude: -8.3405,
    longitude: 115.092,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Relax on tropical beaches, explore temples, discover rice terraces, and enjoy Bali's natural beauty.",
    activities: [
      "Visit Ubud",
      "Explore rice terraces",
      "Visit Tanah Lot",
      "Relax on beaches",
    ],
    bestTime: "April – October",
    averageBudget: 85,
    rating: 4.8,
  },
  {
    id: "destination-9",
    name: "New York",
    country: "United States",
    region: "North America",
    latitude: 40.7128,
    longitude: -74.006,
    image:
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover one of the world's most iconic cities with famous landmarks, entertainment, food, and culture.",
    activities: [
      "Visit Times Square",
      "Explore Central Park",
      "Visit the Statue of Liberty",
      "Walk the Brooklyn Bridge",
    ],
    bestTime: "April – June",
    averageBudget: 260,
    rating: 4.7,
  },
  {
    id: "destination-10",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    latitude: 41.9028,
    longitude: 12.4964,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Step into history with ancient ruins, incredible architecture, Italian cuisine, and timeless city streets.",
    activities: [
      "Visit the Colosseum",
      "Explore Vatican City",
      "Visit Trevi Fountain",
      "Try authentic Italian food",
    ],
    bestTime: "April – June",
    averageBudget: 160,
    rating: 4.8,
  },
];

export default destinations;
