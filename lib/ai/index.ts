import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { LanguageModel, LanguageModelV1StreamPart } from "ai";

import { customMiddleware } from "./custom-middleware";
import { models } from "./models";

export const customModel = (apiIdentifier: string): LanguageModel => {
	const model = models.find((m) => m.apiIdentifier === apiIdentifier);
	if (!model) {
		throw new Error(`Model ${apiIdentifier} not found`);
	}

	let baseModel: LanguageModel;

	if (model.provider === "openai") {
		baseModel = openai(apiIdentifier) as LanguageModel;
	} else if (model.provider === "anthropic") {
		baseModel = anthropic(apiIdentifier) as LanguageModel;
	} else if (model.provider === "google") {
		baseModel = google(apiIdentifier) as LanguageModel;
	} else {
		throw new Error(`Unsupported provider ${model.provider}`);
	}

	return {
		...baseModel,
		doStream: async (params) => {
			const result = await baseModel.doStream(params);
			return {
				...result,
				stream: result.stream.pipeThrough(customMiddleware)
			};
		}
	};
};
