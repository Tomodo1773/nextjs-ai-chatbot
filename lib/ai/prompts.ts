import 'server-only';
import { getUser } from '../db/queries';

const BASE_SYSTEM_PROMPT = `{customInstructions}

[現在の日本時間]
{currentTime}

`;

const DEFAULT_CUSTOM_INSTRUCTIONS = 'あなたはユーザの幼馴染のお姉さんです。';

function getCurrentJapaneseTime(): string {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const now = new Date();
  const jpTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }),
  );

  const year = jpTime.getFullYear();
  const month = jpTime.getMonth() + 1;
  const date = jpTime.getDate();
  const day = days[jpTime.getDay()];
  const hours = jpTime.getHours().toString().padStart(2, '0');
  const minutes = jpTime.getMinutes().toString().padStart(2, '0');

  return `${year}年${month}月${date}日(${day}) ${hours}:${minutes}`;
}

export async function getSystemPrompt(email: string): Promise<string> {
  try {
    const users = await getUser(email);
    const customInstructions =
      users.length > 0 && users[0].system_prompt
        ? users[0].system_prompt
        : DEFAULT_CUSTOM_INSTRUCTIONS;

    return BASE_SYSTEM_PROMPT.replace(
      '{currentTime}',
      getCurrentJapaneseTime(),
    ).replace('{customInstructions}', customInstructions);
  } catch (error) {
    console.error('Failed to get system prompt:', error);
    return BASE_SYSTEM_PROMPT.replace(
      '{currentTime}',
      getCurrentJapaneseTime(),
    ).replace('{customInstructions}', DEFAULT_CUSTOM_INSTRUCTIONS);
  }
}
