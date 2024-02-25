const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const { User } = require("../models");

module.exports = (app) => {
    app.use(passport.initialize());

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { provider } = profile;
                    profile = profile["_json"];
                    const {
                        sub: id,
                        name: fullName,
                        picture: avatar,
                        email,
                    } = profile;
                    const user = await User.findByPk(id);
                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = await User.create({
                            id,
                            fullName,
                            avatar,
                            email,
                            provider,
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: process.env.FACEBOOK_CALLBACK_URL,
                profileFields: ["id", "displayName", "photos", "email"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { provider } = profile;
                    profile = profile["_json"];
                    const { picture, id, name: fullName, email } = profile;
                    const { url: avatar } = picture.data;
                    const user = await User.findByPk(id);
                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = await User.create({
                            id,
                            fullName,
                            avatar,
                            email,
                            provider,
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
