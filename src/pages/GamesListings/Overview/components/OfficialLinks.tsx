import React, { useState } from 'react';
import ContentForm from '@/components/ContentForm';
import { IFormItem } from '@/types/form';
import { Input } from 'antd';
import { IDynamicUrlItem } from '../../../../types/form';

interface IProps {
  list: IDynamicUrlItem[];
  setList: Function;
}
export default function OfficialLinks({ list, setList }: IProps) {
  return (
    <div>
      {list.map((item: IDynamicUrlItem, index: number) => {
        const name = item.name;

        return (
          <div key={item.name} className="flex justify-between mb-4">
            {/* <p className="">{name}</p> */}
            <Input
              addonBefore={name}
              type="text"
              onBlur={(e) => {
                const _list = list.concat([]);
                _list[index].url = e.target.value;
                setList(_list);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
