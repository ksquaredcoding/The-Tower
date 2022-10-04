import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const TowerEventSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxlength: 30 },
  description: { type: String, required: true, maxlength: 500 },
  coverImg: { type: String, required: true, maxlength: 500 },
  location: { type: String, required: true, maxlength: 50 },
  capacity: { type: Number, required: true, min: 1, max: 1000 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
}, SCHEMA_OPTIONS)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})