const notificationTemplate = require("./adaptiveCards/notification-default.json");
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { notificationApp } = require("./internal/initialize");

// HTTP trigger to send notification. You need to add authentication / authorization for this API. Refer https://aka.ms/teamsfx-notification for more details.
module.exports = async function (context, req) {

  if (req.body) {
    /**
    for (const target of await notificationApp.notification.installations()) {
      if (target.type === "Channel" && target.info.name === req.body.channel) {
        await target.sendAdaptiveCard(
          AdaptiveCards.declare(notificationTemplate).render({
            title: req.body.title,
            appName: "House Events Notification Bot",
            description: String(await target.getTeamDetails().info.name),
            notificationUrl: "https://aka.ms/teamsfx-notification-new",
          })
        );
      }
    }
    */

    const channel = await notificationApp.notification.findChannel(c => Promise.resolve(c.info.id === req.body.channel_id));

    await channel?.sendAdaptiveCard(
      AdaptiveCards.declare(notificationTemplate).render({
        title: req.body.title,
        appName: "House Events Notification Bot",
        description: "Hopefully this works...",
        notificationUrl: "https://aka.ms/teamsfx-notification-new",
      })
    );
    
  }

  /****** To distinguish different target types ******/
  /** "Channel" means this bot is installed to a Team (default to notify General channel)
  if (target.type === NotificationTargetType.Channel) {
    // Directly notify the Team (to the default General channel)
    await target.sendAdaptiveCard(...);
    // List all channels in the Team then notify each channel
    const channels = await target.channels();
    for (const channel of channels) {
      await channel.sendAdaptiveCard(...);
    }
    // List all members in the Team then notify each member
    const members = await target.members();
    for (const member of members) {
      await member.sendAdaptiveCard(...);
    }
  }
  **/

  /** "Group" means this bot is installed to a Group Chat
  if (target.type === NotificationTargetType.Group) {
    // Directly notify the Group Chat
    await target.sendAdaptiveCard(...);
    // List all members in the Group Chat then notify each member
    const members = await target.members();
    for (const member of members) {
      await member.sendAdaptiveCard(...);
    }
  }
  **/

  /** "Person" means this bot is installed as a Personal app
  if (target.type === NotificationTargetType.Person) {
    // Directly notify the individual person
    await target.sendAdaptiveCard(...);
  }
  **/

  /** You can also find someone and notify the individual person
  const member = await notificationApp.notification.findMember(
    async (m) => m.account.email === "someone@contoso.com"
  );
  await member?.sendAdaptiveCard(...);
  **/

  /** Or find multiple people and notify them
  const members = await notificationApp.notification.findAllMembers(
    async (m) => m.account.email?.startsWith("test")
  );
  for (const member of members) {
    await member.sendAdaptiveCard(...);
  }
  **/

  context.res = {};
};
