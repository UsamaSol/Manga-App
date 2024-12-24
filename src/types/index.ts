export interface Manga {
  id: string | number;
  title: string;
  rating: number;
  followers?: number;
  status: string;
  type?: string;
  coverImage: string;
  artist?: string;
  updatedOn?: string;
  genres?: string[];
  synopsis?: string;
  chapter?: string;
  updated?: string;
}

export type RootStackParamList = {
  TabNavigator: undefined;
  MangaPreview: { mangaId: string };
};
