import { Color, FontWeight, TextUnit } from "presenter";

import { CodeBlockContent } from "../types/CodeBlockContent";
import { CodeBlockTheme } from "../types/CodeBlockTheme";

export function getCodeBlockTextUnits(
  content: CodeBlockContent | string,
  theme: CodeBlockTheme,
  allowBoldText: boolean = false,
): TextUnit[][] {
  if (typeof content === "string") {
    const baseColor = getColorForToken(theme, "");
    return content
      .split("\n")
      .map((line) => [{ text: line, color: baseColor, fontWeight: FontWeight.NORMAL }]);
  }

  return content.map((line) =>
    line.map((unit): TextUnit => {
      return {
        text: unit.content,
        color: getColorForToken(theme, unit.type),
        fontWeight:
          allowBoldText && getBoldForToken(theme, unit.type) ? FontWeight.BOLD : FontWeight.NORMAL,
      };
    }),
  );
}

function getColorForToken(theme: CodeBlockTheme, tokenType: string): Color {
  const themeStyle = theme.styles[tokenType];
  if (themeStyle !== undefined && themeStyle.color !== null) {
    return Color(themeStyle.color);
  }

  if (tokenType === "") {
    throw new Error(`Theme did not define a style for token type: ${tokenType}`);
  }

  const parentTokenType = tokenType.split(".").slice(0, -1).join(".");
  return getColorForToken(theme, parentTokenType);
}

function getBoldForToken(theme: CodeBlockTheme, tokenType: string): boolean {
  const themeStyle = theme.styles[tokenType];
  if (themeStyle !== undefined) {
    return themeStyle.bold;
  }

  if (tokenType === "") {
    throw new Error(`Theme did not define a style for token type: ${tokenType}`);
  }

  const parentTokenType = tokenType.split(".").slice(0, -1).join(".");
  return getBoldForToken(theme, parentTokenType);
}
