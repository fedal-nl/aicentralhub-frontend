import { Tool, Category } from '@/types/tool'

export const featuredTools: Tool[] = [
  {
    id: 1,
    name: 'ChatGPT',
    slug: 'chatgpt',
    description:
      'The most widely used AI chatbot for writing, coding, research and more.',
    category: 'AI Chatbots',
    pricing: 'freemium',
    url: 'https://chat.openai.com',
  },
  {
    id: 2,
    name: 'Midjourney',
    slug: 'midjourney',
    description:
      'AI art generator that creates stunning images from text prompts.',
    category: 'Generative Art',
    pricing: 'paid',
    url: 'https://midjourney.com',
  },
  {
    id: 3,
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: 'Realistic AI voice generation and text-to-speech platform.',
    category: 'Audio',
    pricing: 'freemium',
    url: 'https://elevenlabs.io',
  },
  {
    id: 4,
    name: 'Claude',
    slug: 'claude',
    description:
      'Next-generation AI assistant by Anthropic for analysis, writing and coding.',
    category: 'AI Chatbots',
    pricing: 'freemium',
    url: 'https://claude.ai',
  },
  {
    id: 5,
    name: 'Runway',
    slug: 'runway',
    description:
      'AI-powered video editing and generation platform for creators.',
    category: 'Video Editing',
    pricing: 'freemium',
    url: 'https://runwayml.com',
  },
  {
    id: 6,
    name: 'Grammarly',
    slug: 'grammarly',
    description: 'AI writing assistant that checks grammar, tone and clarity.',
    category: 'General Writing',
    pricing: 'freemium',
    url: 'https://grammarly.com',
  },
  {
    id: 7,
    name: 'Jasper AI',
    slug: 'jasper',
    description:
      'AI copywriting tool for marketing teams and content creators.',
    category: 'Copywriting',
    pricing: 'paid',
    url: 'https://jasper.ai',
  },
  {
    id: 8,
    name: 'Perplexity',
    slug: 'perplexity',
    description:
      'AI-powered search engine that answers questions with cited sources.',
    category: 'Search Engine',
    pricing: 'freemium',
    url: 'https://perplexity.ai',
  },
]

export const topCategories: Category[] = [
  { id: 1, name: 'Productivity', slug: 'productivity', count: 1115 },
  { id: 2, name: 'AI Chatbots', slug: 'ai-chatbots', count: 973 },
  { id: 3, name: 'Developer Tools', slug: 'developer-tools', count: 534 },
  { id: 4, name: 'Copywriting', slug: 'copywriting', count: 251 },
  { id: 5, name: 'Design Tools', slug: 'design-tools', count: 242 },
  { id: 6, name: 'Marketing', slug: 'marketing', count: 330 },
  { id: 7, name: 'SEO', slug: 'seo', count: 180 },
  { id: 8, name: 'Research', slug: 'research', count: 157 },
  {
    id: 9,
    name: 'Education Assistant',
    slug: 'education-assistant',
    count: 151,
  },
  { id: 10, name: 'Design Assistant', slug: 'design-assistant', count: 145 },
  { id: 11, name: 'Low-code/no-code', slug: 'low-code-no-code', count: 134 },
  { id: 12, name: 'Customer Support', slug: 'customer-support', count: 133 },
]
