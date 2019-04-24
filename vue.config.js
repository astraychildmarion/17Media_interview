const path = require('path')

module.exports = {
	css: {
    loaderOptions: {
      sass: {
        data: `@import "@/reset.scss","@/frame.scss";`,
      }
    }
  },
}
