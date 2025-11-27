import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { animationPresets } from "@/data/animation-presets";
import { useAnimationStore } from "@/stores/animationStore";

export function PresetSelector() {
  const { t } = useTranslation();
  const loadPreset = useAnimationStore((state) => state.loadPreset);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles size={16} className="mr-2" />
          {t("presets.title")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
        {animationPresets.map((preset) => (
          <DropdownMenuItem key={preset.id} onClick={() => loadPreset(preset)}>
            {preset.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
