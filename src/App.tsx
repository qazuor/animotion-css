import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { ClipboardList } from "@/components/animate-ui/icons/clipboard-list";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { SlidersHorizontal } from "@/components/animate-ui/icons/sliders-horizontal";
import { AnimationControls } from "@/components/animation/AnimationControls";
import { AnimationPreview } from "@/components/animation/AnimationPreview";
import { CSSOutput } from "@/components/animation/CSSOutput";
import { HistoryPanel } from "@/components/history/HistoryPanel";
import { MainLayout } from "@/components/layout/MainLayout";

type TabValue = "creator" | "history";

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabValue>("creator");

  return (
    <MainLayout>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="w-full"
      >
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <AnimateIcon animateOnHover asChild>
            <TabsTrigger value="creator" className="gap-2">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">{t("tabs.creator")}</span>
            </TabsTrigger>
          </AnimateIcon>
          <AnimateIcon animateOnHover asChild>
            <TabsTrigger value="history" className="gap-2">
              <ClipboardList size={16} />
              <span className="hidden sm:inline">{t("tabs.history")}</span>
            </TabsTrigger>
          </AnimateIcon>
        </TabsList>

        <TabsContents>
          <TabsContent value="creator">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_400px] overflow-hidden min-w-0">
              <div className="space-y-4 sm:space-y-6 min-w-0 overflow-hidden">
                <AnimationPreview />
                <CSSOutput />
              </div>
              <div className="min-w-0 overflow-hidden">
                <AnimationControls />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <HistoryPanel onApply={() => setActiveTab("creator")} />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </MainLayout>
  );
}

export default App;
