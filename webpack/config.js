// const {webpackMerge} = require('webpack-merge');
const { merge } = require('webpack-merge');
const loadSharedConfig = require('./configs/shared');
// var InfiniteScroll = require('infinite-scroll');

const loadModeConfig = env => require(`./configs/${env.mode}`)(env);

module.exports = env =>
  // webpackMerge(loadSharedConfig(env), loadModeConfig(env));
  merge(loadSharedConfig(env), loadModeConfig(env));
