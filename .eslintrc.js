module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "standard"
  ],
  "plugins": [
    "import",
    "prettier",
    "standard"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-explicit-any": 0,
    "camelcase": "off",
    "no-underscore-dangle": "off"
  }
};