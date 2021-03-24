/**
 * Type
 */
type PreloadImagesType = (
  arrayOfImgSrc: string[],
  percentUpdatedCallback: (number) => void
) => Promise<HTMLImageElement[]>;

/**
 * Helper
 */
export const preloadImages: PreloadImagesType = async (
  arrayOfImgSrc,
  percentUpdatedCallback
) => {
  const totalLength = arrayOfImgSrc.length;
  let finishedCount = 0;
  let prevPercent = 0;

  const arr = await Promise.all<HTMLImageElement>(
    arrayOfImgSrc.map(
      (imgSrc) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            finishedCount++;

            // Round percents to remove decimals, or return zero (prevents NaN)
            const newPercent =
              Math.floor((finishedCount / totalLength) * 100) / 100 || 0;

            // Effectively throttle return for noticeable change sizes
            if (newPercent - prevPercent > 0.05 || newPercent === 1) {
              percentUpdatedCallback(newPercent);
              prevPercent = newPercent;
            }

            // Finish the promise
            resolve(img);
          };
        })
    )
  );

  return arr;
};
