/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['.json', '.yml', '.yaml', 'build', 'supabase'],
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node']
};
