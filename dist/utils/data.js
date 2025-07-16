"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortActivities = exports.deleteActivity = exports.updateActivity = exports.addActivity = exports.updateChild = exports.mockActivities = exports.mockChild = void 0;
const today = new Date();
const todayISO = today.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayISO = yesterday.toISOString().split('T')[0];
exports.mockChild = {
    id: '1',
    name: 'Ella',
    birthDate: '2024-04-10',
    age: '3 månader, 2 dagar'
};
exports.mockActivities = [
    {
        id: '1',
        type: 'feeding',
        date: todayISO,
        details: { selectedTime: '12:45', amount: 120, notes: 'flaska' }
    },
    {
        id: '2',
        type: 'breastfeeding',
        date: todayISO,
        details: { selectedTime: '10:20', breast: 'left' }
    },
    {
        id: '3',
        type: 'diaper',
        date: todayISO,
        details: { selectedTime: '14:10', diaperType: ['poop', 'pee'] }
    },
    {
        id: '4',
        type: 'sleep',
        date: todayISO,
        details: { startTime: '13:00', endTime: '14:00' }
    },
    {
        id: '40',
        type: 'sleep',
        date: todayISO,
        details: { startTime: '18:00', endTime: '20:00' }
    },
    {
        id: '5',
        type: 'wakeup',
        date: todayISO,
        details: { selectedTime: '06:45' }
    },
    {
        id: '6',
        type: 'bedtime',
        date: yesterdayISO,
        details: { selectedTime: '20:15' }
    },
    {
        id: '7',
        type: 'feeding',
        date: todayISO,
        details: { selectedTime: '08:30', amount: 100, notes: 'flaska' }
    },
    {
        id: '8',
        type: 'diaper',
        date: todayISO,
        details: { selectedTime: '09:15', diaperType: ['pee'] }
    },
    {
        id: '9',
        type: 'breastfeeding',
        date: todayISO,
        details: { selectedTime: '15:30', breast: 'right' }
    },
    {
        id: '10',
        type: 'diaper',
        date: todayISO,
        details: { selectedTime: '16:45', diaperType: ['poop'] }
    },
    {
        id: 'y1',
        type: 'wakeup',
        date: yesterdayISO,
        details: { selectedTime: '07:00' }
    },
    {
        id: 'y2',
        type: 'feeding',
        date: yesterdayISO,
        details: { selectedTime: '07:30', amount: 150 }
    },
    {
        id: 'y3',
        type: 'diaper',
        date: yesterdayISO,
        details: { selectedTime: '08:00', diaperType: ['pee'] }
    },
    {
        id: 'y4',
        type: 'sleep',
        date: yesterdayISO,
        details: { startTime: '09:00', endTime: '11:00' }
    },
    {
        id: 'y5',
        type: 'breastfeeding',
        date: yesterdayISO,
        details: { selectedTime: '11:30', breast: 'left' }
    },
    {
        id: 'y6',
        type: 'medicine',
        date: yesterdayISO,
        details: { selectedTime: '12:00', medicine: 'D-vitamin', dosage: '5 droppar' }
    },
    {
        id: 'y7',
        type: 'feeding',
        date: yesterdayISO,
        details: { selectedTime: '14:30', amount: 180 }
    },
    {
        id: 'y8',
        type: 'sleep',
        date: yesterdayISO,
        details: { startTime: '15:00', endTime: '16:30' }
    },
    {
        id: 'y9',
        type: 'bedtime',
        date: yesterdayISO,
        details: { selectedTime: '19:00' }
    }
];
const updateChild = (child) => {
    exports.mockChild = { ...child };
};
exports.updateChild = updateChild;
const addActivity = (activity) => {
    exports.mockActivities = [activity, ...exports.mockActivities];
};
exports.addActivity = addActivity;
const updateActivity = (id, updates) => {
    const index = exports.mockActivities.findIndex(a => a.id === id);
    if (index !== -1) {
        exports.mockActivities[index] = { ...exports.mockActivities[index], ...updates };
    }
};
exports.updateActivity = updateActivity;
const deleteActivity = (id) => {
    exports.mockActivities = exports.mockActivities.filter(a => a.id !== id);
};
exports.deleteActivity = deleteActivity;
const sortActivities = (activities) => {
    return activities.sort((a, b) => {
        const dateCompare = (b.date || '').localeCompare(a.date || '');
        if (dateCompare !== 0)
            return dateCompare;
        const aTime = a.details?.selectedTime || a.details?.startTime || '00:00';
        const bTime = b.details?.selectedTime || b.details?.startTime || '00:00';
        return bTime.localeCompare(aTime);
    });
};
exports.sortActivities = sortActivities;
//# sourceMappingURL=data.js.map