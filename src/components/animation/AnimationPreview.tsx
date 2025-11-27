import { Pause, Play, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateKeyframesCSS } from "@/lib/animation-utils";
import { useAnimationStore } from "@/stores/animationStore";

import { PreviewElementSelector } from "./PreviewElementSelector";

export function AnimationPreview() {
  const { t } = useTranslation();
  const config = useAnimationStore((state) => state.config);
  const previewElement = useAnimationStore((state) => state.previewElement);
  const isPlaying = useAnimationStore((state) => state.isPlaying);
  const togglePlaying = useAnimationStore((state) => state.togglePlaying);
  const reset = useAnimationStore((state) => state.reset);

  const keyframesCSS = generateKeyframesCSS(config.name, config.keyframes);

  const iterationCount =
    config.iterationCount === "infinite"
      ? "infinite"
      : String(config.iterationCount);

  const animationStyle = isPlaying
    ? {
        animation: `${config.name} ${config.duration}ms ${config.timingFunction} ${config.delay}ms ${iterationCount} ${config.direction} ${config.fillMode}`,
      }
    : {
        animationPlayState: "paused" as const,
      };

  const renderPreviewElement = () => {
    const baseClasses =
      "transition-colors bg-gradient-to-br from-primary to-primary/60";

    switch (previewElement) {
      case "square":
        return (
          <div
            className={`w-20 h-20 rounded-lg ${baseClasses}`}
            style={animationStyle}
          />
        );
      case "circle":
        return (
          <div
            className={`w-20 h-20 rounded-full ${baseClasses}`}
            style={animationStyle}
          />
        );
      case "text":
        return (
          <div
            className="text-4xl font-bold text-primary"
            style={animationStyle}
          >
            Animotion
          </div>
        );
      case "icon":
        return (
          <div style={animationStyle}>
            <Play size={64} className="text-primary fill-primary/30" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <style>{keyframesCSS}</style>
      <CardHeader className="flex-row items-center justify-between gap-2 flex-wrap">
        <CardTitle className="shrink-0">{t("preview.title")}</CardTitle>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <PreviewElementSelector />
          <Button variant="outline" size="icon" onClick={togglePlaying}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button variant="outline" size="icon" onClick={reset}>
            <RotateCcw size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center min-h-[200px] bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
          {renderPreviewElement()}
        </div>
      </CardContent>
    </Card>
  );
}
