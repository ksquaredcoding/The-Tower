import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const TicketSchema = new Schema({
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' }
}, SCHEMA_OPTIONS)

TicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TicketSchema.virtual('towerEvent', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'towerEvent'
})