import { getUserById } from '../services/users.js';

export const getUserController = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserById(userId);
  if (!user) {
    return res.status(401).json({
      message: 'User is unauthorized',
    });
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    user,
  });
};
