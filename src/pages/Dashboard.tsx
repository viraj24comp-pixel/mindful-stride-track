import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [habits, setHabits] = useState({
    exercise: false,
    meditation: false,
    waterIntake: 0,
  });

  const streak = 7;
  const completionRate = 75;

  const toggleHabit = (habit: string) => {
    setHabits(prev => ({
      ...prev,
      [habit]: !prev[habit as keyof typeof habits]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Today's Summary</h1>
          <p className="text-muted-foreground">Keep up the great work!</p>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-8">
        {/* Daily Habit Log */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Daily Habit Log
              <Button variant="wellness" size="sm">+</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={habits.exercise}
                    onChange={() => toggleHabit('exercise')}
                    className="w-5 h-5 text-wellness-primary"
                  />
                  <span className="font-medium">Exercise</span>
                </div>
                <span className="text-2xl">💪</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={habits.meditation}
                    onChange={() => toggleHabit('meditation')}
                    className="w-5 h-5 text-wellness-primary"
                  />
                  <span className="font-medium">Meditation</span>
                </div>
                <span className="text-2xl">🧘</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={habits.waterIntake}
                    onChange={(e) => setHabits(prev => ({ ...prev, waterIntake: parseInt(e.target.value) || 0 }))}
                    className="w-16 h-8 text-center border rounded"
                    min="0"
                    max="20"
                  />
                  <span className="font-medium">Water Intake (cups)</span>
                </div>
                <span className="text-2xl">💧</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivation Section */}
        <Card className="border-0 shadow-lg bg-wellness-gradient text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Keep going! You're doing great.</h3>
            <p className="text-lg opacity-90">
              Every small step counts towards your wellness journey.
            </p>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Streak Counter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-wellness-primary mb-2">{streak}</div>
                <div className="text-muted-foreground">Day Streak</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-5 h-16">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-primary">
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
          <Link to="/settings" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">⚙️</span>
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;