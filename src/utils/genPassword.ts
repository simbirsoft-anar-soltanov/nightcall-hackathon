const { passwordLength, chars, symbols } = {
  passwordLength: 12,
  chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  symbols: '@$!%*?&_-',
};

export const genPassword = (): string => {
  let password = '';

  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);

    password +=
      chars.substring(randomNumber, randomNumber + 1) +
      symbols.substring(randomNumber, randomNumber + 1);
  }

  return password;
};
