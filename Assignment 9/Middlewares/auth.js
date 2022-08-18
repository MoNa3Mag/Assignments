const jwt = require('jsonwebtoken')
const userModel = require('../DB/Model/User')

const Roles = {
  Admin: 'Admin',
  User: 'User'
}
const auth = accessRoles => {
  return async (req, res, next) => {

      const headerToken = req.headers['authorization']
      console.log(headerToken)
      if (
        !headerToken ||
        headerToken == null ||
        headerToken == undefined ||
        !headerToken.startsWith(`${process.env.Bearerkey} `)
      ) {
        res.json({ message: 'header token error' })
      } else {
        const token = headerToken.split(' ')[1]
        console.log(token)
        if (!token || token == null || token == undefined || token.length < 1) {
          res.json({ message: 'in-valid token ' })
        } else {
          const decoded = jwt.verify(token, process.env.emailTokenSecreat)
          console.log(decoded)
          const findUser = await userModel.findById(decoded._id).select('userName email role')
          if (!findUser) {
            res.json({ message: 'in-valid loggin user ' })
          } else {
            console.log(findUser)
            console.log(accessRoles)
            if (accessRoles.includes(findUser.role)) {
              req.user = findUser
              next()
            } else {
              res.status(401).json({ message: 'not auth user' })
            }
          }
        }
      }

  }
}

module.exports = {
  auth,
  Roles
}
