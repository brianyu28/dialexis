import { Text } from "presenter";

import { CodeBlockContent } from "./CodeBlockContent";

export interface CodeFragment {
  readonly code: CodeBlockContent | string;
  readonly startLine: number;
  readonly startCol: number;
  readonly textProps: Partial<Text>;
}

export function CodeFragment(
  code: CodeBlockContent | string,
  props: Partial<Omit<CodeFragment, "code">> = {},
): CodeFragment {
  return {
    code,
    startLine: 1,
    startCol: 1,
    textProps: {},
    ...props,
  };
}
