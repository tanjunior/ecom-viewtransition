import { loadImage } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

export default function SuspenseImage(
  props: ImgHTMLAttributes<HTMLImageElement>
) {
  loadImage(props.src).read();
  return <img {...props} />;
}
