import { POST_ENTITY } from '@/constants/entity';
import { COMMON_ERROR } from '@/constants/error';
import { JOI_ERROR } from '@/constants/joi-error';
import CustomError from '@/error/custom-error';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const paramsTitleValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    title: Joi.string().max(POST_ENTITY.titleMaxLength).required().empty('').messages({
      'string.max': JOI_ERROR.exceedMaxLengthTitle,
      'any.required': JOI_ERROR.fillTitle,
    }),
  });
  const validationResult = schema.validate(req.params);
  const { error } = validationResult;
  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidQuery, customMessage: error.message });
  }

  next();
};

export default paramsTitleValidation;
