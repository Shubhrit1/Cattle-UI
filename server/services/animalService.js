// Mock animal database
let animals = [
  {
    pashuAadhaar: "PA001234",
    breed: "Gir",
    owner: "Ramesh Patel",
    ownerContact: "+91 98765 43210",
    age: "3 years",
    gender: "Female",
    color: "Red with white spots",
    weight: "420 kg",
    location: "Ahmedabad, Gujarat",
    status: "active",
    milkYield: "12 L/day",
    lastVaccination: "2024-01-05T00:00:00Z",
    lastCheckup: "2024-01-15T00:00:00Z",
    registeredBy: "FLW001",
    registeredAt: "2024-01-01T00:00:00Z",
    notes: "Healthy animal with good milk production"
  },
  {
    pashuAadhaar: "PA001235",
    breed: "Murrah Buffalo",
    owner: "Sunita Devi",
    ownerContact: "+91 87654 32109",
    age: "5 years",
    gender: "Female",
    color: "Jet black",
    weight: "520 kg",
    location: "Panipat, Haryana",
    status: "active",
    milkYield: "18 L/day",
    lastVaccination: "2023-12-20T00:00:00Z",
    lastCheckup: "2024-01-10T00:00:00Z",
    registeredBy: "FLW004",
    registeredAt: "2024-01-02T00:00:00Z",
    notes: "Excellent milk producer, regular health checkups"
  },
  {
    pashuAadhaar: "PA001236",
    breed: "Holstein Cross",
    owner: "Vijay Kumar",
    ownerContact: "+91 76543 21098",
    age: "2 years",
    gender: "Female",
    color: "Black and white spotted",
    weight: "480 kg",
    location: "Bangalore, Karnataka",
    status: "active",
    milkYield: "25 L/day",
    lastVaccination: "2024-01-10T00:00:00Z",
    lastCheckup: "2024-01-18T00:00:00Z",
    registeredBy: "FLW005",
    registeredAt: "2024-01-03T00:00:00Z",
    notes: "High yielding crossbred, requires intensive management"
  }
];

const getAllAnimals = (filters = {}, page = 1, limit = 10) => {
  let filteredAnimals = [...animals];

  // Apply filters
  if (filters.status) {
    filteredAnimals = filteredAnimals.filter(animal => animal.status === filters.status);
  }

  if (filters.breed) {
    filteredAnimals = filteredAnimals.filter(animal => 
      animal.breed.toLowerCase().includes(filters.breed.toLowerCase())
    );
  }

  if (filters.owner) {
    filteredAnimals = filteredAnimals.filter(animal => 
      animal.owner.toLowerCase().includes(filters.owner.toLowerCase())
    );
  }

  if (filters.registeredBy) {
    filteredAnimals = filteredAnimals.filter(animal => animal.registeredBy === filters.registeredBy);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredAnimals = filteredAnimals.filter(animal =>
      animal.pashuAadhaar.toLowerCase().includes(searchTerm) ||
      animal.breed.toLowerCase().includes(searchTerm) ||
      animal.owner.toLowerCase().includes(searchTerm) ||
      animal.location.toLowerCase().includes(searchTerm)
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAnimals = filteredAnimals.slice(startIndex, endIndex);

  return {
    animals: paginatedAnimals,
    total: filteredAnimals.length
  };
};

const getAnimalById = (pashuAadhaar) => {
  return animals.find(animal => animal.pashuAadhaar === pashuAadhaar);
};

const createAnimal = (animalData) => {
  animals.push(animalData);
  return animalData;
};

const updateAnimal = (pashuAadhaar, updateData) => {
  const animalIndex = animals.findIndex(animal => animal.pashuAadhaar === pashuAadhaar);
  if (animalIndex === -1) return null;

  animals[animalIndex] = { ...animals[animalIndex], ...updateData };
  return animals[animalIndex];
};

const deleteAnimal = (pashuAadhaar) => {
  const animalIndex = animals.findIndex(animal => animal.pashuAadhaar === pashuAadhaar);
  if (animalIndex === -1) return false;

  animals.splice(animalIndex, 1);
  return true;
};

const getAnimalStats = (filters = {}) => {
  let filteredAnimals = [...animals];

  if (filters.registeredBy) {
    filteredAnimals = filteredAnimals.filter(animal => animal.registeredBy === filters.registeredBy);
  }

  const totalAnimals = filteredAnimals.length;
  const activeAnimals = filteredAnimals.filter(animal => animal.status === 'active').length;
  const breedDistribution = {};
  const genderDistribution = { Male: 0, Female: 0 };

  filteredAnimals.forEach(animal => {
    // Breed distribution
    breedDistribution[animal.breed] = (breedDistribution[animal.breed] || 0) + 1;
    
    // Gender distribution
    genderDistribution[animal.gender] = (genderDistribution[animal.gender] || 0) + 1;
  });

  // Recent registrations (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentRegistrations = filteredAnimals.filter(animal => 
    new Date(animal.registeredAt) > sevenDaysAgo
  ).length;

  // Animals needing vaccination (last vaccination > 30 days ago)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const needingVaccination = filteredAnimals.filter(animal => 
    new Date(animal.lastVaccination) < thirtyDaysAgo
  ).length;

  return {
    total: totalAnimals,
    active: activeAnimals,
    recentRegistrations,
    needingVaccination,
    breedDistribution,
    genderDistribution
  };
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalStats
};