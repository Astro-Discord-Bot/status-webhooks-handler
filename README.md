# Astro Status Webhooks Handler
This is a simple express server which listens for webhooks sent from [Astro's status page](https://astro-bot.space/status) and forwards them to Discord via Discord webhooks.

# Setup
If you want to receive Astro status notifications directly in your Discord server then follow the next steps:

## Setting up the Discord webhook
- Go in the channel where you want to receive status updates
- Open its settings
- Head over the `Integrations` tab
- Click on `Webhooks`
- Click `New webhook`
- Copy the `Webhook URL` with the apposite button  

## Using this repository
The Webhook URL copied from the last step should look something along that line:  
```
https://discord.com/api/webhooks/815309179048820776/dOWoDfsHwTFVVGNvwEp8wwbK0X0XTynxJnmzBrlXDWhd1GYWrcWye2WsRemGM669uCfB
```
- Now clone this repository either via git, or by clicking the green `Code` button on this page & `Download ZIP` & unzip it.

- In the folder you just downloaded rename the `examples.config.json` file to `config.json`.  

- Open that file and modify the `discord_webhook_id` value (which by default is `454487...`) with the ID of the Discord webhook that you created before (which in the example URL shown above is `815309179048820776`)

- Now modify the `discord_webhook_token` value by inserting the webhook token of the Discord URL that you created (which in the example above is `dOWoDfsHwTFVVGNvwEp8wwbK0X0XTynxJnmzBrlXDWhd1GYWrcWye2WsRemGM669uCfB`)  

## Hosting this application
You will need some sort of server to host this nodejs application.  
If you have a VPS then I suppose you know how to get this thing up.  
If you don't instead, I'm gonna guide you trough creating one with Heroku:
- Head over to [Heroku](https://www.heroku.com) and sign in/up
- Click `New` in the top-right and then `Create new App`
- Insert a name and choose a region, then click `Create App`
- 