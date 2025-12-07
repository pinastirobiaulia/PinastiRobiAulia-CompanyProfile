module.exports = function validatePassword(password) {
  const errors = [];

  if (!/[a-z]/.test(password))
    errors.push("Minimal 1 huruf kecil");

  if (!/[A-Z]/.test(password))
    errors.push("Minimal 1 huruf besar"); 

  if (!/[0-9]/.test(password))
    errors.push("Minimal 1 angka");

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password))
    errors.push("Minimal 1 simbol/karakter spesial");

  if (password.length < 12)
    errors.push("Panjang password minimal 12 karakter");

  return {
    valid: errors.length === 0,
    errors
  };
};