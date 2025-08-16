
export const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};
