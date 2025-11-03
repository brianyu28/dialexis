import { Anchor, Color } from "presenter";

export const ThemeAnchor = {
  PRIMARY: Anchor.CENTER,
} as const;

export const ThemeColor = {
  BACKGROUND: Color(28, 28, 28),
  PRIMARY: Color(255, 255, 255),
  TEXT: Color(255, 255, 255),

  BLACK: Color(0, 0, 0),
  WHITE: Color(255, 255, 255),

  GRAY1: Color(106, 106, 106), // Medium gray
  GRAY2: Color(65, 65, 65), // Dark gray
  GRAY3: Color(224, 224, 224), // Light gray

  BLUE1: Color(125, 157, 224), // Light blue
  BLUE2: Color(51, 56, 215), // Dark blue

  GREEN1: Color(102, 208, 89), // Light green
  GREEN2: Color(73, 143, 64), // Dark green

  PURPLE1: Color(136, 83, 173), // Medium purple
  PURPLE2: Color(178, 126, 215), // Light purple

  RED1: Color(225, 103, 103), // Light red
  RED2: Color(182, 75, 75), // Dark red

  YELLOW1: Color(240, 243, 90), // Medium yellow
  YELLOW2: Color(231, 249, 147), // Lighter yellow
} as const;

export const ThemeFont = {
  PRIMARY: "'Open Sans', sans-serif",
  CODE: "'Noto Sans Mono', monospace",
} as const;

export const ThemeFontSize = {
  SMALL: 80,
  NORMAL: 110,
  MEDIUM: 160,
  LARGE: 200,
  XLARGE: 230,
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
