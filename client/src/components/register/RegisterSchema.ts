// TYPES

type IArtStyle = {
  value: string;
  label: string;
};

export type IRegisterSchema = {
  firstName: string;
  lastName: string;
  email: string;
  role: {
    value: string;
    label: string;
  };
  password: string;
  artStyle: IArtStyle[];
  aboutMe: string;
};

// SCHEMAS

export const RegisterSchema = {
  firstName: {
    required: "Field can not be empty",
  },
  lastName: {
    required: "Field can not be empty",
  },
  email: {
    required: "Field can not be empty",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email format",
    },
  },
  role: {
    required: "Field can not be empty",
  },
  password: {
    required: "Field can not be empty",
    minLength: {
      value: 6,
      message: "Must be at least 6 characters long",
    },
  },
  artStyles: {
    required: "Field can not be empty",
    minLength: {
      value: 1,
      message: "Must be at least 1 style",
    },
  },
  aboutMe: {
    required: "Field can not be empty",
  },
};
