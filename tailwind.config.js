/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // /*
        "primary": {
          '50': '#e2e7eb',
          '100': '#b7c2cd',
          '200': '#879aab',
          '300': '#577289',
          '400': '#335370',
          '500': '#0f3557',
          '600': '#0d304f',
          '700': '#0b2846',
          '800': '#08223c',
          '900': '#04162c',
        },/*
        "primary": {
          50: "#fff9f2",
          100: "#fff3e6",
          200: "#ffe0bf",
          300: "#ffcd99",
          400: "#ffb34d",
          500: "#ff9900",
          600: "#e68a00",
          700: "#995c00",
          800: "#734500",
          900: "#4d2e00",
        },
        /*
        // primary green alternative
        "primary": {
          50: "#f2fff9",
          100: "#e6fff3",
          200: "#bfffdf",
          300: "#99ffcc",
          400: "#4dff99",
          500: "#00ff66",
          600: "#00e660",
          700: "#009933",
          800: "#007f26",
          900: "#005319",
        },// */
        // Todo create palette for background and text color for bottom and left panel 
        /*
        // first exemple
        "sidebar-background": "#111827",
        "sidebar-hamburger-background": "#ff4c55",
        "sidebar-title": "#fff",
        "sidebar-subtitle": "#9ca3af",
        "sidebar-active-item": "#4ade80",
        "bottom-panel": "#111827",
        "bottom-panel-title": "#fff",
        "bottom-panel-subtitle": "#9ca3af",
        "right-action-background": "#ff4c55",
        "right-action-icon": "#ffffff",
        // second exemple
        "sidebar-background": "#2e3440",
        "sidebar-hamburger-background": "#ff4c55",
        "sidebar-title": "#fff",
        "sidebar-subtitle": "#c0d0e0",
        "sidebar-active-item": "#7289da",
        "bottom-panel": "#f6f8fa",
        "bottom-panel-title": "#2e3440",
        "bottom-panel-subtitle": "#7d8799",
        "right-action-background": "#ff4c55",
        "right-action-icon": "#ffffff",
         */
        "sidebar-background": "#0f3557",
        "sidebar-hamburger-background": "#0f3557",
        "sidebar-hamburger-icon": "#ffffff",
        "sidebar-title": "#f9f9f9",
        "sidebar-subtitle": "#efeff0",
        "sidebar-active-item": "#0f3557",
        "sidebar-scrollbar-background": "#0000001a",
        "sidebar-scrollbar-thumb": "#ffffff",
        "sidebar-item-hover": "#ffffff22",
        "bottom-panel-background": "#ffffff",
        "bottom-panel-title": "#3c43347",
        "bottom-panel-subtitle": "#3c43347",
        "bottom-panel-scrollbar-background": "#0f355733",
        "bottom-panel-scrollbar-thumb": "#0f3557",
        "right-action-background": "##0f3557",
        "right-action-icon": "#ffffff",
        "search-input-text-color": "#000000",
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "0px auto", //for collapsed sidebar layout
      },
      gridTemplateRows: {
        footer: "auto 100px",
        "footer-collapsed": "auto 0px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

