import { Handler } from '@netlify/functions';
import { createClient } from '@netlify/sdk';

const client = createClient({
  siteId: process.env.SITE_ID,
  token: process.env.NETLIFY_ACCESS_TOKEN
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { file, filename } = JSON.parse(event.body);
    
    // Upload file to Netlify
    const uploadResponse = await client.deploy.uploadFile({
      file,
      path: `/uploads/${filename}`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: uploadResponse.url,
        key: filename
      })
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Upload failed' })
    };
  }
}