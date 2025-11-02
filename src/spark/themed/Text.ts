import { FontWeight, Text as NativeText, TextContent } from "presenter";

import { ThemeColor, ThemeFont, ThemeFontSize } from "../theme";

const textProps: Partial<NativeText> = {
  color: ThemeColor.TEXT,
  fontFamily: ThemeFont.PRIMARY,
  fontSize: ThemeFontSize.NORMAL,
};

export function Text(content: TextContent, props: Partial<NativeText> | null = null): NativeText {
  return NativeText(content, {
    ...textProps,
    ...props,
  });
}

export function MainTitleText(
  content: TextContent,
  props: Partial<NativeText> | null = null,
): NativeText {
  return NativeText(content, {
    ...textProps,
    fontSize: ThemeFontSize.XLARGE,
    fontWeight: FontWeight.BOLD,
    ...props,
  });
}

export function TitleText(
  content: TextContent,
  props: Partial<NativeText> | null = null,
): NativeText {
  return NativeText(content, {
    ...textProps,
    fontSize: ThemeFontSize.LARGE,
    fontWeight: FontWeight.BOLD,
    ...props,
  });
}
