import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { POST_ENTITY } from '@/constants/entity';
import { COMMON_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';

const exceedMaxLengthTitle = `제목은 ${POST_ENTITY.titleMaxLength}자를 넘길 수 없습니다`;
const fillTitle = `제목을 입력해주세요`;

const updatePostValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    title: Joi.string().max(POST_ENTITY.titleMaxLength).required().empty('').messages({
      'string.max': exceedMaxLengthTitle,
      'any.required': fillTitle,
    }),
    content: Joi.string(),
  });

  const validationResult = schema.validate(req.body);
  const { error } = validationResult;

  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidBody, customMessage: error.message });
  }

  next();
};

export default updatePostValidation;
