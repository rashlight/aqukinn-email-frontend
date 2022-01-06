module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // Importing dotenv globally
    const Dotenv = require('dotenv-webpack');

    module.exports = {
      plugins: [
        new Dotenv({
          path: './.env', // load this now instead of the ones in '.env'
          allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        })
      ]
    };

    // Adding fallback node libraries
    config.resolve.fallback = {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
    };

    return config;
  },
}