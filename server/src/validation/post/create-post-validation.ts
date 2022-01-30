import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { POST_ENTITY } from '@/constants/entity';
import { COMMON_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';

const exceedMaxLengthTitle = `제목은 ${POST_ENTITY.titleMaxLength}자를 넘길 수 없습니다`;
const fillTitle = `제목을 입력해주세요`;
const exceedMaxLengthUser = `닉네임은 ${POST_ENTITY.userMaxLength}자를 넘길 수 없습니다`;
const underMinLengthUser = `닉네임은 ${POST_ENTITY.userMinLength}자를 이상 입력해야 합니다`;

const createPostValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    title: Joi.string().max(POST_ENTITY.titleMaxLength).required().empty('').messages({
      'string.max': exceedMaxLengthTitle,
      'any.required': fillTitle,
    }),
    content: Joi.string(),
    user: Joi.string().max(POST_ENTITY.userMaxLength).min(POST_ENTITY.userMinLength).required().empty('').messages({
      'string.max': exceedMaxLengthUser,
      'string.min': underMinLengthUser,
    }),
  });

  const validationResult = schema.validate(req.body);
  const { error } = validationResult;

  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidBody, customMessage: error.message });
  }

  next();
};

export default createPostValidation;
