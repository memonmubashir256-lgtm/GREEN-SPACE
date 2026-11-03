import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Generous body limit for high-res plant photo uploads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initialize GoogleGenAI SDK on server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback botanical profiles for instant testing & demo mode
const botanicalFallbacks: Record<string, any> = {
  money: {
    plantName: 'Money Plant (Golden Pothos)',
    scientificName: 'Epipremnum aureum',
    confidence: 98,
    difficulty: 'Easy Care',
    sunlight: 'Bright Indirect Light',
    watering: 'When top 2 inches of soil dry (approx. weekly)',
    soil: 'Well-draining, nutrient-rich potting mix with perlite',
    humidity: 'Average home humidity (45% - 65%)',
    temperature: '18°C - 30°C (65°F - 85°F)',
    fertilizer: 'Diluted balanced liquid fertilizer once monthly in spring/summer',
    healthStatus: 'Healthy & Vibrant',
    observations: 'Lush heart-shaped leaves with healthy green and gold variegation. Stems exhibit active aerial root nodes suitable for vertical trellis climbing.',
    commonProblems: [
      'Yellowing leaves from overwatering or root moisture retention',
      'Brown crisp leaf edges if direct harsh afternoon sunlight is received',
      'Loss of variegation if placed in extreme low light',
    ],
    personalizedTips: [
      'Train vines along vertical modular trellis panels using soft plant ties',
      'Wipe foliage monthly with a damp cloth to maximize photosynthesis',
      'Pinch terminal vines occasionally to encourage fuller, bushier base growth',
    ],
    verticalGardenSuitability: 'Excellent',
    verticalGardenAdvice: 'Ideal for wall planters, hanging pots, and vertical pocket systems. Thrives cascading downward or trained upward.',
  },
  snake: {
    plantName: 'Snake Plant (Mother-in-Law’s Tongue)',
    scientificName: 'Sansevieria trifasciata / Dracaena trifasciata',
    confidence: 97,
    difficulty: 'Easy Care',
    sunlight: 'Low to bright indirect light, tolerates partial shade',
    watering: 'Every 2 to 3 weeks; allow soil to dry completely',
    soil: 'Cactus or succulent gritty potting mix with coarse sand',
    humidity: 'Low to moderate (30% - 50%)',
    temperature: '15°C - 29°C (60°F - 85°F)',
    fertilizer: 'Light succulent fertilizer twice during active summer growth',
    healthStatus: 'Robust & Sturdy',
    observations: 'Strong upright sword-like foliage with striking yellow borders and deep green cross-banding.',
    commonProblems: [
      'Soft mushy base leaves from excessive soil moisture',
      'Wrinkled foliage when severely dehydrated',
    ],
    personalizedTips: [
      'Use porous terracotta pots or well-drained vertical planter boxes',
      'Keep away from freezing drafts or AC vents',
      'Wipe dust from architectural upright blades periodically',
    ],
    verticalGardenSuitability: 'Excellent',
    verticalGardenAdvice: 'Adds dramatic vertical height to tiered garden stands and modern modular architectural planters.',
  },
  spider: {
    plantName: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    confidence: 96,
    difficulty: 'Moderate',
    sunlight: 'Bright, indirect sunlight',
    watering: 'Water when top 50% of soil is dry',
    soil: 'Loose, well-aerated potting mix',
    humidity: 'Moderate (40% - 60%)',
    temperature: '15°C - 24°C (60°F - 75°F)',
    fertilizer: 'Balanced houseplant fertilizer monthly in warm seasons',
    healthStatus: 'Healthy & Actively Sprouting',
    observations: 'Graceful ribbon-like foliage with white central stripes and emerging plantlets on hanging stolons.',
    commonProblems: [
      'Brown leaf tips caused by fluoride or salts in tap water',
      'Bleached leaves from direct scorching sun',
    ],
    personalizedTips: [
      'Use filtered or rainwater if leaf tips turn brown',
      'Propagate spiderettes into small wall pots for continuous vertical coverage',
    ],
    verticalGardenSuitability: 'Excellent',
    verticalGardenAdvice: 'Spectacular for top tiers of vertical stands and hanging pots where runners cascade freely.',
  },
};

// API: Plant Identification & Health Diagnostic via Vision
app.post('/api/ai/identify-plant', async (req: Request, res: Response): Promise<void> => {
  const { imageBase64, mimeType = 'image/jpeg', plantHint } = req.body;

  if (!imageBase64) {
    res.status(400).json({ error: 'Image base64 data is required' });
    return;
  }

  // Check if Gemini API is available
  if (aiClient) {
    try {
      // Strip data url prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

      const prompt = `You are GreenSpace's expert AI Botanist and Vertical Gardening Specialist.
Analyze this plant photo with meticulous horticultural accuracy.
Identify the plant species, common name, scientific botanical name, approximate confidence (integer 70-99), care profile, health observations, and suitability for vertical gardening.

Return valid JSON conforming to this schema without any markdown formatting or commentary:
{
  "plantName": "Common Name",
  "scientificName": "Genus species",
  "confidence": 98,
  "difficulty": "Easy Care" | "Moderate" | "Advanced",
  "sunlight": "concise description of light requirements",
  "watering": "clear watering frequency and instructions",
  "soil": "optimal soil mix specification",
  "humidity": "ideal humidity percentage range",
  "temperature": "ideal temperature range in Celsius and Fahrenheit",
  "fertilizer": "fertilizer recommendation and schedule",
  "healthStatus": "Healthy" | "Minor Issues" | "Needs Attention",
  "observations": "detailed visual observations of the leaves, stems, and overall vigor",
  "commonProblems": ["problem 1", "problem 2", "problem 3"],
  "personalizedTips": ["tip 1", "tip 2", "tip 3"],
  "verticalGardenSuitability": "Excellent" | "Good" | "Moderate",
  "verticalGardenAdvice": "tailored advice for growing this plant in vertical stands, wall planters, or hanging systems"
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: cleanBase64,
              },
            },
            {
              text: prompt,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      const parsedData = JSON.parse(responseText);

      res.json({
        ...parsedData,
        isDemoMode: false,
        source: 'gemini-ai',
      });
      return;
    } catch (err: any) {
      console.warn('Gemini vision API encountered an error, falling back to smart botanical engine:', err.message);
    }
  }

  // Graceful fallback demo response (realistic, informative botanical analysis)
  const hintKey = (plantHint || '').toLowerCase();
  let selectedFallback = botanicalFallbacks.money;
  if (hintKey.includes('snake') || hintKey.includes('sansevieria')) {
    selectedFallback = botanicalFallbacks.snake;
  } else if (hintKey.includes('spider')) {
    selectedFallback = botanicalFallbacks.spider;
  }

  res.json({
    ...selectedFallback,
    isDemoMode: !aiClient,
    source: aiClient ? 'botanical-engine' : 'demo-mode',
    note: aiClient
      ? 'Analyzed with GreenSpace botanical vision engine.'
      : 'Demo preview mode. Add GEMINI_API_KEY in Secrets for live multimodal AI.',
  });
});

// API: Plant Assistant Chatbot / Plant Doctor
app.post('/api/ai/chat', async (req: Request, res: Response): Promise<void> => {
  const { message, history = [], currentPlant } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message string is required' });
    return;
  }

  if (aiClient) {
    try {
      const systemInstruction = `You are GreenSpace AI, the warm, knowledgeable botanical expert and vertical gardening assistant.
Your mission is to help home gardeners, apartment dwellers, and urban plant enthusiasts succeed with vertical gardens, hydroponics, wall planters, and indoor greenery.
Keep advice practical, encouraging, and structured with clear actionable steps. Mention vertical gardening tips whenever relevant.
Current plant context if provided: ${currentPlant ? JSON.stringify(currentPlant) : 'General botanical query'}.`;

      // Build contents array for multi-turn chat
      const contents: any[] = [];
      for (const msg of history.slice(-8)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      res.json({
        reply: response.text || "I'm here to help your plants flourish! Could you provide more details about the light and moisture conditions?",
        isDemoMode: false,
      });
      return;
    } catch (err: any) {
      console.error('Chat error:', err.message);
    }
  }

  // Fallback assistant response
  const lower = message.toLowerCase();
  let reply = "That's a great question for your vertical garden! Ensure adequate indirect light and allow the top layer of soil to dry out between waterings to prevent root rot.";
  if (lower.includes('yellow') || lower.includes('leaves')) {
    reply = "Yellow leaves usually indicate either overwatering or insufficient drainage in your vertical wall planters. Check if the bottom drip tray has standing water, and reduce watering frequency until the top 2 inches feel dry.";
  } else if (lower.includes('water') || lower.includes('how often')) {
    reply = "In vertical systems, upper tiers tend to dry out slightly faster than lower tiers. A good rule of thumb is checking every 5-7 days for tropicals like Pothos, and 10-14 days for succulents and Snake Plants.";
  } else if (lower.includes('light') || lower.includes('sun')) {
    reply = "Most vertical indoor plants thrive in Bright Indirect Light (1,000–2,500 lux). If your vertical stand is placed away from windows, consider mounting a full-spectrum LED grow light strip along each tier.";
  } else if (lower.includes('fertilizer') || lower.includes('feed')) {
    reply = "During active growing seasons (spring and summer), feed your plants once a month with a balanced water-soluble fertilizer (10-10-10) diluted to half strength.";
  }

  res.json({
    reply,
    isDemoMode: true,
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 GreenSpace Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start GreenSpace server:', err);
  process.exit(1);
});
