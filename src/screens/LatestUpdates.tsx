import React from 'react';
import { 
  View, 
  Text, 
  Image,
  FlatList,
  StyleSheet,
  Dimensions 
} from 'react-native';
import { Manga } from '../utils/mangaData';

const windowWidth = Dimensions.get('window').width;
const COLUMN_WIDTH = (windowWidth - 32) / 2;

const LatestUpdates = () => {
  const renderMangaItem = ({ item }: { item: typeof Manga[0] }) => (
    <View style={styles.mangaCard}>
      <Image 
        source={{ uri: item.coverImage }}
        style={styles.coverImage}
      />
      <View style={styles.cardOverlay}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <Text style={styles.chapter}>Chapters: {item.chapter}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Latest Updates</Text>
      <FlatList
        data={Manga}
        renderItem={renderMangaItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mangaCard: {
    width: COLUMN_WIDTH,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    color: 'white',
    fontSize: 12,
  },
  chapter: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default LatestUpdates;
