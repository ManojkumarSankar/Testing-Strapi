module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    // Suppress the exhaustive-deps warning for CI builds
    'react-hooks/exhaustive-deps': 'warn'
  }
};