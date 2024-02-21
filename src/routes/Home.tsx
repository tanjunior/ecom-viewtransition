import { useLoaderData } from "react-router-dom";
import { Card } from "../components/Card";
import { albumsQuery } from "../queries/album";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function loader(queryClient: QueryClient) {
  return async () => {
    return {initialData: await queryClient.ensureQueryData(albumsQuery())}
  }
}

export function Component() {
  const {initialData} = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const {data:albums} = useSuspenseQuery({
    ...albumsQuery(),
    initialData
  })

  return (
    <section className="py-8">
      <div className="container flex flex-wrap items-center max-w-screen-lg px-6 pt-4 pb-12 mx-auto lg:px-0">
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-black">
          Recently Played
        </h2>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {albums.map((album) => (
            <Card
              key={album.id}
              id={album.id}
              name={album.name}
              artist={album.artist}
              imageUrl={album.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
