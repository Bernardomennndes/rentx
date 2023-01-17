import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
	bail: true,
	clearMocks: true,
	coverageProvider: 'v8',
	preset: 'ts-jest',
	testMatch: ['**/*.spec.ts'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/',
	}),
};
