import { POST_ENTITY } from '@/constants/entity';
import { COMMON_ERROR } from '@/constants/error';
import { JOI_ERROR } from '@/constants/joi-error';
import CustomError from '@/error/custom-error';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const paramsUserValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    user: Joi.string().min(POST_ENTITY.userMinLength).max(POST_ENTITY.userMaxLength).required().empty('').messages({
      'string.max': JOI_ERROR.exceedMaxLengthUser,
      'string.min': JOI_ERROR.underMinLengthUser,
    }),
  });
  const validationResult = schema.validate(req.params);
  const { error } = validationResult;
  if (error) {
    throw new CustomError({ ...COMMON_ERROR.invalidQuery, customMessage: error.message });
  }

  next();
};

export default paramsUserValidation;
