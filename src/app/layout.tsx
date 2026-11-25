import type { Metadata } from "next";
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.scss";
import { Theme } from "@radix-ui/themes";

const notoSans = Noto_Sans_Georgian({
  variable: "--font-sans",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600"],
});

const notoSerif = Noto_Serif_Georgian({
  variable: "--font-serif",
  subsets: ["georgian", "latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Flow",
  description: "შენი დღე, ერთ სიაში",
};

// Runs before the page paints, so a saved dark theme does not flash light first.
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var html = document.documentElement;
    html.dataset.theme = theme;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ka"
      suppressHydrationWarning
      className={`${notoSans.variable} ${notoSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Theme appearance="inherit">{children}</Theme>
      </body>
    </html>
  );
}