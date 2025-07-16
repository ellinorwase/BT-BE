"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const childController_1 = require("../controllers/childController");
const router = (0, express_1.Router)();
router.get('/', childController_1.getChild);
router.post('/', childController_1.createChild);
router.put('/', childController_1.updateChildData);
exports.default = router;
//# sourceMappingURL=childRoutes.js.map