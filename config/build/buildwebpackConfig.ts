import {BuildOptions} from "./types/config";
import webpack from "webpack";
import path from "path";
import {buildLoaders} from "./buildLoaders";
import {buildResolves} from "./buildResolves";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";

export function buildwebpackConfig(options:BuildOptions):webpack.Configuration{
  const {mode,paths,isDev}=options
  return {
    mode:mode,
    /// стартовая точка приложения
    entry:paths.entry,
    // куда и как делать сборку приложения
    output: {
      // главный файл сборки приложения
      filename: '[name].[contenthash].js',
      // куда сборка будет происходить
      path:paths.build ,
      clean: true,
    },
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolves(),
    plugins: buildPlugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}