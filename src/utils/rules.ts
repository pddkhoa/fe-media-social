const RULES = {
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^_&+=])(?=\S+$).{8,}$/,
  username: /^[a-zA-Z0-9]{4,}$/,
  phone: /^[0-9]{10}$/,
  email: /^[a-z0-9_.]{5,48}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,5}$/,
  noBlank: /\S+/,
};

export { RULES };
