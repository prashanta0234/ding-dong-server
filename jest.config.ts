module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "tsx", "js", "json"],
	testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov"],
	moduleNameMapper: {
		"^@models/(.*)$": "<rootDir>/src/models/$1",
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
	},
};
