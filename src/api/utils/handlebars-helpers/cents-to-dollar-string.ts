export default function centsToDollarString(amountInCents: number): string {
  amountInCents = amountInCents ?? 0;
  const centsString = amountInCents.toString();
  const dollars = centsString.slice(0, -2) || "0";
  const remainingCents = centsString.slice(-2).padStart(2, "0");
  return `$${dollars.replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")}.${remainingCents}`;
}
