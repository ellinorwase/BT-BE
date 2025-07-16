import { Request, Response } from 'express';
import { Activity, CreateActivityRequest } from '../types';
export declare const getAllActivities: (req: Request, res: Response) => Promise<void>;
export declare const getActivitiesByType: (req: Request<{
    type: string;
}>, res: Response) => Promise<void>;
export declare const createActivity: (req: Request<{}, Activity, CreateActivityRequest>, res: Response) => Promise<void>;
export declare const updateActivityData: (req: Request<{
    id: string;
}, Activity, Partial<Activity>>, res: Response) => Promise<void>;
export declare const deleteActivityData: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const getLatestActivity: (req: Request<{
    type: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=activityController.d.ts.map