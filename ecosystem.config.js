const path = require('path');
let env = require('dotenv').config({ path: path.join(__dirname, '.env') });

const newenvironment = Object.assign({}, env.parsed, { NODE_ENV: "development" });
const otherenvironment = Object.assign({}, env.parsed, { NODE_ENV: "production" });

console.log("NEW", newenvironment);
console.log("PROD", otherenvironment);

module.exports = {
  apps : [
      {
        name: "kaizen_frontend",
        script: "./dist/index.js",
	interpreter_args: "-harmony",
        watch: false,
        env: Object.assign({}, env.parsed, { NODE_ENV: "development" }),
        env_production: Object.assign({}, env.parsed, { NODE_ENV: "production" })
      }
  ]
}
