// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  provider: 'openai' | 'anthropic' | 'google' | 'groq';
  iconPath: string;
  canWebSearch?: boolean;
  settings?: Record<string, any>;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    provider: 'openai',
    iconPath: '/images/models/openai.svg',
    canWebSearch: false,
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    provider: 'openai',
    iconPath: '/images/models/openai.svg',
    canWebSearch: false,
  },
  {
    id: 'gpt-4.1',
    label: 'GPT 4.1',
    apiIdentifier: 'gpt-4.1',
    provider: 'openai',
    iconPath: '/images/models/openai.svg',
    canWebSearch: false,
  },
  {
    id: 'gpt-4.5-preview',
    label: 'GPT 4.5',
    apiIdentifier: 'gpt-4.5-preview',
    provider: 'openai',
    iconPath: '/images/models/openai.svg',
    canWebSearch: false,
  },
  {
    id: 'o1',
    label: 'o1',
    apiIdentifier: 'o1',
    provider: 'openai',
    iconPath: '/images/models/openai.svg',
    canWebSearch: false,
  },
  {
    id: 'o3-mini',
    label: 'o3 mini',
    apiIdentifier: 'o3-mini',
    provider: 'openai',
    iconPath: '/images/models/openai.svg',
    canWebSearch: false,
  },
  {
    id: 'claude-3-5-sonnet',
    label: 'Claude 3.5 Sonnet',
    apiIdentifier: 'claude-3-5-sonnet-latest',
    provider: 'anthropic',
    iconPath: '/images/models/anthropic.svg',
    canWebSearch: false,
  },
  {
    id: 'claude-3-7-sonnet',
    label: 'Claude 3.7 Sonnet',
    apiIdentifier: 'claude-3-7-sonnet-latest',
    provider: 'anthropic',
    iconPath: '/images/models/anthropic.svg',
    canWebSearch: false,
  },
  {
    id: 'claude-3-7-sonnet-thinking',
    label: 'Claude 3.7 Sonnet Thinking',
    apiIdentifier: 'claude-3-7-sonnet-latest',
    provider: 'anthropic',
    iconPath: '/images/models/anthropic.svg',
    canWebSearch: false,
    settings: {
      providerOptions: {
        anthropic: {
          thinking: { type: 'enabled', budgetTokens: 12000 },
        },
      },
    },
  },
  {
    id: 'gemini-2.0-flash',
    label: 'Gemini 2.0 Flash',
    apiIdentifier: 'gemini-2.0-flash',
    provider: 'google',
    iconPath: '/images/models/gemini.svg',
    canWebSearch: true,
  },
  {
    id: 'gemini-2.5-pro-exp-03-25',
    label: 'Gemini 2.5 Pro',
    apiIdentifier: 'gemini-2.5-pro-exp-03-25',
    provider: 'google',
    iconPath: '/images/models/gemini.svg',
    canWebSearch: true,
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    label: 'DeepSeek R1 Distill Llama',
    apiIdentifier: 'deepseek-r1-distill-llama-70b',
    provider: 'groq',
    iconPath: '/images/models/groq.svg',
    canWebSearch: false,
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gemini-2.0-flash';
