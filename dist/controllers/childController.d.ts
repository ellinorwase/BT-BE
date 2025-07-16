import { Request, Response } from 'express';
import { Child, CreateChildRequest } from '../types';
export declare const getChild: (req: Request, res: Response) => Promise<void>;
export declare const createChild: (req: Request<{}, Child, CreateChildRequest>, res: Response) => Promise<void>;
export declare const updateChildData: (req: Request<{}, Child, Child>, res: Response) => Promise<void>;
//# sourceMappingURL=childController.d.ts.map