import path from "node:path";
import sharp from "sharp";
import type { CaseImage } from "./data";

/**
 * Replace the declared width/height with the file's real pixel size, so
 * anything that frames an image at its true aspect (the lightbox) never
 * crops it. Runs at build time for statically generated pages.
 */
export async function withActualSize(images: CaseImage[]): Promise<CaseImage[]> {
  return Promise.all(
    images.map(async (img) => {
      try {
        const meta = await sharp(path.join(process.cwd(), "public", img.src)).metadata();
        if (!meta.width || !meta.height) return img;
        return { ...img, width: meta.width, height: meta.height };
      } catch {
        return img;
      }
    }),
  );
}
