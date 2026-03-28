import { IconSvgTextareaField } from "./IconSvgTextareaField";
import { TitleField, ReadOnlyField } from "./TitleField";

export const iconSvgTextareaComponent = IconSvgTextareaField as unknown as string;
export const titleComponent = TitleField as unknown as string;
export const readOnlyComponent = ReadOnlyField as unknown as string;

export function createInlineSvgField(name: string, label: string) {
  return {
    type: "string",
    name,
    label,
    ui: {
      component: iconSvgTextareaComponent,
    },
  } as const;
}

export function createIconPositionField(name: string, label: string) {
  return {
    type: "string",
    name,
    label,
    options: [
      { label: "Leading", value: "leading" },
      { label: "Trailing", value: "trailing" },
    ],
    ui: {
      component: "select",
    },
  } as const;
}
