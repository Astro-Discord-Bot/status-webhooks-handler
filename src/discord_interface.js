const { MessageEmbed, WebhookClient } = require('discord.js');
const configs = require('../config.json');

const webhookClient = new WebhookClient(configs.discord_webhook_id, configs.discord_webhook_token);
const webhookOptions = {
  username: 'Astro Status Updates',
  avatarURL: 'https://pbs.twimg.com/profile_images/1304415884237254656/GI6myFCE_400x400.jpg',
};

// Those are from Astro Support server (https://astro-bot.space/suppot)
const emojis = {
  online: '<:online:738146560533200927>',
  idle: '<:away:738146560596115499>',
  offline: '<:red_dot:738146560814350477>',
};

const colors = {
  online: '#43b581',
  idle: '#faa619',
  offline: '#f14846',
};

// Documentation for instatus webhooks can be found at https://instatus.com/help/webhooks
function getComponentStatusUtils(status) {
  let emoji;
  let color;

  status = status.toLowerCase();
  const statusName = status.charAt(0).toUpperCase() + status.slice(1);

  switch (status.toLowerCase()) {
    case 'majoroutage': {
      emoji = emojis.offline;
      color = colors.offline;
      break;
    }
    case 'minoroutage': {
      emoji = emojis.offline;
      color = colors.offline;
      break;
    }
    case 'undermaintenance': {
      emoji = emojis.offline;
      color = colors.offline;
      break;
    }
    case 'partialoutage': {
      emoji = emojis.idle;
      color = colors.idle;
      break;
    }
    case 'degradedperformance': {
      emoji = emojis.idle;
      color = colors.idle;
      break;
    }
    default: {
      emoji = emojis.online;
      color = colors.online;
    }
  }

  return {
    statusName,
    emoji,
    color,
  };
}
// eslint-disable-next-line no-unused-vars
function getIncidentStatusUtils(status) {
  let emoji;
  let color;
  const statusName = status.charAt(0).toUpperCase() + status.slice(1);

  switch (status.toLowerCase()) {
    case 'investigating': {
      emoji = emojis.offline;
      color = colors.offline;
      break;
    }
    case 'identified': {
      emoji = emojis.offline;
      color = colors.offline;
      break;
    }
    case 'monitoring': {
      emoji = emojis.idle;
      color = colors.idle;
      break;
    }
    default: {
      emoji = emojis.online;
      color = colors.online;
    }
  }

  return {
    statusName,
    emoji,
    color,
  };
}

module.exports = {
  newComponentStatusWebhook: (name, status) => {
    const componentStatus = getComponentStatusUtils(status);

    const embed = new MessageEmbed()
      .setColor(componentStatus.color)
      .addFields([
        { name: 'Service affected', value: `*${name}*` },
        { name: 'Status', value: `${componentStatus.emoji} [${componentStatus.statusName}](https://astro-bot.space/status)` },
      ])
      .setFooter('Powered by instatus.com')
      .setTimestamp(Date.now());

    webhookOptions.embeds = [embed];
    webhookClient.send(null, webhookOptions)
      .catch(err => console.log(`[STATUS WEBHOOKS] An error occurred while sending a component status webhook:\n${err}`));
  },
};
