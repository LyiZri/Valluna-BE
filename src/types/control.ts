export interface ICascaderOption {
  value: string | number | boolean;
  label: string;
  children?: ICascaderOption[];
}
export const userAccessControlsArr: ICascaderOption[] = [
  {
    label: 'Portal Access',
    value: 1,
    children: [
      {
        label: 'Portal Access Read',
        value: 'read',
      },
      {
        label: 'Portal Access Write',
        value: 'write',
      },
    ],
  },
  {
    label: 'Accounts',
    value: 2,
    children: [
      {
        label: 'Read',
        value: 'read',
      },
      {
        label: 'Write',
        value: 'write',
      },
    ],
  },
  {
    label: 'Homepage',
    value: 3,
    children: [
      {
        label: 'Read',
        value: 'read',
      },
      {
        label: 'Write',
        value: 'write',
      },
    ],
  },
  {
    label: 'Game Listings',
    value: 4,
    children: [
      {
        label: 'Read',
        value: 'read',
      },
      {
        label: 'Write',
        value: 'write',
      },
    ],
  },
  {
    label: 'Articles',
    value: 5,
    children: [
      {
        label: 'Read',
        value: 'read',
      },
      {
        label: 'Write',
        value: 'write',
      },
    ],
  },
];
