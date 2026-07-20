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

The user will provide messy notes, possibly in Ukrainian or English.

Analyze each note and extract:
- the task text (rewritten concisely, same language as input)
- a time, ONLY if the user's note implies a specific time of day or relative time (e.g. "tonight", "tomorrow morning", "after work"). Leave as "" if not mentioned.
- a deadline, ONLY if the user's note implies an actual deadline or due date (e.g. "by Friday", "this week"). Leave as "" if not mentioned.

Do NOT invent a time or deadline that isn't implied by the text. Most tasks will have empty time/deadline — that's expected and correct.

Return ONLY valid JSON in this exact format:
{
  "high": [{ "text": "...", "time": "", "deadline": "" }],
  "medium": [{ "text": "...", "time": "", "deadline": "" }],
  "low": [{ "text": "...", "time": "", "deadline": "" }]
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