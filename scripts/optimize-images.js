// This is a Node.js script that can be run to optimize all images in the project
// Run with: node scripts/optimize-images.js

const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const PUBLIC_DIR = path.join(process.cwd(), "public")
const QUALITY = 80 // Adjust quality as needed (80 is a good balance)
const MAX_WIDTH = 1920 // Maximum width for any image

// Get all image files
function getImageFiles(dir) {
  const files = fs.readdirSync(dir)

  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
    })
    .map((file) => path.join(dir, file))
}

// Optimize a single image
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase()
    const fileName = path.basename(filePath)

    console.log(`Optimizing: ${fileName}`)

    const image = sharp(filePath)
    const metadata = await image.metadata()

    // Resize if larger than MAX_WIDTH
    if (metadata.width && metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH)
    }

    // Convert to appropriate format and optimize
    if ([".jpg", ".jpeg"].includes(ext)) {
      await image
        .jpeg({ quality: QUALITY })
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(filePath, data)
        })
    } else if (ext === ".png") {
      await image
        .png({ quality: QUALITY })
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(filePath, data)
        })
    } else if (ext === ".webp") {
      await image
        .webp({ quality: QUALITY })
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(filePath, data)
        })
    }

    // Also create WebP version for all non-webp images
    if (ext !== ".webp") {
      const webpPath = filePath.replace(ext, ".webp")
      await image.webp({ quality: QUALITY }).toFile(webpPath)
      console.log(`Created WebP version: ${path.basename(webpPath)}`)
    }

    console.log(`Optimized: ${fileName}`)
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error)
  }
}

// Main function
async function main() {
  const imageFiles = getImageFiles(PUBLIC_DIR)

  console.log(`Found ${imageFiles.length} images to optimize`)

  for (const file of imageFiles) {
    await optimizeImage(file)
  }

  console.log("Image optimization complete!")
}

main().catch(console.error)
