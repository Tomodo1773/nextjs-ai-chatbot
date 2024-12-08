// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
  provider: 'openai' | 'anthropic' | 'google';
}

export const models: Array<Model> = [
	{
		id: "gpt-4o-mini",
		label: "GPT 4o mini",
		apiIdentifier: "gpt-4o-mini",
		description: "Small model for fast, lightweight tasks",
		provider: "openai",
	},
	{
		id: "gpt-4o",
		label: "GPT 4o",
		apiIdentifier: "gpt-4o",
		description: "For complex, multi-step tasks",
		provider: "openai",
	},
	{
		id: "claude-3-5-sonnet",
		label: "Claude 3.5 Sonnet",
		apiIdentifier: "claude-3-5-sonnet-20241022",
		description: "Most capable model for complex tasks",
		provider: "anthropic",
	},
	{
		id: "claude-3-5-haiku",
		label: "Claude 3.5 Haiku",
		apiIdentifier: "claude-3-5-haiku-20241022",
		description: "Balanced performance and speed",
		provider: "anthropic",
	},
	{
		id: "gemini-1.5-flash",
		label: "Gemini 1.5 Flash",
		apiIdentifier: "gemini-1.5-flash-latest",
		description: "High-speed model for quick responses",
		provider: "google",
	},
	{
		id: "gemini-1.5-pro",
		label: "Gemini 1.5 Pro",
		apiIdentifier: "gemini-1.5-pro-latest",
		description: "Professional model for detailed and complex tasks",
		provider: "google",
	},
  {
    id: "gemini-exp-1121",
    label: "Gemini Experimental 1121",
    apiIdentifier: "gemini-exp-1121",
    description: "Experimental model for testing new features",
    provider: "google",
  }
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
