const discordInterface = require('./discord_interface');

exports.handleStatusWebhook = (req, res) => {
  const data = req.body;

  // testing
  console.log(JSON.stringify(data));

  const { incident, component } = data;
  let incidentUpdates = incident.incident_updates;
  if (!incidentUpdates || incidentUpdates.length < 1) incidentUpdates = null;

  const title = incident.name;
  const url = `https://astro-bot.instatus.com/incident/${incidentUpdates ? incidentUpdates[-1].incident_id : incident.id}`;
  const status = incidentUpdates ? incidentUpdates[-1].status : incident.status;
  const description = incidentUpdates ? incidentUpdates[-1].body : incident.impact;

  const affected = [component];

  discordInterface.newWebhook(title, url, status, description, affected, Date.now());

  res.status(200).json({ message: 'Status webhook received and handled successfully' });
};
