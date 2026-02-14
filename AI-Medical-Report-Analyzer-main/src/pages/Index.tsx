import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReportUpload from "@/components/ReportUpload";
import ReportAnalysis from "@/components/ReportAnalysis";
import Footer from "@/components/Footer";

const Index = () => {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleTextExtracted = (text: string, name: string) => {
    setExtractedText(text);
    setFileName(name);
  };

  const handleReset = () => {
    setExtractedText(null);
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!extractedText ? (
        <>
          <Hero />
          <ReportUpload onTextExtracted={handleTextExtracted} />
        </>
      ) : (
        <ReportAnalysis 
          extractedText={extractedText} 
          fileName={fileName}
          onReset={handleReset}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
