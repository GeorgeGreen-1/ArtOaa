export type IArtistConfig = {
  id: number;
  name: string;
  description: string;
  src: string;
  genre: { id: number; name: string }[];
};
export const ArtistsConfig: IArtistConfig[] = [
  {
    id: 0,
    src: "https://via.placeholder.com/151",
    name: "Artist",
    description: "lorem ipsum",
    genre: [
      {
        id: 0,
        name: "3D Art",
      },
      {
        id: 1,
        name: "Mural",
      },
      {
        id: 2,
        name: "Stencil",
      },
      {
        id: 3,
        name: "Stencil",
      },
      {
        id: 4,
        name: "Stencil",
      },
    ],
  },
  {
    id: 1,
    src: "https://via.placeholder.com/152",
    name: "Artist",
    description:
      "lorem ipsum reokroekroek rekorkeork  okeorkeokre rerkeok erere ",
    genre: [
      {
        id: 0,
        name: "Light-in-Dark",
      },
      {
        id: 1,
        name: "3D Art",
      },
    ],
  },
  {
    id: 2,
    name: "Artist",
    src: "https://via.placeholder.com/152",
    description: "lorem ipsum",
    genre: [
      {
        id: 0,
        name: "Stencil",
      },
      {
        id: 1,
        name: "Mural",
      },
    ],
  },
  {
    id: 3,
    name: "Artist",
    src: "https://via.placeholder.com/152",
    description: "lorem ipsum",
    genre: [
      {
        id: 0,
        name: "Stencil",
      },
      {
        id: 1,
        name: "Mural",
      },
    ],
  },
  {
    id: 4,
    name: "Artist",
    src: "https://via.placeholder.com/152",
    description: "lorem ipsum",
    genre: [
      {
        id: 0,
        name: "Stencil",
      },
      {
        id: 1,
        name: "Mural",
      },
    ],
  },
  {
    id: 5,
    name: "Artist",
    src: "https://via.placeholder.com/152",
    description: "lorem ipsum",
    genre: [
      {
        id: 0,
        name: "Stencil",
      },
      {
        id: 1,
        name: "Mural",
      },
    ],
  },
];
