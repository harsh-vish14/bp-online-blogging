import { notification } from "antd";

/**
 * @description create new new notification popup on application
 * @param {String} title title of message
 * @param {String} message extra information in message
 * @param {String} type type of error success, error, info, warning
 */

export const createNotification = (title, message, type) => {
  notification[type]({
    message: title,
    description: message,
  });
};
