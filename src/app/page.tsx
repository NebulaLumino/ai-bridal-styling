"use client";
import { useState } from "react";

interface FormData {
  weddingSeason: string;
  weddingStyle: string;
  venueType: string;
  bodyType: string;
  bridesmaidCount: string;
  budget: string;
  personalPreferences: string;
}

export default function BridalStylingPage() {
  const [formData, setFormData] = useState<FormData>({
    weddingSeason: "",
    weddingStyle: "",
    venueType: "",
    bodyType: "",
    bridesmaidCount: "",
    budget: "",
    personalPreferences: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    const prompt = `Create a complete bridal styling plan with the following details:
- Wedding Season: ${formData.weddingSeason || "Not specified"}
- Wedding Style: ${formData.weddingStyle || "Not specified"}
- Venue Type: ${formData.venueType || "Not specified"}
- Body Type: ${formData.bodyType || "Not specified"}
- Number of Bridesmaids: ${formData.bridesmaidCount || "Not specified"}
- Budget Range: ${formData.budget || "Not specified"}
- Personal Preferences: ${formData.personalPreferences || "None specified"}

Please include detailed recommendations for:
1. Wedding Dress Silhouette & Style
2. Fabric & Material Suggestions
3. Veil & Headpiece Options
4. Jewelry & Accessories
5. Bridesmaid Dress Coordination
6. Venue-Appropriate Styling Tips
7. Complete Budget Breakdown
8. Styling Timeline & Shopping Timeline`;

    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || data.error || "No result.");
    } catch {
      setResult("Error connecting to API.");
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400/50 transition";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950/10 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-sm font-medium mb-3">
            AI Bridal Styling
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Bridal Styling & Dress Selection Guide
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Get personalized bridal styling recommendations including wedding dress silhouettes, bridesmaid coordination, accessories, and budget planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={labelClass}>Wedding Season</label>
            <select name="weddingSeason" value={formData.weddingSeason} onChange={handleChange} className={inputClass}>
              <option value="">Select season...</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Wedding Style</label>
            <select name="weddingStyle" value={formData.weddingStyle} onChange={handleChange} className={inputClass}>
              <option value="">Select style...</option>
              <option value="Classic/Traditional">Classic/Traditional</option>
              <option value="Modern/Minimalist">Modern/Minimalist</option>
              <option value="Bohemian/Rustic">Bohemian/Rustic</option>
              <option value="Vintage/Retro">Vintage/Retro</option>
              <option value="Glamorous/Luxury">Glamorous/Luxury</option>
              <option value="Beach/ destination">Beach/Destination</option>
              <option value="Romantic">Romantic</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Venue Type</label>
            <select name="venueType" value={formData.venueType} onChange={handleChange} className={inputClass}>
              <option value="">Select venue...</option>
              <option value="Church/Cathedral">Church/Cathedral</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Outdoor/Garden">Outdoor/Garden</option>
              <option value="Beach">Beach</option>
              <option value="Barn/Winery">Barn/Winery</option>
              <option value="Hotel/Resort">Hotel/Resort</option>
              <option value="Destination">Destination</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Body Type</label>
            <select name="bodyType" value={formData.bodyType} onChange={handleChange} className={inputClass}>
              <option value="">Select body type...</option>
              <option value="Petite">Petite</option>
              <option value="Curvy/Plus">Curvy/Plus</option>
              <option value="Athletic">Athletic</option>
              <option value="Hourglass">Hourglass</option>
              <option value="Pear">Pear</option>
              <option value="Apple">Apple</option>
              <option value="Tall">Tall</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Number of Bridesmaids</label>
            <select name="bridesmaidCount" value={formData.bridesmaidCount} onChange={handleChange} className={inputClass}>
              <option value="">Select number...</option>
              <option value="1-2">1-2</option>
              <option value="3-4">3-4</option>
              <option value="5-6">5-6</option>
              <option value="7-8">7-8</option>
              <option value="9+">9+</option>
              <option value="No bridesmaids">No bridesmaids</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Budget Range</label>
            <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
              <option value="">Select budget...</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 - $2,500">$1,000 - $2,500</option>
              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClass}>Personal Preferences & Style Notes</label>
          <textarea
            name="personalPreferences"
            value={formData.personalPreferences}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="E.g., 'Prefer sustainable fabrics, want a statement necklace, bridesmaids in mismatched dresses...'."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 disabled:opacity-50 transition text-white text-lg shadow-lg shadow-rose-500/20"
        >
          {loading ? "✨ Creating Your Bridal Styling Plan..." : "✨ Create Bridal Styling Plan"}
        </button>

        {result && (
          <div className="mt-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-rose-300 mb-4">Your Bridal Styling Plan</h2>
            <div className="whitespace-pre-wrap text-slate-200 leading-relaxed space-y-4">
              {result.split('\n').map((line, i) => {
                if (line.match(/^[0-9]+\./)) {
                  return <h3 key={i} className="text-lg font-semibold text-rose-200 mt-4">{line}</h3>;
                }
                if (line.match(/^[-•]/)) {
                  return <li key={i} className="ml-4 text-slate-300">{line}</li>;
                }
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
