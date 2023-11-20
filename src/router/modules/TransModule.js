import TransScheme from './TransScheme.js';

export const insertTrans = obj => {
    return TransScheme(obj).save();
}

export const getUserTrans = (userId) => {
    return BudgetScheme.find({ userId });
}