import Client from '../models/Clients.js';
import Event from '../models/Events.js';

export async function addEvent(req, res) {
  let newEvent;

  const username = req.userInfo.username;
  //  making hostName into an Array, making sure that there will be no repeted value
  const hostName = new Set([username, ...req.body.hostName]);
  //  making speakerName into an Array, making sure that there will be no repeted value
  const speakerName = [...new Set(req.body.speakerName)];

  // save event
  try {
    // finding usersId by username
    const hostId = await Client.find({
      username: { $in: [...hostName] },
    }).select({ _id: 1 });

    //  finding speakerId by speakerName
    const speakerId = await Client.find({
      username: { $in: [...speakerName] },
    }).select({ _id: 1 });

    newEvent = new Event({
      ...req.body,
      hostId: hostId,
      speakerId: speakerId,
    });

    const event = await newEvent.save();
    await Client.updateMany(
      {
        username: { $in: [...hostName] },
      },
      {
        $push: {
          eventsHosted: event._id,
        },
      },
    );

    await Client.updateMany(
      {
        username: { $in: [...hostName] },
      },
      {
        $push: {
          eventsSpeaking: event._id,
        },
      },
    );

    res.status(201).json({
      message: 'Event registration successfull!',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Event registration failed!',
        },
      },
    });
  }
}

export async function getAllEvent(req, res) {
  try {
    const events = await Event.find();

    res.status(200).json({
      events: events,
    });
  } catch (err) {
    res.status(500).send('Server error!');
  }
}
