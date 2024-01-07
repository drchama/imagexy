export const resizeImage = (d: string, mw: number, mh: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => {
      let w = image.width;
      let h = image.height;

      if (w > mw || h > mh) {
        const r = Math.min(mw / w, mh / h);
        w = w * r;
        h = h * r;
      }

      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;

      const ctx = c.getContext("2d");
      if (!ctx) {
        reject("context 2d is null");
        return;
      }

      ctx.drawImage(image, 0, 0, w, h);

      resolve(c.toDataURL("image/jpeg"));
    });

    image.addEventListener("error", () => {
      reject("load image error");
    });

    image.src = d;
  });
};
