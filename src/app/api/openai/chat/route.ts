import { NextResponse } from "next/server";
// import { openai } from "@ai-sdk/openai";
// import { convertToCoreMessages, streamText } from "ai";

// export const runtime = "edge";

export async function POST(req: Request) {
  // Placeholder response since OpenAI integration is disabled
  return NextResponse.json({ 
    message: "OpenAI chat is currently disabled",
    status: "disabled"
  });

  // Original implementation commented out
  /*
  const { messages } = await req.json();
  const result = await streamText({
    model: openai("gpt-4o"),
    messages: convertToCoreMessages(messages),
    system: "You are a helpful AI assistant",
  });

  return result.toDataStreamResponse();
  */
}
