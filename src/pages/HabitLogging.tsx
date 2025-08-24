import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: number;
  name: string;
  type: "checkbox" | "number";
  completed?: boolean;
  value?: number;
  unit?: string;
}

const HabitLogging = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Exercise", completed: false, type: "checkbox" },
    { id: 2, name: "Meditation", completed: false, type: "checkbox" },
    { id: 3, name: "Water Intake", value: 0, type: "number", unit: "cups" },
  ]);

  const [newHabit, setNewHabit] = useState("");

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id && habit.type === "checkbox" 
        ? { ...habit, completed: !habit.completed } 
        : habit
    ));
  };

  const updateHabitValue = (id: number, value: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id && habit.type === "number"
        ? { ...habit, value } 
        : habit
    ));
  };

  const addCustomHabit = () => {
    if (newHabit.trim()) {
      const newId = Math.max(...habits.map(h => h.id)) + 1;
      setHabits(prev => [...prev, {
        id: newId,
        name: newHabit,
        completed: false,
        type: "checkbox" as const
      }]);
      setNewHabit("");
    }
  };

  const saveProgress = () => {
    toast({
      title: "Progress saved!",
      description: "Your habit data has been updated successfully.",
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
          <h1 className="text-2xl font-bold text-foreground">Log Your Habits</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Today's Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  {habit.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={habit.completed || false}
                      onChange={() => toggleHabit(habit.id)}
                      className="w-5 h-5 text-wellness-primary"
                    />
                  ) : (
                    <Input
                      type="number"
                      value={habit.value || 0}
                      onChange={(e) => updateHabitValue(habit.id, parseInt(e.target.value) || 0)}
                      className="w-20 h-8 text-center"
                      min="0"
                    />
                  )}
                  <span className="font-medium">
                    {habit.name}
                    {habit.unit && ` (${habit.unit})`}
                  </span>
                </div>
                <span className="text-2xl">
                  {habit.name === "Exercise" && "💪"}
                  {habit.name === "Meditation" && "🧘"}
                  {habit.name === "Water Intake" && "💧"}
                  {!["Exercise", "Meditation", "Water Intake"].includes(habit.name) && "✨"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Add Custom Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter habit name"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addCustomHabit()}
              />
              <Button onClick={addCustomHabit} variant="wellness">
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={saveProgress}
          variant="wellness" 
          size="lg" 
          className="w-full h-12 text-lg"
        >
          Save Progress
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-5 h-16">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xl">📊</span>
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="/habits" className="flex flex-col items-center justify-center text-primary">
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

export default HabitLogging;