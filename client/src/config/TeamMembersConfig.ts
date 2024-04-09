type ITeamMemberConfig = {
  id: number;
  name: string;
  description: string;
  src: string;
};

export const TeamMembersConfig: ITeamMemberConfig[] = [
  {
    id: 0,
    name: "Giorgi",
    description: "Founder & CEO",
    src: "/assets/images/shared/profile-pic-giorgi.png",
  },
  {
    id: 1,
    name: "Mariami",
    description: "Co-Founder & CMO",
    src: "/assets/images/shared/profile-pic-mariami.png",
  },
];
