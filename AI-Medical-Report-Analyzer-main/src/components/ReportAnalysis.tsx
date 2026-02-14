import { useState, useMemo } from "react";
import { FileText, ChevronDown, BookOpen, BarChart3, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import LabValueCard from "./LabValueCard";
import { parseLabValues, findMedicalTerms, type LabValue, type MedicalTerm } from "@/lib/medicalTerms";

interface ReportAnalysisProps {
  extractedText: string;
  fileName: string;
  onReset: () => void;
}

const ReportAnalysis = ({ extractedText, fileName, onReset }: ReportAnalysisProps) => {
  const [showRawText, setShowRawText] = useState(false);
  const [activeTab, setActiveTab] = useState<"values" | "terms" | "summary">("values");

  const labValues = useMemo(() => parseLabValues(extractedText), [extractedText]);
  const medicalTerms = useMemo(() => findMedicalTerms(extractedText), [extractedText]);

  const summary = useMemo(() => {
    const normal = labValues.filter(v => v.status === "normal").length;
    const warning = labValues.filter(v => v.status === "warning").length;
    const critical = labValues.filter(v => v.status === "critical").length;
    return { normal, warning, critical, total: labValues.length };
  }, [labValues]);

  const tabs = [
    { id: "values" as const, label: "Lab Values", icon: BarChart3, count: labValues.length },
    { id: "terms" as const, label: "Medical Terms", icon: BookOpen, count: medicalTerms.length },
    { id: "summary" as const, label: "Summary", icon: FileText },
  ];

  return (
    <section className="py-12 lg:py-20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Report Analysis</h2>
            <p className="text-muted-foreground">
              Analyzing: <span className="font-medium text-foreground">{fileName}</span>
            </p>
          </div>
          <Button variant="outline" onClick={onReset}>
            Upload New Report
          </Button>
        </div>

        {/* Quick Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-health-normal-bg p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-health-normal/20">
                <CheckCircle2 className="h-5 w-5 text-health-normal" />
              </div>
              <div>
                <p className="text-2xl font-bold text-health-normal">{summary.normal}</p>
                <p className="text-sm text-muted-foreground">Normal Values</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-health-warning-bg p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-health-warning/20">
                <AlertTriangle className="h-5 w-5 text-health-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-health-warning">{summary.warning}</p>
                <p className="text-sm text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-health-critical-bg p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-health-critical/20">
                <XCircle className="h-5 w-5 text-health-critical" />
              </div>
              <div>
                <p className="text-2xl font-bold text-health-critical">{summary.critical}</p>
                <p className="text-sm text-muted-foreground">Require Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "values" && (
          <div>
            {labValues.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {labValues.map((value, index) => (
                  <LabValueCard key={`${value.name}-${index}`} labValue={value} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium text-foreground">No Lab Values Detected</h3>
                <p className="text-muted-foreground">
                  We couldn't find standard lab values in this report. The raw text is available below.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "terms" && (
          <div>
            {medicalTerms.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {medicalTerms.map((term, index) => (
                  <div key={index} className="rounded-xl border border-border/50 bg-card p-5 shadow-soft">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                        {term.category}
                      </span>
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{term.term}</h3>
                    <p className="text-sm text-muted-foreground">{term.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium text-foreground">No Medical Terms Found</h3>
                <p className="text-muted-foreground">
                  We couldn't identify specific medical terms in this report.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "summary" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Report Overview</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  We analyzed your report and found <strong className="text-foreground">{summary.total}</strong> lab values.
                </p>
                {summary.normal > 0 && (
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-health-normal" />
                    <span><strong>{summary.normal}</strong> values are within normal range</span>
                  </p>
                )}
                {summary.warning > 0 && (
                  <p className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-health-warning" />
                    <span><strong>{summary.warning}</strong> values are slightly outside normal range</span>
                  </p>
                )}
                {summary.critical > 0 && (
                  <p className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-health-critical" />
                    <span><strong>{summary.critical}</strong> values significantly deviate from normal</span>
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-health-warning/30 bg-health-warning-bg p-4">
              <p className="text-sm text-health-warning">
                <strong>Important:</strong> This analysis is for educational purposes only. Always consult with a healthcare professional for proper interpretation of your medical reports.
              </p>
            </div>
          </div>
        )}

        {/* Raw Text Toggle */}
        <div className="mt-8">
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${showRawText ? "rotate-180" : ""}`} />
            {showRawText ? "Hide" : "Show"} Extracted Text
          </button>
          
          {showRawText && (
            <div className="mt-4 rounded-xl bg-muted/50 p-4">
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-sm text-muted-foreground">
                {extractedText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportAnalysis;
