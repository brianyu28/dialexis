import { Anchor, Color } from "presenter";

export const ThemeAnchor = {
  PRIMARY: Anchor.CENTER,
} as const;

export const ThemeColor = {
  BACKGROUND: Color(28, 28, 28),
  BLACK: Color(0, 0, 0),
  TEXT: Color(255, 255, 255),

  BLUE1: Color(125, 157, 224),
} as const;

export const ThemeFont = {
  PRIMARY: "'Open Sans', sans-serif",
  CODE: "'Noto Sans Mono', monospace",
} as const;

export const ThemeFontSize = {
  NORMAL: 100,
};

export const ThemeRounding = {
  SMALL: 10,
  NORMAL: 20,
  LARGE: 30,
} as const;

export const ThemeSize = {
  PRIMARY: {
    width: 3840,
    height: 2160,
  },
  RESOLUTION_4K: {
    width: 3840,
    height: 2160,
  },
  RESOLUTION_5K: {
    width: 5120,
    height: 2880,
  },
  RESOLUTION_8K: {
    width: 7680,
    height: 4320,
  },
} as const;
