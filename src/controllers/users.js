import { getUserById } from '../services/users.js';

export const getUserController = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserById(userId);

  res.json({
    status: 200,
    message: 'Successfully found user!',
    user,
  });
};
