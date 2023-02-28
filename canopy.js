const aggregate = require("./services/build/aggregate");
const { getConfig, getOptions } = require("./services/config");
const args = process.argv;

(() => {
  const path = args
    .find((value) => value.includes("--path="))
    ?.split("=")
    ?.pop();

  const config = getConfig(path);
  const options = getOptions();
  const { prod, dev } = config;

  config.environment = args.includes("dev") ? dev : prod;
  config.options = options;

  const env = {
    CANOPY_CONFIG: {
      ...config.environment,
      ...config.options,
    },
  };

  aggregate.build(env.CANOPY_CONFIG);
})();

module.exports = { getConfig };
