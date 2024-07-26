// with-rn-deepar.js
module.exports = function withRNDeepAR(config) {
    return {
      ...config,
      plugins: [
        [
          'react-native-deepar',
          {
            ios: {},
            android: {},
          },
        ],
      ],
    };
  };
  