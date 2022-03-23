import Mock from "mockjs";

// setup
Mock.setup({ timeout: "0-800" });

// register modules
const moduleFiles = require.context("./modules", true, /.*\.js$/);
moduleFiles.keys().forEach((k) => {
  Object.entries(moduleFiles(k).default).forEach(([key, value]) => {
    const [type, url] = key.split("|");
    Mock.mock(new RegExp("^" + url + "\\b"), type, value);
  });
});
