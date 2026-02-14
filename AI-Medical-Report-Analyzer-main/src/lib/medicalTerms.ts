export interface LabValue {
  name: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  status: "normal" | "warning" | "critical";
  explanation: string;
  category: string;
}

export interface MedicalTerm {
  term: string;
  explanation: string;
  category: string;
}

// Common medical abbreviations and their explanations
export const medicalTermsDatabase: Record<string, MedicalTerm> = {
  "hba1c": {
    term: "HbA1c (Glycated Hemoglobin)",
    explanation: "Measures your average blood sugar level over the past 2-3 months. It helps monitor diabetes control.",
    category: "Diabetes"
  },
  "tsh": {
    term: "TSH (Thyroid Stimulating Hormone)",
    explanation: "Controls how much thyroid hormone your thyroid gland produces. Abnormal levels may indicate thyroid problems.",
    category: "Thyroid"
  },
  "t3": {
    term: "T3 (Triiodothyronine)",
    explanation: "An active thyroid hormone that regulates metabolism, heart rate, and body temperature.",
    category: "Thyroid"
  },
  "t4": {
    term: "T4 (Thyroxine)",
    explanation: "The main hormone produced by the thyroid gland. It's converted to T3 in the body.",
    category: "Thyroid"
  },
  "hemoglobin": {
    term: "Hemoglobin (Hb)",
    explanation: "The protein in red blood cells that carries oxygen throughout your body. Low levels may indicate anemia.",
    category: "Blood"
  },
  "hb": {
    term: "Hemoglobin (Hb)",
    explanation: "The protein in red blood cells that carries oxygen throughout your body. Low levels may indicate anemia.",
    category: "Blood"
  },
  "rbc": {
    term: "RBC (Red Blood Cells)",
    explanation: "Cells that carry oxygen from your lungs to the rest of your body and return carbon dioxide to the lungs.",
    category: "Blood"
  },
  "wbc": {
    term: "WBC (White Blood Cells)",
    explanation: "Part of your immune system that helps fight infections. High counts may indicate infection or inflammation.",
    category: "Blood"
  },
  "platelet": {
    term: "Platelets",
    explanation: "Blood cells that help your blood clot and stop bleeding. Important for wound healing.",
    category: "Blood"
  },
  "creatinine": {
    term: "Creatinine",
    explanation: "A waste product from muscle metabolism. Your kidneys filter it out, so high levels may indicate kidney problems.",
    category: "Kidney"
  },
  "bun": {
    term: "BUN (Blood Urea Nitrogen)",
    explanation: "Measures how well your kidneys are removing waste from your blood.",
    category: "Kidney"
  },
  "alt": {
    term: "ALT (Alanine Aminotransferase)",
    explanation: "A liver enzyme. High levels may indicate liver damage or disease.",
    category: "Liver"
  },
  "ast": {
    term: "AST (Aspartate Aminotransferase)",
    explanation: "An enzyme found in the liver and heart. Elevated levels may suggest liver or heart problems.",
    category: "Liver"
  },
  "cholesterol": {
    term: "Total Cholesterol",
    explanation: "A fatty substance in your blood. High levels increase the risk of heart disease.",
    category: "Cardiovascular"
  },
  "ldl": {
    term: "LDL (Low-Density Lipoprotein)",
    explanation: "Often called 'bad' cholesterol. High levels can lead to plaque buildup in arteries.",
    category: "Cardiovascular"
  },
  "hdl": {
    term: "HDL (High-Density Lipoprotein)",
    explanation: "Often called 'good' cholesterol. Helps remove other forms of cholesterol from your bloodstream.",
    category: "Cardiovascular"
  },
  "triglycerides": {
    term: "Triglycerides",
    explanation: "A type of fat in your blood. High levels may increase the risk of heart disease.",
    category: "Cardiovascular"
  },
  "glucose": {
    term: "Blood Glucose (Sugar)",
    explanation: "Measures the amount of sugar in your blood. Used to diagnose and monitor diabetes.",
    category: "Diabetes"
  },
  "fasting glucose": {
    term: "Fasting Blood Glucose",
    explanation: "Blood sugar level after not eating for at least 8 hours. Used to screen for diabetes.",
    category: "Diabetes"
  },
  "vitamin d": {
    term: "Vitamin D",
    explanation: "Essential for bone health and immune function. Low levels are very common and may cause fatigue.",
    category: "Vitamins"
  },
  "vitamin b12": {
    term: "Vitamin B12",
    explanation: "Important for nerve function and red blood cell formation. Deficiency can cause anemia and neurological problems.",
    category: "Vitamins"
  },
  "iron": {
    term: "Iron",
    explanation: "Essential for making hemoglobin. Low levels can cause anemia and fatigue.",
    category: "Minerals"
  },
  "ferritin": {
    term: "Ferritin",
    explanation: "A protein that stores iron in your body. Low levels indicate iron deficiency.",
    category: "Minerals"
  },
  "calcium": {
    term: "Calcium",
    explanation: "Important for bone health, muscle function, and nerve signaling.",
    category: "Minerals"
  },
  "sodium": {
    term: "Sodium (Na)",
    explanation: "An electrolyte that helps regulate fluid balance and blood pressure.",
    category: "Electrolytes"
  },
  "potassium": {
    term: "Potassium (K)",
    explanation: "An electrolyte essential for heart function and muscle contraction.",
    category: "Electrolytes"
  },
  "uric acid": {
    term: "Uric Acid",
    explanation: "A waste product from the breakdown of purines. High levels may cause gout.",
    category: "Metabolic"
  },
  "esr": {
    term: "ESR (Erythrocyte Sedimentation Rate)",
    explanation: "Measures inflammation in your body. Elevated levels may indicate infection or autoimmune disease.",
    category: "Inflammatory"
  },
  "crp": {
    term: "CRP (C-Reactive Protein)",
    explanation: "A marker of inflammation. High levels may indicate infection, injury, or chronic disease.",
    category: "Inflammatory"
  }
};

// Common normal ranges for lab values
export const normalRanges: Record<string, { min: number; max: number; unit: string }> = {
  "hemoglobin": { min: 12.0, max: 17.5, unit: "g/dL" },
  "hb": { min: 12.0, max: 17.5, unit: "g/dL" },
  "rbc": { min: 4.0, max: 6.0, unit: "million/µL" },
  "wbc": { min: 4000, max: 11000, unit: "/µL" },
  "platelet": { min: 150000, max: 400000, unit: "/µL" },
  "glucose": { min: 70, max: 100, unit: "mg/dL" },
  "fasting glucose": { min: 70, max: 100, unit: "mg/dL" },
  "hba1c": { min: 4.0, max: 5.6, unit: "%" },
  "cholesterol": { min: 0, max: 200, unit: "mg/dL" },
  "ldl": { min: 0, max: 100, unit: "mg/dL" },
  "hdl": { min: 40, max: 60, unit: "mg/dL" },
  "triglycerides": { min: 0, max: 150, unit: "mg/dL" },
  "tsh": { min: 0.4, max: 4.0, unit: "mIU/L" },
  "t3": { min: 80, max: 200, unit: "ng/dL" },
  "t4": { min: 4.5, max: 12.0, unit: "µg/dL" },
  "creatinine": { min: 0.6, max: 1.2, unit: "mg/dL" },
  "bun": { min: 7, max: 20, unit: "mg/dL" },
  "alt": { min: 7, max: 56, unit: "U/L" },
  "ast": { min: 10, max: 40, unit: "U/L" },
  "vitamin d": { min: 30, max: 100, unit: "ng/mL" },
  "vitamin b12": { min: 200, max: 900, unit: "pg/mL" },
  "iron": { min: 60, max: 170, unit: "µg/dL" },
  "ferritin": { min: 12, max: 300, unit: "ng/mL" },
  "calcium": { min: 8.5, max: 10.5, unit: "mg/dL" },
  "sodium": { min: 136, max: 145, unit: "mEq/L" },
  "potassium": { min: 3.5, max: 5.0, unit: "mEq/L" },
  "uric acid": { min: 2.4, max: 7.0, unit: "mg/dL" },
  "esr": { min: 0, max: 20, unit: "mm/hr" },
  "crp": { min: 0, max: 3, unit: "mg/L" }
};

export function getValueStatus(value: number, range: { min: number; max: number }): "normal" | "warning" | "critical" {
  if (value >= range.min && value <= range.max) {
    return "normal";
  }
  
  const deviation = value < range.min 
    ? (range.min - value) / range.min 
    : (value - range.max) / range.max;
  
  return deviation > 0.3 ? "critical" : "warning";
}

export function parseLabValues(text: string): LabValue[] {
  const results: LabValue[] = [];
  const lines = text.toLowerCase().split(/\n/);
  
  for (const line of lines) {
    for (const [key, range] of Object.entries(normalRanges)) {
      if (line.includes(key)) {
        // Try to extract numeric value
        const valueMatch = line.match(/(\d+\.?\d*)\s*(mg\/dl|g\/dl|%|miu\/l|ng\/ml|u\/l|meq\/l|pg\/ml|µg\/dl|ng\/dl|mm\/hr|\/µl|million\/µl)?/i);
        
        if (valueMatch) {
          const value = parseFloat(valueMatch[1]);
          const termInfo = medicalTermsDatabase[key];
          
          results.push({
            name: termInfo?.term || key.toUpperCase(),
            value,
            unit: range.unit,
            normalRange: { min: range.min, max: range.max },
            status: getValueStatus(value, range),
            explanation: termInfo?.explanation || "A medical test parameter.",
            category: termInfo?.category || "General"
          });
        }
      }
    }
  }
  
  return results;
}

export function findMedicalTerms(text: string): MedicalTerm[] {
  const foundTerms: MedicalTerm[] = [];
  const lowerText = text.toLowerCase();
  
  for (const [key, term] of Object.entries(medicalTermsDatabase)) {
    if (lowerText.includes(key)) {
      foundTerms.push(term);
    }
  }
  
  return foundTerms;
}
