interface DataItem {
  [key: string]: any;
}

type Data = DataItem[];
export type IndexGraph = number[][];
export type ValueGraph = any[][];
export type MergeRange = number | number[] | undefined;

export const getGraph = (data: Data): [IndexGraph, ValueGraph] => {
  const indexGraph: IndexGraph = [];
  const valueGraph: ValueGraph = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!Array.isArray(indexGraph[i])) indexGraph[i] = [];
    if (!Array.isArray(valueGraph[i])) valueGraph[i] = [];

    Object.values(item).forEach((value, index) => {
      indexGraph[i][index] = 1;
      valueGraph[i][index] = value;
    });
  }

  return [indexGraph, valueGraph];
};

export function mergeColumn(data: Data, range?: MergeRange): IndexGraph {
  warn(range);

  const [indexGraph, valueGraph] = getGraph(data);

  valueGraph.forEach((values, valuesIndex) => {
    let prevIndex = 0;
    let prevValue: any;
    let count = 1;

    values.forEach((value, valueIndex) => {
      if (!whetherContinue(range, valueIndex)) return;

      if (prevValue === value) {
        count = count + 1;
        indexGraph[valuesIndex][prevIndex] = count;
        indexGraph[valuesIndex][valueIndex] = 0;
      } else {
        count = 1;
        prevIndex = valueIndex;
      }

      prevValue = value;
    });
  });

  return indexGraph;
}

export function mergeRow(data: Data, range?: MergeRange): IndexGraph {
  warn(range);

  const [indexGraph, valueGraph] = getGraph(data);

  valueGraph[0].forEach((_, valueIndex) => {
    let prevIndex = 0;
    let prevValue: any;
    let count = 1;

    valueGraph.forEach((values, rowIndex) => {
      if (!whetherContinue(range, rowIndex)) return;

      const value = values[valueIndex];

      if (prevValue === value) {
        count = count + 1;
        indexGraph[prevIndex][valueIndex] = count;
        indexGraph[rowIndex][valueIndex] = 0;
      } else {
        count = 1;
        prevIndex = rowIndex;
      }

      prevValue = value;
    });
  });

  return indexGraph;
}

export function whetherContinue(range: MergeRange, index: number): boolean {
  if (typeof range === 'number' && index < range) return false;

  if (Array.isArray(range)) {
    let [start, end] = range;
    if (typeof start === 'number' && index < start) return false;
    if (typeof end === 'number' && index > end) return false;
  }

  return true;
}

function warn(range: MergeRange) {
  if (range && typeof range !== 'number' && !Array.isArray(range)) {
    console.warn('range 不是 number 或 number[]， 为了程序正常运行，range 不生效!');
  }

  if (Array.isArray(range)) {
    let [start, end] = range;
    if (typeof start !== 'number' || typeof end !== 'number') {
      console.warn('range 不是 number[]， 为了程序正常运行，range 不生效!');
    } else if (start >= end) {
      console.warn(`range 是 number[]，但是 ${end} 必须大于 ${start}， 为了程序正常运行，range 不生效!`);
    }
  }
}
