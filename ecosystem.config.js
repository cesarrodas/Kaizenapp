const path = require('path');
let env = require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps : [
      {
        name: "kaizen_frontend",
        script: "./dist/index.js",
        watch: false,
        env: env.parsed,
        env_production: env.parsed
      }
  ]
}