import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const response = await client.responses.create({
      model: "gpt-5.4",
      input: "Скажи одной короткой фразой: API подключен успешно."
    });

    return Response.json({
      ok: true,
      text: response.output_text,
    });
  } catch (error: any) {
    return Response.json(
      {
        ok: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
