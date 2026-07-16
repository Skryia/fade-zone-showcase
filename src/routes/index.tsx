import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Fade Zone Barbers | Skin Fades, Haircuts & Beard Trims in Southampton" },
      {
        name: "description",
        content:
          "Fade Zone Barbers on Shirley Road Southampton offers professional skin fades, haircuts, beard trims and men's grooming services. Book your appointment today.",
      },
      { property: "og:title", content: "Fade Zone Barbers | Southampton" },
      {
        property: "og:description",
        content:
          "Precision cuts, skin fades, beard trims and premium grooming services on Shirley Road, Southampton.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

// The full proposal site is a pure static build under /public (index.html + assets/*)
// so it can be dropped straight onto GitHub Pages. This route just previews it.
function Index() {
  useEffect(() => {
    window.location.replace("./index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#c9a24b", display: "grid", placeItems: "center", fontFamily: "system-ui" }}>
      Loading Fade Zone Barbers…
    </div>
  );
}
