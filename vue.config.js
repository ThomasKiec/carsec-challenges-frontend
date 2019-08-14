const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../carsec-challenges-backend/public'),
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT || 4000}`,
      },
    },
  },
}
