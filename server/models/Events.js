import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      maxlength: [100, 'Event name cannot exceed 100 characters'],
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    attendanceLimit: {
      type: Number,
      required: [true, 'Attendance limit is required'],
      min: [1, 'Attendance limit must be at least 1'],
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      message: '{VALUE} is not supported',
      default: 'Upcoming',
    },
    hostId: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: [true, 'Host is required'],
      },
    ],
    speakerId: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
      },
    ],
    attendeesId: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model('Event', EventSchema);

export default Event;
