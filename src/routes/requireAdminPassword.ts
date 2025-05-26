import { Request, Response, NextFunction } from 'express';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

export function requireAdminPassword(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const password = req.header('X-Admin-Password');
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized: Invalid admin password' });
    return;
  }
  next();
}
