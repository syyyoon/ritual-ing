import * as FileSystem from "expo-file-system";
import { ImageSourcePropType } from "react-native";

export const checkFileExists = async (fileUri: string) => {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  console.log('File exists ;', fileInfo.exists )
    return fileInfo.exists // false or true
}



export const filterValidImages = async (images: string[]): Promise<ImageSourcePropType[]> => {
  const validImages: ImageSourcePropType[] = [];

  for (const imageUri of images) {
    if (imageUri && await checkFileExists(imageUri)) {
      validImages.push({ uri: imageUri });
    }
  }

  return validImages;
};