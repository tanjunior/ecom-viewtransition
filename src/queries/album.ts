import { queryOptions } from "@tanstack/react-query";

type AlbumWithTracks = {
  id: string;
  name: string;
  artist: string;
  img: string;
};

export const albumsQuery = () => queryOptions({
  queryKey: ['albums'],
  queryFn: async () => {
    await new Promise((r) => setTimeout(r, 1));
    const { default: albums } = await import("../data/albums.json");
    return albums;
  }
})

export const albumQuery = (id: string) => queryOptions({
  queryKey: ['album', id],
  queryFn: async () => {
    await new Promise((r) => setTimeout(r, 1));
    const { default: album }: { default: AlbumWithTracks } = await import(
      `../data/album-${id}.json`
    );
    return album;
  }
})
