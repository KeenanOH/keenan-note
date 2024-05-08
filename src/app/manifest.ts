import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Keenan Note",
    short_name: "Keenan Note",
    description: "A markdown notes app.",
    start_url: "/",
    display: "fullscreen",
    background_color: "#fff",
    theme_color: "#fff"
  }
}
