import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-livestock.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    aadhaar: "",
    mobile: "",
    password: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${label} has been copied to clipboard`,
    });
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const result = await login({
      email: formData.email,
      password: formData.password,
      role: 'admin'
    });
    
    if (result.success) {
      toast({
        title: "Login Successful",
        description: result.message,
      });
      navigate("/admin");
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const handleFLWLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!formData.aadhaar && !formData.mobile) || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in Aadhaar or Mobile number and password",
        variant: "destructive"
      });
      return;
    }
    
    const result = await login({
      aadhaar: formData.aadhaar || undefined,
      mobile: formData.mobile || undefined,
      password: formData.password,
      role: 'flw'
    });
    
    if (result.success) {
      toast({
        title: "Login Successful", 
        description: result.message,
      });
      navigate("/flw");
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-natural flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-earth rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Bharat Livestock AI</h1>
              <Badge className="bg-earth-green/10 text-earth-green border-earth-green/20 text-xs sm:text-sm">
                Secure Access Portal
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sign in to access the breed recognition system
          </p>
        </div>

        <Card className="shadow-earth">
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
              <TabsTrigger value="admin" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Admin</span>
              </TabsTrigger>
              <TabsTrigger value="flw" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>FLW</span>
              </TabsTrigger>
            </TabsList>

            {/* Admin Login */}
            <TabsContent value="admin">
              <CardHeader className="pb-4">
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5 text-earth-green" />
                  <span>Administrator Login</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email Address</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@bharat-livestock.gov.in"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-earth text-white hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as Admin"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* FLW Login */}
            <TabsContent value="flw">
              <CardHeader className="pb-4">
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5 text-earth-field" />
                  <span>Field Level Worker Login</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFLWLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="flw-aadhaar">Aadhaar Number</Label>
                    <Input
                      id="flw-aadhaar"
                      type="text"
                      placeholder="1234 5678 9012"
                      maxLength={12}
                      value={formData.aadhaar}
                      onChange={(e) => handleInputChange("aadhaar", e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="flw-mobile">Mobile Number</Label>
                    <Input
                      id="flw-mobile"
                      type="tel"
                      placeholder="+91 98765 43210"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flw-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="flw-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-earth-field text-white hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as FLW"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
        </div>

        {/* Seed Accounts Display */}
        <Card className="mt-4 sm:mt-6 shadow-warm">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="text-center text-base sm:text-lg">Test Accounts</CardTitle>
            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Use these accounts to test the application
            </p>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
            {/* Admin Accounts */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-earth-green" />
                <span>Admin Accounts</span>
              </h4>
              <div className="space-y-2">
                <div 
                  className="p-2 sm:p-3 bg-earth-green/5 rounded-lg border border-earth-green/20 cursor-pointer hover:bg-earth-green/10 transition-colors"
                  onClick={() => copyToClipboard("admin@bharat-livestock.gov.in", "Email")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">admin@bharat-livestock.gov.in</p>
                      <p className="text-xs text-muted-foreground">Dr. Rajesh Kumar</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-green/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("admin123", "Password");
                      }}
                    >
                      admin123
                    </Badge>
                  </div>
                </div>
                <div 
                  className="p-2 sm:p-3 bg-earth-green/5 rounded-lg border border-earth-green/20 cursor-pointer hover:bg-earth-green/10 transition-colors"
                  onClick={() => copyToClipboard("priya.sharma@bharat-livestock.gov.in", "Email")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">priya.sharma@bharat-livestock.gov.in</p>
                      <p className="text-xs text-muted-foreground">Dr. Priya Sharma</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-green/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("admin456", "Password");
                      }}
                    >
                      admin456
                    </Badge>
                  </div>
                </div>
                <div 
                  className="p-2 sm:p-3 bg-earth-green/5 rounded-lg border border-earth-green/20 cursor-pointer hover:bg-earth-green/10 transition-colors"
                  onClick={() => copyToClipboard("amit.patel@bharat-livestock.gov.in", "Email")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">amit.patel@bharat-livestock.gov.in</p>
                      <p className="text-xs text-muted-foreground">Dr. Amit Patel</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-green/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("admin789", "Password");
                      }}
                    >
                      admin789
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* FLW Accounts */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <Users className="w-4 h-4 text-earth-field" />
                <span>FLW Accounts</span>
              </h4>
              <div className="space-y-2">
                <div 
                  className="p-2 sm:p-3 bg-earth-field/5 rounded-lg border border-earth-field/20 cursor-pointer hover:bg-earth-field/10 transition-colors"
                  onClick={() => copyToClipboard("123456789012", "Aadhaar")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm">Aadhaar: 123456789012</p>
                      <p className="text-xs text-muted-foreground">Raj Kumar Singh • Ahmedabad</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-field/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("flw123", "Password");
                      }}
                    >
                      flw123
                    </Badge>
                  </div>
                </div>
                <div 
                  className="p-2 sm:p-3 bg-earth-field/5 rounded-lg border border-earth-field/20 cursor-pointer hover:bg-earth-field/10 transition-colors"
                  onClick={() => copyToClipboard("9876543210", "Mobile")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm">Mobile: 9876543210</p>
                      <p className="text-xs text-muted-foreground">Same as above (alternative login)</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-field/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("flw123", "Password");
                      }}
                    >
                      flw123
                    </Badge>
                  </div>
                </div>
                <div 
                  className="p-2 sm:p-3 bg-earth-field/5 rounded-lg border border-earth-field/20 cursor-pointer hover:bg-earth-field/10 transition-colors"
                  onClick={() => copyToClipboard("246813579024", "Aadhaar")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm">Aadhaar: 246813579024</p>
                      <p className="text-xs text-muted-foreground">Priya Patel • Surat</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-field/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("flw456", "Password");
                      }}
                    >
                      flw456
                    </Badge>
                  </div>
                </div>
                <div 
                  className="p-2 sm:p-3 bg-earth-field/5 rounded-lg border border-earth-field/20 cursor-pointer hover:bg-earth-field/10 transition-colors"
                  onClick={() => copyToClipboard("357924681035", "Aadhaar")}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm">Aadhaar: 357924681035</p>
                      <p className="text-xs text-muted-foreground">Amit Sharma • Vadodara</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-earth-field/20 self-start sm:self-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("flw789", "Password");
                      }}
                    >
                      flw789
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground text-center">
                💡 <strong>Tip:</strong> Click on any credential to copy it to clipboard
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;