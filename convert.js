const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertMarkdownToPDF(inputPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle0' });

  const outputFileName = path.basename(inputPath, path.extname(inputPath)) + '.pdf';
  const outputFullPath = path.join('pdf', outputFileName);

  // Ensure the 'pdf' folder exists
  if (!fs.existsSync('pdf')) {
    fs.mkdirSync('pdf');
  }

  await page.pdf({ path: outputFullPath, format: 'A4' });

  await browser.close();
}

// Use process.argv to get command line arguments
const inputMarkdownFile = process.argv[2];

// Check if the input Markdown file is provided
if (!inputMarkdownFile) {
  console.error('Please provide the input Markdown file.');
  process.exit(1);
}

// Run the conversion
convertMarkdownToPDF(inputMarkdownFile);