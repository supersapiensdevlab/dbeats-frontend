module.exports = {
  //...
  resolve: {
    fallback: {
      crypto: false,
      http: false,
      https: false,
      os: false,
    },
  },
};
