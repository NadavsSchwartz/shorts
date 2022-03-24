import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/userModel.js'

dotenv.config()

passport.use(
    new GoogleStrategy(
        {
            clientID: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
            callbackURL: '/auth/google/callback',
        },
        (_, __, email, profile, cb) => {
            const userEmail = profile.emails[0].value

            const Avatar = profile.photos[0].value
            User.findOne({ email: userEmail }, async (err, doc) => {
                if (err) {
                    return cb(err, null)
                }
                if (!doc) {
                    const newUser = new User({
                        googleId: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        name: profile.displayName,
                        email: userEmail,
                        avatar: Avatar,
                    })

                    await newUser.save()
                    cb(null, newUser)
                } else {
                    doc.googleId = profile.id
                    await doc.save()
                    cb(null, doc)
                }

                cb(null, doc)
            })
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => done(null, doc))
})
