"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestActivity = exports.deleteActivityData = exports.updateActivityData = exports.createActivity = exports.getActivitiesByType = exports.getAllActivities = void 0;
const data_1 = require("../utils/data");
const getAllActivities = async (req, res) => {
    try {
        console.log('API: Fetching all activities');
        setTimeout(() => {
            const sorted = (0, data_1.sortActivities)([...data_1.mockActivities]);
            res.json(sorted);
        }, 400);
    }
    catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllActivities = getAllActivities;
const getActivitiesByType = async (req, res) => {
    try {
        const { type } = req.params;
        console.log(`API: Fetching activities of type: ${type}`);
        setTimeout(() => {
            const filtered = data_1.mockActivities.filter(activity => activity.type === type);
            const sorted = (0, data_1.sortActivities)(filtered);
            res.json(sorted);
        }, 200);
    }
    catch (error) {
        console.error('Error fetching activities by type:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getActivitiesByType = getActivitiesByType;
const createActivity = async (req, res) => {
    try {
        console.log('==== API: Creating activity ====');
        console.log('Received activity type:', req.body.type);
        console.log('Received activity date:', req.body.date);
        console.log('Received activity details:', req.body.details);
        console.log('Full received activity:', req.body);
        const newActivity = {
            ...req.body,
            id: Date.now().toString(),
        };
        console.log('==== API: Created activity object ====');
        console.log('Created activity ID:', newActivity.id);
        console.log('Created activity date:', newActivity.date);
        console.log('Created activity type:', newActivity.type);
        console.log('Full created activity:', newActivity);
        setTimeout(() => {
            (0, data_1.addActivity)(newActivity);
            console.log('Activity added to mock storage');
            res.status(201).json(newActivity);
        }, 300);
    }
    catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createActivity = createActivity;
const updateActivityData = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`API: Updating activity ${id}`, req.body);
        setTimeout(() => {
            const activityIndex = data_1.mockActivities.findIndex(a => a.id === id);
            if (activityIndex === -1) {
                return res.status(404).json({ error: 'Activity not found' });
            }
            (0, data_1.updateActivity)(id, req.body);
            res.json(data_1.mockActivities[activityIndex]);
        }, 400);
    }
    catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateActivityData = updateActivityData;
const deleteActivityData = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`API: Deleting activity ${id}`);
        setTimeout(() => {
            const activityExists = data_1.mockActivities.some(a => a.id === id);
            if (!activityExists) {
                return res.status(404).json({ error: 'Activity not found' });
            }
            (0, data_1.deleteActivity)(id);
            res.status(204).send();
        }, 300);
    }
    catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteActivityData = deleteActivityData;
const getLatestActivity = async (req, res) => {
    try {
        const { type } = req.params;
        console.log(`API: Fetching latest activity of type: ${type}`);
        setTimeout(() => {
            const filtered = data_1.mockActivities.filter(activity => activity.type === type);
            const sorted = (0, data_1.sortActivities)(filtered);
            res.json(sorted[0] || null);
        }, 150);
    }
    catch (error) {
        console.error('Error fetching latest activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getLatestActivity = getLatestActivity;
//# sourceMappingURL=activityController.js.map