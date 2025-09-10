import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe,
  Smartphone,
  Wifi,
  Battery,
  Volume2,
  Eye,
  Lock,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AppSettings {
  general: {
    language: string;
    theme: string;
    autoSync: boolean;
    offlineMode: boolean;
  };
  notifications: {
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
  privacy: {
    locationTracking: boolean;
    dataCollection: boolean;
    analytics: boolean;
    crashReporting: boolean;
  };
  sync: {
    autoBackup: boolean;
    backupFrequency: string;
    cloudSync: boolean;
    wifiOnly: boolean;
  };
}

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings>({
    general: {
      language: "en",
      theme: "light",
      autoSync: true,
      offlineMode: false
    },
    notifications: {
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      soundEnabled: true,
      vibrationEnabled: true
    },
    privacy: {
      locationTracking: true,
      dataCollection: true,
      analytics: false,
      crashReporting: true
    },
    sync: {
      autoBackup: true,
      backupFrequency: "daily",
      cloudSync: true,
      wifiOnly: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSettingChange = (category: keyof AppSettings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = async () => {
    setIsLoading(true);
    
    // Simulate saving settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would save to backend/local storage
    localStorage.setItem('app-settings', JSON.stringify(settings));
    
    setIsLoading(false);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully",
    });
  };

  const resetSettings = () => {
    setSettings({
      general: {
        language: "en",
        theme: "light",
        autoSync: true,
        offlineMode: false
      },
      notifications: {
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        soundEnabled: true,
        vibrationEnabled: true
      },
      privacy: {
        locationTracking: true,
        dataCollection: true,
        analytics: false,
        crashReporting: true
      },
      sync: {
        autoBackup: true,
        backupFrequency: "daily",
        cloudSync: true,
        wifiOnly: true
      }
    });
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values",
    });
  };

  const exportSettings = () => {
    const data = JSON.stringify(settings, null, 2);
    const element = document.createElement('a');
    const file = new Blob([data], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'app-settings.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Settings Exported",
      description: "Your settings have been exported successfully",
    });
  };

  const clearCache = () => {
    // Simulate cache clearing
    toast({
      title: "Cache Cleared",
      description: "Application cache has been cleared successfully",
    });
  };

  const getStorageInfo = () => {
    return {
      used: "45.2 MB",
      available: "2.1 GB",
      total: "2.1 GB"
    };
  };

  const storageInfo = getStorageInfo();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-earth">
        <CardHeader className="bg-gradient-earth text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-6 h-6" />
            <span>App Preferences & Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="flex items-center space-x-2">
                <SettingsIcon className="w-4 h-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="sync" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Sync & Backup</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>About</span>
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appearance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={settings.general.language} 
                        onValueChange={(value) => handleSettingChange('general', 'language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिन्दी</SelectItem>
                          <SelectItem value="gu">ગુજરાતી</SelectItem>
                          <SelectItem value="ta">தமிழ்</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select 
                        value={settings.general.theme} 
                        onValueChange={(value) => handleSettingChange('general', 'theme', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">App Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Sync</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically sync data when connected
                        </p>
                      </div>
                      <Switch
                        checked={settings.general.autoSync}
                        onCheckedChange={(checked) => handleSettingChange('general', 'autoSync', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Offline Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable offline functionality
                        </p>
                      </div>
                      <Switch
                        checked={settings.general.offlineMode}
                        onCheckedChange={(checked) => handleSettingChange('general', 'offlineMode', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications on your device
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'smsNotifications', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4">Notification Sounds</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Sound Enabled</Label>
                          <p className="text-sm text-muted-foreground">
                            Play sound for notifications
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.soundEnabled}
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'soundEnabled', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Vibration</Label>
                          <p className="text-sm text-muted-foreground">
                            Vibrate device for notifications
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.vibrationEnabled}
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'vibrationEnabled', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Location Tracking</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow app to track your location for services
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.locationTracking}
                        onCheckedChange={(checked) => handleSettingChange('privacy', 'locationTracking', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Collection</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow collection of usage data for improvements
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.dataCollection}
                        onCheckedChange={(checked) => handleSettingChange('privacy', 'dataCollection', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Share anonymous analytics data
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.analytics}
                        onCheckedChange={(checked) => handleSettingChange('privacy', 'analytics', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Crash Reporting</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically report crashes for debugging
                        </p>
                      </div>
                      <Switch
                        checked={settings.privacy.crashReporting}
                        onCheckedChange={(checked) => handleSettingChange('privacy', 'crashReporting', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sync & Backup Settings */}
            <TabsContent value="sync" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Backup Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Backup</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically backup your data
                        </p>
                      </div>
                      <Switch
                        checked={settings.sync.autoBackup}
                        onCheckedChange={(checked) => handleSettingChange('sync', 'autoBackup', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select 
                        value={settings.sync.backupFrequency} 
                        onValueChange={(value) => handleSettingChange('sync', 'backupFrequency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cloud Sync</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cloud Sync</Label>
                        <p className="text-sm text-muted-foreground">
                          Sync data across devices
                        </p>
                      </div>
                      <Switch
                        checked={settings.sync.cloudSync}
                        onCheckedChange={(checked) => handleSettingChange('sync', 'cloudSync', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>WiFi Only</Label>
                        <p className="text-sm text-muted-foreground">
                          Sync only when connected to WiFi
                        </p>
                      </div>
                      <Switch
                        checked={settings.sync.wifiOnly}
                        onCheckedChange={(checked) => handleSettingChange('sync', 'wifiOnly', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Storage Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Used Storage</span>
                      <Badge variant="outline">{storageInfo.used}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available Storage</span>
                      <Badge variant="outline">{storageInfo.available}</Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={clearCache} variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button onClick={exportSettings} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">App Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>App Version</Label>
                      <p className="text-sm">1.0.0</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Build Number</Label>
                      <p className="text-sm">2024.01.20</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Last Updated</Label>
                      <p className="text-sm">January 20, 2024</p>
                    </div>
                    <div className="space-y-2">
                      <Label>User ID</Label>
                      <p className="text-sm font-mono">{user?.id || 'N/A'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Device Type</Label>
                      <p className="text-sm">Web Browser</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Platform</Label>
                      <p className="text-sm">Windows 10</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Browser</Label>
                      <p className="text-sm">Chrome 120.0</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Connection</Label>
                      <p className="text-sm">WiFi</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Support & Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Globe className="w-6 h-6 mb-2" />
                      Help Center
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <User className="w-6 h-6 mb-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Bell className="w-6 h-6 mb-2" />
                      Send Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button onClick={resetSettings} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
            <Button 
              onClick={saveSettings} 
              disabled={isLoading}
              className="bg-gradient-earth text-white hover:opacity-90"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
