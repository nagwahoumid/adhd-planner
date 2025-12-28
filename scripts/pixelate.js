const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'landing', 'bg.png');
const outputPath = path.join(__dirname, '..', 'public', 'landing', 'bg_pixel.png');

async function pixelate() {
  try {
    console.log('Reading:', inputPath);
    
    // Step 1: Downscale to 80x45 using nearest neighbor
    console.log('Downscaling to 80x45 (nearest neighbor)...');
    const downscaled = await sharp(inputPath)
      .resize(40, 22, {
        kernel: sharp.kernel.nearest
      })
      .toBuffer();
    
    // Step 2: Upscale back to 320x180 using nearest neighbor
    console.log('Upscaling to 320x180 (nearest neighbor)...');
    await sharp(downscaled)
      .resize(320, 180, {
        kernel: sharp.kernel.nearest
      })
      .toFile(outputPath);
    
    console.log('Pixelated background saved to:', outputPath);
    console.log('Size: 320x180 pixels (chunky pixel art style)');
  } catch (error) {
    console.error('Error pixelating image:', error);
    process.exit(1);
  }
}

pixelate();

