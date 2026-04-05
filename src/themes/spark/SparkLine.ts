import { Line } from "presenter";

import { SparkColor } from "./SparkConstants";

export function SparkLine(props: Partial<Line> | null = null): Line {
  return Line({
    color: SparkColor.PRIMARY,
    isRounded: true,
    width: 20,
    ...props,
  });
}
