const fs = require('fs');
const path = require('path');

const pageCssPath = path.join(__dirname, 'src/app/page.module.css');
const componentsDir = path.join(__dirname, 'src/components/home');

let content = fs.readFileSync(pageCssPath, 'utf-8');

// The mapping of class name prefixes/exact names to their component
const map = {
  'hero': 'Hero',
  'mainTitle': 'Hero',
  'convertHash': 'Hero',
  'convertWord': 'Hero',
  'mainSubtitle': 'Hero',
  'primaryBtn': 'Hero',
  'secondaryBtn': 'Hero',
  
  'about': 'Pills',
  'pill': 'Pills',
  
  'vision': 'Vision',
  'card': 'Vision',
  'enquire': 'Vision',
  
  'faq': 'FAQ',
  
  'scroll': 'CraneScrollAnimation',
  'loader': 'CraneScrollAnimation', // Or PageLoader, but let's put in Crane for now and we fixed PageLoader separately
  'canvas': 'CraneScrollAnimation',
  'animation': 'CraneScrollAnimation',
  'caption': 'CraneScrollAnimation',
  'progress': 'CraneScrollAnimation',
  'indicator': 'CraneScrollAnimation'
};

function getComponentForLine(line) {
  for (const [key, comp] of Object.entries(map)) {
    if (line.includes(`.${key}`)) {
      return comp;
    }
  }
  return null;
}

// We will parse the file line by line
const lines = content.split('\n');

let currentMedia = null;
let currentBlock = [];
let targetComp = null;
let insideBlock = false;

const distributions = {
  'Hero': '',
  'Pills': '',
  'Vision': '',
  'CraneScrollAnimation': '',
  'FAQ': ''
};

let remainingCss = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.startsWith('@media')) {
    currentMedia = line;
    remainingCss.push(line);
    continue;
  }
  
  if (currentMedia && line.startsWith('}')) {
    currentMedia = null;
    remainingCss.push(line);
    continue;
  }
  
  // Inside a media query
  if (currentMedia) {
    if (line.includes('{') && line.includes('.')) {
      targetComp = getComponentForLine(line);
      insideBlock = true;
      currentBlock.push(line);
    } else if (insideBlock) {
      currentBlock.push(line);
      if (line.includes('}')) {
        // End of block
        if (targetComp && distributions[targetComp] !== undefined) {
          distributions[targetComp] += `\n${currentMedia}\n` + currentBlock.join('\n') + `\n}\n`;
        } else {
          // If not mapped, keep in remaining
          remainingCss.push(...currentBlock);
        }
        insideBlock = false;
        currentBlock = [];
        targetComp = null;
      }
    } else {
      // Just some empty lines or comments inside media
      remainingCss.push(line);
    }
  } else {
    // Outside media query
    // Keep only .main and .textGradient base
    if (line.includes('.main ') || line.includes('.main {') || line.includes('.textGradient') || line.startsWith('/*')) {
      remainingCss.push(line);
      insideBlock = true;
      targetComp = null; // null means keep
    } else if (insideBlock && targetComp === null) {
      remainingCss.push(line);
      if (line.includes('}')) insideBlock = false;
    } else if (line.includes('{') && line.includes('.')) {
      // It's a base class we already extracted or don't care about, skip it
      insideBlock = true;
      targetComp = 'skip';
    } else if (insideBlock && targetComp === 'skip') {
      if (line.includes('}')) insideBlock = false;
    } else if (line.trim() === '') {
      remainingCss.push(line);
    }
  }
}

// Append extracted media queries to respective files
for (const comp in distributions) {
  if (distributions[comp].trim() !== '') {
    const compPath = path.join(componentsDir, `${comp}.module.css`);
    if (fs.existsSync(compPath)) {
      fs.appendFileSync(compPath, `\n/* Extracted Responsive Styles */\n${distributions[comp]}`);
      console.log(`Updated ${comp}.module.css`);
    }
  }
}

fs.writeFileSync(pageCssPath, remainingCss.join('\n').replace(/\n\s*\n\s*\n/g, '\n\n'));
console.log('Cleaned page.module.css');
