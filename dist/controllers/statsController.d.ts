import { Request, Response } from 'express';
export declare const getDailyStats: (req: Request<{
    date: string;
}>, res: Response) => Promise<void>;
export declare const getWeeklyStats: (req: Request<{
    startDate: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=statsController.d.ts.map