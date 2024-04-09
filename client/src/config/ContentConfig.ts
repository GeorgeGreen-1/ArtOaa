export type IContentConfig = {
  id: number;
  title: string;
  description: string;
  src: string;
};

export const ContentConfig: IContentConfig[] = [
  {
    id: 0,
    title: "About",
    description:
      "Welcome to ArtOa.io, where creativity meets connection! We're more than just a platform; we're a thriving community that bridges the gap between passionate Wall artists and art enthusiasts. Our mission is to empower artists to showcase their talent legally while providing customers with a unique and personalized way to bring art into their lives.",
    src: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    title: "Our",
    description:
      "At ArtOa.io, we believe that a wall is a canvas waiting to tell a story. The journey begins in 2023 where two innovators create a revolutionin the global market. Our goal is to provide artists with a legal and permanent monetization path, and consumers a space where they can get the results they want with high quality, time and cost savings.",
    src: "https://via.placeholder.com/151",
  },
];
