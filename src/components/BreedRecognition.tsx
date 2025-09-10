import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BreedPrediction {
  breed: string;
  confidence: number;
  type: "Cattle" | "Buffalo" | "Crossbreed";
  description: string;
}

const BreedRecognition = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<BreedPrediction[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const mockPredictions: BreedPrediction[] = [
    {
      breed: "Gir",
      confidence: 87.3,
      type: "Cattle",
      description: "Indigenous Indian dairy breed from Gujarat, known for high milk yield and disease resistance"
    },
    {
      breed: "Sahiwal",
      confidence: 12.1,
      type: "Cattle", 
      description: "Indigenous Pakistani/Indian dairy breed, excellent heat tolerance"
    },
    {
      breed: "Holstein Cross",
      confidence: 0.6,
      type: "Crossbreed",
      description: "High yielding crossbred with Holstein genetics"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPredictions([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPredictions(mockPredictions);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Breed predictions are ready!",
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-gradient-earth text-white";
    if (confidence >= 60) return "bg-gradient-warm text-white";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <Card className="shadow-earth">
        <CardHeader className="bg-gradient-earth text-white rounded-t-lg px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Cattle & Buffalo Breed Recognition</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-8 text-center bg-gradient-natural">
                {selectedImage ? (
                  <div className="space-y-3 sm:space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected animal"
                      className="max-w-full h-48 sm:h-64 object-cover rounded-lg mx-auto shadow-warm"
                    />
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="text-xs sm:text-sm"
                      >
                        <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Change Image
                      </Button>
                      <Button
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="bg-gradient-earth text-white hover:opacity-90 text-xs sm:text-sm"
                        size="sm"
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Breed"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-medium">Upload Animal Photo</p>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Take a clear photo of the animal for breed identification
                      </p>
                    </div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-earth text-white hover:opacity-90 text-sm sm:text-base"
                    >
                      <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={66} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    Analyzing image with AI model...
                  </p>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-earth-field" />
                <span>Breed Predictions</span>
              </h3>
              
              {predictions.length > 0 ? (
                <div className="space-y-3">
                  {predictions.map((prediction, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{prediction.breed}</h4>
                            <Badge variant="secondary" className="mt-1">
                              {prediction.type}
                            </Badge>
                          </div>
                          <Badge className={getConfidenceColor(prediction.confidence)}>
                            {prediction.confidence.toFixed(1)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {prediction.description}
                        </p>
                        <Progress 
                          value={prediction.confidence} 
                          className="mt-3 h-2" 
                        />
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-earth-orange mt-0.5" />
                      <div>
                        <p className="font-medium">Recommendation</p>
                        <p className="text-sm text-muted-foreground">
                          Based on the highest confidence score, this appears to be a <strong>{predictions[0]?.breed}</strong> breed. 
                          Please verify with local breed characteristics if confidence is below 90%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to get breed predictions</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedRecognition;