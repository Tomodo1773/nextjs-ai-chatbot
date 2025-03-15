import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';

import { customMiddleware } from './custom-middleware';
import { models } from './models';

export const customModel = (apiIdentifier: string) => {
  const model = models.find((m) => m.apiIdentifier === apiIdentifier);
  if (!model) {
    throw new Error(`Model ${apiIdentifier} not found`);
  }

  if (model.provider === 'openai') {
    return wrapLanguageModel({
      model: openai(apiIdentifier),
      middleware: customMiddleware,
    });
  } else if (model.provider === 'anthropic') {
    return wrapLanguageModel({
      model: anthropic(apiIdentifier),
      middleware: customMiddleware,
    });
  } else if (model.provider === 'google') {
    return wrapLanguageModel({
      model: google(apiIdentifier),
      middleware: customMiddleware,
    });
  } else if (model.provider === 'google-search') {
    return wrapLanguageModel({
      model: google(apiIdentifier, {
    useSearchGrounding: true,
  }),
      middleware: customMiddleware,
    });
  } else if (model.provider === 'groq') {
    return wrapLanguageModel({
      model: groq(apiIdentifier),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    });
  } else {
    throw new Error(`Unsupported provider ${model.provider}`);
  }
};
