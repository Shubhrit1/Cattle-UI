import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Navigation, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Upload,
  Map,
  Target,
  Route,
  Clock,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Location {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  type: "farm" | "veterinary" | "market" | "checkpoint" | "custom";
  description: string;
  lastVisited?: string;
  visitCount: number;
}

interface AnimalLocation {
  pashuAadhaar: string;
  breed: string;
  owner: string;
  currentLocation: Location;
  lastUpdate: string;
  movementHistory: Array<{
    location: Location;
    timestamp: string;
    duration: string;
  }>;
}

const LocationServices = () => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [animalLocations, setAnimalLocations] = useState<AnimalLocation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    const mockLocations: Location[] = [
      {
        id: "LOC001",
        name: "Patel Dairy Farm",
        coordinates: { lat: 23.0225, lng: 72.5714 },
        address: "Ahmedabad, Gujarat",
        type: "farm",
        description: "Large dairy farm with 200+ cattle",
        lastVisited: "2024-01-20T10:30:00Z",
        visitCount: 15
      },
      {
        id: "LOC002",
        name: "Gujarat Veterinary Hospital",
        coordinates: { lat: 23.0325, lng: 72.5814 },
        address: "Gandhinagar, Gujarat",
        type: "veterinary",
        description: "Government veterinary hospital",
        lastVisited: "2024-01-18T14:20:00Z",
        visitCount: 8
      },
      {
        id: "LOC003",
        name: "Ahmedabad Cattle Market",
        coordinates: { lat: 23.0125, lng: 72.5614 },
        address: "Ahmedabad, Gujarat",
        type: "market",
        description: "Weekly cattle market",
        lastVisited: "2024-01-15T08:00:00Z",
        visitCount: 3
      }
    ];

    const mockAnimalLocations: AnimalLocation[] = [
      {
        pashuAadhaar: "PA001234",
        breed: "Gir",
        owner: "Ramesh Patel",
        currentLocation: mockLocations[0],
        lastUpdate: "2024-01-20T10:30:00Z",
        movementHistory: [
          {
            location: mockLocations[0],
            timestamp: "2024-01-20T10:30:00Z",
            duration: "2 hours"
          },
          {
            location: mockLocations[1],
            timestamp: "2024-01-18T14:20:00Z",
            duration: "1 hour"
          }
        ]
      }
    ];

    setLocations(mockLocations);
    setAnimalLocations(mockAnimalLocations);
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Found",
            description: "Your current location has been detected",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive"
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "farm": return "bg-earth-green/10 text-earth-green";
      case "veterinary": return "bg-primary/10 text-primary";
      case "market": return "bg-earth-orange/10 text-earth-orange";
      case "checkpoint": return "bg-earth-field/10 text-earth-field";
      case "custom": return "bg-secondary";
      default: return "bg-secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "farm": return <MapPin className="w-4 h-4" />;
      case "veterinary": return <Target className="w-4 h-4" />;
      case "market": return <Users className="w-4 h-4" />;
      case "checkpoint": return <Route className="w-4 h-4" />;
      case "custom": return <Map className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const startTracking = () => {
    setIsTracking(true);
    toast({
      title: "Tracking Started",
      description: "Location tracking has been enabled",
    });
  };

  const stopTracking = () => {
    setIsTracking(false);
    toast({
      title: "Tracking Stopped",
      description: "Location tracking has been disabled",
    });
  };

  const addLocation = () => {
    const newLocation: Location = {
      id: `LOC${Date.now()}`,
      name: "New Location",
      coordinates: currentLocation || { lat: 23.0225, lng: 72.5714 },
      address: "Current Location",
      type: "custom",
      description: "User added location",
      visitCount: 0
    };
    setLocations(prev => [...prev, newLocation]);
    toast({
      title: "Location Added",
      description: "New location has been added to your list",
    });
  };

  const exportLocations = () => {
    const data = JSON.stringify(locations, null, 2);
    const element = document.createElement('a');
    const file = new Blob([data], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'locations.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Export Complete",
      description: "Location data has been exported",
    });
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="shadow-earth">
        <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-6 h-6" />
            <span>GPS Tracking & Area Mapping</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="map" className="flex items-center space-x-2">
                <Map className="w-4 h-4" />
                <span>Map View</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Saved Locations</span>
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>Animal Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>GPS Tools</span>
              </TabsTrigger>
            </TabsList>

            {/* Map View Tab */}
            <TabsContent value="map" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="h-96 bg-gradient-natural rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center">
                          <Map className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                          <p className="text-muted-foreground mb-4">
                            Map integration would be implemented here
                          </p>
                          {currentLocation ? (
                            <div className="space-y-2">
                              <p className="text-sm">
                                <strong>Current Location:</strong><br />
                                Lat: {currentLocation.lat.toFixed(6)}<br />
                                Lng: {currentLocation.lng.toFixed(6)}
                              </p>
                            </div>
                          ) : (
                            <Button onClick={getCurrentLocation} variant="outline">
                              <Navigation className="w-4 h-4 mr-2" />
                              Get Current Location
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={getCurrentLocation} 
                        className="w-full" 
                        variant="outline"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Current Location
                      </Button>
                      <Button 
                        onClick={addLocation} 
                        className="w-full" 
                        variant="outline"
                        disabled={!currentLocation}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Current Location
                      </Button>
                      <Button 
                        onClick={exportLocations} 
                        className="w-full" 
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Locations
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Location Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Locations:</span>
                        <Badge variant="outline">{locations.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Farms:</span>
                        <Badge variant="outline">
                          {locations.filter(l => l.type === 'farm').length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Veterinary:</span>
                        <Badge variant="outline">
                          {locations.filter(l => l.type === 'veterinary').length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Markets:</span>
                        <Badge variant="outline">
                          {locations.filter(l => l.type === 'market').length}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Saved Locations Tab */}
            <TabsContent value="locations" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={addLocation} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Location
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLocations.map((location) => (
                  <Card key={location.id} className="hover:shadow-warm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{location.name}</h4>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                        </div>
                        <Badge className={getTypeColor(location.type)}>
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(location.type)}
                            <span className="capitalize">{location.type}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {location.description}
                      </p>
                      
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Coordinates:</span>
                          <span>{location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Visits:</span>
                          <span>{location.visitCount}</span>
                        </div>
                        {location.lastVisited && (
                          <div className="flex justify-between">
                            <span>Last Visit:</span>
                            <span>{new Date(location.lastVisited).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Animal Tracking Tab */}
            <TabsContent value="tracking" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Animal Location Tracking</h3>
                <div className="flex space-x-2">
                  <Button 
                    onClick={isTracking ? stopTracking : startTracking}
                    className={isTracking ? "bg-destructive text-white" : "bg-gradient-earth text-white"}
                  >
                    {isTracking ? "Stop Tracking" : "Start Tracking"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {animalLocations.map((animal) => (
                  <Card key={animal.pashuAadhaar}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{animal.pashuAadhaar}</h4>
                          <p className="text-muted-foreground">
                            {animal.breed} • Owner: {animal.owner}
                          </p>
                        </div>
                        <Badge variant="outline">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(animal.lastUpdate).toLocaleString()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Current Location</h5>
                          <div className="p-3 bg-secondary/50 rounded-lg">
                            <p className="font-medium">{animal.currentLocation.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {animal.currentLocation.address}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {animal.currentLocation.coordinates.lat.toFixed(4)}, {animal.currentLocation.coordinates.lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Movement History</h5>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {animal.movementHistory.map((movement, index) => (
                              <div key={index} className="p-2 bg-secondary/30 rounded text-sm">
                                <p className="font-medium">{movement.location.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(movement.timestamp).toLocaleString()} • {movement.duration}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* GPS Tools Tab */}
            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-warm transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-earth-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Navigation className="w-6 h-6 text-earth-green" />
                    </div>
                    <h3 className="font-semibold mb-2">GPS Navigation</h3>
                    <p className="text-sm text-muted-foreground">
                      Navigate to saved locations
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-warm transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Route className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Route Planning</h3>
                    <p className="text-sm text-muted-foreground">
                      Plan efficient routes for visits
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-warm transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-earth-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-earth-orange" />
                    </div>
                    <h3 className="font-semibold mb-2">Geofencing</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up location-based alerts
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-warm transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-earth-field/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-6 h-6 text-earth-field" />
                    </div>
                    <h3 className="font-semibold mb-2">Import Locations</h3>
                    <p className="text-sm text-muted-foreground">
                      Import location data from files
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-warm transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-earth-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-6 h-6 text-earth-brown" />
                    </div>
                    <h3 className="font-semibold mb-2">Export Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Export location and tracking data
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-warm transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Map className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="font-semibold mb-2">Offline Maps</h3>
                    <p className="text-sm text-muted-foreground">
                      Download maps for offline use
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationServices;
