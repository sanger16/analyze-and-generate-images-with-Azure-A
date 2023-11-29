// Azure image analyser using Cumputer Vision API
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
require('dotenv').config();


/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = 'c9b033b7310b48388922fc7efbfdeded'/*process.env.VISION_KEY*/;
//const key = process.env.VISION_KEY;
const endpoint = 'https://challenge-image-analysis.cognitiveservices.azure.com/'/*process.env.VISION_ENDPOINT*/;
//const endpoint = process.env.VISION_ENDPOINT || '';

// function to check if key and endpoint are set in the environment variables
const isConfigured = () => {
    if (!key || !endpoint)
      return false;
  };

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
/**
 * END - Authenticate
 */

/* analyseImage is a function that receive an image URL and return a JSON response of the Computer Vision API  */
const analyseImage = async (imageUrl) => {
  console.log('Analyzing an image from:', imageUrl);
  // Analyze URL image
  const features = ["Categories", "Description", "Color", "Faces", "ImageType", "Adult", "Objects"];
  const result = await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: features });
  return result;
}

module.exports = {analyseImage, isConfigured};