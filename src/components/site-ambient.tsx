const AMBIENT_ART = "/media/ai/ambient/ink-fluid-poster.avif";

export function SiteAmbient() {
  return (
    <div className="rsg-ambient" aria-hidden="true">
      <div className="rsg-ambient__glow" />
      <div
        className="rsg-ambient__art"
        style={{ backgroundImage: `url(${AMBIENT_ART})` }}
      />
      <div className="rsg-ambient__veil" />
      <div className="rsg-ambient__noise" />
    </div>
  );
}
