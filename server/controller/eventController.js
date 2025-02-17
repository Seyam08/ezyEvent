import _ from 'lodash';
import Client from '../models/Clients.js';
import Event from '../models/Events.js';

export async function addEvent(req, res) {
  let newEvent;

  const username = req.userInfo.username;
  //  making hostName into an Array, making sure that there will be no repeted value
  const hostName = new Set([
    username,
    ...(req.body.hostName ? req.body.hostName : ''),
  ]);
  //  making speakerName into an Array, making sure that there will be no repeted value
  const speakerName = new Set([
    ...(req.body.speakerName ? req.body.speakerName : ''),
  ]);

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
        { runValidators: true },
      ),
      Client.updateMany(
        { username: { $in: [...speakerName] } },
        {
          $push: { eventsSpeaking: event._id },
          $addToSet: { role: ['speaker'] },
        },
        { runValidators: true },
      ),
    ]);

    res.status(201).json({
      message: 'Event registration successfull!',
      eventId: event._id,
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
    const events = await Event.find()
      .select({
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      })
      .populate([
        {
          path: 'hostId',
          select: 'username avatar',
        },
        {
          path: 'speakerId',
          select: 'username avatar',
        },
        {
          path: 'attendeesId',
          select: 'username avatar',
        },
      ]);

    res.status(200).json({
      events: events,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Internal server error!',
        },
      },
    });
  }
}

export async function getEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id })
      .select({
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      })
      .populate([
        {
          path: 'hostId',
          select: 'username avatar name',
        },
        {
          path: 'speakerId',
          select: 'username avatar name',
        },
        {
          path: 'attendeesId',
          select: 'username avatar name',
        },
      ]);
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
          msg: "Event doesn't exist!",
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
          msg: 'Something wrong on getting event!',
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

    const attendanceExist = _.includes(
      _.map(attendanceList, (id) => id.toString()),
      id.toString(),
    );
    const attendeesExist = _.includes(
      _.map(attendeesList, (id) => id.toString()),
      userId.toString(),
    );

    if (attendanceExist && attendeesExist) {
      // Update both and remove the user's attended events
      await Promise.all([
        Event.updateOne({ _id: eventId }, { $pull: { attendeesId: userId } }),
        Client.updateOne(
          { _id: userId },
          { $pull: { eventsAttended: eventId } },
        ),
      ]);

      res.status(200).json({ message: 'Removed attendance successfully!' });
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
          msg: 'Something wrong on getting event!',
        },
      },
    });
  }
}

export async function editEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    const userId = req.userInfo._id;
    const eventId = event._id;
    const eventHosted = req.userInfo.eventsHosted;
    const hostIds = event.hostId;

    // checking host
    const eventHostExist = eventHosted.includes(id);
    const hostIdsExist = hostIds.includes(userId);
    const role = req.userInfo.role.includes('host');

    if (eventHostExist && hostIdsExist && role) {
      const { eventDate, attendanceLimit, status, ...rest } = req.body;

      if (Object.keys(rest).length === 0) {
        const result = await Event.findByIdAndUpdate(
          { _id: eventId },
          {
            $set: {
              eventDate,
              attendanceLimit,
              status,
            },
          },
          { new: true, runValidators: true },
        ).select({ __v: 0, createdAt: 0, updatedAt: 0 });
        res.status(201).json({ message: result });
      } else {
        res.status(400).json({
          errors: {
            common: {
              msg: 'Only event date, attendance limit and event status limit is editable!',
            },
          },
        });
      }
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: 'Unauthorized task!',
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Something wrong on getting event!',
        },
      },
    });
  }
}

export async function editSpeakerList(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    const userId = req.userInfo._id;
    const eventId = event._id;
    const eventHosted = req.userInfo.eventsHosted;
    const hostIds = event.hostId;

    // checking host
    const eventHostExist = eventHosted.includes(id);
    const hostIdsExist = hostIds.includes(userId);
    const role = req.userInfo.role.includes('host');

    if (eventHostExist && hostIdsExist && role) {
      const { speakerNames, ...rest } = req.body;

      if (Object.keys(rest).length === 0) {
        //  making speakerName into an Array, making sure that there will be no repeted value
        const gotNames = new Set([...speakerNames]);
        // finding usersId by username
        const speakerId = await Client.find({
          username: { $in: [...gotNames] },
        }).select({ _id: 1 });

        const result = await Promise.all([
          Event.findByIdAndUpdate(
            { _id: eventId },
            {
              $set: {
                speakerId,
              },
            },
            { new: true, runValidators: true, useFindAndModify: false },
          ).select({
            eventName: 1,
            eventDate: 1,
            attendanceLimit: 1,
            status: 1,
            speakerId: 1,
          }),
          Client.updateMany(
            { _id: { $in: speakerId } },
            {
              $set: { eventsSpeaking: eventId },
              $addToSet: { role: 'speaker' },
            },
            { new: true, runValidators: true, useFindAndModify: false },
          ).select({ name: 1 }),
        ]);
        res.status(200).json({ message: result[0] });
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: 'Only speaker names is editable!',
            },
          },
        });
      }
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: 'Unauthorized task!',
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Something wrong on getting event!',
        },
      },
    });
  }
}

export async function editAttendenceList(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    const userId = req.userInfo._id;
    const eventId = event._id;
    const eventHosted = req.userInfo.eventsHosted;
    const hostIds = event.hostId;

    // checking host
    const eventHostExist = eventHosted.includes(id);
    const hostIdsExist = hostIds.includes(userId);
    const role = req.userInfo.role.includes('host');

    if (eventHostExist && hostIdsExist && role) {
      const { attendeesNames, ...rest } = req.body;

      if (Object.keys(rest).length === 0) {
        //  making speakerName into an Array, making sure that there will be no repeted value
        const gotNames = new Set([...attendeesNames]);
        // finding usersId by username
        const attendeesId = await Client.find({
          username: { $in: [...gotNames] },
        }).select({ _id: 1 });

        const result = await Promise.all([
          Event.findByIdAndUpdate(
            { _id: eventId },
            {
              $set: {
                attendeesId,
              },
            },
            { new: true, runValidators: true },
          ).select({
            eventName: 1,
            eventDate: 1,
            attendanceLimit: 1,
            status: 1,
            attendeesId: 1,
          }),
          Client.updateMany(
            { _id: { $in: attendeesId } },
            {
              $set: { eventsSpeaking: eventId },
              $addToSet: { role: 'user' },
            },
            { new: true, runValidators: true },
          ).select({ name: 1 }),
        ]);

        res.status(200).json({ message: result[0] });
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: 'Only attendees is editable!',
            },
          },
        });
      }
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: 'Unauthorized task!',
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Something wrong on getting event!',
        },
      },
    });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    const userId = req.userInfo._id;
    const eventId = event._id;
    const eventHosted = req.userInfo.eventsHosted;
    const hostIds = event.hostId;

    // checking host
    const eventHostExist = eventHosted.includes(id);
    const hostIdsExist = hostIds.includes(userId);
    const role = req.userInfo.role.includes('host');

    if (eventHostExist && hostIdsExist && role) {
      // Update both and remove the user's hosted events
      await Promise.all([
        Event.updateOne({ _id: eventId }, { $pull: { hostId: userId } }),
        Client.updateOne({ _id: userId }, { $pull: { eventsHosted: eventId } }),
      ]);

      await Event.deleteOne({ _id: eventId });
      res.status(200).json({ message: 'Successfully deleted event!' });
    } else {
      res.status(401).json({ message: 'Unauthorized event!' });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Something went wrong!',
        },
      },
    });
  }
}
