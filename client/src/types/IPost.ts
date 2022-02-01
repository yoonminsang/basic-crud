export interface IPost {
  title: string;
  user: string;
  date: Date;
  id: number;
}

export interface IPostData {
  post: IPost;
}

export interface IPostDetail extends IPost {
  content: string;
}

export interface IPostDetailData {
  post: IPostDetail;
}

export interface IPostListData {
  postList: IPost[];
}
