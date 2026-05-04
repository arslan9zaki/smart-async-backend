import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ai-search", (req, res) => {
  const { query } = req.body;

  let result = {
    summary: "Default result",
    bestSupplierType: "Manufacturer",
    estimatedPriceRange: "$5–$10",
    riskLevel: "Low",
    suggestedCountry: "Vietnam",
    tips: ["Check supplier reviews", "Negotiate pricing"]
  };

  if (query.toLowerCase().includes("china")) {
    result = {
      summary: "China is best for electronics",
      bestSupplierType: "OEM",
      estimatedPriceRange: "$2–$6",
      riskLevel: "Medium",
      suggestedCountry: "China",
      tips: ["Use Trade Assurance", "Check certifications"]
    };
  }

  if (query.toLowerCase().includes("india")) {
    result = {
      summary: "India is strong in textiles",
      bestSupplierType: "Specialist Manufacturer",
      estimatedPriceRange: "$3–$8",
      riskLevel: "Low",
      suggestedCountry: "India",
      tips: ["Check GST compliance", "Verify factory"]
    };
  }

  res.json(result);
});

app.listen(4000, () => console.log("Server running on port 4000"));
