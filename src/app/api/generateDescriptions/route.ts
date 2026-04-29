import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, price, category, description } = await req.json();

    if (!title || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, price, category" },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are an expert e-commerce SEO copywriter for a traditional Bangladeshi clothing store called Dhakaia Jamdani.
Generate TWO product descriptions and return ONLY valid JSON with no markdown, no code blocks, no preamble.

JSON format:
{
  "short": "50-80 word plain text description, no markdown, SEO-friendly, compelling",
  "long": "500-800 word detailed description in Markdown format. Include: ## Product Highlights, ## Materials & Craftsmanship, ## Care Instructions, ## Why Choose This. Then add <hr> separator. Then write the SAME content in Bengali (বাংলা). Use proper Markdown headings and bullet points."
}

If existing description is provided, incorporate it naturally. Always return ONLY the JSON object.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Product Title: ${title}\nPrice: ৳${price}\nCategory: ${category}\nExisting Description: ${description || "None"}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content from Groq");

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Groq generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate descriptions" },
      { status: 500 }
    );
  }
}
