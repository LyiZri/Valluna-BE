export interface IUsers {
  id: number;
  email?: string;
  roles?: string[];
}
export interface IManage {
  rid: number;
  rname?: string;
  rdes?: string;
}

export const rolesData = [
  { value: '1', text: 'Super Admin', label: 'Super Admin' },
  { value: '2', label: 'Game Listing', text: 'Game Listing' },
  { value: '3', label: 'Articles', text: 'Articles' },
  { value: '4', label: 'ETC', text: 'ETC' },
];

export const tableData: IUsers[] = [
  {
    id: 1,
    email: '123',
    roles: ['1', '2'],
  },
  {
    id: 2,
    email: '321',
    roles: ['2'],
  },
  {
    id: 3,
    email: '321123',
    roles: ['2', '3'],
  },
];

export const rolesTableData: IManage[] = [
  {
    rid: 1,
    rname: 'Tom',
    rdes: 'i am tom',
  },
  {
    rid: 2,
    rname: 'Jim',
    rdes: 'i a jim',
  },
  {
    rid: 3,
    rname: 'Cas',
    rdes: 'I am casgod!!!!!!',
  },
];
export const searchStatusData = [
  {
    value: 'enables',
    label: 'Enabled',
  },
  {
    value: 'disabled',
    label: 'Disabled',
  },
];
