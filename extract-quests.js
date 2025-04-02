// extract-quests.js
// Run this script to extract quest data from data.js to JSON format

// First, load the existing data
// You'll need to modify this to match how your data is structured
const fs = require('fs');

// Read the data.js file
let dataJsContent;
try {
  dataJsContent = fs.readFileSync('data.js', 'utf8');
} catch (error) {
  console.error('Error reading data.js:', error);
  process.exit(1);
}

// Extract the QUEST_DATA array using regex
// This pattern looks for an array assignment to QUEST_DATA
const questDataMatch = dataJsContent.match(/const QUEST_DATA\s*=\s*(\[[\s\S]*?\]);/);

if (!questDataMatch || !questDataMatch[1]) {
  console.error('Could not find QUEST_DATA in data.js');
  process.exit(1);
}

// The extracted array as a string
const questDataString = questDataMatch[1];

// Evaluate the string to get the actual array
// Note: This is potentially unsafe if your data.js contains malicious code
// A safer alternative would be to use a proper JS parser
let questData;
try {
  questData = eval(questDataString);
} catch (error) {
  console.error('Error evaluating QUEST_DATA:', error);
  process.exit(1);
}

console.log(`Extracted ${questData.length} quests from data.js`);

// Create the JSON structure
const jsonOutput = {
  version: "1.0.0",
  timestamp: new Date().toISOString(),
  quests: questData
};

// Write to quests.json
try {
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/quests.json', JSON.stringify(jsonOutput, null, 2));
  console.log('Successfully wrote data/quests.json');
} catch (error) {
  console.error('Error writing quests.json:', error);
  process.exit(1);
}