import { IMedia } from '@/types/gameListing';
import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { arrayMoveImmutable } from 'array-move';
import React, { useState } from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { useEffect } from 'react';

interface IProps {
  columns: ColumnsType<IMedia>;
  list: IMedia[];
  key?: string;
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

const ContentMoveTable = ({ columns, list, key = 'name' }: IProps) => {
  const [dataSource, setDataSource] = useState(list);
  columns.unshift({
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  });
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
        (el: IMedia) => !!el,
      );
      console.log('Sorted items: ', newData);
      setDataSource(newData);
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
    const index = dataSource.findIndex((x) => x.rank === restProps['list-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };
  useEffect(() => {
    setDataSource(list);
    console.log(list);
  }, [list]);
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey={key}
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
