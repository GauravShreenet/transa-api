import TransScheme from './TransScheme.js';

export const insertTrans = obj => {
    return TransScheme(obj).save();
}

export const getUserTrans = (userId) => {
    return TransScheme.find({ userId });
}

export const deleteTrans = (userId, ids) => {
    return TransScheme.deleteMany({
        userId, 
        _id: {
            $in: ids
        }
    });
}