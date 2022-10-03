declare type RangeValue = number | [number, number];

declare type OptionsKeys = (string | number)[];

declare interface OptionsRange {
  row?: RangeValue;
  col?: RangeValue;
}

declare interface UserOptions {
  keys?: OptionsKeys;
  range?: OptionsRange;
}

declare interface OptionsResolved {
  keys: OptionsKeys;
  range: Required<OptionsRange>;
}

declare interface ListItem {
  [key: string]: any;
}

declare type TableData = ListItem[];

declare interface TableCell {
  rowSpan: number;
  colSpan: number;
  value: any;
}

declare type TableRow = TableCell[];
declare type Table = TableRow[];

declare type CreateTableResult = Table | null | undefined;

declare interface RangeStartEnd {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

declare type SpanTypes = keyof Omit<TableCell, 'value'>;
