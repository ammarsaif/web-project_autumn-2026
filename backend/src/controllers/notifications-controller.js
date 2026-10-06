import {
  getNotifications,
  getNotificationById,
  addNotification,
  updateNotification,
  deleteNotification,
} from "../models/notifications-model.js";

// GET all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications();

    res.json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get notifications",
    });
  }
};

// GET one notification
const getSingleNotification = async (req, res) => {
  try {
    const notification = await getNotificationById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.json(notification);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get notification",
    });
  }
};

// CREATE notification
const createNotification = async (req, res) => {
  try {
    const notification = req.body;

    const result = await addNotification(notification);

    res.status(201).json({
      message: "Notification created successfully",
      notification_id: Number(result.insertId),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create notification",
    });
  }
};

// UPDATE notification
const editNotification = async (req, res) => {
  try {
    const notification_id = req.params.id;
    const notification = req.body;

    const result = await updateNotification(notification_id, notification);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.json({
      message: "Notification updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update notification",
    });
  }
};

// DELETE notification
const removeNotification = async (req, res) => {
  try {
    const notification_id = req.params.id;

    const result = await deleteNotification(notification_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete notification",
    });
  }
};

export {
  getAllNotifications,
  getSingleNotification,
  createNotification,
  editNotification,
  removeNotification,
};
