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

  for (let colIndex = 0; colIndex < valueGraph.length; colIndex++) {
    let prevIndex = 0;
    let prevValue: any;
    let count = 1;
    const row = valueGraph[colIndex];

    for (let rowIndex = 0; rowIndex < row.length; rowIndex++) {
      if (typeof range === 'number' && rowIndex < range) continue;

      if (Array.isArray(range)) {
        let [start, end] = range;
        if (typeof start === 'number' && rowIndex < start) continue;
        if (typeof end === 'number' && rowIndex > end) continue;
      }

      const value = row[rowIndex];

      if (prevValue === value) {
        count = count + 1;
        indexGraph[colIndex][prevIndex] = count;
        indexGraph[colIndex][rowIndex] = 0;
      } else {
        count = 1;
        prevIndex = rowIndex;
      }

      prevValue = value;
    }
  }

  return indexGraph;
}

export function mergeRow(data: Data, range?: MergeRange): IndexGraph {
  warn(range);

  const [indexGraph, valueGraph] = getGraph(data);

  for (let colIndex = 0; colIndex < valueGraph[0].length; colIndex++) {
    let prevIndex = 0;
    let prevValue: any;
    let count = 1;

    valueGraph.forEach((values, rowIndex) => {
      if (typeof range === 'number' && rowIndex < range) return;

      if (Array.isArray(range)) {
        let [start, end] = range;
        if (typeof start === 'number' && rowIndex < start) return;
        if (typeof end === 'number' && rowIndex > end) return;
      }

      const value = values[colIndex];

      if (prevValue === value) {
        count = count + 1;
        indexGraph[prevIndex][colIndex] = count;
        indexGraph[rowIndex][colIndex] = 0;
      } else {
        count = 1;
        prevIndex = rowIndex;
      }

      prevValue = value;
    });
  }

  return indexGraph;
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
