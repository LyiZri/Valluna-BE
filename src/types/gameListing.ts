export interface IGame {
  gid: number;
  gname?: string;
  surl?: string;
  chainlist?: number[];
  status?: number;
  editStatus?: number;
  operator?: string;
  lastEditedDate: string;
}
export interface ICategories {
  id: number;
  name: string;
  num?: number;
  creationdate?: string;
  operator?: string;
}
export const StatusData = {
  0: 'Publish',
  1: 'Draft',
};
export const editStatusData = {
  0: 'Unpublished Changes',
  1: 'Up to Date',
};

export const gameListingValue: IGame[] = [
  {
    gid: 1,
    gname: 'Axie',
    surl: 'axie.game',
    chainlist: [1, 2, 3, 4],
    status: 0,
    editStatus: 0,
    operator: 'nihao@gmail.com',
    lastEditedDate: '0',
  },
  {
    gid: 2,
    gname: '12',
    surl: 'axie.game',
    chainlist: [1, 2, 3],
    status: 1,
    editStatus: 0,
    operator: 'nihao@gmail.com',
    lastEditedDate: '0',
  },
  {
    gid: 3,
    gname: '123',
    surl: 'axie.game',
    chainlist: [1, 2, 3],
    status: 0,
    editStatus: 1,
    operator: 'nihao@gmail.com',
    lastEditedDate: '0',
  },
];
export const categoriesList: ICategories[] = [
  {
    id: 1,
    name: '123',
    num: 10,
    creationdate: '0',
    operator: '123@123.com',
  },
  {
    id: 2,
    name: '123',
    num: 10,
    creationdate: '0',
    operator: '12332@123.com',
  },
  {
    id: 3,
    name: '123',
    num: 10,
    creationdate: '0',
    operator: '12353@123.com',
  },
];
