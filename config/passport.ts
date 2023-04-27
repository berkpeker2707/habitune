import { PassportStatic } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import dotenv from "dotenv";
import User from "../user/user.model";

dotenv.config();

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

export default (passport: PassportStatic) => {
  var gCID = process.env.GOOGLE_CLIENT_ID;
  var gCS = process.env.GOOGLE_CLIENT_SECRET;
  var gCB = process.env.GOOGLE_CALLBACK;
  var jwtS = process.env.JWT_SECRET;

  if (gCID && gCS && gCB && jwtS) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: gCID,
          clientSecret: gCS,
          callbackURL: gCB,
          passReqToCallback: true,
        },
        async (
          request: any,
          accessToken: any,
          refreshToken: any,
          profile: {
            id: any;
            displayName: string;
            familyName: string;
            email: string;
            picture: string;
          },
          done: any
        ) => {
          try {
            const alreadyRegisteredUser = await User.find({
              email: profile.email,
            });

            if (alreadyRegisteredUser.length > 0) {
              return done(null, alreadyRegisteredUser);
            } else {
              console.log("Creating new user...");

              const newUser = new User({
                method: "google",
                id: profile.id,
                firstName: profile.displayName,
                lastName: profile.familyName,
                email: profile.email,
                image: profile.picture,
              });

              await newUser.save();
              return done(null, newUser);
            }
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromHeader("authorization"),
          secretOrKey: jwtS,
        },
        async (jwtPayload: any, done: any) => {
          try {
            const user = jwtPayload.user;
            done(null, user);
          } catch (error) {
            done(error, false);
          }
        }
      )
    );
  }

  passport.serializeUser((user: any, done: any) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done: any) => {
    done(null, user);
  });
};
