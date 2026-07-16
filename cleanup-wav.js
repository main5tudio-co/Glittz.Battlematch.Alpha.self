#!/usr/bin/env node

/**
 * cleanup-wav.js
 * Deletes all .wav files outside the asset folder
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const assetFolder = path.join(rootDir, 'asset');

// Get all files in root directory
fs.readdirSync(rootDir).forEach(file => {
  const filePath = path.join(rootDir, file);
  const stat = fs.statSync(filePath);
  
  // Check if it's a .wav file and not in the asset folder
  if (stat.isFile() && path.extname(file).toLowerCase() === '.wav') {
    try {
      fs.unlinkSync(filePath);
      console.log(`✓ Deleted: ${file}`);
    } catch (error) {
      console.error(`✗ Failed to delete ${file}:`, error.message);
    }
  }
});

console.log('Cleanup complete!');
