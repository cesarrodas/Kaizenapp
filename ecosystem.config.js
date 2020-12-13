module.exports = {
  apps : [
      {
        name: "kaizen_frontend",
        script: "./dist/index.js",
        watch: true,
        env: {
            "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}