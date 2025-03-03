import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { db } from "@/lib/db/queries";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
	try {
		const session = await auth();
		if (!session?.user?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const [userData] = await db.select({ systemPrompt: user.system_prompt }).from(user).where(eq(user.email, session.user.email));

		return NextResponse.json({ systemPrompt: userData?.systemPrompt || "" });
	} catch (error) {
		console.error("Failed to get system prompt:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session?.user?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const json = await req.json();
		const { systemPrompt } = json;

		await db.update(user).set({ system_prompt: systemPrompt }).where(eq(user.email, session.user.email));

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to update system prompt:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
