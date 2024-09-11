import Client from '../models/Clients.js';
import Event from '../models/Events.js';

export async function addEvent(req, res) {
  let newEvent;

  const username = req.userInfo.username;
  //  making hostName into an Array, making sure that there will be no repeted value
  const hostName = new Set([username, ...req.body.hostName]);
  //  making speakerName into an Array, making sure that there will be no repeted value
  const speakerName = new Set([...req.body.speakerName]);

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

    // maintaining relation of object parallelly

    await Promise.all([
      Client.updateMany(
        { username: { $in: [...hostName] } },
        { $push: { eventsHosted: event._id }, $addToSet: { role: ['host'] } },
      ),
      Client.updateMany(
        { username: { $in: [...speakerName] } },
        {
          $push: { eventsSpeaking: event._id },
          $addToSet: { role: ['speaker'] },
        },
      ),
    ]);

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

export async function getEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "Event doesn't exist!",
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Internal server error!',
        },
      },
    });
  }
}

export async function attendEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    const userId = req.userInfo._id;
    const eventId = event._id;
    const attendanceList = req.userInfo.eventsAttended;
    const attendeesList = event.attendeesId;

    const attendanceExist = attendanceList.includes(id);
    const attendeesExist = attendeesList.includes(userId);

    if (attendanceExist || attendeesExist) {
      res.status(409).json({
        errors: {
          common: {
            msg: 'Alredy attended!',
          },
        },
      });
    } else {
      // Update both - event and user's attended events
      await Promise.all([
        Event.updateOne({ _id: eventId }, { $push: { attendeesId: userId } }),
        Client.updateOne({ _id: userId }, { $push: { eventsAttended: id } }),
      ]);

      res.status(200).json({ message: 'Event attended successful!' });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Internal server error!',
        },
      },
    });
  }
}

export async function removeAttend(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    const userId = req.userInfo._id;
    const eventId = event._id;
    const attendanceList = req.userInfo.eventsAttended;
    const attendeesList = event.attendeesId;

    const attendanceExist = attendanceList.includes(id);
    const attendeesExist = attendeesList.includes(userId);

    if (attendanceExist && attendeesExist) {
      // Update both and remove the user's attended events
      await Promise.all([
        Event.updateOne({ _id: eventId }, { $pull: { attendeesId: userId } }),
        Client.updateOne({ _id: userId }, { $pull: { eventsAttended: id } }),
      ]);

      res.status(200).json({ message: 'Removed attendence successfully!' });
    } else {
      res.status(409).json({
        errors: {
          common: {
            msg: 'Something went wrong. Unable to remove!',
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Internal server error!',
        },
      },
    });
  }
}
