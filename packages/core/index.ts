import { UserOptions, SpanTypes } from './types';

export { tableHandler as createTableMerge } from './src/handler';
export { getTableMerged } from './src/functional';

export type TableMergeOptions = UserOptions;
export type TableMergeSpanTypes = SpanTypes;
