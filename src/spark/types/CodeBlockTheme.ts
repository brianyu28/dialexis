/*
 * A Code block theme defines how different tokens in code should be styled.
 *
 * Given a token type, e.g. "Name.Function", we search for a matching style in
 * decreasing order of specificity: "Name.Function" > "Name" > ""
 *
 * Themes should have an entry for the empty string "" to define the default style.
 */
export interface CodeBlockTheme {
  readonly backgroundColor: string;
  readonly styles: Record<string, CodeTokenStyle>;
}

export interface CodeTokenStyle {
  readonly color: string | null;
  readonly bold: boolean;
}
