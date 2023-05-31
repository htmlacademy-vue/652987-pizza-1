// Automatically imports all the modules and exports as a single module object
const requireContext = require.context("../modules", true, /store\.js$/);
const modules = {};

requireContext.keys().forEach((file) => {
  // create the module name from file
  const moduleName = file.split("/")[1].split(".")[0];

  modules[moduleName] = requireContext(file).default || requireContext(file);
  modules[moduleName].namespaced = true;
});

export default modules;
