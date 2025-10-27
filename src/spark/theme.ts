import { Anchor, Color } from "presenter";

export const ThemeAnchor = {
  PRIMARY: Anchor.CENTER,
} as const;

export const ThemeColor = {
  BACKGROUND: Color(28, 28, 28),
  TEXT: Color(255, 255, 255),

  BLUE1: Color(125, 157, 224),
} as const;

export const ThemeFont = {
  PRIMARY: "'Satoshi', sans-serif",
  CODE: "'Noto Sans Mono', monospace",
} as const;

export const ThemeRounding = {
  SMALL: 4,
  NORMAL: 8,
  LARGE: 16,
} as const;

export const ThemeSize = {
  PRIMARY: {
    width: 3840,
    height: 2160,
  },
} as const;
