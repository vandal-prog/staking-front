export const shortenAddress = (address) => `${address.slice(0, 5)}...`;

export const shortenBalance = (balance) => {
  const newBal = balance.toString();
  const Bal = newBal.slice(0, 7);
  return Number(Bal);
};
