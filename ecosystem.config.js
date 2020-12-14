module.exports = {
  apps : [
      {
        name: "kaizen_frontend",
        script: "./dist/index.js",
        watch: false,
        env: {
            "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}