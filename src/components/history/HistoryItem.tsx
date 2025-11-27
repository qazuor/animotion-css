import { ArrowUpRight, Pause, Play, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateId, generateKeyframesCSS } from "@/lib/animation-utils";
import { useAnimationStore } from "@/stores/animationStore";
import { useHistoryStore } from "@/stores/historyStore";
import type { HistoryItem as HistoryItemType } from "@/types/animation.types";

interface HistoryItemProps {
  item: HistoryItemType;
  onApply?: () => void;
}

export function HistoryItem({ item, onApply }: HistoryItemProps) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const setConfig = useAnimationStore((state) => state.setConfig);
  const removeItem = useHistoryStore((state) => state.removeItem);

  const handleApply = () => {
    setConfig({
      ...item.config,
      keyframes: item.config.keyframes.map((kf) => ({
        ...kf,
        id: generateId(),
      })),
    });
    onApply?.();
  };

  const formattedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Generate animation CSS for mini preview
  const keyframesCSS = generateKeyframesCSS(item.config.name, item.config.keyframes);
  const iterationCount =
    item.config.iterationCount === "infinite"
      ? "infinite"
      : String(item.config.iterationCount);

  const animationStyle = isPlaying
    ? {
        animation: `${item.config.name} ${item.config.duration}ms ${item.config.timingFunction} ${item.config.delay}ms ${iterationCount} ${item.config.direction} ${item.config.fillMode}`,
      }
    : {};

  return (
    <Card className="p-3 sm:p-4 overflow-hidden">
      <style>{keyframesCSS}</style>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
        {/* Left column: info and buttons */}
        <div className="flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold truncate">{item.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
          </div>

          <div className="flex gap-1 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleApply}
              className="gap-1"
            >
              <ArrowUpRight size={14} />
              {t("history.apply")}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? t("preview.pause") : t("preview.play")}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => removeItem(item.id)}
              title={t("history.delete")}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        {/* Right column: mini preview */}
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50">
            <div
              className="w-10 h-10 rounded bg-gradient-to-br from-primary to-primary/60"
              style={animationStyle}
            />
          </div>
        </div>
      </div>

      {/* CSS code */}
      <pre className="text-xs bg-muted/50 p-2 rounded overflow-x-auto max-h-[80px] overflow-y-auto mt-3 max-w-full">
        <code className="break-all">{item.css}</code>
      </pre>
    </Card>
  );
}
