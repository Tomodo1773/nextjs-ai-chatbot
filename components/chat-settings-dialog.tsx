import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ChatSettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ChatSettingsDialog({ open, onOpenChange }: ChatSettingsDialogProps) {
	const { data: session } = useSession();
	const [systemPrompt, setSystemPrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchSystemPrompt = async () => {
			if (!session?.user?.email) return;

			try {
				const response = await fetch("/api/settings");
				const data = await response.json();
				setSystemPrompt(data.systemPrompt || "");
			} catch (error) {
				console.error("Failed to fetch system prompt:", error);
				toast.error("システムプロンプトの取得に失敗しました");
			}
		};

		if (open) {
			fetchSystemPrompt();
		}
	}, [open, session?.user?.email]);

	const handleSave = async () => {
		if (!session?.user?.email) return;

		setIsLoading(true);
		try {
			const response = await fetch("/api/settings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ systemPrompt }),
			});

			if (!response.ok) {
				throw new Error("Failed to save system prompt");
			}

			toast.success("設定を保存しました");
			onOpenChange(false);
		} catch (error) {
			console.error("Failed to save system prompt:", error);
			toast.error("設定の保存に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>チャット設定</AlertDialogTitle>
					<AlertDialogDescription>チャットに関する各種設定を行うことができます。</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="system-prompt">システムプロンプト</Label>
						<Textarea id="system-prompt" placeholder="AIアシスタントの振る舞いを設定するプロンプトを入力してください" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={5} />
					</div>
				</div>

				<AlertDialogFooter className="gap-2">
					<AlertDialogCancel>キャンセル</AlertDialogCancel>
					<Button onClick={handleSave} disabled={isLoading}>
						{isLoading ? "保存中..." : "保存"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
