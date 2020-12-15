const path = require('path');
let env = require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps : [
      {
        name: "kaizen_frontend",
        script: "./dist/index.js",
        watch: false,
        env: Object.assign({}, env.parsed, { NODE_ENV: "development" }),
        env_production: Object.assign({}, env.parsed, { NODE_ENV: "production" })
      }
  ]
}