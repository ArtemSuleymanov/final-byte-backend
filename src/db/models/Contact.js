import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false
  },
);

export const contactSortFields = ["name", "phoneNumber", "email", "isFavourite", "contactType"];

export const Contact = model('Contact', contactSchema, 'my-contacts');