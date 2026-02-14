import { ArrowDown, Shield, Eye, BarChart3 } from "lucide-react";

const Hero = () => {
  const features = [
    { icon: Shield, label: "Private", description: "Data never leaves your device" },
    { icon: Eye, label: "Clear", description: "Simple explanations for complex terms" },
    { icon: BarChart3, label: "Visual", description: "Color-coded health indicators" },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background" />
      
      {/* Floating decoration */}
      <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-health-info/10 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-health-normal-bg px-4 py-1.5 text-sm font-medium text-health-normal animate-fade-in">
            <Shield className="h-4 w-4" />
            <span>No data uploaded • 100% Private</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-slide-up">
            Understand Your{" "}
            <span className="text-gradient">Medical Reports</span>{" "}
            with Clarity
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Upload your lab reports and get instant, easy-to-understand explanations. 
            All processing happens in your browser — your data never leaves your device.
          </p>
          
          <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <a 
              href="#upload" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="font-medium">Get Started</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {features.map((feature) => (
              <div 
                key={feature.label}
                className="group rounded-2xl bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{feature.label}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
