import sys
import json
from pygments import lex
from pygments.lexers import get_lexer_for_filename, guess_lexer
from pygments.token import Token

def main():
    if len(sys.argv) < 2:
        print("Usage: python syntax_highlight.py <source_file>", file=sys.stderr)
        sys.exit(1)

    filename = sys.argv[1]
    tokens = tokenize_file(filename)

    # Output as JSON
    output_filename = f"{filename}.tokens.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(tokens, f, indent=2)


def tokenize_file(filepath):
    # Read the file
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            code = f.read()
    except Exception as e:
        print(f"Error reading file: {e}", file=sys.stderr)
        sys.exit(1)

    # Get the appropriate lexer
    try:
        lexer = get_lexer_for_filename(filepath)
    except:
        try:
            lexer = guess_lexer(code)
        except:
            print("Could not determine language, using plain text", file=sys.stderr)
            from pygments.lexers import TextLexer
            lexer = TextLexer()

    # Tokenize the code
    tokens = list(lex(code, lexer))

    # Build an array of lines of tokens
    lines = []
    current_line = []

    for token_type, content in tokens:
        # Get the token type as a string (e.g., "Token.Name.Variable")
        type_str = str(token_type).replace("Token.", "")

        # Split content by newlines if it contains them
        if "\n" in content:
            parts = content.split("\n")
            for i, part in enumerate(parts):
                # Add part before the newline if non-empty
                if part:
                    current_line.append({
                        "content": part,
                        "type": type_str
                    })

                # End of line (except for the last part if it doesn't end with newline)
                if i < len(parts) - 1:
                    lines.append(current_line)
                    current_line = []
        else:
            # No newline, just add to current line if non-empty
            if content:
                current_line.append({
                    "content": content,
                    "type": type_str
                })

    # Add the last line if it has content
    if current_line:
        lines.append(current_line)

    return lines

if __name__ == "__main__":
    main()
