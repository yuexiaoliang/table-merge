export type RangeValue = number | [number, number];

export type OptionsKeys = (string | number)[];

export interface OptionsRange {
  row?: RangeValue;
  col?: RangeValue;
}

export interface UserOptions {
  keys?: OptionsKeys;
  range?: OptionsRange;
}

export interface OptionsResolved {
  keys: OptionsKeys;
  range: Required<OptionsRange>;
}

export interface ListItem {
  [key: string]: any;
}

export type TableData = ListItem[];

export interface TableCell {
  rowSpan: number;
  colSpan: number;
  value: any;
}

export type TableRow = TableCell[];
export type Table = TableRow[];

export type CreateTableResult = Table | null | undefined;

export interface RangeStartEnd {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export type SpanTypes = keyof Omit<TableCell, 'value'>;
