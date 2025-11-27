import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAnimationStore } from "@/stores/animationStore";
import type { AnimationDirection, AnimationFillMode } from "@/types/animation.types";

import { KeyframeEditor } from "./KeyframeEditor";
import { PresetSelector } from "./PresetSelector";

const timingFunctions = [
  { label: "Linear", value: "linear" },
  { label: "Ease", value: "ease" },
  { label: "Ease In", value: "ease-in" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Ease In Out", value: "ease-in-out" },
  { label: "Step Start", value: "step-start" },
  { label: "Step End", value: "step-end" },
  { label: "Smooth", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { label: "Accelerate", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { label: "Decelerate", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { label: "Bouncy", value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
  { label: "Back Out", value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
  { label: "Back In", value: "cubic-bezier(0.6, -0.28, 0.735, 0.045)" },
  { label: "Circular", value: "cubic-bezier(0.785, 0.135, 0.15, 0.86)" },
  { label: "Exponential", value: "cubic-bezier(0.77, 0, 0.175, 1)" },
  { label: "Elastic", value: "cubic-bezier(0.5, 1.5, 0.5, -0.5)" },
  { label: "Swing", value: "cubic-bezier(0.02, 0.01, 0.47, 1)" },
];

const directions: AnimationDirection[] = ["normal", "reverse", "alternate", "alternate-reverse"];

const fillModes: AnimationFillMode[] = ["none", "forwards", "backwards", "both"];

const iterationOptions: (number | "infinite")[] = [1, 2, 3, 5, 10, "infinite"];

export function AnimationControls() {
  const { t } = useTranslation();
  const config = useAnimationStore((state) => state.config);
  const setName = useAnimationStore((state) => state.setName);
  const setDuration = useAnimationStore((state) => state.setDuration);
  const setTimingFunction = useAnimationStore((state) => state.setTimingFunction);
  const setDelay = useAnimationStore((state) => state.setDelay);
  const setIterationCount = useAnimationStore((state) => state.setIterationCount);
  const setDirection = useAnimationStore((state) => state.setDirection);
  const setFillMode = useAnimationStore((state) => state.setFillMode);

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between pb-4 gap-2 flex-wrap">
        <CardTitle className="shrink-0">{t("animation.controls")}</CardTitle>
        <PresetSelector />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)] pr-4">
          <div className="space-y-6">
            {/* Animation Name */}
            <div className="space-y-2">
              <Label>{t("animation.name")}</Label>
              <Input
                value={config.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="myAnimation"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label>
                {t("animation.duration")}: {config.duration}ms
              </Label>
              <Slider
                value={[config.duration]}
                min={100}
                max={5000}
                step={100}
                onValueChange={([value]) => setDuration(value)}
              />
            </div>

            {/* Timing Function */}
            <div className="space-y-2">
              <Label>{t("animation.timing")}</Label>
              <Select value={config.timingFunction} onValueChange={setTimingFunction}>
                <SelectTrigger>
                  <SelectValue>
                    {timingFunctions.find((fn) => fn.value === config.timingFunction)?.label ||
                      config.timingFunction}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timingFunctions.map((fn) => (
                    <SelectItem key={fn.value} value={fn.value}>
                      {fn.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                {config.timingFunction}
              </p>
            </div>

            {/* Delay */}
            <div className="space-y-2">
              <Label>
                {t("animation.delay")}: {config.delay}ms
              </Label>
              <Slider
                value={[config.delay]}
                min={0}
                max={2000}
                step={100}
                onValueChange={([value]) => setDelay(value)}
              />
            </div>

            {/* Iteration Count */}
            <div className="space-y-2">
              <Label>{t("animation.iterations")}</Label>
              <Select
                value={String(config.iterationCount)}
                onValueChange={(value) =>
                  setIterationCount(value === "infinite" ? "infinite" : Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iterationOptions.map((option) => (
                    <SelectItem key={String(option)} value={String(option)}>
                      {option === "infinite" ? t("animation.infinite") : option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <Label>{t("animation.direction")}</Label>
              <Select value={config.direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {directions.map((dir) => (
                    <SelectItem key={dir} value={dir}>
                      {t(`animation.directions.${dir}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fill Mode */}
            <div className="space-y-2">
              <Label>{t("animation.fillMode")}</Label>
              <Select value={config.fillMode} onValueChange={setFillMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fillModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Keyframes */}
            <KeyframeEditor />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
