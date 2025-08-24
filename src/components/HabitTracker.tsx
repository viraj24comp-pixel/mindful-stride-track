import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HabitEntry {
  id: string;
  date: string;
  exercise: {
    duration: number;
    type: string;
  };
  meditation: {
    minutes: number;
  };
  water: {
    cups: number;
  };
  notes: string;
}

interface HabitFormData {
  exerciseDuration: string;
  exerciseType: string;
  meditationMinutes: string;
  waterCups: string;
  notes: string;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<HabitEntry[]>([]);
  const [formData, setFormData] = useState<HabitFormData>({
    exerciseDuration: '',
    exerciseType: '',
    meditationMinutes: '',
    waterCups: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Partial<HabitFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('mindful-habits');
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (error) {
        console.error('Error loading habits:', error);
      }
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem('mindful-habits', JSON.stringify(habits));
  }, [habits]);

  const validateForm = (): boolean => {
    const newErrors: Partial<HabitFormData> = {};

    // Exercise validation
    if (formData.exerciseDuration && (isNaN(Number(formData.exerciseDuration)) || Number(formData.exerciseDuration) <= 0)) {
      newErrors.exerciseDuration = 'Please enter a valid duration in minutes';
    }

    if (formData.exerciseDuration && !formData.exerciseType.trim()) {
      newErrors.exerciseType = 'Please specify the type of exercise';
    }

    // Meditation validation
    if (formData.meditationMinutes && (isNaN(Number(formData.meditationMinutes)) || Number(formData.meditationMinutes) <= 0)) {
      newErrors.meditationMinutes = 'Please enter a valid duration in minutes';
    }

    // Water validation
    if (formData.waterCups && (isNaN(Number(formData.waterCups)) || Number(formData.waterCups) <= 0)) {
      newErrors.waterCups = 'Please enter a valid number of cups';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof HabitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newHabit: HabitEntry = {
        id: Date.now().toString(),
        date: selectedDate,
        exercise: {
          duration: formData.exerciseDuration ? Number(formData.exerciseDuration) : 0,
          type: formData.exerciseType.trim()
        },
        meditation: {
          minutes: formData.meditationMinutes ? Number(formData.meditationMinutes) : 0
        },
        water: {
          cups: formData.waterCups ? Number(formData.waterCups) : 0
        },
        notes: formData.notes.trim()
      };

      // Check if habit already exists for selected date
      const existingHabitIndex = habits.findIndex(h => h.date === selectedDate);
      
      if (existingHabitIndex !== -1) {
        // Update existing habit
        const updatedHabits = [...habits];
        updatedHabits[existingHabitIndex] = newHabit;
        setHabits(updatedHabits);
      } else {
        // Add new habit
        setHabits(prev => [...prev, newHabit]);
      }

      // Reset form
      setFormData({
        exerciseDuration: '',
        exerciseType: '',
        meditationMinutes: '',
        waterCups: '',
        notes: ''
      });

      // Show success feedback
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);

    } catch (error) {
      console.error('Error saving habit:', error);
      setIsSubmitting(false);
    }
  };

  const getTodayHabit = () => {
    return habits.find(h => h.date === selectedDate);
  };

  const todayHabit = getTodayHabit();

  const getTotalStats = () => {
    const last7Days = habits
      .filter(h => {
        const habitDate = new Date(h.date);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return habitDate >= sevenDaysAgo;
      });

    return {
      totalExercise: last7Days.reduce((sum, h) => sum + h.exercise.duration, 0),
      totalMeditation: last7Days.reduce((sum, h) => sum + h.meditation.minutes, 0),
      totalWater: last7Days.reduce((sum, h) => sum + h.water.cups, 0),
      daysTracked: last7Days.length
    };
  };

  const stats = getTotalStats();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-wellness-primary to-wellness-secondary bg-clip-text text-transparent">
          Habit Tracker
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your daily wellness habits and build a healthier lifestyle
        </p>
      </div>

      {/* Stats Overview */}
      <Card className="bg-gradient-to-r from-wellness-primary/10 to-wellness-secondary/10 border-wellness-primary/20">
        <CardHeader>
          <CardTitle className="text-wellness-primary">Weekly Overview</CardTitle>
          <CardDescription>Your wellness journey over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg border border-wellness-primary/20">
              <div className="text-2xl font-bold text-wellness-primary">{stats.totalExercise}</div>
              <div className="text-sm text-muted-foreground">Exercise Minutes</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg border border-wellness-primary/20">
              <div className="text-2xl font-bold text-wellness-primary">{stats.totalMeditation}</div>
              <div className="text-sm text-muted-foreground">Meditation Minutes</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg border border-wellness-primary/20">
              <div className="text-2xl font-bold text-wellness-primary">{stats.totalWater}</div>
              <div className="text-sm text-muted-foreground">Water Cups</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg border border-wellness-primary/20">
              <div className="text-2xl font-bold text-wellness-primary">{stats.daysTracked}</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Habit Logging Form */}
        <Card className="border-wellness-primary/20">
          <CardHeader>
            <CardTitle className="text-wellness-primary">Log Today's Habits</CardTitle>
            <CardDescription>Record your wellness activities for today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-foreground">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="border-wellness-primary/30 focus:border-wellness-primary"
                />
              </div>

              {/* Exercise Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-wellness-primary">Exercise</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="exerciseDuration" className="text-sm font-medium text-foreground">
                      Duration (minutes)
                    </label>
                    <Input
                      id="exerciseDuration"
                      type="number"
                      placeholder="30"
                      value={formData.exerciseDuration}
                      onChange={(e) => handleInputChange('exerciseDuration', e.target.value)}
                      className={cn(
                        "border-wellness-primary/30 focus:border-wellness-primary",
                        errors.exerciseDuration && "border-destructive"
                      )}
                      min="0"
                      step="1"
                    />
                    {errors.exerciseDuration && (
                      <p className="text-sm text-destructive">{errors.exerciseDuration}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="exerciseType" className="text-sm font-medium text-foreground">
                      Type
                    </label>
                    <Input
                      id="exerciseType"
                      type="text"
                      placeholder="Running, Yoga, etc."
                      value={formData.exerciseType}
                      onChange={(e) => handleInputChange('exerciseType', e.target.value)}
                      className={cn(
                        "border-wellness-primary/30 focus:border-wellness-primary",
                        errors.exerciseType && "border-destructive"
                      )}
                    />
                    {errors.exerciseType && (
                      <p className="text-sm text-destructive">{errors.exerciseType}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Meditation Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-wellness-primary">Meditation</h3>
                <div className="space-y-2">
                  <label htmlFor="meditationMinutes" className="text-sm font-medium text-foreground">
                    Minutes
                  </label>
                  <Input
                    id="meditationMinutes"
                    type="number"
                    placeholder="15"
                    value={formData.meditationMinutes}
                    onChange={(e) => handleInputChange('meditationMinutes', e.target.value)}
                    className={cn(
                      "border-wellness-primary/30 focus:border-wellness-primary",
                      errors.meditationMinutes && "border-destructive"
                    )}
                    min="0"
                    step="1"
                  />
                  {errors.meditationMinutes && (
                    <p className="text-sm text-destructive">{errors.meditationMinutes}</p>
                  )}
                </div>
              </div>

              {/* Water Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-wellness-primary">Water Intake</h3>
                <div className="space-y-2">
                  <label htmlFor="waterCups" className="text-sm font-medium text-foreground">
                    Cups (8 oz each)
                  </label>
                  <Input
                    id="waterCups"
                    type="number"
                    placeholder="8"
                    value={formData.waterCups}
                    onChange={(e) => handleInputChange('waterCups', e.target.value)}
                    className={cn(
                      "border-wellness-primary/30 focus:border-wellness-primary",
                      errors.waterCups && "border-destructive"
                    )}
                    min="0"
                    step="0.5"
                  />
                  {errors.waterCups && (
                    <p className="text-sm text-destructive">{errors.waterCups}</p>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-foreground">
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  placeholder="How did you feel? Any insights?"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-wellness-primary/30 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                variant="wellness"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : todayHabit ? 'Update Today\'s Habits' : 'Log Today\'s Habits'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card className="border-wellness-primary/20">
          <CardHeader>
            <CardTitle className="text-wellness-primary">Today's Summary</CardTitle>
            <CardDescription>
              {todayHabit ? 'Your habits for today' : 'No habits logged yet for today'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayHabit ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {todayHabit.exercise.duration > 0 && (
                    <div className="p-4 bg-wellness-primary/10 rounded-lg border border-wellness-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-wellness-primary">Exercise</h4>
                          <p className="text-sm text-muted-foreground">
                            {todayHabit.exercise.type} - {todayHabit.exercise.duration} minutes
                          </p>
                        </div>
                        <div className="text-2xl">🏃‍♂️</div>
                      </div>
                    </div>
                  )}

                  {todayHabit.meditation.minutes > 0 && (
                    <div className="p-4 bg-wellness-secondary/10 rounded-lg border border-wellness-secondary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-wellness-secondary">Meditation</h4>
                          <p className="text-sm text-muted-foreground">
                            {todayHabit.meditation.minutes} minutes
                          </p>
                        </div>
                        <div className="text-2xl">🧘‍♀️</div>
                      </div>
                    </div>
                  )}

                  {todayHabit.water.cups > 0 && (
                    <div className="p-4 bg-wellness-accent/10 rounded-lg border border-wellness-accent/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-wellness-accent">Water Intake</h4>
                          <p className="text-sm text-muted-foreground">
                            {todayHabit.water.cups} cups ({todayHabit.water.cups * 8} oz)
                          </p>
                        </div>
                        <div className="text-2xl">💧</div>
                      </div>
                    </div>
                  )}

                  {todayHabit.notes && (
                    <div className="p-4 bg-muted/20 rounded-lg border border-muted/30">
                      <h4 className="font-semibold text-foreground mb-2">Notes</h4>
                      <p className="text-sm text-muted-foreground">{todayHabit.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-4">📝</div>
                <p>Start your wellness journey by logging your first habit!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Habits */}
      {habits.length > 0 && (
        <Card className="border-wellness-primary/20">
          <CardHeader>
            <CardTitle className="text-wellness-primary">Recent Habits</CardTitle>
            <CardDescription>Your wellness journey over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {habits
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((habit) => (
                  <div
                    key={habit.id}
                    className="p-4 bg-muted/20 rounded-lg border border-muted/30 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-foreground">
                            {new Date(habit.date).toLocaleDateString()}
                          </span>
                          {habit.exercise.duration > 0 && (
                            <span className="text-wellness-primary">
                              🏃‍♂️ {habit.exercise.duration}m {habit.exercise.type}
                            </span>
                          )}
                          {habit.meditation.minutes > 0 && (
                            <span className="text-wellness-secondary">
                              🧘‍♀️ {habit.meditation.minutes}m
                            </span>
                          )}
                          {habit.water.cups > 0 && (
                            <span className="text-wellness-accent">
                              💧 {habit.water.cups} cups
                            </span>
                          )}
                        </div>
                        {habit.notes && (
                          <p className="text-sm text-muted-foreground mt-2">{habit.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HabitTracker;
