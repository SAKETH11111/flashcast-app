import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Folder, Home, FolderInput } from "lucide-react";
import type { Folder as FolderType } from '../DashboardLayout';

interface MoveToFolderDialogProps {
  folders: FolderType[];
  onMoveToFolder: (folderId: string | null) => void;
  trigger?: React.ReactNode;
  selectedCount?: number;
}

export function MoveToFolderDialog({ folders, onMoveToFolder, trigger, selectedCount = 1 }: MoveToFolderDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const handleSubmit = () => {
    onMoveToFolder(selectedFolderId);
    setOpen(false);
    setSelectedFolderId(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2 px-3">
            <FolderInput className="w-5 h-5" />
            Move to folder
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>
            Move {selectedCount === 1 ? 'deck' : `${selectedCount} decks`} to folder
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={selectedFolderId || 'root'} onValueChange={(value) => setSelectedFolderId(value === 'root' ? null : value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="root" id="root" />
              <Label htmlFor="root" className="flex items-center gap-2 cursor-pointer">
                <Home className="w-4 h-4" />
                Root (no folder)
              </Label>
            </div>
            {folders.map((folder) => (
              <div key={folder.id} className="flex items-center space-x-2">
                <RadioGroupItem value={folder.id} id={folder.id} />
                <Label htmlFor={folder.id} className="flex items-center gap-2 cursor-pointer">
                  <Folder className="w-4 h-4" />
                  {folder.name} ({folder.deckCount} deck{folder.deckCount !== 1 ? 's' : ''})
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Move {selectedCount === 1 ? 'deck' : 'decks'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}