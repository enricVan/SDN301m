const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const createHttpError = require("http-errors");
const { user: User, role: Role } = db;

async function verifyToken(req, res, next) {
  try {
    const requestToken = req.headers["x-access-token"];
    if (!requestToken) {
      throw createHttpError.Unauthorized("Token is missing");
    }

    jwt.verify(requestToken, config.secret, async (error, decoded) => {
      if (error) {
        const message =
          error instanceof TokenExpiredError ? "Token expired" : error.message;
        throw createHttpError.Fobidden(message);
      }
      req.userId = decoded.id;
      next();
    });
    throw createHttpError.Unauthorized("");
  } catch (error) {
    next(error);
  }
}

async function isModerator(req, res, next) {
  try {
    const existUser = await User.findById(req.userId).exec();

    if (!existUser) {
      throw createHttpError.NotFound(`User not found`);
    }

    const roles = await Role.find({ _id: { $in: existUser.roles } }).exec();
    if (!roles) {
      throw createHttpError.Forbidden("Access denied");
    }

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "mod") {
        next();
        return;
      }
    }

    throw createHttpError.Forbidden("Role Moderator is required");
  } catch (error) {
    next(error);
  }
}

async function isAdministrator(req, res, next) {
  try {
    const existUser = await User.findById(req.userId).exec();

    if (!existUser) {
      throw createHttpError.NotFound(`User not found`);
    }

    const roles = await Role.find({ _id: { $in: existUser.roles } }).exec();
    if (!roles) {
      throw createHttpError.Forbidden("Access denied");
    }

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    throw createHttpError.Forbidden("Role Administrator is required");
  } catch (error) {
    next(error);
  }
}

const verifyJwt = { verifyToken, isModerator, isAdministrator };
module.exports = verifyJwt;
