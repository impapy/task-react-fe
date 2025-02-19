export const NAME: RegExp = /^[A-Za-z]{3,}$/;
export const PASSWORD_VALID: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;