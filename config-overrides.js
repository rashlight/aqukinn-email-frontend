module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // Adding fallback node libraries
    config.resolve.fallback = {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    };
    return config;
  },
}