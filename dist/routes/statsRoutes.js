"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_1 = require("../controllers/statsController");
const router = (0, express_1.Router)();
router.get('/daily/:date', statsController_1.getDailyStats);
router.get('/weekly/:startDate', statsController_1.getWeeklyStats);
exports.default = router;
//# sourceMappingURL=statsRoutes.js.map