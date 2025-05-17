// import jwt from "jsonwebtoken";
// import path from 'node:path';
// import fs from 'node:fs/promises';
// import handlebars from 'handlebars';
// import { getEnvVar } from "../utils/getEnvVar.js";
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import User from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
const SALT_ROUNDS = 10;

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const findSession = (query) => SessionsCollection.findOne(query);

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const session = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const session = await findSession({ refreshToken, _id: sessionId });

  if (!session) {
    throw createHttpError(401, 'session not found');
  }

  if (session.refreshTokenValidUntil < Date.now()) {
    await SessionsCollection.deleteOne({ _id: session._id });
    throw createHttpError(401, 'Session token expired');
  }
  await SessionsCollection.deleteOne({ _id: session._id });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) =>
  SessionsCollection.deleteOne({ _id: sessionId });
