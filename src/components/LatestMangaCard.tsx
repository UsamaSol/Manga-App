import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../constants/colors';

interface LatestMangaCardProps {
  manga: {
    id: string;
    title: string;
    coverImage: string;
    chapter: string;
    rating: number;
    updated: string;
  };
}

const LatestMangaCard: React.FC<LatestMangaCardProps> = ({ manga }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MangaPreview', { mangaId: manga.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: manga.coverImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{manga.title}</Text>
        <View style={styles.details}>
          <Text style={styles.chapter}>Chapter {manga.chapter}</Text>
          <Text style={styles.updated}>{manga.updated}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 110,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
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
  updated: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});

export default LatestMangaCard;