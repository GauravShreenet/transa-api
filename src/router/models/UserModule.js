import UserScheme from './UserScheme.js';


// insert new user
export const insertUser = userObj => {
    return UserScheme(userObj).save()
}

//get user by their id
export const getUserById = _id => {
    return UserScheme.findById(_id)
}

//get user by their id
export const getUserByEmail = email => {
    return UserScheme.findOne({ email })
}

// update user


// Delete user