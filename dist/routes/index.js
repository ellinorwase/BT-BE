"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const childRoutes_1 = __importDefault(require("./childRoutes"));
const activityRoutes_1 = __importDefault(require("./activityRoutes"));
const statsRoutes_1 = __importDefault(require("./statsRoutes"));
const router = (0, express_1.Router)();
router.use('/api/child', childRoutes_1.default);
router.use('/api/activities', activityRoutes_1.default);
router.use('/api/stats', statsRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map