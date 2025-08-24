import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleProfileSave = () => {
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data exported!",
      description: "Your wellness data has been downloaded as a CSV file.",
    });
  };

  const handleClearData = () => {
    toast({
      title: "Data cleared!",
      description: "All your habit data has been removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b px-4 py-6">
        <div className="container mx-auto flex items-center">
          <Link to="/dashboard" className="mr-4 text-primary">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Settings & Profile</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Profile Info */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>

            <Button onClick={handleProfileSave} variant="wellness" className="w-full">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleExportData}
              variant="wellness-outline" 
              className="w-full"
            >
              Export Data
            </Button>
            
            <Button 
              onClick={handleClearData}
              variant="destructive" 
              className="w-full"
            >
              Clear All Data
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Clearing data will permanently remove all your habit logs and progress.
            </p>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">App Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Build</span>
              <span className="font-medium">2024.01.15</span>
            </div>
            
            <Button variant="link" className="w-full p-0 text-primary">
              Privacy Policy
            </Button>
            
            <Button variant="link" className="w-full p-0 text-primary">
              Terms of Service
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="border-0 shadow-lg bg-wellness-gradient text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-lg opacity-90 mb-4">
              We're here to support your wellness journey.
            </p>
            <Button variant="wellness-outline" className="text-white border-white hover:bg-white hover:text-primary">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-5 h-16">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">📊</span>
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="/habits" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">📝</span>
            <span className="text-xs">Log</span>
          </Link>
          <Link to="/stats" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">📈</span>
            <span className="text-xs">Stats</span>
          </Link>
          <Link to="/reminders" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">⏰</span>
            <span className="text-xs">Reminders</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center justify-center text-primary">
            <span className="text-xl">⚙️</span>
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Settings;