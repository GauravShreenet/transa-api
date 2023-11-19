import bcryptjs from 'bcryptjs';
const salt = 15;
//hash password

export const hashPassword = plainPass => {
    return bcryptjs.hashSync(plainPass, salt);
}
export const comparePass = (plainPass, hashPass) => {
    return bcryptjs.compareSync(plainPass, hashPass);
}