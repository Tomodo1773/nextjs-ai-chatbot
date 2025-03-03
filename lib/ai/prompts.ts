import "server-only";
import { getUser } from "../db/queries";

const defaultSystemPrompt = `あなたは人々を助けるAIアシスタントです。`;

export async function getSystemPrompt(email: string): Promise<string> {
	try {
		const users = await getUser(email);
		if (users.length > 0 && users[0].system_prompt) {
			return users[0].system_prompt;
		}
		return defaultSystemPrompt;
	} catch (error) {
		console.error("Failed to get system prompt:", error);
		return defaultSystemPrompt;
	}
}
