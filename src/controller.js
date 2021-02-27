const discordInterface = require('./discord_interface');

// Local volatile cache for components statuses to prevent sending of unnecessary webhooks
const componentStatuses = [
  {
    // Website
    id: 'cklmq2o88566759xfn0a5hpkhnf',
    status: 'OPERATIONAL',
  },
  {
    // Documentation
    id: 'cklmq2o9k566769xfn09sdlhtsw',
    status: 'OPERATIONAL',
  },
  {
    // Astro Ultimate
    id: 'cklmq2o6w566749xfn08hpsapm9',
    status: 'OPERATIONAL',
  },
  {
    // Astro
    id: 'cklmq2o5g566739xfn04sr6wlmc',
    status: 'OPERATIONAL',
  },
];

exports.handleStatusWebhook = (req, res) => {
  try {
    const data = req.body;

    const { incident, component } = data;

    if (component) {
      const cIndex = componentStatuses.findIndex(c => c.id === component.id);
      // Checks if the component status has actually changed
      if (componentStatuses[cIndex].status !== component.status) {
        // Update the component status in the local cache for the next check
        componentStatuses[cIndex].status = component.status;
        // Sends the Discord webhook
        discordInterface.newComponentStatusWebhook(component.name, component.status);
      }
    } else if (incident) {
      // TODO
    }

    res.status(200).json({ message: 'Status webhook received and handled successfully' });
  } catch (err) {
    console.log(`[STATUS WEBHOOKS] An error occurred while processing a status webhook:\n${err}`);
  }
};
