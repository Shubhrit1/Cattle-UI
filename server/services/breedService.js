// Mock breed database
const breedDatabase = [
  {
    id: "BR001",
    name: "Gir",
    type: "Cattle",
    origin: "Gujarat, India",
    regions: ["Gujarat", "Rajasthan", "Maharashtra", "Madhya Pradesh"],
    characteristics: {
      size: "Large",
      color: "Red to brown with white spots",
      weight: "400-500 kg (cows), 600-700 kg (bulls)",
      height: "130-140 cm"
    },
    production: {
      milkYield: "12-15 L/day",
      fatContent: "4.5-5.0%",
      lactationPeriod: "300-320 days"
    },
    adaptability: {
      climate: "Tropical and subtropical",
      diseaseResistance: "High",
      feedEfficiency: "Good"
    },
    description: "The Gir is one of the principal Zebu breeds originating from India. Known for its distinctive appearance with large, drooping ears and a prominent hump, it's highly valued for milk production and disease resistance.",
    images: 15,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "BR002",
    name: "Murrah Buffalo",
    type: "Buffalo",
    origin: "Haryana, India",
    regions: ["Haryana", "Punjab", "Uttar Pradesh", "Delhi"],
    characteristics: {
      size: "Large",
      color: "Jet black",
      weight: "450-550 kg (cows), 600-800 kg (bulls)",
      height: "125-135 cm"
    },
    production: {
      milkYield: "15-20 L/day",
      fatContent: "6.5-7.5%",
      lactationPeriod: "280-300 days"
    },
    adaptability: {
      climate: "Temperate to tropical",
      diseaseResistance: "Very High",
      feedEfficiency: "Excellent"
    },
    description: "The Murrah is the most important breed of buffalo in India, known for its high milk yield and excellent milk quality. It's characterized by its jet black color and tightly curled horns.",
    images: 12,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "BR003",
    name: "Sahiwal",
    type: "Cattle",
    origin: "Punjab, Pakistan/India",
    regions: ["Punjab", "Haryana", "Rajasthan", "Uttar Pradesh"],
    characteristics: {
      size: "Medium to Large",
      color: "Red to brown",
      weight: "350-450 kg (cows), 500-600 kg (bulls)",
      height: "120-130 cm"
    },
    production: {
      milkYield: "10-12 L/day",
      fatContent: "4.0-4.5%",
      lactationPeriod: "300-320 days"
    },
    adaptability: {
      climate: "Hot and humid",
      diseaseResistance: "High",
      feedEfficiency: "Good"
    },
    description: "Sahiwal is a tropical dairy breed known for its heat tolerance and ability to produce milk in hot climates. It's widely used in crossbreeding programs.",
    images: 10,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "BR004",
    name: "Holstein Cross",
    type: "Crossbreed",
    origin: "Various (Holstein × Indigenous)",
    regions: ["Pan India", "Urban areas", "Dairy farms"],
    characteristics: {
      size: "Large",
      color: "Black and white spotted",
      weight: "500-600 kg (cows), 700-900 kg (bulls)",
      height: "140-150 cm"
    },
    production: {
      milkYield: "20-25 L/day",
      fatContent: "3.5-4.0%",
      lactationPeriod: "305-315 days"
    },
    adaptability: {
      climate: "Temperate (requires cooling)",
      diseaseResistance: "Medium",
      feedEfficiency: "High"
    },
    description: "Crossbreed between Holstein and indigenous breeds, combining high milk yield with some adaptability to local conditions. Requires intensive management.",
    images: 18,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "BR005",
    name: "Tharparkar",
    type: "Cattle",
    origin: "Rajasthan, India",
    regions: ["Rajasthan", "Gujarat", "Haryana"],
    characteristics: {
      size: "Medium",
      color: "White to light gray",
      weight: "300-400 kg (cows), 450-550 kg (bulls)",
      height: "115-125 cm"
    },
    production: {
      milkYield: "8-10 L/day",
      fatContent: "4.0-4.5%",
      lactationPeriod: "280-300 days"
    },
    adaptability: {
      climate: "Arid and semi-arid",
      diseaseResistance: "Very High",
      feedEfficiency: "Excellent"
    },
    description: "A drought-resistant breed from the Thar Desert, known for its ability to survive in harsh conditions with minimal water and feed.",
    images: 8,
    status: "rare",
    createdAt: "2024-01-01T00:00:00Z"
  }
];

// In-memory storage
let breeds = [...breedDatabase];

const getAllBreeds = (filters = {}) => {
  let filteredBreeds = [...breeds];

  if (filters.type) {
    filteredBreeds = filteredBreeds.filter(breed => breed.type === filters.type);
  }

  if (filters.status) {
    filteredBreeds = filteredBreeds.filter(breed => breed.status === filters.status);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredBreeds = filteredBreeds.filter(breed =>
      breed.name.toLowerCase().includes(searchTerm) ||
      breed.origin.toLowerCase().includes(searchTerm) ||
      breed.regions.some(region => region.toLowerCase().includes(searchTerm))
    );
  }

  return filteredBreeds;
};

const getBreedById = (id) => {
  return breeds.find(breed => breed.id === id);
};

const createBreed = (breedData) => {
  breeds.push(breedData);
  return breedData;
};

const updateBreed = (id, updateData) => {
  const breedIndex = breeds.findIndex(breed => breed.id === id);
  if (breedIndex === -1) return null;

  breeds[breedIndex] = { ...breeds[breedIndex], ...updateData };
  return breeds[breedIndex];
};

const deleteBreed = (id) => {
  const breedIndex = breeds.findIndex(breed => breed.id === id);
  if (breedIndex === -1) return false;

  breeds.splice(breedIndex, 1);
  return true;
};

// Simulate AI breed recognition
const simulateBreedRecognition = (imageFile) => {
  // Mock predictions based on common breeds
  const mockPredictions = [
    {
      breed: "Gir",
      confidence: Math.random() * 30 + 70, // 70-100%
      type: "Cattle",
      description: "Indigenous Indian dairy breed from Gujarat, known for high milk yield and disease resistance"
    },
    {
      breed: "Sahiwal",
      confidence: Math.random() * 20 + 10, // 10-30%
      type: "Cattle",
      description: "Indigenous Pakistani/Indian dairy breed, excellent heat tolerance"
    },
    {
      breed: "Holstein Cross",
      confidence: Math.random() * 10, // 0-10%
      type: "Crossbreed",
      description: "High yielding crossbred with Holstein genetics"
    }
  ];

  // Sort by confidence
  return mockPredictions.sort((a, b) => b.confidence - a.confidence);
};

module.exports = {
  getAllBreeds,
  getBreedById,
  createBreed,
  updateBreed,
  deleteBreed,
  simulateBreedRecognition
};