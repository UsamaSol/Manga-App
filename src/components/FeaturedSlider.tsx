import React, { useRef, useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Dimensions, 
  TouchableOpacity,
  FlatList,
  Animated
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

interface FeaturedManga {
  id: string;
  title: string;
  coverImage: string;
  rating: number;
  genres: string[];
  summary: string;
  status: string;
}

interface Props {
  data: FeaturedManga[];
}

const FeaturedSlider: React.FC<Props> = ({ data }) => {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const autoPlayDelay = 3000;
  let autoPlayTimer: NodeJS.Timeout;

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
      }
    };
  }, [currentIndex]);

  const startAutoPlay = () => {
    autoPlayTimer = setTimeout(() => {
      if (currentIndex === data.length - 1) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }, autoPlayDelay);
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: FeaturedManga }) => {
    return (
      <TouchableOpacity style={styles.slide}>
        <Image source={{ uri: item.coverImage }} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.genres}>{item.genres.join(' • ')}</Text>
            <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      },
    }
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: COLORS.cardBg,
  },
  slide: {
    width: width,
    height: 200,
    flexDirection: 'row', 
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  image: {
    width: 130, 
    height: 180, 
    borderRadius: 8,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
    backgroundColor: 'transparent', 
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.accent,
    padding: 5,
    marginBottom: 5,
    borderRadius: 12,
    minWidth: 35,
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  info: {
    gap: 4,
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 45,
  },
  genres: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  summary: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  status: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '500',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 3,
  },
});

export default FeaturedSlider;