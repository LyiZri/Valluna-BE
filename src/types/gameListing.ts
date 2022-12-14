export interface IGame {
  glid?: string;
  game_name?: string;
  surl?: string;
  game_blockchain?: string[];
  status?: number;
  editstatus?: number;
  operator?: string;
  lastEditedDate?: string;
  gamedes?: string;
  official_links?: any;
  download_links?: any;
  additional_media?: any;
  additional_game_summary?: string;
  game_media?: any;
  draft?: IGame;
  game_image?: string
  token_ticker?: any[]
}
export interface IMedia {
  name: string;
  type: number;
  url: string;
  enable: number;
  rank: number;
}
export interface IGameDraft {
  game_name: string;
  game_image: string;
  game_blockchain: string[];
  game_category: string[];
  game_media: IMedia[];
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
