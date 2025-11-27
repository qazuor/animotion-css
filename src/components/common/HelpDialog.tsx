import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function HelpDialog() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title={t("help.title")}>
          <HelpCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("help.title")}</DialogTitle>
          <DialogDescription>{t("help.subtitle")}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            {/* Getting Started */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.gettingStarted.title")}</h3>
              <p className="text-muted-foreground">{t("help.gettingStarted.description")}</p>
            </section>

            {/* Presets */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.presets.title")}</h3>
              <p className="text-muted-foreground">{t("help.presets.description")}</p>
            </section>

            {/* Animation Settings */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.settings.title")}</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  <strong>{t("help.settings.duration")}</strong>: {t("help.settings.durationDesc")}
                </li>
                <li>
                  <strong>{t("help.settings.timing")}</strong>: {t("help.settings.timingDesc")}
                </li>
                <li>
                  <strong>{t("help.settings.delay")}</strong>: {t("help.settings.delayDesc")}
                </li>
                <li>
                  <strong>{t("help.settings.iterations")}</strong>:{" "}
                  {t("help.settings.iterationsDesc")}
                </li>
                <li>
                  <strong>{t("help.settings.direction")}</strong>:{" "}
                  {t("help.settings.directionDesc")}
                </li>
                <li>
                  <strong>{t("help.settings.fillMode")}</strong>: {t("help.settings.fillModeDesc")}
                </li>
              </ul>
            </section>

            {/* Keyframes */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.keyframes.title")}</h3>
              <p className="text-muted-foreground mb-2">{t("help.keyframes.description")}</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>{t("help.keyframes.step1")}</li>
                <li>{t("help.keyframes.step2")}</li>
                <li>{t("help.keyframes.step3")}</li>
                <li>{t("help.keyframes.step4")}</li>
              </ul>
            </section>

            {/* Properties */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.properties.title")}</h3>
              <p className="text-muted-foreground mb-2">{t("help.properties.description")}</p>
              <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">{t("help.properties.transform")}</p>
                  <p className="text-xs">translateX, translateY, scale, rotate, skewX, skewY</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("help.properties.visual")}</p>
                  <p className="text-xs">
                    opacity, backgroundColor, color, borderRadius, boxShadow
                  </p>
                </div>
              </div>
            </section>

            {/* Preview */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.preview.title")}</h3>
              <p className="text-muted-foreground">{t("help.preview.description")}</p>
            </section>

            {/* Copy & History */}
            <section>
              <h3 className="font-semibold text-base mb-2">{t("help.history.title")}</h3>
              <p className="text-muted-foreground">{t("help.history.description")}</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
