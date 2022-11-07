import { DefaultOptionType } from 'antd/lib/cascader';

export interface ICascaderOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
  children?: ICascaderOption[];
}
export const userAccessControlsArr: DefaultOptionType[] = [
  {
    label: 'Accounts',
    value: 1,
    // children: [
    //   {
    //     label: 'Accounts Read',
    //     value: 1,
    //   },
    //   {
    //     label: 'Accounts Write',
    //     value: 2,
    //   },
    // ],
  },
  {
    label: 'Homepage',
    value: 2,
    // children: [
    //   {
    //     label: 'Homepage Read',
    //     value: 1,
    //   },
    //   {
    //     label: 'Homepage Write',
    //     value: 2,
    //   },
    // ],
  },
  {
    label: 'Game Listings',
    value: 3,
    // children: [
    //   {
    //     label: 'Game-Listings Read',
    //     value: 1,
    //   },
    //   {
    //     label: 'Game-Listings Write',
    //     value: 2,
    //   },
    // ],
  },
  {
    label: 'Articles',
    value: 4,
    // children: [
    //   {
    //     label: 'Articles Read',
    //     value: 1,
    //   },
    //   {
    //     label: 'Articles Write',
    //     value: 2,
    //   },
    // ],
  },
];
