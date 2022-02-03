import { POST_ENTITY } from '@/constants/entity/post';

const ERROR = {
  exceedMaxLengthTitle: `제목은 ${POST_ENTITY.titleMaxLength}자를 넘길 수 없습니다`,
  fillTitle: `제목을 입력해주세요`,
  exceedMaxLengthUser: `닉네임은 ${POST_ENTITY.userMaxLength}자를 넘길 수 없습니다`,
  underMinLengthUser: `닉네임은 ${POST_ENTITY.userMinLength}자 이상 입력해야 합니다`,
  fillUser: `닉네임을 입력해주세요`,
};

const createValidation = (title: string, user: string) => {
  if (!title) return ERROR.fillTitle;
  if (title.length > POST_ENTITY.titleMaxLength) return ERROR.exceedMaxLengthTitle;
  if (!user) return ERROR.fillUser;
  if (user.length > POST_ENTITY.userMaxLength) return ERROR.exceedMaxLengthUser;
  if (user.length < POST_ENTITY.userMinLength) return ERROR.underMinLengthUser;
  return true;
};

const updateValidation = (title: string) => {
  if (!title) return ERROR.fillTitle;
  if (title.length > POST_ENTITY.titleMaxLength) return ERROR.exceedMaxLengthTitle;
  return true;
};

export { createValidation, updateValidation };
