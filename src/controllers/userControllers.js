export const showLogin = (req, res) => {
  res.status(200).json({ msg: "get login page" });
};

export const showRegister = (req, res) => {
  res.status(200).json({ msg: "get register page" });
};
