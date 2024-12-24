import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';
import {  Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Manga, RootStackParamList } from '../types/index';
import { SafeAreaView } from 'react-native-safe-area-context';


type RouteParams = {
  MangaPreview: {
    mangaId: number;
  };
};

const sampleManga: Manga = {
  id: 1,
  title: "Terminally-Ill Genius Dark Knight",
  rating: 9.7,
  followers: 16549,
  status: "Ongoing",
  type: "Manhwa",
  coverImage: "https://static.wikia.nocookie.net/onepiece/images/8/8a/Volume_96.png/revision/latest/scale-to-width-down/1000?cb=20201201125750",
  artist: "NaGi",
  updatedOn: "December 22nd 2024",
  genres: ["Action", "Adventure", "Fantasy", "Game", "Psychological"],
  synopsis: "By the author that brought you «I Obtained a Mythic Item»! «Inner Lunatic» is a fantasy RPG infamous for its extreme difficulty. However, to Yoo Chan, who was diagnosed with a terminal illness at a young age, this game was his entire world and has now become his reality. From now on, Yoo Chan has to survive in this world as Yoo was designated as the worst villain in the first act of the game. Will he be able to reach the end of the story safely?"
};

export const MangaPreviewScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'MangaPreview'>>();
  const manga = sampleManga;

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: manga.coverImage }}
        style={styles.coverImage}
        resizeMode="cover"
      />
      
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="white" />
        <Text style={styles.favoriteButtonText}>Favorite</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{manga.title}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{manga.rating}</Text>
          </View>
          <Text style={styles.followers}>
            Followed by {manga.followers.toLocaleString()} people
          </Text>
        </View>

        <View style={styles.infoGrid}>
          {[
            { label: 'Status', value: manga.status },
            { label: 'Type', value: manga.type },
            { label: 'Artist', value: manga.artist },
            { label: 'Updated On', value: manga.updatedOn },
          ].map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.genresScrollView}
        >
          <View style={styles.genresContainer}>
            {manga.genres.map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.synopsisContainer}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsis}>{manga.synopsis}</Text>
        </View>

        <View style={styles.chaptersContainer}>
          <Text style={styles.sectionTitle}>Chapters</Text>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.chapterItem}
            >
              <Text style={styles.chapterNumber}>Chapter {5 - index}</Text>
              <Text style={styles.chapterDate}>May 18th 2023</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  coverImage: {
    width: '100%',
    height: 400,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6c2bd9',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  favoriteButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  followers: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoItem: {
    width: '50%',
    marginBottom: 16,
  },
  infoLabel: {
    color: '#a0a0a0',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
  },
  genresScrollView: {
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  genreTag: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  genreText: {
    color: 'white',
    fontSize: 14,
  },
  synopsisContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  synopsis: {
    color: '#d0d0d0',
    fontSize: 14,
    lineHeight: 20,
  },
  chaptersContainer: {
    marginBottom: 24,
  },
  chapterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  chapterNumber: {
    color: 'white',
    fontSize: 16,
  },
  chapterDate: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  safeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 5 : 0,
      backgroundColor: '#1a1a1a',
    },
});

export default MangaPreviewScreen;