import React, { useState } from 'react';
import { Input } from 'antd';
import { IDynamicUrlItem } from '../../../../types/form';
import { useEffect } from 'react';

interface IProps {
  _list: any;
  _setList: Function;
}
export default function OfficialLinks({ _list, _setList }: IProps) {
  const [list, setList] = useState<IDynamicUrlItem[]>([]);
  let setObj = {};
  useEffect(() => {
    let copyList: IDynamicUrlItem[] = [];
    for (const key in _list) {
      copyList.push({
        name: key,
        url: _list[key],
      });
    }
    setList(copyList);
    console.log(_list);
  }, [_list]);
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
              defaultValue={item.url}
              onBlur={(e) => {
                setObj = _list;
                setObj[name] = e.target.value;
                _setList({
                  ...setObj,
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
