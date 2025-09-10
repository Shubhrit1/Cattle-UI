import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Users, 
  Shield, 
  BarChart3,
  Smartphone,
  ChevronRight,
  MapPin,
  Zap
} from "lucide-react";
import BreedRecognition from "@/components/BreedRecognition";
import heroImage from "@/assets/hero-livestock.jpg";

const Index = () => {
  const [activeView, setActiveView] = useState<"home" | "recognition">("home");
  const navigate = useNavigate();

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "AI Breed Recognition",
      description: "Advanced image analysis to identify cattle and buffalo breeds with high accuracy",
      color: "earth-green"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Validation", 
      description: "Reduce manual errors and ensure data integrity in the Bharat Pashudhan App",
      color: "earth-orange"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Friendly",
      description: "Optimized for field workers with intuitive interface and offline capabilities",
      color: "earth-field"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Track accuracy rates, registrations, and breed distribution insights",
      color: "primary"
    }
  ];

  const breeds = [
    "Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Rathi", "Hariana",
    "Murrah Buffalo", "Jaffarabadi", "Surti", "Bhadawari", "Mehsana"
  ];

  if (activeView === "recognition") {
    return (
      <div className="min-h-screen bg-gradient-natural">
        <div className="bg-gradient-earth text-white py-4 px-6 shadow-earth">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Button
              onClick={() => setActiveView("home")}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              ← Back to Home
            </Button>
            <h1 className="text-xl font-semibold">Breed Recognition System</h1>
            <div />
          </div>
        </div>
        <BreedRecognition />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-natural">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="bg-earth-green/10 text-earth-green border-earth-green/20 mb-6">
            Government of India Initiative
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-earth bg-clip-text text-transparent">
            Cattle & Buffalo Breed Recognition
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered breed identification system for the Bharat Pashudhan App, 
            helping Field Level Workers accurately register and classify livestock across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-earth text-white hover:opacity-90 shadow-earth"
              onClick={() => setActiveView("recognition")}
            >
              <Camera className="w-5 h-5 mr-2" />
              Try Breed Recognition
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              <Users className="w-5 h-5 mr-2" />
              Login Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionizing Livestock Data Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Addressing breed misclassification challenges with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-warm hover:shadow-earth transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full bg-${feature.color}/10 mb-4`}>
                    <div className={`text-${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Breeds Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supported Indian Breeds
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive database of indigenous and crossbred cattle and buffalo breeds
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {breeds.map((breed, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm hover:bg-earth-green/10 hover:text-earth-green transition-colors cursor-pointer"
              >
                {breed}
              </Badge>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View Complete Breed Database
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-earth-green">500M+</div>
              <p className="text-muted-foreground">Livestock Population in India</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-earth-orange">40+</div>
              <p className="text-muted-foreground">Indigenous Breed Types</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-earth-field">95%+</div>
              <p className="text-muted-foreground">Target Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-earth text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-white/20 mb-6">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Improve Data Accuracy?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of Field Level Workers using AI-powered breed recognition 
            to enhance the quality of livestock data collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-earth-green hover:bg-white/90"
              onClick={() => setActiveView("recognition")}
            >
              <Camera className="w-5 h-5 mr-2" />
              Start Recognition
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Training Centers
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card border-t">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Bharat Livestock AI</span>
          </div>
          <p className="text-muted-foreground">
            Supporting the Government of India's digital agriculture initiatives
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;