import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Camera, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Search,
  Filter,
  Database,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Eye,
  Edit,
  QrCode,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BreedRecognition from "@/components/BreedRecognition";
import QRGenerator from "@/components/QRGenerator";
import BreedDatabase from "@/components/BreedDatabase";
import FormTemplates from "@/components/FormTemplates";
import LocationServices from "@/components/LocationServices";
import Settings from "@/components/Settings";

const FLWDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const stats = {
    totalAnimals: 247,
    pendingVerification: 12,
    completedToday: 8,
    accuracyRate: 94.2
  };

  const recentRegistrations = [
    {
      id: "PA001234",
      breed: "Gir",
      confidence: 89.3,
      owner: "Ramesh Patel",
      location: "Ahmedabad, Gujarat",
      timestamp: "2 hours ago",
      status: "verified"
    },
    {
      id: "PA001235", 
      breed: "Murrah Buffalo",
      confidence: 92.1,
      owner: "Sunita Devi",
      location: "Panipat, Haryana",
      timestamp: "4 hours ago",
      status: "pending"
    },
    {
      id: "PA001236",
      breed: "Holstein Cross",
      confidence: 76.8,
      owner: "Vijay Kumar",
      location: "Bangalore, Karnataka", 
      timestamp: "6 hours ago",
      status: "review"
    }
  ];

  const animalDatabase = [
    {
      pashuAadhaar: "PA001234",
      breed: "Gir",
      owner: "Ramesh Patel",
      age: "3 years",
      status: "Active",
      lastVaccination: "15 days ago",
      milkYield: "12 L/day"
    },
    {
      pashuAadhaar: "PA001235",
      breed: "Murrah Buffalo", 
      owner: "Sunita Devi",
      age: "5 years",
      status: "Active",
      lastVaccination: "30 days ago",
      milkYield: "18 L/day"
    },
    {
      pashuAadhaar: "PA001236",
      breed: "Holstein Cross",
      owner: "Vijay Kumar",
      age: "2 years", 
      status: "Active",
      lastVaccination: "10 days ago",
      milkYield: "25 L/day"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": case "Active": return "bg-earth-field text-white";
      case "pending": return "bg-earth-orange text-white";
      case "review": return "bg-destructive text-white";
      default: return "bg-secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": case "Active": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "review": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  const handleNewRegistration = () => {
    setActiveTab("recognition");
    toast({
      title: "Starting Registration",
      description: "Use the breed recognition tool to register a new animal",
    });
  };

  const handleToolClick = (toolName: string) => {
    setActiveTab(toolName);
    toast({
      title: "Tool Opened",
      description: `${toolName} tool has been opened`,
    });
  };

  const renderToolContent = () => {
    switch (activeTab) {
      case "recognition":
        return <BreedRecognition />;
      case "qr-generator":
        return <QRGenerator />;
      case "breed-database":
        return <BreedDatabase />;
      case "form-templates":
        return <FormTemplates />;
      case "location-services":
        return <LocationServices />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  if (["recognition", "qr-generator", "breed-database", "form-templates", "location-services", "settings"].includes(activeTab)) {
    return (
      <div className="min-h-screen bg-gradient-natural">
        <div className="bg-gradient-earth text-white py-4 px-6 shadow-earth">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Button
              onClick={() => setActiveTab("overview")}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold">
              {activeTab === "recognition" && "Breed Recognition"}
              {activeTab === "qr-generator" && "QR Code Generator"}
              {activeTab === "breed-database" && "Breed Database"}
              {activeTab === "form-templates" && "Form Templates"}
              {activeTab === "location-services" && "Location Services"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        {renderToolContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-natural">
      {/* Header */}
      <div className="bg-gradient-earth text-white py-4 px-4 sm:px-6 shadow-earth">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-7xl mx-auto space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white/20 flex-shrink-0">
              <AvatarImage src="/flw-avatar.jpg" />
              <AvatarFallback className="bg-white/20 text-white text-sm sm:text-base">
                RK
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold truncate">Welcome, {user?.name || 'Field Level Worker'}</h1>
              <p className="text-white/80 text-sm sm:text-base">Field Level Worker • ID: {user?.id || 'FLW001'}</p>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">{user?.area || 'Ahmedabad District, Gujarat'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <Button 
              onClick={handleNewRegistration}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex-1 sm:flex-none text-sm sm:text-base"
            >
              <PlusCircle className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">New Registration</span>
              <span className="sm:hidden">New</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/20 flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card className="shadow-warm">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Animals</p>
                  <p className="text-xl sm:text-3xl font-bold text-earth-green">{stats.totalAnimals}</p>
                </div>
                <div className="p-2 sm:p-3 bg-earth-green/10 rounded-full flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-earth-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending Verification</p>
                  <p className="text-xl sm:text-3xl font-bold text-earth-orange">{stats.pendingVerification}</p>
                </div>
                <div className="p-2 sm:p-3 bg-earth-orange/10 rounded-full flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-earth-orange" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Completed Today</p>
                  <p className="text-xl sm:text-3xl font-bold text-earth-field">{stats.completedToday}</p>
                </div>
                <div className="p-2 sm:p-3 bg-earth-field/10 rounded-full flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-earth-field" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Accuracy Rate</p>
                  <p className="text-xl sm:text-3xl font-bold text-primary">{stats.accuracyRate}%</p>
                </div>
                <div className="p-2 sm:p-3 bg-primary/10 rounded-full flex-shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-earth">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader className="px-3 sm:px-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-1">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="animals" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-1">
                  <Database className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Animals</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Reports</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-1">
                  <SettingsIcon className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Tools</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-earth-field" />
                      <span>Recent Registrations</span>
                    </h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentRegistrations.map((registration) => (
                      <div
                        key={registration.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-natural rounded-lg flex items-center justify-center">
                            <Camera className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{registration.id}</h4>
                              <Badge className="bg-earth-green/10 text-earth-green">
                                {registration.breed}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Owner: {registration.owner}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{registration.location}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {registration.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {registration.confidence.toFixed(1)}% confidence
                            </p>
                          </div>
                          <Badge className={getStatusColor(registration.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(registration.status)}
                              <span className="capitalize">{registration.status}</span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Animals Database Tab */}
            <TabsContent value="animals">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search by Pashu Aadhaar, breed, or owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {animalDatabase.map((animal) => (
                      <Card key={animal.pashuAadhaar} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold">{animal.pashuAadhaar}</h4>
                                <Badge variant="secondary">{animal.breed}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Owner: {animal.owner}
                              </p>
                              <div className="text-xs text-muted-foreground space-y-1">
                                <p>Age: {animal.age} • Milk: {animal.milkYield}</p>
                                <p>Last Vaccination: {animal.lastVaccination}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(animal.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(animal.status)}
                                <span>{animal.status}</span>
                              </div>
                            </Badge>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <QrCode className="w-4 h-4 mr-1" />
                              QR
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Reports & Analytics</h3>
                  <p className="text-muted-foreground mb-6">
                    Generate and view detailed reports on animal registrations, breed distribution, and accuracy metrics.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <Button variant="outline" className="h-20 flex-col">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      Monthly Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="w-6 h-6 mb-2" />
                      Accuracy Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Database className="w-6 h-6 mb-2" />
                      Breed Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools">
              <CardContent className="px-3 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <Card 
                    className="hover:shadow-warm transition-shadow cursor-pointer"
                    onClick={() => handleToolClick("recognition")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-earth-green/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-earth-green" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Breed Recognition</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        AI-powered breed identification tool
                      </p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="hover:shadow-warm transition-shadow cursor-pointer"
                    onClick={() => handleToolClick("qr-generator")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-earth-orange/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-earth-orange" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">QR Generator</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Generate QR codes for animal identification
                      </p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="hover:shadow-warm transition-shadow cursor-pointer"
                    onClick={() => handleToolClick("breed-database")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-earth-field/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-earth-field" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Breed Database</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Browse comprehensive breed information
                      </p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="hover:shadow-warm transition-shadow cursor-pointer"
                    onClick={() => handleToolClick("form-templates")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Form Templates</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Pre-filled registration forms
                      </p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="hover:shadow-warm transition-shadow cursor-pointer"
                    onClick={() => handleToolClick("location-services")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-earth-brown/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-earth-brown" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Location Services</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        GPS tracking and area mapping
                      </p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="hover:shadow-warm transition-shadow cursor-pointer"
                    onClick={() => handleToolClick("settings")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Settings</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        App preferences and configuration
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default FLWDashboard;