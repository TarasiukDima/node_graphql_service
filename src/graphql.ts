import { loadFiles } from '@graphql-tools/load-files';

export const typeDefs = async (): Promise<Array<string>> => await loadFiles('src/**/*.graphql');
