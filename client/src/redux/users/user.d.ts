/* eslint-disable @typescript-eslint/no-explicit-any */
type artStyle = {
  _id: string;
  name: string;
};

type personalProject = {
  _id: string;
  path: string;
};

export type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "artist";
  profileImage?: any;
  personalProjects?: personalProject[];
  artStyle?: artStyle[];
  aboutMe?: string;
  notifications: any;
  reviews?: any;
  orders?: any;
};

export type IEditMainInfo = {
  firstName?: string;
  lastName?: string;
  profileImage?: Blob;
};
