type IServicesHero = {
  id: number;
  title: string;
  description: string;
  src: string;
};

type IServicesInfo = {
  id: number;
  title: string;
  description: string;
};

type IServicesFeatures = {
  id: number;
  title: string;
  description: string;
};

export const ServicesHeroConfig: IServicesHero[] = [
  {
    id: 0,
    title: "Services",
    description:
      "Transform your space with unique and eye-catching art that reflects your personality, brand or theme.",
    src: "/assets/images/services/services-hero-1.png",
  },
  {
    id: 1,
    title: "",
    description:
      "Our service offers a personalized and vibrant solution to businesses, brands, events, and private properties. If you want to improve your interior/exterior, our platform can help you achieve maximum impact in a minimum time. You can browse artists' portfolios, view suggested prices, fill out a simple order form, and more. ArtOa.io is here to help you transform your vision into an attractive and distinctive environment.",
    src: "/assets/images/services/services-hero-2.png",
  },
];

export const ServicesInfoConfig: IServicesInfo[] = [
  {
    id: 0,
    title: "Artists Bidding System:",
    description:
      "Get competitive quotes from experienced wall artists based on your order requirements.",
  },
  {
    id: 1,
    title: "Portfolio Evaluation:",
    description:
      "‌Evaluate artists' detailed portfolios to ensure their style matches your vision and requirements.",
  },
  {
    id: 2,
    title: "Check Notification:",
    description:
      "‌With the Check Notification method, the artist already knows the exact time, location and environment where he has to work",
  },
];

export const ServicesFeaturesConfig: IServicesFeatures[] = [
  {
    id: 0,
    title: "Place Your Order:",
    description:
      "Fill out the simple order form, confirm the details and wait for the bids.",
  },
  {
    id: 1,
    title: "AI/AR Order Generator",
    description:
      "Our AI/AR technology will generate variations in 1 minute that will be placed on the wall in the future through the artist's unique talent. Use our technology to bring ideas to life.",
  },
  {
    id: 2,
    title: "Portfolio Evaluation:",
    description:
      "Evaluate artists' portfolios in-depth to make sure their style matches your expectations.",
  },
  {
    id: 4,
    title: "Check Form Submission And Artist Notification:",
    description:
      "Fill out the opt-in form with exact location, time and optional phone number.",
  },
  {
    id: 4,
    title: "Secure Payment:",
    description:
      "Make secure payments through our platform, knowing your transaction is secure.",
  },
];
