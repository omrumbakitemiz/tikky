import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI();

const visionSchema = z.object({
  imageString: z.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) => visionSchema.safeParse(body));

  if (!result.success) {
    return {
      status: 422,
      body: 'Please provide an image URL.',
    };
  }

  const imageString = result.data.imageString;

  try {
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

    const content = response.choices[0].message.content;

    if (content) {
      console.log(content);

      return JSON.parse(content);
    } else {
      setResponseStatus(event, 500);

      return {
        body: 'An error occurred while trying to generate a response.',
      };
    }
  } catch (error) {
    return {
      status: 500,
      body: 'An error occurred while trying to generate a base64 string from the image URL.',
    };
  }
});
