export const sandpackDemoCommonCss = `\
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Light theme */
:root {
  --background: #ffffff;
  --foreground: oklch(0.03 0 0);
  --card: oklch(0.97 0 0);
  --card-foreground: oklch(0.03 0 0);
  --popover: oklch(0.97 0 0);
  --popover-foreground: oklch(0.03 0 0);
  --primary: oklch(0.03 0 0);
  --primary-foreground: oklch(0.97 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.03 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.03 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.03 0 0);
}

/* Dark theme */
.dark {
  --background: #151515;
  --foreground: oklch(0.97 0 0);
  --card: oklch(0.03 0 0);
  --card-foreground: oklch(0.97 0 0);
  --popover: oklch(0.03 0 0);
  --popover-foreground: oklch(0.97 0 0);
  --primary: oklch(0.97 0 0);
  --primary-foreground: oklch(0.03 0 0);
  --secondary: oklch(0.03 0 0);
  --secondary-foreground: oklch(0.97 0 0);
  --muted: oklch(0.03 0 0);
  --muted-foreground: oklch(0.97 0 0);
  --accent: oklch(0.03 0 0);
  --accent-foreground: oklch(0.97 0 0);
}
`
