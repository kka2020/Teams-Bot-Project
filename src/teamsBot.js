const { TeamsActivityHandler, TeamsInfo } = require("botbuilder");

// An empty teams activity handler.
// You can add your customization code here to extend your bot logic if needed.
class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      // ADITYA: Add code to run each time the bot is added to a team
      await next()
    });
  }
}

module.exports.TeamsBot = TeamsBot;
