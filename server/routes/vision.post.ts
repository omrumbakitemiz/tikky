import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI();

const visionSchema = z.object({
  imageString: z.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) => visionSchema.safeParse(body));

  console.log('readValidatedBody result:', result);

  if (!result.success) {
    setResponseStatus(event, 422);

    return {
      body: 'Please provide an image URL.',
    };
  }

  const imageString = result.data.imageString;

  console.log('imageString:', imageString);

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Generate JSON from a meal receipt return only items, date time, address, location name. No JSON tag in response.',
          },
          {
            type: 'image_url',
            image_url: {
              url: imageString,
              detail: 'low',
            },
          },
        ],
      },
    ],
  });

  console.log('openai response:', response);

  const content = response.choices[0].message.content;

  if (content) {
    console.log(content);

    return JSON.parse(content);
  } else {
    console.error('An error occurred while trying to generate a response.');

    setResponseStatus(event, 500);

    return {
      error: 'An error occurred while trying to generate a response.',
    };
  }
});
