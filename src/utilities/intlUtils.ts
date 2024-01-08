const intlNumber = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return intlNumber.format(price);
}
