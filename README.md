# capec-slack
A small slack webhook integration that will send a random attack pattern from [CAPEC](https://capec.mitre.org/index.html) to Slack.
The idea is to raise security awareness - for example, use it to send a new attack vector once a week and than discuss it.

## How to use it?
* clone & run `yarn install`
* Add [web hook](https://api.slack.com/incoming-webhooks) integration to your slack account.
* Set the environment variable `SLACK_WEBHOOK_URL` with the webhook url
* Run using `node index.js`

Optional: Deploy to Azure Function/AWS lambda with [time trigger](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer), so it will be triggered once in a week.