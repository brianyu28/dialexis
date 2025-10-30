import { Color, getTextContentLength, Group, Mask, Rectangle, Text } from "presenter";

import githubDark from "../../assets/code-themes/githubDark.json";
import { ThemeFont, ThemeFontSize, ThemeRounding } from "../theme";
import { CodeBlockContent } from "../types/CodeBlockContent";
import { CodeBlockTheme } from "../types/CodeBlockTheme";
import { getCodeBlockTextUnits } from "../utils/getCodeBlockTextUnits";

const LINE_NUMBER_SPACE_CHARS = 2;

// Default values assume Noto Sans Mono font
const DEFAULT_CHARACTER_DESCENT_HEIGHT = 0.29;
const DEFAULT_CHARACTER_WIDTH = 0.6;
// This value may need to be adjusted depending on font size
const DEFAULT_LINE_HEIGHT = 1.07;

/** Optional additional adjustments to refine location of focus. */
interface FocusAdjustmentProps {
  readonly focusOffsetX?: number;
  readonly focusPaddingX?: number;
  readonly focusOffsetY?: number;
  readonly focusPaddingY?: number;
}

interface Return {
  /** Group object containing the code block. */
  readonly block: Group;

  /** Focus rectangle. */
  readonly focus: Rectangle;

  /** Function to get new position data for focus element. */
  readonly getFocusPosition: (
    focusLineStart: number,
    focusLineEnd: number,
    focusColStart: number,
    focusColEnd: number,
    props?: FocusAdjustmentProps,
  ) => {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  /** Text object within the code block. */
  readonly text: Text;

  /** Number of characters in the code block. */
  readonly length: number;
}

interface CodeBlockProps {
  readonly areLineNumbersVisible: boolean;

  /**
   * Background color of the code block.
   * If null, uses the background color of the theme.
   */
  readonly backgroundColor: Color | null;
  readonly backgroundRounding: number;

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

  /**
   * Number of columns in code block to be visible at once.
   * Defaults to all.
   */
  readonly colCount: number | null;

  readonly firstLineNumber: number;

  /**
   * Focus adds a highlight behind a particular section of the code.
   */
  readonly isFocusVisible: boolean;
  readonly focusColor: Color;
  readonly focusLineStart: number;
  readonly focusLineEnd: number;
  readonly focusColStart: number;
  readonly focusColEnd: number;
  readonly focusOffsetX: number;
  readonly focusOffsetY: number;
  readonly focusPaddingX: number;
  readonly focusPaddingY: number;
  readonly focusRounding: number;

  readonly isBackgroundVisible: boolean;

  /**
   * Number of lines in code block to be visible at once.
   * Defaults to all.
   */
  readonly lineCount: number | null;

  /**
   * Height of a monospace character per unit of font size.
   * If not provided, value assumes the theme's coding font.
   */
  readonly lineHeight: number;
  readonly lineNumberColor: Color;
  readonly padding: number;

  /**
   * Column index of the first character visible in the code block.
   * 1-indexed.
   */
  readonly scrollCol: number;

  /**
   * Line index of the first line visible in the code block.
   * 1-indexed.
   */
  readonly scrollLine: number;

  /** Theme used to style the code block. */
  readonly theme: CodeBlockTheme;

  readonly groupProps: Partial<Group>;
  readonly textProps: Partial<Text>;
}

export function CodeBlock(code: CodeBlockContent | string, props: Partial<CodeBlockProps>): Return {
  const {
    areLineNumbersVisible = true,
    backgroundColor = null,
    backgroundRounding = ThemeRounding.SMALL,
    characterDescentHeight = DEFAULT_CHARACTER_DESCENT_HEIGHT,
    characterWidth = DEFAULT_CHARACTER_WIDTH,
    colCount = null,
    firstLineNumber = 1,
    focusColor = Color(21, 52, 104),
    focusLineStart = 1,
    focusLineEnd = 1,
    focusColStart = 1,
    focusColEnd = 1,
    focusPaddingX = 0,
    focusPaddingY = 0,
    focusOffsetX = 0,
    focusOffsetY = 0,
    focusRounding = 0,
    groupProps = {},
    isBackgroundVisible = true,
    isFocusVisible = false,
    lineNumberColor = Color.WHITE,
    padding = 10,
    scrollCol = 1,
    scrollLine = 1,
    lineCount = null,
    lineHeight = DEFAULT_LINE_HEIGHT,
    textProps = {},
    theme = githubDark,
  } = props;
  const fontSize = textProps.fontSize ?? ThemeFontSize.NORMAL;
  const lineSpacing = textProps.lineSpacing ?? 1.15;
  let textUnits = getCodeBlockTextUnits(code, theme);

  const maxLineNumber = String(firstLineNumber + textUnits.length - 1);
  const lineNumberCharCount = areLineNumbersVisible
    ? maxLineNumber.length + LINE_NUMBER_SPACE_CHARS
    : 0;
  if (areLineNumbersVisible) {
    textUnits = textUnits.map((line, i) => [
      {
        text:
          String(firstLineNumber + i).padStart(lineNumberCharCount - LINE_NUMBER_SPACE_CHARS, " ") +
          " ".repeat(LINE_NUMBER_SPACE_CHARS),
        color: lineNumberColor,
      },
      ...line,
    ]);
  }

  const maxCharactersPerLine = Math.max(
    ...textUnits.map((line) => line.reduce((sum, unit) => sum + unit.text.length, 0)),
  );
  const blockWidth =
    ((colCount ?? maxCharactersPerLine) + lineNumberCharCount) * characterWidth * fontSize;

  const blockHeight = getHeightForLines({
    descenderHeight: characterDescentHeight,
    fontSize,
    lineCount: lineCount ?? textUnits.length,
    lineHeight,
    lineSpacing,
  });

  const length = getTextContentLength(textUnits);
  const text = Text(textUnits, {
    fontFamily: ThemeFont.CODE,
    fontSize,
    lineSpacing,
    ...textProps,
    x: padding - (scrollCol - 1) * characterWidth * fontSize,
    y: padding - (scrollLine - 1) * lineHeight * lineSpacing * fontSize,
  });

  const background = Rectangle({
    width: blockWidth + padding * 2,
    height: blockHeight + padding * 2,
    fill: backgroundColor ?? Color(theme.backgroundColor),
    rounding: backgroundRounding,
    opacity: isBackgroundVisible ? 1 : 0,
  });

  function getFocusPosition(
    focusLineStart: number,
    focusLineEnd: number,
    focusColStart: number,
    focusColEnd: number,
    adjustments: FocusAdjustmentProps,
  ): { x: number; y: number; width: number; height: number } {
    const {
      focusPaddingX = 0,
      focusPaddingY = 0,
      focusOffsetX = 0,
      focusOffsetY = 0,
    } = adjustments ?? {};
    return {
      x: padding + (focusColStart - 1) * characterWidth * fontSize - focusPaddingX + focusOffsetX,
      y:
        padding +
        (focusLineStart - 1) * lineHeight * lineSpacing * fontSize -
        focusPaddingY +
        focusOffsetY,
      width: (focusColEnd - focusColStart + 1) * characterWidth * fontSize + focusPaddingX * 2,
      height:
        getHeightForLines({
          descenderHeight: characterDescentHeight,
          fontSize,
          lineCount: focusLineEnd - focusLineStart + 1,
          lineHeight,
          lineSpacing,
        }) +
        focusPaddingY * 2,
    };
  }

  const focus = Rectangle({
    ...getFocusPosition(focusLineStart, focusLineEnd, focusColStart, focusColEnd, {
      focusOffsetX,
      focusOffsetY,
      focusPaddingX,
      focusPaddingY,
    }),
    fill: focusColor,
    rounding: focusRounding,
    opacity: isFocusVisible ? 1 : 0,
  });

  const mask = Mask([focus, text], {
    width: blockWidth + padding * 2,
    height: blockHeight + padding * 2,
  });

  const block = Group([background, mask], {
    height: blockHeight + padding * 2,
    width: blockWidth + padding * 2,
    ...groupProps,
  });

  return { block, focus, getFocusPosition, length, text };
}

interface HeightForLinesProps {
  readonly descenderHeight?: number;
  readonly fontSize: number;
  readonly lineCount: number;
  readonly lineHeight: number;
  readonly lineSpacing: number;
}

function getHeightForLines({
  descenderHeight = 0,
  fontSize,
  lineCount,
  lineHeight,
  lineSpacing,
}: HeightForLinesProps): number {
  return (
    fontSize *
    // Each line takes up its height
    (lineCount * lineHeight +
      // Each line other than the last line takes up extra space for line spacing
      Math.max(lineCount - 1, 0) * lineHeight * (lineSpacing - 1) +
      // Add space for descenders
      descenderHeight)
  );
}
