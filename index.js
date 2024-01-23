const { ImagePool } = require('@squoosh/lib')
const fs = require("fs-extra");
const path = require("path");
const {cpus} = require('os')

async function resizeAndConvertToWebP(
  inputImagePath,
  outputImagePath,
  width,
  height
) {

  console.time("convertImage" + inputImagePath);
  const imagePool = new ImagePool(cpus().length);
  const file = await fs.readFile(inputImagePath)
  const image = imagePool.ingestImage(file);
  await image.decoded; // Wait for the image to be decoded

  // Pre-process
  const preprocessOptions = {
    resize: {
      enabled: true,
      width: width,
      height: height,
    },
  };
  await image.preprocess(preprocessOptions);
  console.info("Image Pre-Processing Complete");

  // Convert to WebP
  await image.encode({
    webp: {
      quality: 90,
    },
  });

  // Write the result to a file
  const rawEncodedImage = (await image.encodedWith.webp).binary;
  await fs.writeFile(outputImagePath, rawEncodedImage);

  await imagePool.close(); // Clean up image pool
}

async function processImagesInDirectory(inputDir, outputDir, width, height) {
  const files = await fs.readdir(inputDir);
  for (const file of files) {
    if(file.includes("DS")) continue
    const inputImagePath = path.join(inputDir, file);
    const outputImagePath = path.join(outputDir, path.parse(file).name + ".webp");

    try {
      await resizeAndConvertToWebP(inputImagePath, outputImagePath, width, height);
      console.log(`Processed ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

// Example usage: process all images in the 'input' directory and save them in the 'output' directory
const inputDirectory = __dirname + "/input";
const outputDirectory = __dirname + "/output";
const resizeWidth = 150;
const resizeHeight = 150;

processImagesInDirectory(
  inputDirectory,
  outputDirectory,
  resizeWidth,
  resizeHeight
);
