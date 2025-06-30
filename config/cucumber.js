module.exports = {
  default: {
    tags: process.env.npm_config_tags || "",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features/*.feature"],
    publishQuiet: false,
    dryRun: false,
    require: ["src/test/steps/*.ts", "src/test/steps/**/*.ts", "src/hook/hook.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    retry: 1,
    parallel: 1,
  },
};
