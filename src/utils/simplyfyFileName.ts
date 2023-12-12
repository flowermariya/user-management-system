export const simplifyFileName = async (originalFileName) => {
  const lastDotIndex = originalFileName.lastIndexOf(".");
  const extension = originalFileName.substring(lastDotIndex + 1);
  const fileNameWithoutExtension = originalFileName.substring(0, lastDotIndex);
  const fileNameWithoutExtensionLimited = fileNameWithoutExtension.substring(
    0,
    10
  );
  return `profile_${fileNameWithoutExtensionLimited}_${0}.${extension}`;
};
