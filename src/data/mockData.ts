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

export const allTools: Tool[] = [
  ...featuredTools,
  {
    id: 9,
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description:
      'AI pair programmer that suggests code completions in real time.',
    category: 'Developer Tools',
    pricing: 'paid',
    url: 'https://github.com/features/copilot',
  },
  {
    id: 10,
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'AI writing and summarization built directly into Notion.',
    category: 'Productivity',
    pricing: 'freemium',
    url: 'https://notion.so',
  },
  {
    id: 11,
    name: 'Copy.ai',
    slug: 'copy-ai',
    description:
      'AI copywriter that generates marketing copy, emails and blog posts.',
    category: 'Copywriting',
    pricing: 'freemium',
    url: 'https://copy.ai',
  },
  {
    id: 12,
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description:
      'Open source text-to-image AI model for generating detailed artwork.',
    category: 'Generative Art',
    pricing: 'free',
    url: 'https://stability.ai',
  },
  {
    id: 13,
    name: 'Synthesia',
    slug: 'synthesia',
    description:
      'Create AI videos with virtual presenters from text in minutes.',
    category: 'Video Editing',
    pricing: 'paid',
    url: 'https://synthesia.io',
  },
  {
    id: 14,
    name: 'Otter.ai',
    slug: 'otter-ai',
    description:
      'AI meeting assistant that records, transcribes and summarizes conversations.',
    category: 'Productivity',
    pricing: 'freemium',
    url: 'https://otter.ai',
  },
  {
    id: 15,
    name: 'Canva AI',
    slug: 'canva-ai',
    description:
      'AI-powered design tools built into Canva for images, presentations and more.',
    category: 'Design Tools',
    pricing: 'freemium',
    url: 'https://canva.com',
  },
  {
    id: 16,
    name: 'Murf AI',
    slug: 'murf-ai',
    description: 'AI voice generator for creating studio-quality voiceovers.',
    category: 'Audio',
    pricing: 'freemium',
    url: 'https://murf.ai',
  },
  {
    id: 17,
    name: 'Writesonic',
    slug: 'writesonic',
    description: 'AI writing tool for blogs, ads, emails and landing pages.',
    category: 'Copywriting',
    pricing: 'freemium',
    url: 'https://writesonic.com',
  },
  {
    id: 18,
    name: 'Tabnine',
    slug: 'tabnine',
    description:
      'AI code completion tool that supports all major programming languages.',
    category: 'Developer Tools',
    pricing: 'freemium',
    url: 'https://tabnine.com',
  },
  {
    id: 19,
    name: 'Descript',
    slug: 'descript',
    description: 'AI-powered audio and video editing by editing a transcript.',
    category: 'Video Editing',
    pricing: 'freemium',
    url: 'https://descript.com',
  },
  {
    id: 20,
    name: 'Surfer SEO',
    slug: 'surfer-seo',
    description:
      'AI SEO tool that helps you write and optimize content to rank higher.',
    category: 'SEO',
    pricing: 'paid',
    url: 'https://surferseo.com',
  },
  {
    id: 21,
    name: 'Tome',
    slug: 'tome',
    description:
      'AI presentation builder that creates beautiful slides from a prompt.',
    category: 'Productivity',
    pricing: 'freemium',
    url: 'https://tome.app',
  },
  {
    id: 22,
    name: 'Hugging Face',
    slug: 'hugging-face',
    description:
      'Open source platform for machine learning models and datasets.',
    category: 'Developer Tools',
    pricing: 'free',
    url: 'https://huggingface.co',
  },
  {
    id: 23,
    name: 'Fireflies.ai',
    slug: 'fireflies-ai',
    description:
      'AI notetaker that transcribes and analyzes your meetings automatically.',
    category: 'Productivity',
    pricing: 'freemium',
    url: 'https://fireflies.ai',
  },
  {
    id: 24,
    name: 'DALL-E 3',
    slug: 'dall-e-3',
    description:
      'OpenAI image generation model that creates detailed images from text.',
    category: 'Generative Art',
    pricing: 'freemium',
    url: 'https://openai.com/dall-e-3',
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

export const allCategories: string[] = [
  'AI Chatbots',
  'Audio',
  'Copywriting',
  'Design Tools',
  'Developer Tools',
  'Generative Art',
  'General Writing',
  'Productivity',
  'Search Engine',
  'SEO',
  'Video Editing',
]
