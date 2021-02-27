const controller = require('./controller');

module.exports = (app) => {
  /* Instatus doesn't yet use any auth method ¯\_(ツ)_/¯
  Authentication via webhook secret
  app.use((req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || auth !== configs.webhooks_secret)
      res.status(403).json({ message: 'Incorrect webhook secret :/' });
    else
      next();
  });
  */

  // Status webhooks handler
  app.route('/')
    .post(controller.handleStatusWebhook);

  // Invalid routes
  app.use((req, res) => res.status(404).json({ message: 'Invalid route!' }));

  return app;
};
