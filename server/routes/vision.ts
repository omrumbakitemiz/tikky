import OpenAI from 'openai';
import { imageUrlToBase64, resizeBase64Image } from '~/utils/image';

const openai = new OpenAI();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const imageUrl = query.imageUrl;

  if (!imageUrl || typeof imageUrl !== 'string') {
    setResponseStatus(event, 422);

    return {
      response: 'Please provide an image URL.',
    };
  }

  const base64String = await imageUrlToBase64(imageUrl);
  const resizedImage = await resizeBase64Image(base64String, 50);

  if (!base64String) {
    setResponseStatus(event, 500);

    return {
      response: 'An error occurred while trying to generate a base64 string from the image URL.',
    };
  }

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
                url: `data:image/jpeg;base64,${resizedImage}`,
                detail: 'low',
              },
            },
          ],
        },
      ],
    });

    const content = response.choices[0].message.content && response.choices[0].message.content;

    if (content) {
      console.log(content);

      return JSON.parse(content);
    } else {
      setResponseStatus(event, 500);

      return {
        response: 'An error occurred while trying to generate a response.',
      };
    }
  } catch (error) {
    console.error(error);

    return {
      response: 'An error occurred while trying to generate a response.',
    };
  }
});
