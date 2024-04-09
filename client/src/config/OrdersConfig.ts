export type IOrdersConfig = {
  id: number;
  description: string;
  postedTime: number;
  title: string;
  location: string;
  artStyles: { title: string; id: number }[];
  spentMoney: string;
  src: string;
  proposalsLength: number;
};

export const OrdersConfig: IOrdersConfig[] = [
  {
    id: 0,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 1,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 2,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 3,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 4,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 5,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 6,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    src: "https://placeholder.com/150",
    title: "Order 1",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 7,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 1",
    location: "Tbilisi",
    src: "https://placeholder.com/150",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
  {
    id: 8,
    description:
      "Lorem Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    postedTime: new Date().getMinutes(),
    title: "Order 8",
    src: "https://placeholder.com/150",
    location: "Tbilisi",
    artStyles: [
      { title: "Mural", id: 0 },
      { title: "Graffiti", id: 1 },
    ],
    spentMoney: "0.1K",
    proposalsLength: 5,
  },
];
