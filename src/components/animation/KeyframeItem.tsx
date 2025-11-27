import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useAnimationStore } from "@/stores/animationStore";
import type { AnimatableProperties, Keyframe } from "@/types/animation.types";

import { PropertyEditor } from "./PropertyEditor";

interface KeyframeItemProps {
  keyframe: Keyframe;
  canDelete: boolean;
  defaultExpanded?: boolean;
}

// Get human-readable property names
const propertyLabels: Record<keyof AnimatableProperties, string> = {
  translateX: "X",
  translateY: "Y",
  scale: "Scale",
  rotate: "Rotate",
  skewX: "SkewX",
  skewY: "SkewY",
  opacity: "Opacity",
  backgroundColor: "BG",
  color: "Color",
  borderColor: "Border",
  borderRadius: "Radius",
  boxShadow: "Shadow",
  custom: "Custom",
};

export function KeyframeItem({ keyframe, canDelete, defaultExpanded = false }: KeyframeItemProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const updateKeyframe = useAnimationStore((state) => state.updateKeyframe);
  const removeKeyframe = useAnimationStore((state) => state.removeKeyframe);

  const handlePositionChange = (value: number) => {
    updateKeyframe(keyframe.id, { position: value });
  };

  // Get active properties
  const activeProps = Object.entries(keyframe.properties)
    .filter(([_, v]) => v !== undefined)
    .map(([key]) => key as keyof AnimatableProperties);

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden transition-colors",
      isExpanded ? "border-primary/50 bg-primary/5" : "border-border/50"
    )}>
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-2 p-3 cursor-pointer transition-colors",
          isExpanded ? "bg-primary/10" : "bg-muted/30 hover:bg-muted/50"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform shrink-0",
            isExpanded && "rotate-180"
          )}
        />

        {/* Position display */}
        <div className="flex items-center gap-2 min-w-[80px]">
          <span className="text-lg font-bold text-primary">
            {keyframe.position}%
          </span>
        </div>

        {/* Active properties badges */}
        <div className="flex-1 flex flex-wrap gap-1 min-w-0">
          {activeProps.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">
              {t("keyframes.clickToAdd")}
            </span>
          ) : (
            activeProps.map((prop) => (
              <span
                key={prop}
                className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-medium"
              >
                {propertyLabels[prop]}
              </span>
            ))
          )}
        </div>

        {canDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              removeKeyframe(keyframe.id);
            }}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          className="border-t border-primary/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Position slider */}
          <div className="p-3 bg-muted/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Label className="text-xs text-muted-foreground shrink-0">
              {t("keyframes.position")}:
            </Label>
            <div className="flex items-center gap-2 flex-1">
              <Slider
                value={[keyframe.position]}
                min={0}
                max={100}
                step={1}
                onValueChange={([value]) => handlePositionChange(value)}
                className="flex-1"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={keyframe.position}
                onChange={(e) => handlePositionChange(Number(e.target.value))}
                className="w-16 h-7 text-center text-sm shrink-0"
              />
            </div>
          </div>

          {/* Properties */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-3">
              {t("keyframes.selectProperties")}
            </p>
            <PropertyEditor
              keyframeId={keyframe.id}
              properties={keyframe.properties}
            />
          </div>
        </div>
      )}
    </div>
  );
}
