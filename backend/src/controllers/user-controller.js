import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../models/user-model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get users",
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get user",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      role_id: req.body.role_id,
      name: req.body.name,
      email: req.body.email,
      password_hash: req.body.password_hash,
    };

    const result = await addUser(user);

    res.status(201).json({
      message: "User created",
      user_id: Number(result.insertId),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create user",
    });
  }
};

const editUser = async (req, res) => {
  try {
    const user = {
      role_id: req.body.role_id,
      name: req.body.name,
      email: req.body.email,
      password_hash: req.body.password_hash,
      is_active: req.body.is_active,
    };

    const result = await updateUser(req.params.id, user);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "User updated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update user",
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete user",
    });
  }
};

export { getAllUsers, getSingleUser, createUser, editUser, removeUser };
