import { Color, getTextContentLength, Group, Mask, Rectangle, Text } from "presenter";

import githubDark from "../assets/code-themes/githubDark.json";
import { CodeBlockContent } from "../types/CodeBlockContent";
import { CodeBlockTheme } from "../types/CodeBlockTheme";
import { getCodeBlockTextUnits } from "../utils/getCodeBlockTextUnits";

const DEFAULT_CODE_FONT = "'Noto Sans Mono', monospace";
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
  /**
   * Group object containing the code block.
   * This is what should be added to the slide for rendering.
   */
  readonly block: Group;

  /**  Group object containing just code and line numbers, used to animate scrolling. */
  readonly content: Group;

  /** Focus rectangle, used to animate focus rectangle. */
  readonly focus: Rectangle;

  /** Function to get new position data for content element. */
  readonly getContentPosition: (scrollLine: number, scrollCol?: number) => { x: number; y: number };

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

  /** Text object within the code block, used to animate text write-on. */
  readonly text: Text;

  /** Number of characters in the code block, used to animate text write-on. */
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

  readonly fontFamily: string;
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
    areLineNumbersVisible = false,
    backgroundColor = null,
    backgroundRounding = 10,
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
    fontFamily = DEFAULT_CODE_FONT,
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
  const fontSize = textProps.fontSize ?? 100;
  const lineSpacing = textProps.lineSpacing ?? 1.15;
  const textUnits = getCodeBlockTextUnits(code, theme);

  const maxLineNumber = String(firstLineNumber + textUnits.length - 1);
  const lineNumberCharCount = areLineNumbersVisible
    ? maxLineNumber.length + LINE_NUMBER_SPACE_CHARS
    : 0;

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

  let lineNumbers: Text | null = null;
  if (areLineNumbersVisible) {
    lineNumbers = Text(
      textUnits.map((_, i) => [
        {
          text:
            String(firstLineNumber + i).padStart(
              lineNumberCharCount - LINE_NUMBER_SPACE_CHARS,
              " ",
            ) + " ".repeat(LINE_NUMBER_SPACE_CHARS),
          color: lineNumberColor,
        },
      ]),
      {
        fontFamily,
        fontSize,
        lineSpacing,
        ...textProps,
        length: null,
        x: 0,
        y: 0,
      },
    );
  }

  const length = getTextContentLength(textUnits);
  const text = Text(textUnits, {
    fontFamily,
    fontSize,
    lineSpacing,
    ...textProps,
    x: lineNumberCharCount * characterWidth * fontSize,
    y: 0,
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
      focusPaddingX: paddingX = focusPaddingX,
      focusPaddingY: paddingY = focusPaddingY,
      focusOffsetX: offsetX = focusOffsetX,
      focusOffsetY: offsetY = focusOffsetY,
    } = adjustments ?? {};
    return {
      x: (lineNumberCharCount + focusColStart - 1) * characterWidth * fontSize - paddingX + offsetX,
      y: (focusLineStart - 1) * lineHeight * lineSpacing * fontSize - paddingY + offsetY,
      width: (focusColEnd - focusColStart + 1) * characterWidth * fontSize + paddingX * 2,
      height:
        getHeightForLines({
          descenderHeight: characterDescentHeight,
          fontSize,
          lineCount: focusLineEnd - focusLineStart + 1,
          lineHeight,
          lineSpacing,
        }) +
        paddingY * 2,
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

  function getContentPosition(scrollLine: number, scrollCol: number = 1): { x: number; y: number } {
    return {
      x: padding - (scrollCol - 1) * characterWidth * fontSize,
      y: padding - (scrollLine - 1) * lineHeight * lineSpacing * fontSize,
    };
  }

  const content = Group([...(lineNumbers !== null ? [lineNumbers] : []), focus, text], {
    ...getContentPosition(scrollLine, scrollCol),
  });

  const mask = Mask([content], {
    width: blockWidth + padding * 2,
    height: blockHeight + padding * 2,
  });

  const block = Group([background, mask], {
    height: blockHeight + padding * 2,
    width: blockWidth + padding * 2,
    ...groupProps,
  });

  return {
    block,
    content,
    focus,
    getContentPosition,
    getFocusPosition,
    length,
    text,
  };
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
