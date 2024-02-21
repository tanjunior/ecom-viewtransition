import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import Record from "../components/Record";
import { albumQuery } from "../queries/album";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function loader(queryClient: QueryClient) {
  return async ({params}: LoaderFunctionArgs) => {
    return {initialData: await queryClient.ensureQueryData(albumQuery(params.id!))}
  }
}

export function Component() {
  const params = useParams()
  const {initialData} = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const {data:album} = useSuspenseQuery({
    ...albumQuery(params.id!),
    initialData
  })

  return (
    <section>
      <div className="container flex flex-col items-start max-w-screen-lg px-6 pt-8 pb-12 mx-auto overflow-hidden lg:px-0 md:items-end md:flex-row">
        <Record
          albumId={album.id}
          title={album.name}
          imageUrl={album.img}
          data-todo="client:visible"
        />
        <div className="flex flex-col justify-end flex-1 pt-8">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            {album.name}
          </h1>
          <p className="mt-3 text-3xl">{album.artist}</p>
          <p className="mt-2 text-lg">
            {/* {album.strGenre} — {album.intYearReleased} */}
          </p>
          <div className="flex mt-3">
          </div>
        </div>
      </div>

      <div className="container max-w-screen-lg mx-auto mb-10">
      </div>
    </section>
  );
}
