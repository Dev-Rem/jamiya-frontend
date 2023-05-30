export const currArray = ["ngn", "usd", "gbp", "eur"];

export function calcTotals(objs) {
  const ngnTotal = objs
    .map((obj) => Object.values(obj)[3].ngn)
    .reduce((acc, curr) => acc + curr, 0);

  const usdTotal = objs
    .map((obj) => Object.values(obj)[3].usd)
    .reduce((acc, curr) => acc + curr, 0);

  const gbpTotal = objs
    .map((obj) => Object.values(obj)[3].gbp)
    .reduce((acc, curr) => acc + curr, 0);

  const eurTotal = objs
    .map((obj) => Object.values(obj)[3].eur)
    .reduce((acc, curr) => acc + curr, 0);
  return { ngnTotal, usdTotal, gbpTotal, eurTotal };
}
