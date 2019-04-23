export default `
@font-face {
  font-family: 'Bw Nista International';
  font-weight: normal;
  font-style: normal;
  font-display: swap;
  src: url('/static/fonts/BwNistaInternational-Regular.woff2') format('woff2')
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Bw Nista International';
  font-weight: normal;
  font-style: italic;
  font-display: swap;
  src: url('/static/fonts/BwNistaInternational-RegularItalic.woff2') format('woff2')
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Bw Nista International';
  font-weight: bold;
  font-style: normal;
  font-display: swap;
  src: url('/static/fonts/BwNistaInternational-ExtraBold.woff2') format('woff2')
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Bw Nista International';
  font-weight: bold;
  font-style: italic;
  font-display: swap;
  src: url('/static/fonts/BwNistaInternational-ExtraBoldItalic.woff2') format('woff2')
  unicode-range: U+000-5FF; /* Latin glyphs */
}
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
html,
body {
  font-family: Bw Nista International;
  line-height: 1.4;
  color: white;
  font-weight: normal;
}
html {
  background: white;
}
`