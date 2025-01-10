import screenshot from 'screenshot-desktop';
import fs from 'fs';
import path from 'path';

// Function to capture and save a screenshot
export const captureAndSaveScreenshot = async (fileName) => {

  const destinationFolder = "../client/Screenshot";
  try {
    // Ensure the destination folder exists, otherwise create it
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    // Set the output file path
    const outputFile = path.join(destinationFolder, fileName);

    // Capture the screenshot
    const imgBuffer = await screenshot();

    // Save the image to the disk
    fs.writeFileSync(outputFile, imgBuffer);

    //console.log(`Screenshot captured successfully. Image saved at: ${outputFile}`);
  } catch (err) {
    console.error('Error capturing screenshot:', err);
  }
};