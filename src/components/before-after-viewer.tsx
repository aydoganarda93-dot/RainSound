"use client";

import { useId, useState } from "react";

import type { BeforeAfterPair, MediaAsset } from "@/content";

const sourceLabels: Record<MediaAsset["source"], string> = {
  ai: "AI atmosfer",
  demo: "Demo medya",
  provided: "Sağlanan medya",
  real: "Gerçek medya",
};

const getPermissionLabel = (asset: MediaAsset) => {
  if (!asset.hasUsagePermission) {
    return "İzin bekleniyor";
  }

  if (asset.requiresPrivacyReview) {
    return "Gizlilik kontrolü gerekli";
  }

  return "Kullanım uygun";
};

const getAssetDimensions = (asset: MediaAsset) => {
  if (!asset.width || !asset.height) {
    return "Ölçü bekleniyor";
  }

  return `${asset.width}x${asset.height}`;
};

const MediaStatePills = ({ asset }: { asset: MediaAsset }) => (
  <div className="before-after-viewer__pills">
    <span>{sourceLabels[asset.source]}</span>
    <span>{getPermissionLabel(asset)}</span>
    {asset.demo.replacementRequiredBeforeProduction ? (
      <span>Production öncesi değişecek</span>
    ) : null}
  </div>
);

const MediaMeta = ({ asset, label }: { asset: MediaAsset; label: string }) => (
  <article className="before-after-viewer__meta-card">
    <p className="rain-badge">{label}</p>
    <h4>{asset.alt}</h4>
    <dl>
      <div>
        <dt>Kaynak</dt>
        <dd>{sourceLabels[asset.source]}</dd>
      </div>
      <div>
        <dt>Dosya</dt>
        <dd>{asset.src}</dd>
      </div>
      <div>
        <dt>Ölçü</dt>
        <dd>{getAssetDimensions(asset)}</dd>
      </div>
      <div>
        <dt>Durum</dt>
        <dd>{getPermissionLabel(asset)}</dd>
      </div>
    </dl>
    {asset.demo.note ? <p>{asset.demo.note}</p> : null}
  </article>
);

export function BeforeAfterViewer({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();

  return (
    <article className="rain-card before-after-viewer">
      <div className="before-after-viewer__header">
        <p className="rain-badge">Karşılaştırma</p>
        <h3>{pair.label}</h3>
        <p>
          Demo before/after verisi gerçek uygulama sonucu değildir. Yayın öncesi
          aynı araç, aynı açı, izin ve mobil kırpım kontrolü gerektirir.
        </p>
      </div>

      <div className="before-after-viewer__stage">
        <div className="before-after-viewer__panel before-after-viewer__panel--before">
          <span>Öncesi</span>
          <strong>Before</strong>
          <small>{pair.before.alt}</small>
        </div>
        <div
          className="before-after-viewer__panel before-after-viewer__panel--after"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <span>Sonrası</span>
          <strong>After</strong>
          <small>{pair.after.alt}</small>
        </div>
        <div
          className="before-after-viewer__divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="before-after-viewer__control">
        <label htmlFor={sliderId}>Karşılaştırma çizgisini ayarla</label>
        <input
          id={sliderId}
          max="100"
          min="0"
          type="range"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`Sonrası görüntüsü yüzde ${position} seviyesinde açılıyor`}
        />
        <div className="before-after-viewer__control-labels" aria-hidden="true">
          <span>Öncesi</span>
          <span>Sonrası</span>
        </div>
      </div>

      <div className="before-after-viewer__states">
        <MediaStatePills asset={pair.before} />
        <MediaStatePills asset={pair.after} />
      </div>

      <div className="before-after-viewer__meta">
        <MediaMeta asset={pair.before} label="Öncesi medya" />
        <MediaMeta asset={pair.after} label="Sonrası medya" />
      </div>
    </article>
  );
}
