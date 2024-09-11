import fetch from 'node-fetch'; // Import fetch from node-fetch
import fs from 'fs'; // Import fs from node
import path from 'path'; // Import path from node
import dotenv from 'dotenv'; // Import dotenv for environment variables
import inputJson from './input.json' assert { type: 'json' }

dotenv.config(); // Load environment variables from .env

const clientId = process.env.UNSPLASH_ACCESS_KEY; // Get API key from .env
const DEFAULT_WIDTH = '1920'; // pixels

// Function to download and save an image
async function downloadImage(photoId) {
  try {
    const outputDir = path.join(process.cwd(), 'output');

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Define the path to save the image in the 'output' directory
    const imagePath = path.join(outputDir, `${photoId}.jpg`);

    // Check if the image already exists in the output folder
    if (fs.existsSync(imagePath)) {
      console.log(`Image ${photoId} already exists, skipping download.`);
      return;
    }

    const response = await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=${clientId}`);
    const data = await response.json();

    // Get the image URL (you can choose raw, full, regular, etc.)
    const imageUrl = data.urls.raw + `&w=${DEFAULT_WIDTH}`;

    // Fetch the image from the URL
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();

    // Save the image to the filesystem
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    console.log(`Image ${photoId} downloaded and saved to ${imagePath}`);
  } catch (error) {
    console.error(`Error downloading image ${photoId}:`, error);
  }
}

// Download all images in the photoUrls array
async function downloadImages() {
  for (const photoUrl of inputJson.photoUrls) {
    // Get 'sfjS-FglvU4' from 'https://source.unsplash.com/sfjS-FglvU4/1600x900'
    const photoId = photoUrl.split('source.unsplash.com/')[1].split('/')[0];
    await downloadImage(photoId);
  }
}

// Start the download process
downloadImages();
