export const GET = async (req) => {
  try {
    if (!global.chatStream) {
      return new Response(JSON.stringify({ error: "Chat stream not found" }), { status: 404 });
    }

    const chatStream = global.chatStream;

    // Initialize SSE headers
    const headers = new Headers();
    headers.append("Content-Type", "text/event-stream");
    headers.append("Cache-Control", "no-cache");
    headers.append("Connection", "keep-alive");

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const message of chatStream) {
            if (message.eventType === "text-generation") {
              console.log("Streaming message:", message);
              controller.enqueue(`data: ${JSON.stringify(message)}\n\n`);
            }
          }
          controller.close();
        },
      }),
      { headers }
    );
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
