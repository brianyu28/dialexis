import { Rectangle } from "presenter";

import { SparkColor, SparkRounding } from "./SparkConstants";

export function SparkRectangle(props: Partial<Rectangle> | null = null): Rectangle {
  return Rectangle({
    fillColor: SparkColor.BLUE1,
    cornerRadius: SparkRounding.NORMAL,
    height: 500,
    width: 500,
    ...props,
  });
}
