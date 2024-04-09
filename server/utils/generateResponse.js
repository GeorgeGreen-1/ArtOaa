const generateRespond = (res, user) => {
  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isVerified: user?.isVerified,
    artStyle: user.artStyle,
    aboutMe: user.aboutMe,
    description: user.description,
    personalProjects: user.personalProjects,
    profileImage: user.profileImage,
  });
};

export default generateRespond;
