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

interface ChatSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatSettingsDialog({
  open,
  onOpenChange,
}: ChatSettingsDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>チャット設定</AlertDialogTitle>
          <AlertDialogDescription>
            チャットに関する各種設定を行うことができます。
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* ここに設定項目を追加していく */}
          <div className="px-4">
            <p>設定項目はこちらに追加されます</p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>閉じる</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
