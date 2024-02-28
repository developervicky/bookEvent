"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDb } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";
import Category from "../database/models/category.model";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDb();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDb();
    const eventInfo = await populateEvent(Event.findById(eventId));
    if (!eventInfo) throw new Error("Event not found");
    return JSON.parse(JSON.stringify(eventInfo));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDb();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDb();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized User");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      {
        ...event,
        category: event.categoryId,
      },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

export const getAllEvent = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDb();
    const conditions = {};
    const eventQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

    const events = await populateEvent(eventQuery);
    const eventCounts = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPage: Math.ceil(eventCounts / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDb();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDb();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventQuery =  Event.find(conditions)
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventQuery);
    const eventCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventCount / limit),
    };

  } catch (error) {
    handleError(error);
  }
}
