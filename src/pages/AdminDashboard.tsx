import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Shield, 
  Database, 
  TrendingUp, 
  Settings,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const stats = {
    totalFLWs: 1247,
    activeFLWs: 1198,
    totalBreeds: 42,
    pendingApprovals: 23
  };

  const flwData = [
    {
      id: "FLW001",
      name: "Raj Kumar Singh",
      aadhaar: "1234****5678",
      mobile: "+91 98765 43210",
      area: "Ahmedabad District",
      status: "active",
      registrations: 247,
      accuracy: 94.2
    },
    {
      id: "FLW002", 
      name: "Priya Patel",
      aadhaar: "2468****1357",
      mobile: "+91 87654 32109",
      area: "Surat District",
      status: "inactive",
      registrations: 156,
      accuracy: 91.8
    },
    {
      id: "FLW003",
      name: "Amit Sharma",
      aadhaar: "3579****2468",
      mobile: "+91 76543 21098",
      area: "Vadodara District", 
      status: "pending",
      registrations: 89,
      accuracy: 88.5
    }
  ];

  const breedData = [
    {
      id: "BR001",
      name: "Gir",
      type: "Cattle",
      description: "Indigenous Indian dairy breed from Gujarat",
      regions: "Gujarat, Rajasthan",
      referenceImages: 12,
      status: "active"
    },
    {
      id: "BR002",
      name: "Murrah Buffalo", 
      type: "Buffalo",
      description: "High milk yielding buffalo breed",
      regions: "Haryana, Punjab",
      referenceImages: 8,
      status: "active"
    },
    {
      id: "BR003",
      name: "Holstein Cross",
      type: "Crossbreed", 
      description: "High yielding crossbred with Holstein genetics",
      regions: "Pan India",
      referenceImages: 15,
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-earth-field text-white";
      case "inactive": return "bg-muted text-muted-foreground";
      case "pending": return "bg-earth-orange text-white";
      default: return "bg-secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "inactive": return <XCircle className="w-4 h-4" />;
      case "pending": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `${id} status changed to ${newStatus}`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-natural">
      {/* Header */}
      <div className="bg-gradient-earth text-white py-4 px-6 shadow-earth">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 border-2 border-white/20">
              <AvatarImage src="/admin-avatar.jpg" />
              <AvatarFallback className="bg-white/20 text-white">
                AD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Administrator Dashboard</h1>
              <p className="text-white/80">Welcome, {user?.name || 'Administrator'}</p>
            </div>
          </div>
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

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total FLWs</p>
                  <p className="text-3xl font-bold text-earth-green">{stats.totalFLWs}</p>
                </div>
                <Users className="w-8 h-8 text-earth-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active FLWs</p>
                  <p className="text-3xl font-bold text-earth-field">{stats.activeFLWs}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-earth-field" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Breeds</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalBreeds}</p>
                </div>
                <Database className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <p className="text-3xl font-bold text-earth-orange">{stats.pendingApprovals}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-earth-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-earth">
          <Tabs defaultValue="flws" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flws" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>FLW Management</span>
                </TabsTrigger>
                <TabsTrigger value="breeds" className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Breed Catalog</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* FLW Management */}
            <TabsContent value="flws">
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search FLWs by name, ID, or area..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button className="bg-gradient-earth text-white hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add FLW
                  </Button>
                </div>

                <div className="space-y-4">
                  {flwData.map((flw) => (
                    <div
                      key={flw.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-earth-green/10 text-earth-green">
                            {flw.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{flw.name}</h4>
                            <Badge variant="outline">{flw.id}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {flw.aadhaar} • {flw.mobile}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {flw.area} • {flw.registrations} registrations • {flw.accuracy}% accuracy
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(flw.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(flw.status)}
                            <span className="capitalize">{flw.status}</span>
                          </div>
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusUpdate(flw.id, flw.status === 'active' ? 'inactive' : 'active')}
                          >
                            {flw.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>

            {/* Breed Catalog */}
            <TabsContent value="breeds">
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search breeds by name or type..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Type
                  </Button>
                  <Button className="bg-gradient-earth text-white hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Breed
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {breedData.map((breed) => (
                    <Card key={breed.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold">{breed.name}</h4>
                              <Badge variant="secondary">{breed.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {breed.description}
                            </p>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p><strong>Regions:</strong> {breed.regions}</p>
                              <p><strong>Reference Images:</strong> {breed.referenceImages}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(breed.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(breed.status)}
                              <span className="capitalize">{breed.status}</span>
                            </div>
                          </Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Database className="w-4 h-4 mr-1" />
                            Images
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;