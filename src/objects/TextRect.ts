import { Anchor, Group, Rectangle, Text, type TextContent } from "presenter";

import { SparkColor } from "../themes/spark/SparkConstants";
import { SparkText } from "../themes/spark/SparkText";

export interface TextRect {
  groupProps: Partial<Group>;
  rectProps: Partial<Rectangle>;
  textProps: Partial<Text>;
}

interface Return {
  readonly group: Group;
  readonly text: Text;
  readonly rect: Rectangle;
}

export function TextRect(
  text: TextContent,
  { groupProps = {}, rectProps = {}, textProps = {} }: Partial<TextRect> = {},
): Return {
  const height = rectProps.height ?? 300;
  const width = rectProps.width ?? 800;

  const rectangle = Rectangle({
    strokeColor: SparkColor.BLUE1,
    strokeWidth: 20,
    fillColor: SparkColor.PRIMARY,
    cornerRadius: 20,
    ...rectProps,
    height,
    width,
  });

  const textObject = SparkText(text, {
    color: SparkColor.BLACK,
    anchor: Anchor.CENTER,
    x: width / 2,
    y: height / 2,
    ...textProps,
  });

  const group = Group([rectangle, textObject], { width, height, ...groupProps });

  return { group, rect: rectangle, text: textObject };
}
