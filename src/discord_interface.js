const { MessageEmbed, WebhookClient } = require('discord.js');
const configs = require('../config.json');

const webhookClient = new WebhookClient(configs.discord_webhook_id, configs.discord_webhook_path);
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

// Documentation for instatus webhooks can be found on https://instatus.com/help/webhooks
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

function getComponentStatusUtils(status) {
  let emoji;
  let color;
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

module.exports = {
  newWebhook: (title, url, status, description, affected, timestamp) => {
    const statusUtils = getIncidentStatusUtils(status);

    const embed = new MessageEmbed()
      .setAuthor('Astro Status', 'https://astro-bot.space/AstroPFP.png', 'https://astro-bot.space/status')
      .setTitle(title)
      .setURL(url)
      .addFields([
        { name: 'Status', value: `${statusUtils.emoji} ${statusUtils.statusName}` },
        { name: 'Description', value: description },
      ])
      .setTimestamp(timestamp);

    if (affected.length > 0) {
      let affectedServices = '';

      affected.forEach(component => {
        const componentStatusUtils = getComponentStatusUtils(component.status);
        affectedServices += `${componentStatusUtils.emoji} ${component.name} - ${componentStatusUtils.statusName}`;
      });

      embed.addField('Affected services', affectedServices);
    }

    webhookOptions.embeds = [embed];
    webhookClient.send(null, webhookOptions);
  },
};
