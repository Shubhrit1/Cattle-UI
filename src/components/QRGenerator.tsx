import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download, Copy, Eye, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnimalData {
  pashuAadhaar: string;
  breed: string;
  ownerName: string;
  ownerContact: string;
  location: string;
  age: string;
  gender: string;
  vaccinationDate: string;
  lastCheckup: string;
  notes: string;
}

const QRGenerator = () => {
  const [animalData, setAnimalData] = useState<AnimalData>({
    pashuAadhaar: "",
    breed: "",
    ownerName: "",
    ownerContact: "",
    location: "",
    age: "",
    gender: "",
    vaccinationDate: "",
    lastCheckup: "",
    notes: ""
  });
  const [generatedQR, setGeneratedQR] = useState<string>("");
  const { toast } = useToast();

  const breedOptions = [
    "Gir", "Sahiwal", "Murrah Buffalo", "Holstein Cross", "Jersey Cross",
    "Red Sindhi", "Tharparkar", "Kankrej", "Ongole", "Hariana"
  ];

  const generateQRCode = () => {
    if (!animalData.pashuAadhaar || !animalData.breed || !animalData.ownerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in Pashu Aadhaar, Breed, and Owner Name",
        variant: "destructive"
      });
      return;
    }

    // Create QR data object
    const qrData = {
      id: animalData.pashuAadhaar,
      breed: animalData.breed,
      owner: animalData.ownerName,
      contact: animalData.ownerContact,
      location: animalData.location,
      age: animalData.age,
      gender: animalData.gender,
      vaccination: animalData.vaccinationDate,
      checkup: animalData.lastCheckup,
      notes: animalData.notes,
      generated: new Date().toISOString()
    };

    // Generate QR code (in real app, this would use a QR library)
    const qrString = JSON.stringify(qrData);
    setGeneratedQR(qrString);
    
    toast({
      title: "QR Code Generated",
      description: "QR code has been created successfully!",
    });
  };

  const downloadQR = () => {
    if (!generatedQR) return;
    
    // In a real app, this would generate and download an actual QR image
    const element = document.createElement('a');
    const file = new Blob([generatedQR], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${animalData.pashuAadhaar}_qr_data.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: "QR data file downloaded successfully!",
    });
  };

  const copyQRData = () => {
    if (!generatedQR) return;
    
    navigator.clipboard.writeText(generatedQR);
    toast({
      title: "Copied to Clipboard",
      description: "QR data has been copied to clipboard!",
    });
  };

  const printQR = () => {
    if (!generatedQR) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Animal QR Code - ${animalData.pashuAadhaar}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .qr-placeholder { 
                width: 200px; height: 200px; 
                border: 2px dashed #ccc; 
                display: flex; align-items: center; justify-content: center;
                margin: 20px auto;
                background: #f9f9f9;
              }
              .animal-info { margin-top: 20px; }
              .info-row { margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Animal Identification QR Code</h1>
              <h2>Pashu Aadhaar: ${animalData.pashuAadhaar}</h2>
            </div>
            <div class="qr-placeholder">
              <p>QR Code Placeholder</p>
            </div>
            <div class="animal-info">
              <div class="info-row"><strong>Breed:</strong> ${animalData.breed}</div>
              <div class="info-row"><strong>Owner:</strong> ${animalData.ownerName}</div>
              <div class="info-row"><strong>Contact:</strong> ${animalData.ownerContact}</div>
              <div class="info-row"><strong>Location:</strong> ${animalData.location}</div>
              <div class="info-row"><strong>Age:</strong> ${animalData.age}</div>
              <div class="info-row"><strong>Gender:</strong> ${animalData.gender}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-earth">
        <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="w-6 h-6" />
            <span>Animal QR Code Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Animal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pashuAadhaar">Pashu Aadhaar *</Label>
                  <Input
                    id="pashuAadhaar"
                    placeholder="PA001234"
                    value={animalData.pashuAadhaar}
                    onChange={(e) => setAnimalData(prev => ({ ...prev, pashuAadhaar: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed *</Label>
                  <Select value={animalData.breed} onValueChange={(value) => setAnimalData(prev => ({ ...prev, breed: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select breed" />
                    </SelectTrigger>
                    <SelectContent>
                      {breedOptions.map((breed) => (
                        <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    placeholder="Ramesh Patel"
                    value={animalData.ownerName}
                    onChange={(e) => setAnimalData(prev => ({ ...prev, ownerName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerContact">Contact Number</Label>
                  <Input
                    id="ownerContact"
                    placeholder="+91 98765 43210"
                    value={animalData.ownerContact}
                    onChange={(e) => setAnimalData(prev => ({ ...prev, ownerContact: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Ahmedabad, Gujarat"
                  value={animalData.location}
                  onChange={(e) => setAnimalData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    placeholder="3 years"
                    value={animalData.age}
                    onChange={(e) => setAnimalData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={animalData.gender} onValueChange={(value) => setAnimalData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vaccinationDate">Last Vaccination</Label>
                  <Input
                    id="vaccinationDate"
                    type="date"
                    value={animalData.vaccinationDate}
                    onChange={(e) => setAnimalData(prev => ({ ...prev, vaccinationDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastCheckup">Last Health Checkup</Label>
                <Input
                  id="lastCheckup"
                  type="date"
                  value={animalData.lastCheckup}
                  onChange={(e) => setAnimalData(prev => ({ ...prev, lastCheckup: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about the animal..."
                  value={animalData.notes}
                  onChange={(e) => setAnimalData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button
                onClick={generateQRCode}
                className="w-full bg-gradient-earth text-white hover:opacity-90"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
            </div>

            {/* QR Code Display Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated QR Code</h3>
              
              {generatedQR ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-gradient-natural">
                    <div className="w-48 h-48 mx-auto bg-white rounded-lg shadow-warm flex items-center justify-center border-2 border-primary">
                      <div className="text-center">
                        <QrCode className="w-16 h-16 mx-auto text-primary mb-2" />
                        <p className="text-sm font-medium">QR Code</p>
                        <p className="text-xs text-muted-foreground">{animalData.pashuAadhaar}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <span className="font-medium">Pashu Aadhaar:</span>
                      <Badge variant="outline">{animalData.pashuAadhaar}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <span className="font-medium">Breed:</span>
                      <Badge variant="secondary">{animalData.breed}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <span className="font-medium">Owner:</span>
                      <span className="text-sm">{animalData.ownerName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={downloadQR} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={copyQRData} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Data
                    </Button>
                    <Button onClick={printQR} variant="outline" size="sm">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={() => setGeneratedQR("")} variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-gradient-natural">
                  <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Fill in the form and generate QR code</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;
