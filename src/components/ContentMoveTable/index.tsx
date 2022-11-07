import { IMedia } from '@/types/gameListing';
import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { arrayMoveImmutable } from 'array-move';
import React, { useState } from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { useEffect } from 'react';
import { ProProvider } from '@ant-design/pro-components';

interface IProps<T> {
  columns: ColumnsType<T>;
  list: T[];
  setList: Function;
  rowkey?: string;
  order?: string;
  loading?: boolean;
}
const DragHandle: any = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const SortableItem: any = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
const SortableBody: any = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
);

const ContentMoveTable = ({
  columns,
  list,
  setList,
  order = 'rank',
  rowkey = 'name',
  loading = false,
}: IProps<any>) => {
  // const [list, setList] = useState(list);
  columns.unshift({
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  });
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(list.slice(), oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setList(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = list.findIndex((x) => x[order] === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };
  useEffect(() => {
    setList(list);
    console.log(list);
  }, [list]);
  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={list}
      columns={columns}
      rowKey={rowkey}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};

export default ContentMoveTable;
