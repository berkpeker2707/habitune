"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth2_1 = require("passport-google-oauth2");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../user/user.model"));
dotenv_1.default.config();
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
module.exports = function (passport) {
    var gCID = process.env.GOOGLE_CLIENT_ID;
    var gCS = process.env.GOOGLE_CLIENT_SECRET;
    var gCB = process.env.GOOGLE_CALLBACK;
    var jwtS = process.env.JWT_SECRET;
    if (gCID && gCS && gCB && jwtS) {
        passport.use(new passport_google_oauth2_1.Strategy({
            clientID: gCID,
            clientSecret: gCS,
            callbackURL: gCB,
            passReqToCallback: true,
        }, (request, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const alreadyRegisteredUser = yield user_model_1.default.find({
                    email: profile.email,
                });
                if (alreadyRegisteredUser.length > 0) {
                    //update displayName on login
                    if (profile.displayName !== (alreadyRegisteredUser === null || alreadyRegisteredUser === void 0 ? void 0 : alreadyRegisteredUser.firstName)) {
                        yield user_model_1.default.findOneAndUpdate({ email: profile.email }, {
                            firstName: profile.displayName,
                        });
                    }
                    //update familyName on login
                    if (profile.familyName !== (alreadyRegisteredUser === null || alreadyRegisteredUser === void 0 ? void 0 : alreadyRegisteredUser.lastName)) {
                        yield user_model_1.default.findOneAndUpdate({ email: profile.email }, {
                            lastname: profile.familyName,
                        });
                    }
                    //update picture on login
                    if (profile.picture !== (alreadyRegisteredUser === null || alreadyRegisteredUser === void 0 ? void 0 : alreadyRegisteredUser.image)) {
                        yield user_model_1.default.findOneAndUpdate({ email: profile.email }, {
                            image: profile.picture,
                        });
                    }
                    return done(null, alreadyRegisteredUser[0]);
                }
                else {
                    console.log("Creating new user...");
                    const newUser = new user_model_1.default({
                        method: "google",
                        id: profile.id,
                        firstName: profile.displayName,
                        lastName: profile.familyName,
                        email: profile.email,
                        image: profile.picture,
                    });
                    yield newUser.save();
                    return done(null, newUser);
                }
            }
            catch (error) {
                return done(error, false);
            }
        })));
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: jwtS,
        }, (jwtPayload, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = jwtPayload.user;
                done(null, user);
            }
            catch (error) {
                done(error, false);
            }
        })));
    }
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
