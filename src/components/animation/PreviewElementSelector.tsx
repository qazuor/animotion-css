import { Circle, Play, Square, Type } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAnimationStore } from "@/stores/animationStore";
import type { PreviewElement } from "@/types/animation.types";

const elementIcons: Record<PreviewElement, typeof Square> = {
  square: Square,
  circle: Circle,
  text: Type,
  icon: Play,
};

export function PreviewElementSelector() {
  const { t } = useTranslation();
  const previewElement = useAnimationStore((state) => state.previewElement);
  const setPreviewElement = useAnimationStore((state) => state.setPreviewElement);

  const CurrentIcon = elementIcons[previewElement];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <CurrentIcon size={16} className="mr-2" />
          {t(`preview.${previewElement}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(Object.keys(elementIcons) as PreviewElement[]).map((element) => {
          const Icon = elementIcons[element];
          return (
            <DropdownMenuItem key={element} onClick={() => setPreviewElement(element)}>
              <Icon size={16} className="mr-2" />
              {t(`preview.${element}`)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
