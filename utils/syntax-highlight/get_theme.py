import sys
import json
from pygments.styles import get_style_by_name, get_all_styles
from pygments.token import Token, STANDARD_TYPES

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <theme_name>", file=sys.stderr)
        print(f"\nAvailable themes:", file=sys.stderr)
        for theme in list_all_themes():
            print(f"- {theme}", file=sys.stderr)
        sys.exit(1)

    theme_name = sys.argv[1]

    result = get_theme_styles(theme_name)
    print(json.dumps(result, indent=2))


def list_all_themes():
    """List all available Pygments themes."""
    return sorted(get_all_styles())


def get_theme_styles(theme_name):
    """
    Get all token types and their styling information for a given theme.
    Returns a dictionary mapping token type strings to style objects.
    """
    try:
        style = get_style_by_name(theme_name)
    except Exception as e:
        print(f"Error loading theme '{theme_name}': {e}", file=sys.stderr)
        print(f"Available themes: {', '.join(get_all_styles())}", file=sys.stderr)
        sys.exit(1)

    theme_info = {
        # "themeName": theme_name,
        "backgroundColor": style.background_color,
        # "highlightColor": getattr(style, 'highlight_color', None),
        "styles": {}
    }

    # Iterate through all token types defined in the style
    for token_type, style_dict in style.styles.items():
        # Convert token type to string format
        token_name = str(token_type).replace('Token.', '') if str(token_type) != 'Token' else ''

        # Parse the style string (format: "color bold italic underline")
        if style_dict:
            parsed_style = {
                "color": None,
                # "background": None,
                "bold": False,
                # "italic": False,
                # "underline": False
            }

            parts = style_dict.split()
            for part in parts:
                if part == 'bold':
                    parsed_style["bold"] = True
                # elif part == 'italic':
                #     parsed_style["italic"] = True
                # elif part == 'underline':
                #     parsed_style["underline"] = True
                # elif part.startswith('bg:'):
                #     parsed_style["background"] = part[3:]
                elif part.startswith('#') or part in ['', 'noinherit', 'inherit']:
                    if part and part not in ['noinherit', 'inherit']:
                        parsed_style["color"] = part

            theme_info["styles"][token_name] = parsed_style

    return theme_info


if __name__ == "__main__":
    main()
