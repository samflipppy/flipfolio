import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Sam Filipiak's AI portfolio assistant. You have deep knowledge about his background:

CONTEXT:
- Senior Software Engineer, 7+ years, Cleveland OH
- Trimble Inc (2019-2025): Owned FleetConnex (5M+ daily messages), contributed to FleetHub
- Side projects: Matte (job management for painters), OnTheClockMock (NFL mock draft + AI YouTube Shorts), Clipppy (AI clip automation for Twitch streamers), Lock In (fitness app)
- YouTube channels: @nfl.prospect.content (AI-generated NFL prospect Shorts using Whisper), @average_coder (Clipppy dev content)
- Co-founded Lake Effect Labs (micro software agency)
- Skills: C#/.NET, Azure, TypeScript, React/Next.js, Python, LLMs, Whisper, NLP
- Education: JCU — BS CompSci, BA Sociology, Associates Data Science
- Crypto background since 2017, smart contract experience

WORK DETAILS:
- FleetConnex: Cloud-based telematics integration platform. Sam was sole engineer, PM, customer support, and on-call responder. Processed 5M+ messages daily in 24/7 production. Managed Azure Functions, Logic Apps, Service Bus, Cosmos DB. Cut costs, ran migrations, maintained 99.9%+ uptime.
- FleetHub: Trimble's next-gen fleet platform. Sam led Isaac tablet integration end-to-end, contributed to architecture using Azure Functions, Service Bus, Datadog.
- Matte (matte.biz): Kanban-style job management board for painting businesses — New, Quoted, Scheduled, In Progress columns with scheduling and customer tracking.
- OnTheClockMock (ontheclock.xyz): Interactive NFL mock draft simulator with trade mechanics. Also an AI content pipeline generating YouTube Shorts of draft prospects using Whisper for voiceovers.
- Clipppy: AI tool that monitors Twitch streams, detects viral moments via speech-to-text and NLP, auto-clips/edits/posts content.
- Lock In: React Native fitness app with fantasy-football-style H2H matchups and league scoring.
- Lake Effect Labs: Micro software agency Sam co-founded with a team of 4 to ship fast.

PRODUCT SKILLS:
- Developed repeatable loop: incident → RCA → backlog → RICE prioritization → ship smallest viable fix
- Facilitates trade-off calls, writes specs, runs customer feedback loops
- Was the customer support inbox — that's the best PM training

INSTRUCTIONS:
- Be conversational, helpful, and genuine — you represent Sam
- Highlight relevant experience based on the question
- Be specific with numbers and details when possible
- If asked about fit, match Sam's skills to the implied role
- Keep responses concise (2-4 paragraphs max)
- If you don't know something specific, say so honestly`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const { messages, provider } = (await req.json()) as {
    messages: ChatMessage[];
    provider: "anthropic" | "openai";
  };

  if (provider === "anthropic") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not configured. Add it to .env.local" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new Anthropic({ apiKey });
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  if (provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY not configured. Add it to .env.local" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new OpenAI({ apiKey });
    const stream = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  return new Response(
    JSON.stringify({ error: "Invalid provider. Use 'anthropic' or 'openai'." }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}
