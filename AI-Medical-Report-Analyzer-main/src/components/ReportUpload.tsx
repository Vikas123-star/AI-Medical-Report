import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileImage, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createWorker } from "tesseract.js";

interface ReportUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
}

const ReportUpload = ({ onTextExtracted }: ReportUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const imageUrl = URL.createObjectURL(file);
      const { data: { text } } = await worker.recognize(imageUrl);
      await worker.terminate();
      
      URL.revokeObjectURL(imageUrl);
      
      if (text.trim()) {
        onTextExtracted(text, file.name);
      } else {
        setError("No text could be extracted from this image. Please try a clearer image.");
      }
    } catch (err) {
      console.error("OCR Error:", err);
      setError("Failed to process the image. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".bmp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <section id="upload" className="py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Upload Your Report
            </h2>
            <p className="text-muted-foreground">
              Drag and drop your medical report image or click to browse
            </p>
          </div>

          <div
            {...getRootProps()}
            className={`
              relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center
              transition-all duration-300 ease-out
              ${isDragActive 
                ? "border-primary bg-primary/5 scale-[1.02]" 
                : "border-border hover:border-primary/50 hover:bg-accent/30"
              }
              ${isProcessing ? "pointer-events-none opacity-70" : ""}
            `}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="space-y-4">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <div>
                  <p className="mb-2 font-medium text-foreground">Processing your report...</p>
                  <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{progress}% complete</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  {isDragActive ? (
                    <FileImage className="h-8 w-8 text-primary" />
                  ) : (
                    <Upload className="h-8 w-8 text-primary" />
                  )}
                </div>
                <p className="mb-2 text-lg font-medium text-foreground">
                  {isDragActive ? "Drop your file here" : "Drop your report here"}
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Supports PNG, JPG, JPEG, WebP, BMP
                </p>
                <Button variant="secondary" size="sm">
                  Browse Files
                </Button>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-health-critical-bg p-4 text-health-critical">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-health-normal" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-health-info" />
              <span>Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Local Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportUpload;
