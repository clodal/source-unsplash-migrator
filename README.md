# source-unsplash-migrator

This script is designed to migrate images from the deprecated `source.unsplash.com` URLs to locally downloaded images using the official [Unsplash API](https://unsplash.com/documentation#search-photos). 

The script fetches images from Unsplash by their ID, resizes them to a default width of 1920px, and saves them locally to an `output` folder.

## Features

- Fetches images from the Unsplash API using the photo ID.
- Resizes images to a default width of 1920px.
- Skips downloading if the image already exists in the `output` folder.
- Supports environment variables for Unsplash API credentials.
- Handles rate limits by running hourly if using a non-production API key.

## Unsplash API Rate Limit

Please note that Unsplash has a rate limit of **50 requests per hour** for non-production API keys. This means that if you are using a **non-production** Unsplash API key, you should run this script **once per hour** to avoid exceeding the rate limit.

For production usage, higher rate limits may apply, but for non-production use cases, it's recommended to schedule the script to run periodically (every hour) to ensure that it does not exceed the rate limit.

Given that we're too lazy to get a production key, we'll just stick to the 50 requests per hour limit and run this script hourly.

The script is designed to incrementally download the images to the output folder, so you can run it hourly to fetch the images in batches.

## How to Use

### 1. Clone the repository

```bash
git clone https://github.com/clodal/source-unsplash-migrator.git
cd source-unsplash-migrator
```

### 2. Install Dependencies

Make sure you have Node.js installed, then run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of your project and add your Unsplash API key:

```env
UNSPLASH_ACCESS_KEY=your-unsplash-api-key
```

### 4. Add Input Data

The script reads an `input.json` file, which should contain the list of image URLs from `source.unsplash.com`. For example:

```json
{
  "photoUrls": [
    "https://source.unsplash.com/sfjS-FglvU4/1600x900",
    "https://source.unsplash.com/RX_0vwSPiWs/1600x900"
    // List your images here. You can use your IDE's find function to export the images to a .txt file to get this input
  ]
}
```

### 5. Run the Script

To run the script:

```bash
yarn run start
```

This will download images by their IDs from Unsplash and save them in the `output` folder.

## License

This project is licensed under the MIT License.
```

### Key Points:
- **API rate limit**: The readme explains that you should limit the script to 50 requests per hour if using a non-production key.
- **Environment setup**: It shows how to set up the `.env` file and input data.
- **Scheduling**: Instructions are provided for scheduling the script to run hourly to handle rate limits.
