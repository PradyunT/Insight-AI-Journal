import { CohereClient } from "cohere-ai";

// Prevents this route's response from being cached on Vercel
export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    console.log(req);
    const { text } = await req.json();

    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    if (!process.env.COHERE_API_KEY) {
      throw new Error("Cohere API key not found");
    }

    const chatStream = await cohere.chatStream({
      preamble:
        "You are the Insight AI chatbot, here to help the user be more productive and manage their stress! The user may ask you to generate journal prompts or give practical advice based on the user's goals and other factors in their situation.",
      chatHistory: [],
      message: text,
      temperature: 0.2,
      connectors: [{ id: "web-search" }],
    });

    const encoder = new TextEncoder();
    // Create a streaming response
    const customReadable = new ReadableStream({
      async start(controller) {
        // Generate a streaming response
        for await (const message of chatStream) {
          if (message.eventType === "text-generation") {
            controller.enqueue(encoder.encode(`${message.text}`));
          }
        }
      },
    });
    // Return the stream response and keep the connection alive
    return new Response(customReadable, {
      // Set the headers for Server-Sent Events (SSE)
      headers: {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/event-stream; charset=utf-8",
      },
    });
  } catch (err) {
    console.error("Error in API route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
