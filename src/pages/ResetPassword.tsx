import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-wellness-glow">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-wellness-gradient bg-clip-text text-transparent">
              Reset Password
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Enter your email to receive reset instructions
            </p>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-12"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="wellness" 
                  size="lg" 
                  className="w-full h-12 text-lg"
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-wellness-gradient rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold">Check your email</h3>
                <p className="text-muted-foreground">
                  We've sent password reset instructions to {email}
                </p>
              </div>
            )}
            
            <div className="text-center mt-6">
              <Link to="/login" className="text-primary hover:underline text-sm">
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;