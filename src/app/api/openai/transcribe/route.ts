import { NextResponse } from "next/server";
// import fs from "fs";
// import OpenAI from "openai";

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("Missing OPENAI_API_KEY environment variable");
// }

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(req: Request) {
  // Placeholder response since OpenAI integration is disabled
  return NextResponse.json({ 
    text: "OpenAI transcription is currently disabled",
    status: "disabled"
  });

  // Original implementation commented out
  /*
  const body = await req.json();
  const base64Audio = body.audio;
  const audio = Buffer.from(base64Audio, "base64");
  const filePath = "tmp/input.wav";

  try {
    fs.writeFileSync(filePath, audio);
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    fs.unlinkSync(filePath);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
  */
}
