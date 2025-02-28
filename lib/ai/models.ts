// Define your models here.

export interface Model {
	id: string;
	label: string;
	apiIdentifier: string;
	description: string;
	provider: "openai" | "anthropic" | "google";
	iconPath: string;
}

export const models: Array<Model> = [
	{
		id: "gpt-4o-mini",
		label: "GPT 4o mini",
		apiIdentifier: "gpt-4o-mini",
		description: "Small model for fast, lightweight tasks",
		provider: "openai",
		iconPath: "/images/models/openai.svg",
	},
	{
		id: "gpt-4o",
		label: "GPT 4o",
		apiIdentifier: "gpt-4o",
		description: "For complex, multi-step tasks",
		provider: "openai",
		iconPath: "/images/models/openai.svg",
	},
	{
		id: "gpt-4.5-preview",
		label: "GPT 4.5",
		apiIdentifier: "gpt-4.5-preview",
		description: "For complex, multi-step tasks",
		provider: "openai",
		iconPath: "/images/models/openai.svg",
	},
	{
		id: "claude-3-5-sonnet",
		label: "Claude 3.5 Sonnet",
		apiIdentifier: "claude-3-5-sonnet-latest",
		description: "Most capable model for complex tasks",
		provider: "anthropic",
		iconPath: "/images/models/anthropic.svg",
	},
	{
		id: "claude-3-7-sonnet",
		label: "Claude 3.7 Sonnet",
		apiIdentifier: "claude-3-7-sonnet-latest",
		description: "Balanced performance and speed",
		provider: "anthropic",
		iconPath: "/images/models/anthropic.svg",
	},
	{
		id: "gemini-2.0-flash",
		label: "Gemini 2.0 Flash",
		apiIdentifier: "gemini-2.0-flash",
		description: "High-speed model for quick responses",
		provider: "google",
		iconPath: "/images/models/gemini.svg",
	},
	{
		id: "gemini-2.0-pro-exp-02-05",
		label: "Gemini 2.0 Pro",
		apiIdentifier: "gemini-2.0-pro-exp-02-05",
		description: "Professional model for detailed and complex tasks",
		provider: "google",
		iconPath: "/images/models/gemini.svg",
	},
	{
		id: "gemini-2.0-flash-thinking-exp-01-21",
		label: "Gemini 2.0 Flash Thinking",
		apiIdentifier: "gemini-2.0-flash-thinking-exp-01-21",
		description: "Experimental model for testing new features",
		provider: "google",
		iconPath: "/images/models/gemini.svg",
	},
] as const;

export const DEFAULT_MODEL_NAME: string = "gemini-2.0-flash";
