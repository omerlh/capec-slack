var cheerio = require('cheerio');
var request = require('request');
var SlackWebhook = require('slack-webhook');

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * source: https://stackoverflow.com/a/1527820/4792970
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var slack = new SlackWebhook(process.env['SLACK_WEBHOOK_URL'])
var capecId = getRandomInt(1,508);
console.log(`https://capec.mitre.org/data/definitions/${capecId}.html`);

request(`https://capec.mitre.org/data/definitions/${capecId}.html`, function (error, response, body) {
    if (response.statusCode >= 300) {
        console.log(`error: ${response.statusCode}`);
    }    
    
    var parsed = cheerio.load(body);
    var description = parsed('div#Detail').children('p').first().text();
    var headline = parsed('h2').first().text();

    slack.send({
        text: `${headline} https://capec.mitre.org/data/definitions/${capecId}.html`,
        attachments: [
            {
                "text": `${description}`
            }
        ],
        username: 'CAPEC',
        icon_emoji: ':scream_cat:',
      }).then(function(){
          console.log("done");
      }).catch(function(err){
          console.log(err);
      })

});

