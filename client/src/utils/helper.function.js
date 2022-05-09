export function priceWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const categoryArray = [
  {
    value: "car",
    name: "Car",
  },
  {
    value: "motorcycle",
    name: "Motorcycle",
  },
  {
    value: "house&apartment",
    name: "House & Apartment",
  },
  {
    value: "scooter",
    name: "Scooter",
  },
];
