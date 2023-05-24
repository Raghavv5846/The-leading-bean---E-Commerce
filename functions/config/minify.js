const fs = require('fs');
const sharp = require('sharp');

module.exports.compressImages=async function(){
    const inputFolder = './assets/img/';
    const outputFolder = '../public/img';
  
    try {
      // Read the files in the input folder
      const fileNames = await fs.promises.readdir(inputFolder);
  
      // Process each image file
      for (const fileName of fileNames) {
        // Check if the file is an image (you can customize this check based on your file extensions)
        if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
          const inputFile = `${inputFolder}/${fileName}`;
          const outputFile = `${outputFolder}/${fileName}`;
  
          // Compress the image
          await sharp(inputFile)
            .jpeg({ quality: 80 }) // Set the desired quality for JPEG images (adjust as needed)
            .png({ compressionLevel: 8 }) // Set the desired compression level for PNG images (adjust as needed)
            .toFile(outputFile);
  
          console.log(`Image compressed: ${fileName}`);
        }
      }
  
      console.log('All images compressed successfully');
    } catch (error) {
      console.error('Error while compressing images:', error);
    }
  }
  