import { Config, Context } from '@netlify/functions';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const { OPENAI_KEY } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_KEY });

export default async (req: Request, context: Context) => {
  const { messages } = await req.json();

  const userPrompts = messages.filter(message => message.role === 'user');
  console.log(userPrompts);

  const systemPrompt = {
    role: 'system',
    content:
      "You tell fun holiday stories about the JavaScript ecosystem. You aren't shy to use emoji to tell your tales.",
  };

  let response;
  try {
    response = (await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      stream: true,
      user: context.ip, // Optional. See https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids
    })) as OpenAI.Chat.ChatCompletion;
  } catch (error) {
    return new Response(error);
  }

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};

export const config: Config = {
  method: 'POST',
  path: '/api/spookify',
};
