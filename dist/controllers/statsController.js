"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklyStats = exports.getDailyStats = void 0;
const data_1 = require("../utils/data");
const getDailyStats = async (req, res) => {
    try {
        const { date } = req.params;
        console.log(`API: Fetching daily stats for ${date}`);
        setTimeout(() => {
            const dayActivities = data_1.mockActivities.filter(activity => activity.date === date);
            const stats = {
                totalFeedings: dayActivities.filter(a => a.type === 'feeding' || a.type === 'breastfeeding').length,
                totalSleep: dayActivities.filter(a => a.type === 'sleep').length,
                totalDiaperChanges: dayActivities.filter(a => a.type === 'diaper').length,
            };
            res.json(stats);
        }, 500);
    }
    catch (error) {
        console.error('Error fetching daily stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getDailyStats = getDailyStats;
const getWeeklyStats = async (req, res) => {
    try {
        const { startDate } = req.params;
        console.log(`API: Fetching weekly stats starting from ${startDate}`);
        setTimeout(() => {
            const weekStart = new Date(startDate);
            const weekEnd = new Date(startDate);
            weekEnd.setDate(weekEnd.getDate() + 7);
            const weekEndISO = weekEnd.toISOString().split('T')[0];
            const weekActivities = data_1.mockActivities.filter(activity => {
                return activity.date >= startDate && activity.date < weekEndISO;
            });
            res.json(weekActivities);
        }, 600);
    }
    catch (error) {
        console.error('Error fetching weekly stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getWeeklyStats = getWeeklyStats;
//# sourceMappingURL=statsController.js.map