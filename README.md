# Simple Lines Count

## Overview

**Simple Lines Count** enhances your coding experience by displaying a count of selected lines directly in the status bar. This lightweight extension is customizable, allowing you to tailor the output format to meet your needs.

### Default Output Format

By default, the line count is displayed as follows:

> **Lns: {Total} ({Not Empty} + {Empty}e + {Comments}c)**

For example: ***Lns: 10 (5 + 3e + 2c)***

This means:
- **5** lines with content
- **3** empty lines
- **2** lines of comments

### Customizing the Format

To personalize the output format, modify the `"simple-lines-count.format"` option in your `settings.json` file.

**Example Configuration:**

```
Lns: {t} ({ne} + {e}e + {c}c)
```

Where:
- `{t}`: Total number of selected lines
- `{ne}`: Number of non-empty lines
- `{e}`: Number of empty lines
- `{c}`: Number of comment lines (currently, lines starting with `//` are recognized as comments)

## Release Notes

- **0.0.1**
  - Initial release of Simple Lines Count.
- **0.0.2**
  - Introduced support for single comment lines (e.g., lines starting with `//`).
- **0.0.3**
  - Added an extension icon for better visibility.
  - Enhanced customization with the ability to specify the desired output format.
