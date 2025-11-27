import { useTranslation } from "react-i18next";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Link } from "@/components/animate-ui/icons/link";

import { HelpDialog } from "@/components/common/HelpDialog";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { siteConfig } from "@/config/site.config";

export function Header() {
  const { t } = useTranslation();
  const AppIcon = siteConfig.app.icon;

  return (
    <header className="header-gradient border-b">
      <div className="mx-auto flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4 max-w-full w-full">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <AppIcon className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
            <h1 className="text-lg sm:text-xl font-bold truncate">{t("app.title")}</h1>
          </div>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <AnimateIcon animateOnHover asChild>
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hidden items-center gap-1 text-sm transition-colors sm:flex"
            >
              by {siteConfig.author.name}
              <Link size={12} />
            </a>
          </AnimateIcon>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <HelpDialog />
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
