import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import 'antd/dist/antd.css';
import './app.css';
import tableMerge from '@table-merge/ant-design';
import type { TableMergeAntDesignOptions } from '@table-merge/ant-design';

interface DataType {
  key: number;
  a: number;
  b: number;
  c: number;
  d: number;
}

const data: DataType[] = [
  { key: 1, a: 8, b: 8, c: 2, d: 0 },
  { key: 2, a: 2, b: 4, c: 4, d: 5 },
  { key: 3, a: 8, b: 8, c: 4, d: 4 },
  { key: 4, a: 5, b: 8, c: 4, d: 1 },
  { key: 5, a: 5, b: 3, c: 3, d: 2 }
];

const cols: ColumnsType<DataType> = [
  { align: 'center', dataIndex: 'key', title: 'ID' },
  { align: 'center', dataIndex: 'a', title: 'A列' },
  { align: 'center', dataIndex: 'b', title: 'B列' },
  { align: 'center', dataIndex: 'c', title: 'C列' },
  { align: 'center', dataIndex: 'd', title: 'D列' }
];

interface BoxProps {
  title: string;
  options?: TableMergeAntDesignOptions;
}
const Box = (props: BoxProps) => {
  const opts = props.options;

  return (
    <>
      <div className='box'>
        <p>{props.title}</p>
        <pre>{`tableMerge(data, cols${opts ? ', ' + JSON.stringify(opts) : ''})`}</pre>
        <Table columns={tableMerge(data, cols, opts)} dataSource={data} pagination={false} bordered />
      </div>
    </>
  );
};

const App: React.FC = () => (
  <>
    <h1 className='title'>@table-merge/ant-design example</h1>
    <h2 className='box'>合并行</h2>
    <Box title='多行合并' />
    <Box title='从第二行开始合并' options={{ range: { row: 2 } }} />
    <Box title='合并 1 - 3 行，不包含第 3 行' options={{ range: { row: [1, 3] } }} />
    <Box title='从第一行和第二例开始合并' options={{ range: { row: 1, col: 2 } }} />

    <h2 className='box'>合并列</h2>
    <Box title='多列合并' options={{ spanType: 'colSpan' }} />
    <Box title='从第二列开始合并' options={{ range: { col: 2 }, spanType: 'colSpan' }} />
    <Box title='合并 1 - 3 列，不包含第 3 列' options={{ range: { col: [1, 3] }, spanType: 'colSpan' }} />
    <Box title='从第一行和第二例开始合并' options={{ range: { row: 1, col: 2 }, spanType: 'colSpan' }} />

    <h2 className='box'>筛选指定列</h2>
    <div className='box'>
      <p>比如后端返回很多数据，而只渲染某些数据的时候，这时候可以指定没列要渲染的 keys</p>
      <pre>
        {`const data = [
  { key: 1, a: 8, b: 8, c: 2, d: 0 },
  { key: 2, a: 2, b: 4, c: 4, d: 5 },
  { key: 3, a: 8, b: 8, c: 4, d: 4 },
  { key: 4, a: 5, b: 8, c: 4, d: 1 },
  { key: 5, a: 5, b: 3, c: 3, d: 2 }
];

const cols = [
  { align: 'center', dataIndex: 'a', title: 'A列' },
  { align: 'center', dataIndex: 'b', title: 'B列' },
  { align: 'center', dataIndex: 'c', title: 'C列' },
  { align: 'center', dataIndex: 'd', title: 'D列' }
];

tableMergeAntDesignVue(
  data,
  cols,
  { keys: ['a', 'b', 'c', 'd'], spanType: 'colSpan' }
)`}
      </pre>
      <Table
        columns={tableMerge(
          data,
          cols.filter((col) => col.dataIndex !== 'key'),
          { keys: ['a', 'b', 'c', 'd'], spanType: 'colSpan' }
        )}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
    <br />
  </>
);

export default App;
