export interface IArticlesDraft {
  article_title: string;
  article_img: string;
  games: string[];
  categorys: string;
  content: string;
  action: number;
  featured: number;
}
export interface IArticles {
  optime: string;
  author: string;
  operator: string;
  atid: string;
  editstatus: number;
  status: number;
  draft: IArticlesDraft;
  side_url: string;
  total_views: string;
  unique_views: string;
  shares: string;
  article_title: string;
  featured?: number;
  games?: string[];
  categorys?: string;
  content?: string;
  article_img?: string;
}
