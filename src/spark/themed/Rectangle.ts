import { Rectangle as NativeRectangle } from "presenter";

import { ThemeAnchor, ThemeColor, ThemeRounding } from "../theme";
import { position } from "../utils/sizing";

export function Rectangle(props: Partial<NativeRectangle> | null = null): NativeRectangle {
  return NativeRectangle({
    anchor: ThemeAnchor.PRIMARY,
    fill: ThemeColor.BLUE1,
    rounding: ThemeRounding.NORMAL,
    height: 500,
    width: 500,
    ...position(0.5, 0.5),
    ...props,
  });
}
