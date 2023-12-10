const puppeteer = require('puppeteer');
const path = require('path');

async function convertMarkdownToPDF(inputPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle0' });

  const outputFileName = path.basename(inputPath, path.extname(inputPath)) + '.pdf';
  const outputFullPath = path.join(path.dirname(inputPath), outputFileName);

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
