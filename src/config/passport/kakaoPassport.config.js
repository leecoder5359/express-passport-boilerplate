import { Strategy } from "passport-kakao";
import { User } from "../../models/users.model.js";
import passport from "passport";
import { KAKAO_API_KEY } from "../env.config.js";

const kakaoStrategy = new Strategy({
    clientID: KAKAO_API_KEY,
    callbackURL: "/auth/kakao/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ kakaoId: profile.id });

        if (!user) {
            const newUser = new User();
            newUser.email = profile._json.kakao_account.email;
            newUser.kakaoId = profile.id;

            user = await newUser.save();
        }

        done(null, user);
    } catch (e) {
        done(e);
    }
});

passport.use("kakao", kakaoStrategy);