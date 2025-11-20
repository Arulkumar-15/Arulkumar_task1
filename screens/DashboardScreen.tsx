import React, { useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import {
  Text,
  Surface,
  useTheme,
  IconButton,
  Divider,
  Avatar,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface MenuCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface DashboardScreenProps {
  userName?: string;
  navigation?: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  userName = 'John Doe',
  navigation,
}) => {
  const theme = useTheme();
  const isDark = theme.dark;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardAnimations = useRef(
    Array(4).fill(0).map(() => ({
      scale: new Animated.Value(0.9),
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    // Animate header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger card animations
    const cardAnimSequence = cardAnimations.map((anim, index) => 
      Animated.parallel([
        Animated.timing(anim.scale, {
          toValue: 1,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(50, cardAnimSequence).start();
  }, []);

  const menuCards: MenuCard[] = [
    {
      id: 'posts',
      title: 'Posts',
      subtitle: 'View all posts',
      icon: 'post-outline',
      color: '#3b82f6',
      onPress: () => {
        navigation?.navigate('Posts');
      },
    },
    {
      id: 'profile',
      title: 'Profile',
      subtitle: 'Manage your profile',
      icon: 'account-circle-outline',
      color: '#ea580c',
      onPress: () => {
        console.log('Profile pressed');
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App preferences',
      icon: 'cog-outline',
      color: '#8b5cf6',
      onPress: () => {
        console.log('Settings pressed');
      },
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Your alerts',
      icon: 'bell-outline',
      color: '#22c55e',
      onPress: () => {
        console.log('Notifications pressed');
      },
    },
  ];


  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const renderMenuCard = (card: MenuCard, index: number) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        key={card.id}
        onPress={card.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.cardContainer}
      >
        <Animated.View
          style={{
            transform: [
              { scale: scaleAnim },
              { scale: cardAnimations[index]?.scale || 1 },
            ],
            opacity: cardAnimations[index]?.opacity || 1,
          }}
        >
          <Surface
            style={[
              styles.gradientCard,
              { backgroundColor: card.color },
            ]}
            elevation={4}
          >
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons
                name={card.icon}
                size={42}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.cardTextContainer}>
              <Text variant="titleLarge" style={styles.cardTitle}>
                {card.title}
              </Text>
              <Text variant="bodyMedium" style={styles.cardSubtitle}>
                {card.subtitle}
              </Text>
            </View>
            <View style={styles.cardArrowIcon}>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#FFFFFF"
              />
            </View>
          </Surface>
        </Animated.View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Surface
            style={[
              styles.header,
              { backgroundColor: theme.colors.elevation.level2 },
            ]}
            elevation={2}
          >
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text variant="headlineMedium" style={[styles.avatarText, { color: theme.colors.primary }]}>
                    {getInitials(userName)}
                  </Text>
                </View>
                <View style={styles.headerTextContainer}>
                  <Text variant="bodyMedium" style={[styles.greeting, { color: theme.colors.onSurfaceVariant }]}>
                    Welcome back,
                  </Text>
                  <Text variant="headlineMedium" style={[styles.userName, { color: theme.colors.onSurface }]}>
                    {userName}
                  </Text>
                </View>
              </View>
              <IconButton
                icon="menu"
                size={28}
                iconColor={theme.colors.onSurface}
                onPress={() => console.log('Menu pressed')}
                style={styles.menuButton}
              />
            </View>
          </Surface>
        </Animated.View>

        {/* Menu Cards Section */}
        <View style={styles.menuContainer}>
          <View style={styles.sectionHeader}>
            <Text
              variant="titleLarge"
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Explore
            </Text>
            <TouchableOpacity>
              <Text variant="labelLarge" style={{ color: theme.colors.primary, fontWeight: '600' }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuGrid}>
            {menuCards.map((card, index) => renderMenuCard(card, index))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  avatarText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerTextContainer: {
    marginLeft: 20,
    flex: 1,
  },
  greeting: {
    marginBottom: 4,
    opacity: 0.8,
    letterSpacing: 0.3,
  },
  userName: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  menuButton: {
    margin: 0,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuGrid: {
    gap: 18,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
    }),
  },
  gradientCard: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100,
    borderRadius: 24,
  },
  cardIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: 0.3,
  },
  cardArrowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;


