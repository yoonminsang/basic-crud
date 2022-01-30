export const COMMON_ERROR = {
  invalidBody: {
    status: 400,
    errorMessage: '잘못된 요청입니다',
  },
  invalidQuery: {
    status: 400,
    errorMessage: '잘못된 요청입니다',
  },
};

export const POST_ERROR = {
  notFoundPostList: {
    status: 400,
    errorMessage: '글 목록이 존재하지 않습니다',
  },
  notFoundPost: {
    status: 400,
    errorMessage: '글이 존재하지 않습니다',
  },
};

export const NOT_FOUND_ERROR = {
  status: 404,
  errorMessage: '존재하지 않는 페이지입니다',
};
