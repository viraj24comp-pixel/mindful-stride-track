import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/wellness-hero.jpg";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-wellness-gradient opacity-80" />
        
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to 
              <span className="block text-transparent bg-gradient-to-r from-white to-wellness-accent bg-clip-text">
                Wellness Tracker
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Track your habits, stay motivated, and build healthy routines that transform your life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="wellness" size="lg" className="text-lg px-8 py-4 h-auto">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="wellness-outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Your Journey to Better Health
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple tools to help you build lasting wellness habits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-wellness-glow transition-shadow">
              <div className="w-16 h-16 bg-wellness-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your daily habits and see your improvement over time with beautiful visualizations.
              </p>
            </Card>
            
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-wellness-glow transition-shadow">
              <div className="w-16 h-16 bg-wellness-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Stay Motivated</h3>
              <p className="text-muted-foreground">
                Get personalized reminders and motivational tips to keep you on track with your goals.
              </p>
            </Card>
            
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-wellness-glow transition-shadow">
              <div className="w-16 h-16 bg-wellness-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Habits</h3>
              <p className="text-muted-foreground">
                Create sustainable routines that stick with our science-backed habit formation system.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;