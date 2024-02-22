import { loadImage } from "@/lib/utils";

export default function SuspenseImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>
): JSX.Element {
  loadImage(props.src).read();
  return <img {...props} />;
}