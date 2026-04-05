import { FontWeight, Text as NativeText, TextContent } from "presenter";

import { SparkColor, SparkFont, SparkFontSize } from "./SparkConstants";

const textProps: Partial<NativeText> = {
  color: SparkColor.TEXT,
  fontFamily: SparkFont.PRIMARY,
  fontSize: SparkFontSize.NORMAL,
};

export function SparkText(
  content: TextContent,
  props: Partial<NativeText> | null = null,
): NativeText {
  return NativeText(content, {
    ...textProps,
    ...props,
  });
}

export function SparkMainTitleText(
  content: TextContent,
  props: Partial<NativeText> | null = null,
): NativeText {
  return NativeText(content, {
    ...textProps,
    fontSize: SparkFontSize.XLARGE,
    fontWeight: FontWeight.BOLD,
    ...props,
  });
}

export function SparkTitleText(
  content: TextContent,
  props: Partial<NativeText> | null = null,
): NativeText {
  return NativeText(content, {
    ...textProps,
    fontSize: SparkFontSize.LARGE,
    fontWeight: FontWeight.BOLD,
    ...props,
  });
}
