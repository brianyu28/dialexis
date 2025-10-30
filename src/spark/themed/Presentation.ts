import { Presentation as NativePresentation } from "presenter";

import { ThemeColor } from "../theme";

export function Presentation(props: Partial<NativePresentation> | null = null): NativePresentation {
  return NativePresentation({
    backgroundColor: ThemeColor.BACKGROUND,
    ...props,
  });
}
