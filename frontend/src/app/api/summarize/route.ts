import { NextRequest } from "next/server";
import getYouTubeID from "get-youtube-id";
import { getUserMeLoader } from "@/lib/service/getUserMeLoader";
import { getAuthToken } from "@/lib/service/getToke";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function generateSummary(
  content: string,
  template: string
): Promise<string> {
  const prompt = PromptTemplate.fromTemplate(template);

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: process.env.OPENAI_TEMPERATURE
      ? parseFloat(process.env.OPENAI_TEMPERATURE)
      : 0.7,
    maxTokens: process.env.OPENAI_MAX_TOKENS
      ? parseInt(process.env.OPENAI_MAX_TOKENS)
      : 4000,
  });

  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  try {
    const summary = await chain.invoke({ text: content });

    return summary;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to generate summary.");
  }
}

const TEMPLATE = `
INSTRUCTIONS: 
  For the this {text} complete the following steps.
  Generate the title for based on the content provided
  Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.
  
  Write a youtube video description
    - Include heading and sections.  
    - Incorporate keywords and key takeaways

  Generate bulleted list of key points and benefits

  Return possible and best recommended key words
`;

export async function POST(req: NextRequest) {
  console.log("FROM OUR ROUTE HANDLER:", req.body);
  const user = await getUserMeLoader();
  const token = await getAuthToken();

  if (!user.ok || !token) {
    return new Response(
      JSON.stringify({
        data: null,
        error: "not authnticated",
      }),
      {
        status: 401,
      }
    );
  }

  if (user.data.credits < 1)
    return new Response(
      JSON.stringify({ data: null, error: "Insufficient credits" }),
      { status: 402 }
    );

  const body = await req.json();
  console.log("json", body);
  const videoId = getYouTubeID(body.videoId);

  const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;

  let transcriptData;

  try {
    const transcript = await fetch(url);
    transcriptData = await transcript.text();

    let summary: Awaited<ReturnType<typeof generateSummary>>;
    summary = await generateSummary(transcriptData, TEMPLATE);

    return new Response(JSON.stringify({ data: summary, error: null }));
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }
}
