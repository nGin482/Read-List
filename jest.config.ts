import { Config } from "jest";

const config: Config = {
    roots: [
        "./tests"
    ],
    transform: {
        '.ts': 'ts-jest'
    }
};

export default config;