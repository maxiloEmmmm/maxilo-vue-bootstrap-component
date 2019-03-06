
module.exports = {
  presets: [
    ["@babel/preset-env",{"useBuiltIns": "usage"}]
  ],
  plugins: [["@babel/plugin-transform-runtime", {
    "regenerator": false
  }], "@babel/plugin-syntax-dynamic-import"]
}

