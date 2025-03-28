module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ 이렇게 바꿔야 Tailwind 4 + PostCSS가 연결됩니다
    autoprefixer: {},
  },
};
