import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Plus,
  User,
  MapPin,
  Calendar,
  Shield,
  Camera,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: "registration" | "health" | "vaccination" | "breeding";
  fields: FormField[];
  isPreFilled: boolean;
}

interface FormField {
  id: string;
  label: string;
  type: "text" | "select" | "date" | "textarea" | "number";
  required: boolean;
  options?: string[];
  value?: string;
}

const FormTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { toast } = useToast();

  const templates: FormTemplate[] = [
    {
      id: "REG001",
      name: "Animal Registration Form",
      description: "Complete registration form for new animal enrollment",
      category: "registration",
      isPreFilled: true,
      fields: [
        { id: "pashuAadhaar", label: "Pashu Aadhaar", type: "text", required: true, value: "PA" },
        { id: "breed", label: "Breed", type: "select", required: true, options: ["Gir", "Sahiwal", "Murrah Buffalo", "Holstein Cross", "Jersey Cross"] },
        { id: "ownerName", label: "Owner Name", type: "text", required: true },
        { id: "ownerContact", label: "Contact Number", type: "text", required: true },
        { id: "address", label: "Address", type: "textarea", required: true },
        { id: "location", label: "Location", type: "text", required: true },
        { id: "age", label: "Age", type: "text", required: true },
        { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female"] },
        { id: "color", label: "Color/Markings", type: "text", required: false },
        { id: "weight", label: "Weight (kg)", type: "number", required: false },
        { id: "registrationDate", label: "Registration Date", type: "date", required: true, value: new Date().toISOString().split('T')[0] }
      ]
    },
    {
      id: "HEALTH001",
      name: "Health Checkup Form",
      description: "Comprehensive health examination record",
      category: "health",
      isPreFilled: true,
      fields: [
        { id: "pashuAadhaar", label: "Pashu Aadhaar", type: "text", required: true },
        { id: "checkupDate", label: "Checkup Date", type: "date", required: true, value: new Date().toISOString().split('T')[0] },
        { id: "veterinarian", label: "Veterinarian Name", type: "text", required: true },
        { id: "temperature", label: "Body Temperature (°C)", type: "number", required: true },
        { id: "heartRate", label: "Heart Rate (BPM)", type: "number", required: true },
        { id: "respiratoryRate", label: "Respiratory Rate", type: "number", required: true },
        { id: "bodyCondition", label: "Body Condition Score", type: "select", required: true, options: ["1 (Poor)", "2 (Thin)", "3 (Good)", "4 (Fat)", "5 (Obese)"] },
        { id: "generalHealth", label: "General Health Status", type: "select", required: true, options: ["Excellent", "Good", "Fair", "Poor"] },
        { id: "symptoms", label: "Observed Symptoms", type: "textarea", required: false },
        { id: "diagnosis", label: "Diagnosis", type: "textarea", required: false },
        { id: "treatment", label: "Treatment Prescribed", type: "textarea", required: false },
        { id: "nextCheckup", label: "Next Checkup Date", type: "date", required: false }
      ]
    },
    {
      id: "VACC001",
      name: "Vaccination Record",
      description: "Vaccination and immunization tracking form",
      category: "vaccination",
      isPreFilled: true,
      fields: [
        { id: "pashuAadhaar", label: "Pashu Aadhaar", type: "text", required: true },
        { id: "vaccinationDate", label: "Vaccination Date", type: "date", required: true, value: new Date().toISOString().split('T')[0] },
        { id: "vaccineName", label: "Vaccine Name", type: "select", required: true, options: ["FMD", "HS", "BQ", "Anthrax", "PPR", "Brucellosis", "Theileriosis"] },
        { id: "batchNumber", label: "Batch Number", type: "text", required: true },
        { id: "manufacturer", label: "Manufacturer", type: "text", required: true },
        { id: "expiryDate", label: "Expiry Date", type: "date", required: true },
        { id: "dose", label: "Dose (ml)", type: "number", required: true },
        { id: "route", label: "Route of Administration", type: "select", required: true, options: ["Intramuscular", "Subcutaneous", "Intranasal", "Oral"] },
        { id: "veterinarian", label: "Veterinarian", type: "text", required: true },
        { id: "nextDue", label: "Next Due Date", type: "date", required: true },
        { id: "reactions", label: "Adverse Reactions", type: "textarea", required: false },
        { id: "notes", label: "Additional Notes", type: "textarea", required: false }
      ]
    },
    {
      id: "BREED001",
      name: "Breeding Record",
      description: "Animal breeding and reproduction tracking",
      category: "breeding",
      isPreFilled: true,
      fields: [
        { id: "femaleAadhaar", label: "Female Pashu Aadhaar", type: "text", required: true },
        { id: "maleAadhaar", label: "Male Pashu Aadhaar", type: "text", required: false },
        { id: "breedingDate", label: "Breeding Date", type: "date", required: true },
        { id: "breedingMethod", label: "Breeding Method", type: "select", required: true, options: ["Natural", "Artificial Insemination", "Embryo Transfer"] },
        { id: "semenSource", label: "Semen Source", type: "text", required: false },
        { id: "heatDetection", label: "Heat Detection Method", type: "select", required: true, options: ["Visual", "Teaser Bull", "Pedometer", "Hormone Test"] },
        { id: "pregnancyTest", label: "Pregnancy Test Date", type: "date", required: false },
        { id: "pregnancyResult", label: "Pregnancy Result", type: "select", required: false, options: ["Positive", "Negative", "Not Tested"] },
        { id: "expectedCalving", label: "Expected Calving Date", type: "date", required: false },
        { id: "actualCalving", label: "Actual Calving Date", type: "date", required: false },
        { id: "offspringAadhaar", label: "Offspring Pashu Aadhaar", type: "text", required: false },
        { id: "complications", label: "Complications", type: "textarea", required: false }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "registration": return "bg-earth-green/10 text-earth-green";
      case "health": return "bg-primary/10 text-primary";
      case "vaccination": return "bg-earth-orange/10 text-earth-orange";
      case "breeding": return "bg-earth-field/10 text-earth-field";
      default: return "bg-secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "registration": return <User className="w-4 h-4" />;
      case "health": return <Shield className="w-4 h-4" />;
      case "vaccination": return <CheckCircle className="w-4 h-4" />;
      case "breeding": return <Plus className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generateForm = () => {
    if (!selectedTemplate) return;
    
    // Pre-fill form with default values
    const preFilledData: Record<string, string> = {};
    selectedTemplate.fields.forEach(field => {
      if (field.value) {
        preFilledData[field.id] = field.value;
      }
    });
    setFormData(preFilledData);
    setIsPreviewMode(true);
    
    toast({
      title: "Form Generated",
      description: "Form has been pre-filled with default values",
    });
  };

  const downloadForm = () => {
    if (!selectedTemplate) return;
    
    const formContent = `
${selectedTemplate.name}
${selectedTemplate.description}

Generated on: ${new Date().toLocaleDateString()}

${selectedTemplate.fields.map(field => {
  const value = formData[field.id] || field.value || '';
  return `${field.label}: ${value}`;
}).join('\n')}
    `;
    
    const element = document.createElement('a');
    const file = new Blob([formContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Form Downloaded",
      description: "Form has been downloaded successfully!",
    });
  };

  const resetForm = () => {
    setFormData({});
    setIsPreviewMode(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="shadow-earth">
        <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>Pre-filled Registration Forms</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template Selection */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">Available Templates</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-warm ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{template.name}</h4>
                        <Badge className={getCategoryColor(template.category)}>
                          <div className="flex items-center space-x-1">
                            {getCategoryIcon(template.category)}
                            <span className="capitalize">{template.category}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {template.fields.length} fields
                        </span>
                        {template.isPreFilled && (
                          <Badge variant="outline" className="text-xs">
                            Pre-filled
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Form Preview/Edit */}
            <div className="lg:col-span-2">
              {selectedTemplate ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                      <p className="text-muted-foreground">{selectedTemplate.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={generateForm}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Generate Form
                      </Button>
                      <Button
                        onClick={downloadForm}
                        variant="outline"
                        size="sm"
                        disabled={!isPreviewMode}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {isPreviewMode ? (
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {selectedTemplate.fields.map((field) => (
                            <div key={field.id} className="space-y-2">
                              <Label htmlFor={field.id} className="flex items-center space-x-2">
                                <span>{field.label}</span>
                                {field.required && <span className="text-destructive">*</span>}
                              </Label>
                              
                              {field.type === "text" && (
                                <Input
                                  id={field.id}
                                  value={formData[field.id] || field.value || ''}
                                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                              )}
                              
                              {field.type === "number" && (
                                <Input
                                  id={field.id}
                                  type="number"
                                  value={formData[field.id] || field.value || ''}
                                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                              )}
                              
                              {field.type === "date" && (
                                <Input
                                  id={field.id}
                                  type="date"
                                  value={formData[field.id] || field.value || ''}
                                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                />
                              )}
                              
                              {field.type === "select" && (
                                <Select 
                                  value={formData[field.id] || field.value || ''} 
                                  onValueChange={(value) => handleFieldChange(field.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map((option) => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              
                              {field.type === "textarea" && (
                                <Textarea
                                  id={field.id}
                                  value={formData[field.id] || field.value || ''}
                                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  rows={3}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center py-12">
                          <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Form Preview</h3>
                          <p className="text-muted-foreground mb-4">
                            Click "Generate Form" to create a pre-filled form with default values
                          </p>
                          <Button onClick={generateForm} className="bg-gradient-earth text-white hover:opacity-90">
                            <Edit className="w-4 h-4 mr-2" />
                            Generate Form
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Template</h3>
                  <p className="text-muted-foreground">
                    Choose a form template from the list to get started
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

export default FormTemplates;
