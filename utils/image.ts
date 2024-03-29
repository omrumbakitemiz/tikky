// this function gets image url as a string, download the image, reduces the image width height to 300px x 300px and convert it to base64 string and return it.
import http from 'http';
import https from 'https';
import sharp from 'sharp';

/**
 * Converts an image URL to a base64 string.
 * @param imageUrl - The URL of the image to convert.
 * @returns A promise that resolves with the base64 string representation of the image.
 */
export function imageUrlToBase64(imageUrl: string): Promise<string> {
  const protocol = imageUrl.startsWith('https') ? https : http;

  return new Promise((resolve, reject) => {
    protocol
      .get(imageUrl, (response) => {
        let imageData = '';
        response.setEncoding('binary');

        response.on('data', (chunk) => {
          imageData += chunk;
        });

        response.on('end', () => {
          const base64Image = Buffer.from(imageData, 'binary').toString('base64');

          console.log('Image converted to base64 successfully.');

          resolve(base64Image);
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * Resizes a base64 image to a specified percentage of its original size.
 * @param base64Image - The base64 string representation of the image to resize.
 * @param percentage - The percentage by which to resize the image (e.g., 50 for 50%).
 * @returns A promise that resolves with the resized base64 string representation of the image.
 * @throws If the image metadata is invalid or if there is an error resizing the image.
 */
export async function resizeBase64Image(base64Image: string, percentage: number): Promise<string> {
  try {
    const buffer = Buffer.from(base64Image, 'base64');
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Invalid image metadata');
    }

    const newWidth = Math.round(metadata.width * (percentage / 100));
    const newHeight = Math.round(metadata.height * (percentage / 100));

    const resizedImageBuffer = await sharp(buffer)
      .resize({
        width: newWidth,
        height: newHeight,
        fit: 'fill', // or 'cover' depending on your requirement
      })
      .toBuffer();

    const resizedBase64Image = resizedImageBuffer.toString('base64');

    console.log('Image resized successfully.');

    return resizedBase64Image;
  } catch (error) {
    console.error('Error resizing base64 image:', error);
    throw error;
  }
}
