type artStyle = {
  _id: string;
  name: string;
};

type INotification = {
  _id: string;
  firstName: string;
  lastName: string;
  artLocation: string;
  createdAt: string;
};

export type ILoggedUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "artist";
  aboutMe?: string;
  artStyle?: artStyle[];
  profileImage?: string;
  notifications: INotification[];
};
