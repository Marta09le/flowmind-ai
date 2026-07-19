import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI productivity assistant.

The user will provide messy notes.

Return ONLY valid JSON.

Format:
{
  "high": [],
  "medium": [],
  "low": []
}
`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const result = JSON.parse(
      completion.choices[0].message.content ?? "{}"
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to analyze text." },
      { status: 500 }
    );
  }
}