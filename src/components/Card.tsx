import { NavLink } from "react-router-dom";

type CardProps = {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
};

export function Card({ id, name, artist, imageUrl }: CardProps) {
  return (
    <div className="flex flex-col c-card">
      <NavLink
        to={`/album/${id}`}
        className="text-black hover:text-pink-500"
        unstable_viewTransition
      >
        <div className="relative shadow-md hover:shadow-lg">
          <img
            className="relative z-10 rounded-md card-image c-card--album"
            src={imageUrl}
            alt={name}
            width="400"
            height="400"
          />
        </div>
        <p className="pt-4 font-semibold">{name}</p>
        <p className="pt-1 text-gray-700">{artist}</p>
      </NavLink>
    </div>
  );
}
