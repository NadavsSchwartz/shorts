import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import User from '../models/userModel.js'

passport.use(
    new GitHubStrategy(
        {
            clientID: `${process.env.GITHUB_CLIENT_ID}`,
            clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
            callbackURL: '/auth/github/callback',
            scope: 'user:email',
        },
        (_, __, profile, cb) => {
            User.findOne({ githubId: profile.id }, async (err, doc) => {
                if (err) {
                    return cb(err, null)
                }

                if (!doc) {
                    const newUser = new User({
                        githubId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName
                            ? profile.displayName
                            : profile.username,
                        avatar: profile.photos[0].value,
                    })

                    await newUser.save()
                    cb(null, newUser)
                }
                cb(null, doc)
            })
        }
    )
)
