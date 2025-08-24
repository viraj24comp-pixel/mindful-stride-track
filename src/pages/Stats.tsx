import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Stats = () => {
  const weeklyData = [
    { day: "Mon", completed: 3 },
    { day: "Tue", completed: 2 },
    { day: "Wed", completed: 3 },
    { day: "Thu", completed: 1 },
    { day: "Fri", completed: 3 },
    { day: "Sat", completed: 2 },
    { day: "Sun", completed: 3 },
  ];

  const currentStreak = 7;
  const longestStreak = 14;
  const totalHabits = 156;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b px-4 py-6">
        <div className="container mx-auto flex items-center">
          <Link to="/dashboard" className="mr-4 text-primary">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-wellness-primary mb-2">{currentStreak}</div>
              <div className="text-muted-foreground">Current Streak</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-wellness-secondary mb-2">{longestStreak}</div>
              <div className="text-muted-foreground">Longest Streak</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-wellness-accent mb-2">{totalHabits}</div>
              <div className="text-muted-foreground">Total Completions</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>This Week's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">{day.day}</div>
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                      day.completed >= 3 
                        ? 'bg-wellness-primary text-white' 
                        : day.completed >= 2 
                        ? 'bg-wellness-secondary text-white'
                        : day.completed >= 1
                        ? 'bg-wellness-accent text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day.completed}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-wellness-primary rounded-full mr-2"></div>
                <span>3+ habits</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-wellness-secondary rounded-full mr-2"></div>
                <span>2 habits</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-wellness-accent rounded-full mr-2"></div>
                <span>1 habit</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Completion Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 text-sm text-muted-foreground">{day.day}</div>
                  <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="bg-wellness-gradient h-full rounded-full transition-all duration-500"
                      style={{ width: `${(day.completed / 3) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-sm font-medium">{day.completed}/3</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="border-0 shadow-lg bg-wellness-gradient text-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">🎉 Great Progress!</h3>
            <p className="text-lg opacity-90">
              You completed an average of 2.4 habits per day this week. 
              Friday was your most challenging day - let's work on that!
            </p>
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
          <Link to="/stats" className="flex flex-col items-center justify-center text-primary">
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

export default Stats;