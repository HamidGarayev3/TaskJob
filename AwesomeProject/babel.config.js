module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Other plugins
    // ...
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ],
};

// module.exports = {
//   presets: [
//     presets: ['module:metro-react-native-babel-preset']
//   ],
//   plugins: [
//     // Your existing plugins
//     '@babel/plugin-proposal-export-namespace-from',
//     'react-native-reanimated/plugin',
//   ],
// };
