import {
  getAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../models/announcements-model.js";

// GET all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await getAnnouncements();

    res.json(announcements);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get announcements",
    });
  }
};

// GET one announcement
const getSingleAnnouncement = async (req, res) => {
  try {
    const announcement = await getAnnouncementById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        error: "Announcement not found",
      });
    }

    res.json(announcement);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get announcement",
    });
  }
};

// CREATE announcement
const createAnnouncement = async (req, res) => {
  try {
    const announcement = req.body;

    const result = await addAnnouncement(announcement);

    res.status(201).json({
      message: "Announcement created successfully",
      announcement_id: Number(result.insertId),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create announcement",
    });
  }
};

// UPDATE announcement
const editAnnouncement = async (req, res) => {
  try {
    const announcement_id = req.params.id;
    const announcement = req.body;

    const result = await updateAnnouncement(announcement_id, announcement);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Announcement not found",
      });
    }

    res.json({
      message: "Announcement updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update announcement",
    });
  }
};

// DELETE announcement
const removeAnnouncement = async (req, res) => {
  try {
    const announcement_id = req.params.id;

    const result = await deleteAnnouncement(announcement_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Announcement not found",
      });
    }

    res.json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete announcement",
    });
  }
};

export {
  getAllAnnouncements,
  getSingleAnnouncement,
  createAnnouncement,
  editAnnouncement,
  removeAnnouncement,
};
