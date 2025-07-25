import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        userId: number;
        email: string;
        role: string;
        is_verified: boolean;
    };
}
export type { AuthRequest };
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const requireVerified: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map