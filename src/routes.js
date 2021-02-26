const configs = require('../config.json')
const controller = require('./controller')

module.exports = (app) => {

    // Authentication via webhook secret
    app.use((req, res, next) => {
        const auth = req.headers.authorization

        if (!auth || auth !== configs.webhooks_secret)
          res.status(403).json({ message: 'Incorrect webhook secret :/' })
        else
          next()
    })

    // Status webhooks handler
    app.route('/status-webhook')
        .get(controller.handleStatusWebhook)


    // Invalid routes
    app.use((req, res) => 
        res.status(404).json({ message: 'Invalid route!' })
    )

    return app
}