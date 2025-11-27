import { useTranslation } from "react-i18next";

import { CopyButton } from "@/components/common/CopyButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateCSS } from "@/lib/animation-utils";
import { useAnimationStore } from "@/stores/animationStore";
import { useHistoryStore } from "@/stores/historyStore";

export function CSSOutput() {
  const { t } = useTranslation();
  const config = useAnimationStore((state) => state.config);
  const addItem = useHistoryStore((state) => state.addItem);

  const css = generateCSS(config);

  const handleCopy = () => {
    addItem(config.name, config, css);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("css.output")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="p-4 bg-muted/50 rounded-lg text-sm overflow-x-auto max-h-[300px] overflow-y-auto max-w-full">
          <code className="break-all">{css}</code>
        </pre>
        <CopyButton text={css} onCopy={handleCopy} />
      </CardContent>
    </Card>
  );
}
