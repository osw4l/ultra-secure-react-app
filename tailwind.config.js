const { heroui } = require("@heroui/theme");
import { nextui } from "@nextui-org/theme";

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(alert|autocomplete|avatar|badge|button|card|code|dropdown|image|input|kbd|link|listbox|modal|navbar|progress|snippet|toggle|table|ripple|spinner|form|divider|popover|scroll-shadow|menu|checkbox|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#01cfea",
            },
            focus: "#01cfea",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#01cfea",
            },
            focus: "#01cfea",
          },
        },
      },
    }),
    heroui(),
  ],
};
