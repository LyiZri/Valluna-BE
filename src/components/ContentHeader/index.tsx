import { LeftCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { history } from 'umi';

interface IProps {
  label: string;
}
export default function ContentHeader({ label }: IProps) {
  return (
    <div className="text-left w-full border-b border-gray-500 pb-4 flex justify-start">
      <LeftCircleOutlined
        className="cursor-pointer text-2xl font-semibold mr-8"
        onClick={() => {
          history.goBack();
        }}
      />
      <div className="text-xl font-semibold">{label}</div>
    </div>
  );
}
