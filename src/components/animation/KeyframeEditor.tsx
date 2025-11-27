import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAnimationStore } from "@/stores/animationStore";

import { KeyframeItem } from "./KeyframeItem";

export function KeyframeEditor() {
  const { t } = useTranslation();
  const [newPosition, setNewPosition] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const keyframes = useAnimationStore((state) => state.config.keyframes);
  const addKeyframe = useAnimationStore((state) => state.addKeyframe);

  const sortedKeyframes = [...keyframes].sort((a, b) => a.position - b.position);

  const handleAddKeyframe = () => {
    addKeyframe(newPosition);
    setIsOpen(false);
    setNewPosition(50);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{t("keyframes.title")}</Label>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" />
              {t("keyframes.add")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-3">
              <Label className="text-sm">{t("keyframes.position")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={newPosition}
                  onChange={(e) => setNewPosition(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <Button onClick={handleAddKeyframe} className="w-full" size="sm">
                {t("keyframes.add")}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        {sortedKeyframes.map((keyframe, index) => (
          <KeyframeItem
            key={keyframe.id}
            keyframe={keyframe}
            canDelete={keyframes.length > 2}
            defaultExpanded={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
