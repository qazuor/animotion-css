import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useAnimationStore } from "@/stores/animationStore";
import type { AnimatableProperties } from "@/types/animation.types";

interface PropertyEditorProps {
  keyframeId: string;
  properties: AnimatableProperties;
}

interface PropertyRowProps {
  label: string;
  propertyKey: keyof AnimatableProperties;
  value: string | number | undefined;
  defaultValue: string | number;
  onChange: (value: string | number | undefined) => void;
  children: React.ReactNode;
}

function PropertyRow({ label, value, defaultValue, onChange, children }: PropertyRowProps) {
  const isEnabled = value !== undefined;

  const handleToggle = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      onChange(defaultValue);
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isEnabled}
          onCheckedChange={handleToggle}
        />
        <Label
          className={cn(
            "text-xs cursor-pointer select-none",
            !isEnabled && "text-muted-foreground"
          )}
          onClick={() => handleToggle(!isEnabled)}
        >
          {label}
        </Label>
      </div>
      {isEnabled && <div className="pl-4 sm:pl-6 overflow-hidden">{children}</div>}
    </div>
  );
}

export function PropertyEditor({ keyframeId, properties }: PropertyEditorProps) {
  const { t } = useTranslation();
  const updateKeyframeProperties = useAnimationStore(
    (state) => state.updateKeyframeProperties
  );

  const handleChange = (
    key: keyof AnimatableProperties,
    value: string | number | undefined
  ) => {
    updateKeyframeProperties(keyframeId, { [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Transform Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground border-b pb-1">
          {t("properties.transform")}
        </h4>

        <PropertyRow
          label={t("properties.translateX")}
          propertyKey="translateX"
          value={properties.translateX}
          defaultValue="0px"
          onChange={(v) => handleChange("translateX", v)}
        >
          <Input
            type="text"
            placeholder="0px, 50%, 10rem..."
            value={properties.translateX || ""}
            onChange={(e) => handleChange("translateX", e.target.value || undefined)}
          />
        </PropertyRow>

        <PropertyRow
          label={t("properties.translateY")}
          propertyKey="translateY"
          value={properties.translateY}
          defaultValue="0px"
          onChange={(v) => handleChange("translateY", v)}
        >
          <Input
            type="text"
            placeholder="0px, 50%, 10rem..."
            value={properties.translateY || ""}
            onChange={(e) => handleChange("translateY", e.target.value || undefined)}
          />
        </PropertyRow>

        <PropertyRow
          label={`${t("properties.scale")}: ${properties.scale ?? "-"}`}
          propertyKey="scale"
          value={properties.scale}
          defaultValue={1}
          onChange={(v) => handleChange("scale", v)}
        >
          <Slider
            value={[properties.scale ?? 1]}
            min={0}
            max={3}
            step={0.1}
            onValueChange={([value]) => handleChange("scale", value)}
          />
        </PropertyRow>

        <PropertyRow
          label={t("properties.rotate")}
          propertyKey="rotate"
          value={properties.rotate}
          defaultValue="0deg"
          onChange={(v) => handleChange("rotate", v)}
        >
          <Input
            type="text"
            placeholder="0deg, 90deg, 180deg..."
            value={properties.rotate || ""}
            onChange={(e) => handleChange("rotate", e.target.value || undefined)}
          />
        </PropertyRow>

        <PropertyRow
          label={t("properties.skewX")}
          propertyKey="skewX"
          value={properties.skewX}
          defaultValue="0deg"
          onChange={(v) => handleChange("skewX", v)}
        >
          <Input
            type="text"
            placeholder="0deg, 15deg..."
            value={properties.skewX || ""}
            onChange={(e) => handleChange("skewX", e.target.value || undefined)}
          />
        </PropertyRow>

        <PropertyRow
          label={t("properties.skewY")}
          propertyKey="skewY"
          value={properties.skewY}
          defaultValue="0deg"
          onChange={(v) => handleChange("skewY", v)}
        >
          <Input
            type="text"
            placeholder="0deg, 15deg..."
            value={properties.skewY || ""}
            onChange={(e) => handleChange("skewY", e.target.value || undefined)}
          />
        </PropertyRow>
      </div>

      {/* Visual Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground border-b pb-1">
          {t("properties.visual")}
        </h4>

        <PropertyRow
          label={`${t("properties.opacity")}: ${properties.opacity ?? "-"}`}
          propertyKey="opacity"
          value={properties.opacity}
          defaultValue={1}
          onChange={(v) => handleChange("opacity", v)}
        >
          <Slider
            value={[properties.opacity ?? 1]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={([value]) => handleChange("opacity", value)}
          />
        </PropertyRow>

        <PropertyRow
          label={t("properties.backgroundColor")}
          propertyKey="backgroundColor"
          value={properties.backgroundColor}
          defaultValue="#3b82f6"
          onChange={(v) => handleChange("backgroundColor", v)}
        >
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-10 h-9 p-1 cursor-pointer"
              value={properties.backgroundColor || "#3b82f6"}
              onChange={(e) => handleChange("backgroundColor", e.target.value)}
            />
            <Input
              type="text"
              placeholder="#3b82f6"
              value={properties.backgroundColor || ""}
              onChange={(e) => handleChange("backgroundColor", e.target.value || undefined)}
            />
          </div>
        </PropertyRow>

        <PropertyRow
          label={t("properties.color")}
          propertyKey="color"
          value={properties.color}
          defaultValue="#ffffff"
          onChange={(v) => handleChange("color", v)}
        >
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-10 h-9 p-1 cursor-pointer"
              value={properties.color || "#ffffff"}
              onChange={(e) => handleChange("color", e.target.value)}
            />
            <Input
              type="text"
              placeholder="#ffffff"
              value={properties.color || ""}
              onChange={(e) => handleChange("color", e.target.value || undefined)}
            />
          </div>
        </PropertyRow>

        <PropertyRow
          label={t("properties.borderRadius")}
          propertyKey="borderRadius"
          value={properties.borderRadius}
          defaultValue="0px"
          onChange={(v) => handleChange("borderRadius", v)}
        >
          <Input
            type="text"
            placeholder="0px, 50%, 1rem..."
            value={properties.borderRadius || ""}
            onChange={(e) => handleChange("borderRadius", e.target.value || undefined)}
          />
        </PropertyRow>

        <PropertyRow
          label={t("properties.boxShadow")}
          propertyKey="boxShadow"
          value={properties.boxShadow}
          defaultValue="0 4px 20px rgba(0,0,0,0.3)"
          onChange={(v) => handleChange("boxShadow", v)}
        >
          <Input
            type="text"
            placeholder="0 4px 20px rgba(0,0,0,0.3)"
            value={properties.boxShadow || ""}
            onChange={(e) => handleChange("boxShadow", e.target.value || undefined)}
          />
        </PropertyRow>
      </div>

      {/* Custom Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground border-b pb-1">
          {t("properties.custom")}
        </h4>

        <PropertyRow
          label={t("properties.customCSS")}
          propertyKey="custom"
          value={properties.custom}
          defaultValue=""
          onChange={(v) => handleChange("custom", v)}
        >
          <Input
            type="text"
            placeholder="filter: blur(2px); transform-origin: center"
            value={properties.custom || ""}
            onChange={(e) => handleChange("custom", e.target.value || undefined)}
          />
        </PropertyRow>
      </div>
    </div>
  );
}
