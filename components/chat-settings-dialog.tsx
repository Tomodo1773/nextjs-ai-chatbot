import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ChatSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatSettingsDialog({
  open,
  onOpenChange,
}: ChatSettingsDialogProps) {
  const { data: session } = useSession();
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        setSystemPrompt(data.systemPrompt || '');
        setUserProfile(data.userProfile || '');
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        toast.error('設定の取得に失敗しました');
      }
    };

    if (open) {
      fetchSettings();
    }
  }, [open, session?.user?.email]);

  const handleSave = async () => {
    if (!session?.user?.email) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ systemPrompt, userProfile }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      toast.success('設定を保存しました');
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('設定の保存に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[85vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>チャット設定</AlertDialogTitle>
          <AlertDialogDescription>
            AIアシスタントの振る舞いをカスタマイズするための設定を行えます。
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">カスタム指示</Label>
              <Textarea
                id="system-prompt"
                placeholder="AIアシスタントへの追加指示を入力してください（例：専門用語を使わずに説明してください）"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                ここで設定した指示は、基本のシステムプロンプトに組み込まれます。AIアシスタントの基本的な振る舞いを維持しながら、追加の指示を与えることができます。
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-profile">ユーザープロファイル</Label>
              <Textarea
                id="user-profile"
                placeholder="あなたについての情報を入力してください（例：プログラミング歴5年のWebエンジニアです）"
                value={userProfile}
                onChange={(e) => setUserProfile(e.target.value)}
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                ここで設定した情報は、AIアシスタントがあなたに合わせた応答をするために使用されます。
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-2 border-t pt-4 mt-2">
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? '保存中...' : '保存'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
