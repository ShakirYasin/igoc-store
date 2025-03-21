module.exports = {
  apps: [
    {
      name: "igoc-client",
      script: "node",
      args: "node_modules/next/dist/bin/next start -p 3000",
      watch: false,
    },
  ],
};
