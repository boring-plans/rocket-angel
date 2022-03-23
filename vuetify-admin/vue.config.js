const ghPages = process.env.NODE_ENV === "ghPages";

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
  },
  publicPath: ghPages ? "/vuetify-admin/" : "/", // to cater to github pages
};
