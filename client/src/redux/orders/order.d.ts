import { artStyle } from "../auth/auth";

export type IBid = {
  user: string;
  coverLetter: string;
  offer: number;
  _id: string;
  updatedAt: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
    aboutMe?: string;
    artStyle?: artStyle[];
  };
};

export type IOrder = {
  _id: string;
  artDimension: string;
  artLocation: string;
  artPosition: string;
  artStyle: [
    {
      name: string;
    },
  ];
  bids: IBid[];
  businessType: string;
  createdAt: string;
  updatedAt: string;
  wallImage: {
    path: string;
  };
  description: string;
  title: string;
  user: {
    _id: string;
    email: string;
  };
};
