"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.get('/', activityController_1.getAllActivities);
router.get('/type/:type', activityController_1.getActivitiesByType);
router.get('/latest/:type', activityController_1.getLatestActivity);
router.post('/', activityController_1.createActivity);
router.put('/:id', activityController_1.updateActivityData);
router.delete('/:id', activityController_1.deleteActivityData);
exports.default = router;
//# sourceMappingURL=activityRoutes.js.map