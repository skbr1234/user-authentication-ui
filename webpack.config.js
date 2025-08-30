const { ModuleFederationPlugin } = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth_mf',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/components/AuthApp',
        './LoginForm': './src/components/LoginForm',
        './RegisterForm': './src/components/RegisterForm',
        './AuthGuard': './src/components/AuthGuard',
        './useAuth': './src/hooks/useAuth',
        './Layout': './src/components/Layout',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'next': {
          singleton: true,
          requiredVersion: '^14.0.0',
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};