import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  try {
    const { title, price, category, description } = await req.json();

    if (!title || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, price, category" },
        { status: 400 }
      );
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.7,
    });

    const systemPrompt = `
You are an expert e-commerce SEO copywriter.
Generate **two** product descriptions in JSON format:

1. **Short Product Description** ("short"):
   - 50-80 words
   - Plain text only (no Markdown, no special characters, no bullet points)
   - Concise, appealing, and SEO-friendly based on category & product features

2. **Detailed Product Description** ("long"):
   - 500-1000 words total
   - Contains **two separate sections**:
     - English version
     - Bengali version
   - Separate the two versions using an <hr> HTML tag
   - Each version should be rich with SEO keywords
   - Use Markdown headings, bullet points, and formatting inside each language section
   - Cover:
     - Materials
     - Craftsmanship
     - Style
     - Care instructions
     - Ideal use cases
   - Include emotional appeal for conversion

If an existing description is provided, incorporate it naturally.

Return ONLY valid JSON:
{
  "short": "short plain text description",
  "long": "long markdown description with <hr> between English and Bengali"
}
`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(
        `Product Title: ${title}
Price: ${price}
Category: ${category}
Existing Description: ${description || "N/A"}`
      ),
    ]);

    const textOutput =
      typeof response.content === "string"
        ? response.content
        : Array.isArray(response.content)
        ? response.content
            .map((item: any) =>
              typeof item === "string" ? item : item.text ?? ""
            )
            .join("")
        : "";

    const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI output format");

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate descriptions" },
      { status: 500 }
    );
  }
}
