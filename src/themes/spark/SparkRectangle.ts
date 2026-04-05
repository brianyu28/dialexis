import { Rectangle } from "presenter";

import { SparkColor, SparkRounding } from "./SparkConstants";

export function SparkRectangle(props: Partial<Rectangle> | null = null): Rectangle {
  return Rectangle({
    fill: SparkColor.BLUE1,
    rounding: SparkRounding.NORMAL,
    height: 500,
    width: 500,
    ...props,
  });
}
