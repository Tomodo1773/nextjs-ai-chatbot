import { LanguageModelV1StreamPart } from 'ai';

export const customMiddleware = new TransformStream<LanguageModelV1StreamPart, LanguageModelV1StreamPart>({
  transform(chunk, controller) {
    if (chunk.type === 'text-delta') {
      controller.enqueue(chunk);
    }
  }
});
