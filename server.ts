import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));

  // Initialize Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Routes
  // 1. Text Chat with Google Search Grounding
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are Omega Core AI, an advanced autonomous neural orchestration agent.",
          tools: [{ googleSearch: {} }],
        },
      });

      // Extract search grounding metadata if available
      const searchMetadata = response.candidates?.[0]?.groundingMetadata;
      res.json({
        text: response.text || "No response generated.",
        grounding: searchMetadata || null,
      });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // 2. Image Generation & Editing
  app.post("/api/gemini/image", async (req, res) => {
    try {
      const { prompt, base64Image, mimeType } = req.body;
      const parts: any[] = [{ text: prompt }];
      if (base64Image) {
        parts.unshift({
          inlineData: {
            data: base64Image,
            mimeType: mimeType || "image/png",
          },
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K",
          },
        },
      });

      let imageUrl = null;
      let textOutput = "";
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textOutput += part.text;
          }
        }
      }

      res.json({ imageUrl, text: textOutput });
    } catch (error: any) {
      console.error("Image API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  // 3. Video Generation (Veo 3)
  app.post("/api/gemini/video", async (req, res) => {
    try {
      const { prompt, aspectRatio = "16:9" } = req.body;
      const operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        prompt: prompt || "Cinematic aerial shot of autonomous neural networks pulsing with light.",
        config: {
          numberOfVideos: 1,
          resolution: "720p",
          aspectRatio: aspectRatio,
        },
      });

      res.json({ operationName: operation.name });
    } catch (error: any) {
      console.error("Video API error:", error);
      res.status(500).json({ error: error.message || "Failed to start video generation" });
    }
  });

  // Poll video status
  app.post("/api/gemini/video-status", async (req, res) => {
    try {
      const { operationName } = req.body;
      // Reconstruct operation name
      const { GenerateVideosOperation } = await import("@google/genai");
      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      
      let videoUrl = null;
      if (updated.done && updated.response?.generatedVideos?.[0]?.video?.uri) {
        videoUrl = updated.response.generatedVideos[0].video.uri;
      }

      res.json({ done: updated.done, videoUrl });
    } catch (error: any) {
      console.error("Video status error:", error);
      res.status(500).json({ error: error.message || "Failed to check video status" });
    }
  });

  // 4. Music Generation (Lyria)
  app.post("/api/gemini/music", async (req, res) => {
    try {
      const { prompt } = req.body;
      const responseStream = await ai.models.generateContentStream({
        model: "lyria-3-clip-preview",
        contents: prompt || "Generate a 30-second futuristic cyberpunk electronic soundtrack.",
      });

      let audioBase64 = "";
      let lyrics = "";
      let mimeType = "audio/wav";

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      res.json({ audioBase64, mimeType, lyrics });
    } catch (error: any) {
      console.error("Music API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate music" });
    }
  });

  // Vite middleware setup in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
