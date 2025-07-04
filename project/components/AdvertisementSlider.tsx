import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

interface Advertisement {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface AdvertisementSliderProps {
  advertisements: Advertisement[];
  autoPlayInterval?: number;
  height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Fallback component for web platform
function WebSlider({ advertisements, height = 200 }: AdvertisementSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advertisements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [advertisements.length]);

  // Handle drag/swipe for web
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in e) {
      dragStartX.current = e.touches[0].clientX;
    } else {
      dragStartX.current = e.clientX;
    }
  };
  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    let endX = 0;
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }
    const diff = endX - dragStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        setCurrentIndex((prev) => (prev + 1) % advertisements.length);
      } else if (diff > 0) {
        setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
      }
    }
    dragStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % advertisements.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advertisements.length]);

  return (
    <div
      ref={sliderRef}
      style={{ ...styles.container, height }}
      role="region"
      aria-label="Advertisement Slider"
      tabIndex={0}
    >
      <div
        style={styles.slider}
        onMouseDown={(e) => handleDragStart(e as React.MouseEvent<HTMLDivElement>)}
        onMouseUp={(e) => handleDragEnd(e as React.MouseEvent<HTMLDivElement>)}
        onTouchStart={(e) => handleDragStart(e as React.TouchEvent<HTMLDivElement>)}
        onTouchEnd={(e) => handleDragEnd(e as React.TouchEvent<HTMLDivElement>)}
      >
        {advertisements.map((ad, index) => (
          <div
            key={ad.id}
            style={{
              ...styles.slide,
              width: SCREEN_WIDTH,
              display: index === currentIndex ? 'flex' : 'none',
            }}
          >
            <Image source={ad.image} style={styles.image} contentFit="cover" onError={() => { /* TODO: handle image load error */ }} accessibilityLabel={ad.title} />
            <div style={{...styles.overlay}}>
              <div style={styles.content}>
                <span style={styles.title as React.CSSProperties}>{ad.title}</span>
                <span style={styles.description as React.CSSProperties}>{ad.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.pagination}>
        {advertisements.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => setCurrentIndex(index)}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </div>
    </div>
  );
}

// Native platform component with Reanimated
function NativeSlider({ advertisements, autoPlayInterval = 5000, height = 200 }: AdvertisementSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const timer = useRef<NodeJS.Timeout>();

  const startAutoPlay = () => {
    timer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % advertisements.length;
      setCurrentIndex(nextIndex);
      translateX.value = withTiming(-nextIndex * SCREEN_WIDTH);
    }, autoPlayInterval);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisements.length]);

  const handleDotPress = (index: number) => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setCurrentIndex(index);
    translateX.value = withSpring(-index * SCREEN_WIDTH);
    setTimeout(() => startAutoPlay(), 100); // restart autoplay after a short delay
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        {advertisements.map((ad) => (
          <View key={ad.id} style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <Image source={ad.image} style={styles.image} contentFit="cover" onError={() => {}} accessibilityLabel={ad.title} />
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Text style={styles.title}>{ad.title}</Text>
                <Text style={styles.description}>{ad.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.View>

      <View style={styles.pagination}>
        {advertisements.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => handleDotPress(index)}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

// Export platform-specific component
export default function AdvertisementSlider(props: AdvertisementSliderProps) {
  if (!props.advertisements || props.advertisements.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', height: props.height || 200 }]}> 
        <Text>No advertisements available</Text>
      </View>
    );
  }
  return Platform.OS === 'web' ? <WebSlider {...props} /> : <NativeSlider {...props} />;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
    height: '100%',
  },
  slide: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
});