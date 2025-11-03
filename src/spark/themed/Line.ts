import { Line as NativeLine } from "presenter";

import { ThemeColor } from "../theme";

export function Line(props: Partial<NativeLine> | null = null): NativeLine {
  return NativeLine({
    color: ThemeColor.PRIMARY,
    isRounded: true,
    width: 20,
    ...props,
  });
}
