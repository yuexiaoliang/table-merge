interface DataItem {
  [key: string]: any;
}

type Data = DataItem[];
type IndexGraph = number[][];
type ValueGraph = any[][];

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

export const mergeColumn = (data: Data) => {
  const [indexGraph, valueGraph] = getGraph(data);

  for (let colIndex = 0; colIndex < valueGraph.length; colIndex++) {
    let prevIndex = 0;
    let prevValue: any;
    let count = 1;
    const row = valueGraph[colIndex];

    for (let rowIndex = 0; rowIndex < row.length; rowIndex++) {
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
};

export const mergeRow = (data: Data) => {
  const [indexGraph, valueGraph] = getGraph(data);

  for (let colIndex = 0; colIndex < valueGraph[0].length; colIndex++) {
    let prevIndex = 0;
    let prevValue: any;
    let count = 1;

    valueGraph.forEach((values, rowIndex) => {
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
};
