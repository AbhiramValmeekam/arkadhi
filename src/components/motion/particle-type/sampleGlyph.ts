/**
 * Glyph sampler — renders one character offscreen and converts it into a
 * structured dot-matrix: a uniform grid clipped to the ink, so the dots sit
 * in even rows and columns and the letterform stays clearly readable, like
 * an LED matrix. No jitter, no scatter — structure is the point.
 */

export interface GlyphCloud {
  /** Normalized x/y pairs in the ink bounding box (0..1). */
  pts: Float32Array;
  /** Width / height of the ink box — preserves the letter's proportions. */
  aspect: number;
  count: number;
}

export async function sampleGlyph(
  letter: string,
  fontFamily: string,
  fontWeight: string,
  target: number,
): Promise<GlyphCloud> {
  // Ensure the display face is actually loaded before sampling, with a cap so
  // a slow font never stalls the hero.
  try {
    await Promise.race([
      document.fonts.load(`${fontWeight} 120px ${fontFamily}`),
      new Promise((r) => window.setTimeout(r, 900)),
    ]);
  } catch {
    /* best-effort — fall back to whatever metrics exist */
  }

  const S = 440;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  if (!g) return { pts: new Float32Array(0), aspect: 1, count: 0 };

  g.fillStyle = '#000';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `${fontWeight} ${S * 0.8}px ${fontFamily}`;
  g.fillText(letter, S / 2, S / 2 + S * 0.03);

  const data = g.getImageData(0, 0, S, S).data;

  // Ink bounding box.
  let x0 = S, y0 = S, x1 = -1, y1 = -1, ink = 0;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (data[(y * S + x) * 4 + 3] > 110) {
        ink++;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (!ink || x1 <= x0 || y1 <= y0) return { pts: new Float32Array(0), aspect: 1, count: 0 };

  // Uniform grid over the ink box, sized to land near `target` points.
  // A cell survives when its centre region holds ink (2x2 average), which
  // keeps edges clean while the rows and columns stay perfectly even.
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const step = Math.sqrt((w * h) / target);
  const pts: number[] = [];
  const inkAt = (x: number, y: number) =>
    x < 0 || y < 0 || x >= S || y >= S ? 0 : data[(y * S + x) * 4 + 3];
  for (let y = y0 + step / 2; y <= y1; y += step) {
    for (let x = x0 + step / 2; x <= x1; x += step) {
      const xi = Math.round(x);
      const yi = Math.round(y);
      const cover =
        (inkAt(xi, yi) + inkAt(xi + 1, yi) + inkAt(xi, yi + 1) + inkAt(xi + 1, yi + 1)) / 4;
      if (cover < 100) continue;
      pts.push((x - x0) / w, (y - y0) / h);
    }
  }
  return { pts: new Float32Array(pts), aspect: w / h, count: pts.length / 2 };
}
