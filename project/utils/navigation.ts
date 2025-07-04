import { router } from 'expo-router';
import { 
  RootTabParamList, 
  SupermarketStackParamList, 
  PharmaciesStackParamList,
  EventsStackParamList,
  ProfileStackParamList
} from '@/types';

// Type-safe navigation functions
// (Removed duplicate declarations)

// Helper for going back
// (Removed duplicate declaration)

// Type-safe navigation functions
export const navigateToTab = <T extends keyof RootTabParamList>(
  screen: T,
  params?: RootTabParamList[T]
) => {
  router.push({
    pathname: `/(tabs)/${screen}`,
    params: params as Record<string, string> | undefined,
  });
};

export const navigateToSupermarket = <T extends keyof SupermarketStackParamList>(
  screen: T,
  params?: SupermarketStackParamList[T]
) => {
  router.push({
    pathname: `/supermarket/${screen}`,
    params: params as Record<string, string> | undefined,
  });
};

export const navigateToPharmacy = <T extends keyof PharmaciesStackParamList>(
  screen: T,
  params?: PharmaciesStackParamList[T]
) => {
  router.push({
    pathname: `/pharmacies/${screen}`,
    params: params as Record<string, string> | undefined,
  });
};

export const navigateToEvent = <T extends keyof EventsStackParamList>(
  screen: T,
  params?: EventsStackParamList[T]
) => {
  router.push({
    pathname: `/events/${screen}`,
    params: params as Record<string, string> | undefined,
  });
};

export const navigateToProfile = <T extends keyof ProfileStackParamList>(
  screen: T,
  params?: ProfileStackParamList[T]
) => {
  router.push({
    pathname: `/profile/${screen}`,
    params: params as Record<string, string> | undefined,
  });
};

// Helper for going back
export const goBack = () => {
  router.back();
};