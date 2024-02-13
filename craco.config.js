// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // Add a fallback for the 'crypto' module
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          crypto: require.resolve('crypto-browserify')
        };
  
        return webpackConfig;
      }
    }
  };
  