import { registerOTel } from '@vercel/otel';
import { AISDKExporter } from 'langsmith/vercel';

export function register() {
  registerOTel({
    serviceName: 'nextjs-ai-chatbot',
    traceExporter: new AISDKExporter(),
  });
}
