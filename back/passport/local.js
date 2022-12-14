const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password'
    }, async (userId, password, done) => {
        try {
            const user = await User.findOne({
                where: { userId }
            });
            if (!user) {
                return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
                // 순서대로 서버에러, 성공/실패, 클라이언트 에러
            }
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user)
            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
}