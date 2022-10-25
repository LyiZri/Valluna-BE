export interface IGame {
  glid?: string;
  game_name?: string;
  surl?: string;
  game_blockchain?: number[];
  status?: number;
  editStatus?: number;
  operator?: string;
  lastEditedDate: string;
  gamedes?: string;
  official_links?: any;
  download_links?: any;
  additional_media?: any;
  game_media?: any;
}
export interface IMedia {
  name: string;
  type: number;
  url: string;
  enable: number;
  rank: number;
}
export interface ICategories {
  name: string;
  num?: number;
  time?: string;
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
