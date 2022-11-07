export interface IUsers {
  aid: number;
  email?: string;
  roles?: IRoles[];
  password?: string;
}
export interface IRolesModules {
  module_id: number;
  module_keyword: string;
  module_level: number;
  module_name: string;
}
export interface IManage {
  rid: number;
  name?: string;
  description?: string;
  modules: IRolesModules[];
}
export interface IRoles {
  role_id: string;
  role_name: string;
}

export const rolesData = [
  { value: '1', text: 'Super Admin', label: 'Super Admin' },
  { value: '2', label: 'Game Listing', text: 'Game Listing' },
  { value: '3', label: 'Articles', text: 'Articles' },
  { value: '4', label: 'ETC', text: 'ETC' },
];

export const searchStatusData = [
  {
    value: 1,
    label: 'unpublished changes ',
  },
  {
    value: 2,
    label: 'up to date',
  },
];
export const searchFeaturedData = [
  {
    value: 0,
    label: 'No Featured',
  },
  {
    value: 1,
    label: 'Featured',
  },
];
