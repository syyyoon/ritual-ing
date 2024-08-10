import {
  useFonts as useBalooFonts,
  BalooBhai2_700Bold,
  BalooBhai2_800ExtraBold,
} from "@expo-google-fonts/baloo-bhai-2";
import {
  useFonts as useNotoFonts,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr";
import { useFonts as useConcertFonts, ConcertOne_400Regular } from "@expo-google-fonts/concert-one";
import {
  useFonts as useComfortaaFonts,
  Comfortaa_400Regular,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";

export const useBalooFontsHook = () => {
  const [fontsLoaded] = useBalooFonts({
    BalooBhai2_700Bold,
    BalooBhai2_800ExtraBold,
  });
  return { fontsLoaded };
};

type FontsLoaded = {
  fontsLoaded: boolean;
};

export const useNotoFontsHook = (): FontsLoaded => {
  const [fontsLoaded] = useNotoFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });
  return { fontsLoaded };
};

export const useConcertFontsHook = (): FontsLoaded => {
  const [fontsLoaded] = useConcertFonts({
    ConcertOne_400Regular,
  });
  return { fontsLoaded };
};

export const useComfortaaFontsHook = (): FontsLoaded => {
  const [fontsLoaded] = useComfortaaFonts({
    Comfortaa_400Regular,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });
  return { fontsLoaded };
};
