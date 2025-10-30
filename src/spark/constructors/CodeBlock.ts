import { Color, getTextContentLength, Group, Rectangle, Text } from "presenter";

import githubDark from "../../assets/code-themes/githubDark.json";
import { ThemeFont, ThemeFontSize, ThemeRounding } from "../theme";
import { CodeBlockContent } from "../types/CodeBlockContent";
import { CodeBlockTheme } from "../types/CodeBlockTheme";
import { getCodeBlockTextUnits } from "../utils/getCodeBlockTextUnits";

interface Return {
  /** Group object containing the code block. */
  readonly block: Group;

  /** Text object within the code block. */
  readonly text: Text;

  /** Number of characters in the code block. */
  readonly length: number;
}

interface CodeBlockProps {
  /**
   * Background color of the code block.
   * If null, uses the background color of the theme.
   */
  readonly backgroundColor: Color | null;

  /**
   * Maximum descent height of a monospace character per unit of font size.
   * If not provided, value assumes the theme's coding font.
   */
  readonly characterDescentHeight: number;

  /**
   * Width of a monospace character per unit of font size.
   * If not provided, value assumes the theme's coding font.
   */
  readonly characterWidth: number;

  readonly isBackgroundVisible: boolean;

  /**
   * Height of a monospace character per unit of font size.
   * If not provided, value assumes the theme's coding font.
   */
  readonly lineHeight: number;

  /** Theme used to style the code block. */
  readonly theme: CodeBlockTheme;

  readonly groupProps: Partial<Group>;
  readonly textProps: Partial<Text>;
}

export function CodeBlock(code: CodeBlockContent | string, props: Partial<CodeBlockProps>): Return {
  const {
    backgroundColor = null,
    isBackgroundVisible = true,
    theme = githubDark,
    groupProps = {},
    textProps = {},
    characterDescentHeight = 0.29,
    // Assumes Noto Sans Mono
    lineHeight = 1.07,
    // Assumes Noto Sans Mono
    characterWidth = 0.6,
  } = props;
  const fontSize = textProps.fontSize ?? ThemeFontSize.NORMAL;
  const lineSpacing = textProps.lineSpacing ?? 1.15;

  const textUnits = getCodeBlockTextUnits(code, theme);

  const maxCharactersPerLine = Math.max(
    ...textUnits.map((line) => line.reduce((sum, unit) => sum + unit.text.length, 0)),
  );
  const blockWidth = maxCharactersPerLine * characterWidth * fontSize;
  const blockHeight =
    (textUnits.length * lineHeight +
      Math.max(textUnits.length - 1, 0) * lineHeight * (lineSpacing - 1) +
      characterDescentHeight) *
    fontSize;

  const length = getTextContentLength(textUnits);
  const text = Text(textUnits, {
    fontFamily: ThemeFont.CODE,
    fontSize,
    lineSpacing,
    ...textProps,
  });

  const background = Rectangle({
    width: blockWidth,
    height: blockHeight,
    fill: backgroundColor ?? Color(theme.backgroundColor),
    rounding: ThemeRounding.SMALL,
  });

  const block = Group([...(isBackgroundVisible ? [background] : []), text], {
    height: blockHeight,
    width: blockWidth,
    ...groupProps,
  });

  return { block, length, text };
}
