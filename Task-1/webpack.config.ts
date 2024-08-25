import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  devtool: 'source-map',
  // An entry point indicates which module webpack should use to begin the bundle process
  // Webpack creates separate bundle for every entry point
  entry: {
    'create-subscription-plan':
      './src/handlers/create-subscription-plan/create-subscription-plan.ts',
    'assign-subscription-plan':
      './src/handlers/assign-subscription-plan-to-customer/assign-subscription-plan-to-customer.ts',
  },
  // The output property tells webpack where to emit the bundles it creates and how to name these files
  output: {
    // The name placeholder will be substituted with the key of the entry point.
    // Example: validate-order-fulfillment
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2',
    path: resolve(__dirname, 'build'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  module: {
    // To transpile Typescript files to js
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  resolve: {
    // This config is required for module resolution so that webpack knows "import foo from './foo';" might resolve to foo.js/foo.ts/foo.json
    extensions: ['.js', '.ts', '.json'],
  },
  // Targeting node lets webpack know that nodejs apis such as fs are available.
  target: 'node',
  mode: 'development',
};

export default config;
