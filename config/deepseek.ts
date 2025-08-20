// DeepSeek Configuration
// Use environment variables for API key in production

import { environment } from './environment';

export const DEEPSEEK_CONFIG = {
  apiKey: environment.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat',
  maxTokens: 600,
  temperature: 0.7,
  
  // Response customization
  responseStyle: {
    tone: 'friendly_professional', // 'formal', 'casual', 'friendly_professional'
    language: 'english', // 'english', 'swahili', 'bilingual'
    detailLevel: 'moderate', // 'brief', 'moderate', 'detailed'
    includeAppFeatures: true,
    includeLocalContext: true,
  },
  
  // Urgency thresholds
  urgencyKeywords: {
    high: ['chest pain', 'severe', 'bleeding', 'unconscious', 'difficulty breathing'],
    medium: ['headache', 'fever', 'cough', 'fatigue', 'pain'],
    low: ['diet', 'exercise', 'sleep', 'stress', 'hygiene']
  }
};

// Instructions to get your DeepSeek API key:
// 1. Go to https://platform.deepseek.com/
// 2. Sign up or log in
// 3. Go to API Keys section
// 4. Create a new API key
// 5. Set it as an environment variable: DEEPSEEK_API_KEY=your_key_here
// 6. Keep your API key secure and never commit it to version control

// For development, you can use the hardcoded key above
// For production, always use environment variables
