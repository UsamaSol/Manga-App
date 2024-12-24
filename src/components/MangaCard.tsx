import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Adjust the import path as necessary
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../constants/colors';

interface MangaCardProps {
  manga: {
    id: string; // Ensure you have the id for navigation
    title: string;
    coverImage: string;
    chapter: string;
    rating: number;
  };
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  // Specify the type for navigation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MangaPreview', { mangaId: manga.id }); // Navigate to MangaPreview with mangaId
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: manga.coverImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{manga.title}</Text>
        <View style={styles.details}>
          <Text style={styles.chapter}>Chapter {manga.chapter}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{manga.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  info: {
    padding: 8,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapter: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  rating: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MangaCard;