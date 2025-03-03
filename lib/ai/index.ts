import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

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
  } else {
    throw new Error(`Unsupported provider ${model.provider}`);
  }
};
