let onlineUser = [];

export const addUser = (userId: string, socketId: string) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

export const removeUser = (socketId: string) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId: string) => {
  return onlineUser.find((user) => user.userId === userId);
};
