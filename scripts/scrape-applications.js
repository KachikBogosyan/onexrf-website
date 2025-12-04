const https = require('https');
const cheerio = require('cheerio');

const URL = 'https://cathetertipping.com/catheter-tipping-machines-applications/';

/**
 * Fetches HTML content from a URL
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Extracts text content from a cheerio element
 */
function getText($, element) {
  return $(element).text().trim();
}

/**
 * Scrapes application data from the page
 */
async function scrapeApplications() {
  try {
    console.log('Fetching page...');
    const html = await fetchHTML(URL);
    
    console.log('Parsing HTML...');
    const $ = cheerio.load(html);
    
    const applications = [];
    
    // Based on the page structure, applications appear to be in sections
    // Each application has a heading (h3, h4, etc.) followed by content
    // Look for headings that might be application titles
    
    // Try to find application sections - they might be in accordion divs or sections
    // Look for patterns like headings followed by paragraphs and lists
    
    const headings = $('h1, h2, h3, h4, h5, h6').toArray();
    
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const headingText = getText($, heading).trim();
      
      // Skip main page headings
      if (headingText.includes('Catheter Tipping Machines') || 
          headingText.includes('Our Catheter Tipping Equipment') ||
          headingText.includes('Advantages of partnering') ||
          headingText.includes('Applications') && headingText.length < 20 ||
          headingText.length < 3) {
        continue;
      }
      
      // Look for content after this heading
      let current = $(heading).next();
      let description = '';
      const specifications = {};
      let foundContent = false;
      let depth = 0;
      const maxDepth = 20; // Prevent infinite loops
      
      // Collect all content until we hit another major heading
      while (current.length > 0 && depth < maxDepth) {
        depth++;
        const tagName = current.prop('tagName');
        
        // Stop if we hit another heading
        if (tagName && tagName.match(/^H[1-6]$/)) {
          const nextHeadingText = getText($, current).trim();
          // Only stop if it's a meaningful heading (not empty)
          if (nextHeadingText.length > 3) {
            break;
          }
        }
        
        // Look for description paragraphs
        if (tagName === 'P') {
          const text = getText($, current);
          if (text.length > 50 && !description) {
            description = text;
            foundContent = true;
          }
        }
        
        // Look for unordered or ordered lists with specifications
        if (tagName === 'UL' || tagName === 'OL') {
          const listItems = current.find('li').toArray();
          listItems.forEach(li => {
            const text = getText($, li);
            
            // Parse specifications in format "Label: Value"
            if (text.includes(':')) {
              // Handle cases where there might be multiple colons
              const colonIndex = text.indexOf(':');
              const label = text.substring(0, colonIndex).trim();
              const value = text.substring(colonIndex + 1).trim();
              
              // Clean up common label patterns
              let cleanLabel = label;
              // Remove bold markers if present
              cleanLabel = cleanLabel.replace(/\*\*/g, '').replace(/\*/g, '');
              
              if (cleanLabel && value) {
                specifications[cleanLabel] = value;
              }
            } else if (text.length > 20) {
              // Some items might not have colons - treat as additional notes
              if (!specifications['Additional Notes']) {
                specifications['Additional Notes'] = [];
              }
              if (Array.isArray(specifications['Additional Notes'])) {
                specifications['Additional Notes'].push(text);
              }
            }
          });
          foundContent = true;
        }
        
        // Also check for strong/bold text followed by regular text (another spec format)
        if (tagName === 'P' || tagName === 'DIV') {
          const strongElements = current.find('strong').toArray();
          strongElements.forEach(strong => {
            const label = getText($, strong);
            const parent = $(strong).parent();
            const fullText = getText($, parent);
            
            if (fullText.includes(':')) {
              const colonIndex = fullText.indexOf(':');
              const extractedLabel = fullText.substring(0, colonIndex).trim();
              const extractedValue = fullText.substring(colonIndex + 1).trim();
              
              if (extractedLabel && extractedValue && !specifications[extractedLabel]) {
                specifications[extractedLabel] = extractedValue;
              }
            }
          });
        }
        
        current = current.next();
      }
      
      // Only add if we found meaningful content
      if (description || Object.keys(specifications).length > 0) {
        // Filter out obvious non-application headings
        const titleLower = headingText.toLowerCase();
        const isApplication = !titleLower.includes('home') && 
                              !titleLower.includes('about') && 
                              !titleLower.includes('equipment') &&
                              !titleLower.includes('support') &&
                              !titleLower.includes('contact') &&
                              !titleLower.includes('privacy') &&
                              !titleLower.includes('copyright') &&
                              !titleLower.includes('terms') &&
                              (description.length > 20 || Object.keys(specifications).length > 0);
        
        if (isApplication) {
          applications.push({
            title: headingText,
            description: description,
            specifications: specifications
          });
        }
      }
    }
    
    // Remove duplicates and clean up
    const uniqueApplications = [];
    const seenTitles = new Set();
    
    applications.forEach(app => {
      if (!seenTitles.has(app.title) && app.title.length > 2) {
        seenTitles.add(app.title);
        uniqueApplications.push(app);
      }
    });
    
    return uniqueApplications;
    
  } catch (error) {
    console.error('Error scraping applications:', error);
    throw error;
  }
}

// Run the scraper
if (require.main === module) {
  scrapeApplications()
    .then(applications => {
      console.log(`\nFound ${applications.length} applications:\n`);
      applications.forEach((app, index) => {
        console.log(`${index + 1}. ${app.title}`);
        console.log(`   Description: ${app.description.substring(0, 100)}...`);
        console.log(`   Specifications: ${Object.keys(app.specifications).length} items\n`);
      });
      
      // Output as JSON
      console.log('\n=== JSON OUTPUT ===\n');
      console.log(JSON.stringify(applications, null, 2));
    })
    .catch(error => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}

module.exports = { scrapeApplications };

