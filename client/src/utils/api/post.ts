import { IPostData, IPostListData } from '@/types/IPost';
import request from './request';

type TSearchType = 'user' | 'title' | 'content';

export const getPostList = (pageId: number, postNumber: number, isDescending: boolean) =>
  request<IPostListData>(
    'GET',
    `/api/post?pageId=${pageId}&postNumber=${postNumber}&isDescending=${Number(isDescending)}`,
  );

export const getSearchPostList = (
  searchType: TSearchType,
  searchContent: string,
  pageId: number,
  postNumber: number,
  isDescending: boolean,
) =>
  request<IPostListData>(
    'GET',
    `/api/post/search/${searchType}/${searchContent}?pageId=${pageId}&postNumber=${postNumber}&isDescending=${Number(
      isDescending,
    )}`,
  );

export const getPost = (postId: number) => request<IPostData>('GET', `/api/post/${postId}`);

export const createPost = (title: string, content: string, user: string) =>
  request('POST', '/api/post', { title, content, user });

export const updatePost = (postId: number, title: string, content: string) =>
  request('PUT', `/api/post/${postId}`, { title, content });

export const deletePost = (postId: number) => request('DELETE', `/api/post/${postId}`);
