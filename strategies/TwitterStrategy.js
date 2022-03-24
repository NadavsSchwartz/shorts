import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import User from '../models/userModel.js'

passport.use(
    new TwitterStrategy(
        {
            consumerKey: `${process.env.TWITTER_API_KEY}`,
            consumerSecret: `${process.env.TWITTER_API_KEY_SECRET}`,
            callbackURL: '/auth/twitter/callback',
            includeEmail: true,
        },
        (_, __, profile, cb) => {
            const userEmail = profile.emails[0].value
            User.findOne({ email: userEmail }, async (err, doc) => {
                if (err) {
                    return cb(err, null)
                }

                if (!doc) {
                    const newUser = new User({
                        twitterId: profile.id,
                        email: userEmail,
                        name: profile.displayName,
                        avatar: profile.photos[0].value,
                    })

                    await newUser.save()
                    cb(null, newUser)
                } else {
                    doc.twitterId = profile.id
                    await doc.save()
                    cb(null, doc)
                }
                cb(null, doc)
            })
        }
    )
)
