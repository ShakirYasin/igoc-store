import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  config: { reactQueryVersion: 5 },

  schema: "http://localhost:3029/graphql",
  // schema: "https://node.hostingladz.com:3125/graphql",

 
  documents: "./graphql/**/*.graphql",
  watch: true,
  verbose: true,

  watchConfig: {
    usePolling: true,
    interval: 1000,
  },
  generates: {
    "./graphql/generated/hooks.ts": {
      config: {
        fetcher: {
          func: "@/utils/axios.fetcher#axiosGraphQL",
          isReactHook: false,
        },
        prepend: ["'use client';"],
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "@graphql-codegen/typescript-react-query",
      ],
    },
  },
};

export default config;