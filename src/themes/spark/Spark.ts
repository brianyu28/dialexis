import { SparkColor, SparkFont, SparkFontSize, SparkRounding, SparkSize } from "./SparkConstants";
import { SparkLine } from "./SparkLine";
import { SparkPresentation } from "./SparkPresentation";
import { SparkRectangle } from "./SparkRectangle";
import { SparkMainTitleText, SparkText, SparkTitleText } from "./SparkText";

export const Spark = {
  // Constants
  Color: SparkColor,
  Font: SparkFont,
  FontSize: SparkFontSize,
  Rounding: SparkRounding,
  Size: SparkSize,

  // Components
  Line: SparkLine,
  MainTitleText: SparkMainTitleText,
  Rectangle: SparkRectangle,
  Text: SparkText,
  TitleText: SparkTitleText,

  // Presentation
  Presentation: SparkPresentation,
} as const;
