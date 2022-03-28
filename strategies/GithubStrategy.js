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
            const userEmail = profile.emails[0].value
            User.findOne({ email: userEmail }, async (err, doc) => {
                if (err) {
                    return cb(err, null)
                }

                if (!doc) {
                    try {
                        const newUser = new User({
                            githubId: profile.id,
                            email: userEmail,
                            name: profile.displayName
                                ? profile.displayName
                                : profile.username,
                            avatar: profile.photos[0].value,
                        })

                        await newUser.save()
                        cb(null, newUser)
                    } catch (error) {
                        cb(error, null)
                    }
                } else {
                    doc.githubId = profile.id
                    await doc.save()
                    cb(null, doc)
                }
                cb(null, doc)
            })
        }
    )
)
