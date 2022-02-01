export interface IPost {
  title: string;
  user: string;
  date: Date;
  id: number;
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

export interface ICreatePostData {
  postId: string;
}
