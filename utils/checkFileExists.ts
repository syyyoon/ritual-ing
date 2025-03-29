import * as FileSystem from "expo-file-system";
import { ImageSourcePropType } from "react-native";

export const checkFileExists = async (fileUri: string) => {
  const filePath = FileSystem.documentDirectory + `${fileUri}`;
  const fileInfo = await FileSystem.getInfoAsync(filePath);
  return fileInfo.exists;
};

// export const filterValidImages = async (images: string[]): Promise<ImageSourcePropType[]> => {
//   const validImages: ImageSourcePropType[] = [];

//   for (const imageUri of images) {
//     if (imageUri && (await checkFileExists(imageUri))) {
//       validImages.push({ uri: imageUri });
//     }
//   }

//   return validImages;
// };
