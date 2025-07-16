"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChildData = exports.createChild = exports.getChild = void 0;
const data_1 = require("../utils/data");
const getChild = async (req, res) => {
    try {
        console.log('API: Fetching child data');
        setTimeout(() => {
            res.json(data_1.mockChild);
        }, 300);
    }
    catch (error) {
        console.error('Error fetching child:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getChild = getChild;
const createChild = async (req, res) => {
    try {
        console.log('API: Creating child', req.body);
        const newChild = {
            ...req.body,
            id: Date.now().toString()
        };
        setTimeout(() => {
            (0, data_1.updateChild)(newChild);
            res.status(201).json(newChild);
        }, 600);
    }
    catch (error) {
        console.error('Error creating child:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createChild = createChild;
const updateChildData = async (req, res) => {
    try {
        console.log('API: Updating child data', req.body);
        setTimeout(() => {
            (0, data_1.updateChild)(req.body);
            res.json(data_1.mockChild);
        }, 500);
    }
    catch (error) {
        console.error('Error updating child:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateChildData = updateChildData;
//# sourceMappingURL=childController.js.map