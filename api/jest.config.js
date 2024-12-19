module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'], // Dopasowanie do lokalizacji testów
  moduleDirectories: ['node_modules', 'lib'], // Ścieżki do wyszukiwania modułów
};
