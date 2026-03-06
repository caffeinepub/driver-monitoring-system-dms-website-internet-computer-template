import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Clock,
  Eye,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Activity className="h-4 w-4" />
              Advanced Driver Safety Technology
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Real-Time Driver Monitoring System
            </h1>
            <p className="text-xl text-muted-foreground">
              Enhance road safety with intelligent monitoring that detects
              dangerous driving behaviors in real-time, helping prevent
              accidents before they happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/dashboard" })}
                className="gap-2"
              >
                <LayoutDashboard className="h-5 w-5" />
                View Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What is DMS?</h2>
            <p className="text-lg text-muted-foreground">
              Our Driver Monitoring System uses advanced sensors and analytics
              to track driver behavior, detect potential safety issues, and
              provide actionable insights to improve fleet safety.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Continuous Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track driver behavior throughout every journey with real-time
                  event detection and logging.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Instant Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive immediate notifications when dangerous driving
                  patterns are detected.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyze trends over time to identify areas for driver training
                  and improvement.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Our system seamlessly integrates into your fleet operations with
              minimal setup.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold mb-2">
                  Driver Registration
                </h3>
                <p className="text-muted-foreground">
                  Register drivers with their credentials and license
                  information to begin monitoring their sessions.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold mb-2">Session Tracking</h3>
                <p className="text-muted-foreground">
                  Each driving session is automatically tracked from start to
                  finish, capturing all relevant events and metrics.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold mb-2">Event Detection</h3>
                <p className="text-muted-foreground">
                  The system monitors for dangerous behaviors like speeding,
                  hard braking, and lane departures in real-time.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold mb-2">Review & Analyze</h3>
                <p className="text-muted-foreground">
                  Access detailed reports and analytics through the dashboard to
                  identify trends and improve safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Tracked Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Metrics We Track</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive monitoring of critical safety indicators to keep
              your drivers and fleet safe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Speed Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track instances when drivers exceed safe speed limits, with
                  detailed speed data.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Hard Braking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Detect sudden braking events that may indicate distracted or
                  aggressive driving.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Activity className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Lane Departures</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor unintended lane changes that could signal drowsiness
                  or inattention.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track total driving time to ensure compliance with rest
                  requirements.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Event Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyze patterns in safety events to identify high-risk
                  drivers or routes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Real-Time Status</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor active sessions and receive live updates on driver
                  behavior.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-3xl md:text-4xl">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg">
                Explore the dashboard to see how our Driver Monitoring System
                can help improve your fleet's safety.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/dashboard" })}
                className="gap-2"
              >
                <LayoutDashboard className="h-5 w-5" />
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function LayoutDashboard({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
