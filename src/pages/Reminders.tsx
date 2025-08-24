import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Reminders = () => {
  const { toast } = useToast();
  const [reminderTime, setReminderTime] = useState("09:00");
  const [motivationalTips, setMotivationalTips] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your reminder preferences have been updated.",
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
          <h1 className="text-2xl font-bold text-foreground">Reminder Settings</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Daily Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Enable Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded to log your habits</p>
              </div>
              <Switch
                checked={dailyReminders}
                onCheckedChange={setDailyReminders}
              />
            </div>

            {dailyReminders && (
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Motivational Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Daily Motivational Tips</Label>
                <p className="text-sm text-muted-foreground">Receive inspiring messages to keep you motivated</p>
              </div>
              <Switch
                checked={motivationalTips}
                onCheckedChange={setMotivationalTips}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-0 shadow-lg bg-wellness-gradient text-white">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌟</span>
                </div>
                <div>
                  <div className="font-medium">Wellness Tracker</div>
                  <div className="text-sm opacity-75">{reminderTime}</div>
                </div>
              </div>
              <div className="text-sm opacity-90">
                {dailyReminders && "Don't forget to log your habits today! "}
                {motivationalTips && "Remember: Progress, not perfection. Every small step counts! 💪"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={handleSave}
          variant="wellness" 
          size="lg" 
          className="w-full h-12 text-lg"
        >
          Save Settings
        </Button>
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
          <Link to="/reminders" className="flex flex-col items-center justify-center text-primary">
            <span className="text-xl">⏰</span>
            <span className="text-xs">Reminders</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">⚙️</span>
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Reminders;