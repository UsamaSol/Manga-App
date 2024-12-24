import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import FeaturedSlider from '../components/FeaturedSlider';
import MangaCard from '../components/MangaCard';
import LatestMangaCard from '../components/LatestMangaCard';
import { COLORS } from '../constants/colors';
import { FEATURED_MANGA, POPULAR_MANGA, LATEST_MANGA } from '../utils/mangaData';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {/* Featured Slider */}
        <FeaturedSlider data={FEATURED_MANGA} />

        {/* Popular Today */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Today</Text>
              <View style={styles.mangaGrid}>
                {POPULAR_MANGA.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </View>
        </View>


        {/* Latest Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <View style={styles.latestList}>
            {LATEST_MANGA.map((manga) => (
              <LatestMangaCard key={manga.id} manga={manga} />
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
    backgroundColor: COLORS.background,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mangaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  latestList: {
    gap: 8,
  },
});

export default HomeScreen;