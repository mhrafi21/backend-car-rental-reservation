import { NextFunction, Request, Response } from 'express'

const allNotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: 'API NOT MATCHED!',
    error: '',
  })
}

export default allNotFound
