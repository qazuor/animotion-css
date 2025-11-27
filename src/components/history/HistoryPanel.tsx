import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHistoryStore } from "@/stores/historyStore";

import { HistoryItem } from "./HistoryItem";

interface HistoryPanelProps {
  onApply?: () => void;
}

export function HistoryPanel({ onApply }: HistoryPanelProps) {
  const { t } = useTranslation();
  const items = useHistoryStore((state) => state.items);
  const clearAll = useHistoryStore((state) => state.clearAll);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 flex-wrap">
        <CardTitle className="shrink-0">{t("history.title")}</CardTitle>
        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 size={16} className="mr-2" />
            {t("history.clear")}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px] text-muted-foreground text-center">
            <p>{t("history.empty")}</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-350px)] sm:h-[calc(100vh-300px)]">
            <div className="space-y-3 pr-4">
              {items.map((item) => (
                <HistoryItem key={item.id} item={item} onApply={onApply} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
