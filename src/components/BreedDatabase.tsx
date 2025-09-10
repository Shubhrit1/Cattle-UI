import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Database, 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp, 
  Users, 
  Milk,
  Thermometer,
  Shield,
  Eye,
  Heart
} from "lucide-react";

interface BreedInfo {
  id: string;
  name: string;
  type: "Cattle" | "Buffalo" | "Crossbreed";
  origin: string;
  regions: string[];
  characteristics: {
    size: string;
    color: string;
    weight: string;
    height: string;
  };
  production: {
    milkYield: string;
    fatContent: string;
    lactationPeriod: string;
  };
  adaptability: {
    climate: string;
    diseaseResistance: string;
    feedEfficiency: string;
  };
  description: string;
  images: number;
  status: "active" | "rare" | "endangered";
}

const BreedDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedBreed, setSelectedBreed] = useState<BreedInfo | null>(null);

  const breedData: BreedInfo[] = [
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
      status: "active"
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
      status: "active"
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
      status: "active"
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
      status: "active"
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
      status: "rare"
    },
    {
      id: "BR006",
      name: "Kankrej",
      type: "Cattle",
      origin: "Gujarat, India",
      regions: ["Gujarat", "Rajasthan", "Maharashtra"],
      characteristics: {
        size: "Large",
        color: "Silver gray to dark gray",
        weight: "400-500 kg (cows), 600-700 kg (bulls)",
        height: "130-140 cm"
      },
      production: {
        milkYield: "10-12 L/day",
        fatContent: "4.5-5.0%",
        lactationPeriod: "300-320 days"
      },
      adaptability: {
        climate: "Tropical",
        diseaseResistance: "High",
        feedEfficiency: "Good"
      },
      description: "A dual-purpose breed known for both milk and draft purposes. Characterized by its large size and distinctive gray color.",
      images: 11,
      status: "active"
    }
  ];

  const filteredBreeds = breedData.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.regions.some(region => region.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || breed.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-earth-field text-white";
      case "rare": return "bg-earth-orange text-white";
      case "endangered": return "bg-destructive text-white";
      default: return "bg-secondary";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cattle": return "bg-earth-green/10 text-earth-green";
      case "Buffalo": return "bg-primary/10 text-primary";
      case "Crossbreed": return "bg-earth-orange/10 text-earth-orange";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="shadow-earth">
        <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-6 h-6" />
            <span>Comprehensive Breed Database</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search and Filter Section */}
            <div className="lg:col-span-1 space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search breeds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Cattle">Cattle</SelectItem>
                    <SelectItem value="Buffalo">Buffalo</SelectItem>
                    <SelectItem value="Crossbreed">Crossbreed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Breed List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredBreeds.map((breed) => (
                  <Card 
                    key={breed.id} 
                    className={`cursor-pointer transition-all hover:shadow-warm ${
                      selectedBreed?.id === breed.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedBreed(breed)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{breed.name}</h4>
                        <Badge className={getTypeColor(breed.type)}>
                          {breed.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {breed.origin}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(breed.status)}>
                          {breed.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {breed.images} images
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Breed Details Section */}
            <div className="lg:col-span-2">
              {selectedBreed ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedBreed.name}</h2>
                      <p className="text-muted-foreground">{selectedBreed.origin}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getTypeColor(selectedBreed.type)}>
                        {selectedBreed.type}
                      </Badge>
                      <Badge className={getStatusColor(selectedBreed.status)}>
                        {selectedBreed.status}
                      </Badge>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
                      <TabsTrigger value="production">Production</TabsTrigger>
                      <TabsTrigger value="adaptability">Adaptability</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-muted-foreground mb-4">{selectedBreed.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>Found in Regions</span>
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedBreed.regions.map((region, index) => (
                                  <Badge key={index} variant="outline">{region}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>Reference Images</span>
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {selectedBreed.images} high-quality reference images available
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="characteristics" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <span className="font-medium">Size</span>
                                <span>{selectedBreed.characteristics.size}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <span className="font-medium">Color</span>
                                <span className="text-sm">{selectedBreed.characteristics.color}</span>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <span className="font-medium">Weight</span>
                                <span className="text-sm">{selectedBreed.characteristics.weight}</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <span className="font-medium">Height</span>
                                <span>{selectedBreed.characteristics.height}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="production" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-earth-green/10 rounded-lg">
                              <Milk className="w-8 h-8 mx-auto text-earth-green mb-2" />
                              <h4 className="font-semibold">Milk Yield</h4>
                              <p className="text-2xl font-bold text-earth-green">
                                {selectedBreed.production.milkYield}
                              </p>
                            </div>
                            <div className="text-center p-4 bg-primary/10 rounded-lg">
                              <TrendingUp className="w-8 h-8 mx-auto text-primary mb-2" />
                              <h4 className="font-semibold">Fat Content</h4>
                              <p className="text-2xl font-bold text-primary">
                                {selectedBreed.production.fatContent}
                              </p>
                            </div>
                            <div className="text-center p-4 bg-earth-orange/10 rounded-lg">
                              <Heart className="w-8 h-8 mx-auto text-earth-orange mb-2" />
                              <h4 className="font-semibold">Lactation Period</h4>
                              <p className="text-2xl font-bold text-earth-orange">
                                {selectedBreed.production.lactationPeriod}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="adaptability" className="space-y-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                              <span className="font-medium flex items-center space-x-2">
                                <Thermometer className="w-4 h-4" />
                                <span>Climate Suitability</span>
                              </span>
                              <span>{selectedBreed.adaptability.climate}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                              <span className="font-medium flex items-center space-x-2">
                                <Shield className="w-4 h-4" />
                                <span>Disease Resistance</span>
                              </span>
                              <span>{selectedBreed.adaptability.diseaseResistance}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                              <span className="font-medium flex items-center space-x-2">
                                <Users className="w-4 h-4" />
                                <span>Feed Efficiency</span>
                              </span>
                              <span>{selectedBreed.adaptability.feedEfficiency}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Database className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Breed</h3>
                  <p className="text-muted-foreground">
                    Choose a breed from the list to view detailed information
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedDatabase;
