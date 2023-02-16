export default {
  methods: {
    $userAvatar(scales = [], isWebp = false, highQuality = false) {
      const imagePath = this.getUserAttribute("avatar");
      const indexDot = imagePath.lastIndexOf(".");
      const imageFormat = isWebp ? ".webp" : imagePath.slice(indexDot);
      const filePath = imagePath.slice(0, indexDot);
      let result = "";

      if (isWebp && scales.length) {
        scales.forEach((scale) => {
          if (scale === 1 && !highQuality) {
            result += `${filePath}${imageFormat} ${scale}x, `;
          } else {
            result += `${filePath}@${scale}x${imageFormat} ${
              highQuality ? scale / 2 : ""
            }x, `;
          }
        });

        result = result.slice(0, result.length - 2);
      } else if (scales.length) {
        scales.forEach((scale) => {
          result += `${filePath}@${scale}x${imageFormat},`;
        });

        result = result.slice(0, result.length - 1);
      } else {
        result = imagePath;
      }

      return result;
    },
  },
};
