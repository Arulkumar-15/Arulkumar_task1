import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

/**
 * This component showcases various vector icon libraries available in react-native-vector-icons
 * 
 * Available Icon Libraries:
 * - MaterialCommunityIcons: 6000+ icons
 * - MaterialIcons: Material Design icons
 * - Ionicons: Premium designed icons
 * - FontAwesome: 1000+ web icons
 * - FontAwesome5: Latest FA icons
 * - Feather: Clean, simple icons
 * - AntDesign: Ant Design icons
 * - Entypo: Pictograms
 */

const VectorIconsExample: React.FC = () => {
  const theme = useTheme();

  const iconSections = [
    {
      title: 'MaterialCommunityIcons',
      component: MaterialCommunityIcons,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'account', label: 'Account' },
        { name: 'bell', label: 'Bell' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Phone' },
        { name: 'calendar', label: 'Calendar' },
        { name: 'camera', label: 'Camera' },
        { name: 'cart', label: 'Cart' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'map-marker', label: 'Location' },
        { name: 'settings', label: 'Settings' },
      ],
    },
    {
      title: 'MaterialIcons',
      component: MaterialIcons,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'search', label: 'Search' },
        { name: 'favorite', label: 'Favorite' },
        { name: 'shopping-cart', label: 'Cart' },
        { name: 'person', label: 'Person' },
        { name: 'settings', label: 'Settings' },
        { name: 'notifications', label: 'Notify' },
        { name: 'explore', label: 'Explore' },
        { name: 'camera-alt', label: 'Camera' },
        { name: 'location-on', label: 'Location' },
        { name: 'menu', label: 'Menu' },
        { name: 'more-vert', label: 'More' },
      ],
    },
    {
      title: 'Ionicons',
      component: Ionicons,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'search', label: 'Search' },
        { name: 'heart', label: 'Heart' },
        { name: 'cart', label: 'Cart' },
        { name: 'person', label: 'Person' },
        { name: 'settings', label: 'Settings' },
        { name: 'notifications', label: 'Notify' },
        { name: 'compass', label: 'Compass' },
        { name: 'camera', label: 'Camera' },
        { name: 'location', label: 'Location' },
        { name: 'menu', label: 'Menu' },
        { name: 'ellipsis-vertical', label: 'More' },
      ],
    },
    {
      title: 'FontAwesome',
      component: FontAwesome,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'user', label: 'User' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'envelope', label: 'Email' },
        { name: 'phone', label: 'Phone' },
        { name: 'camera', label: 'Camera' },
        { name: 'shopping-cart', label: 'Cart' },
        { name: 'map-marker', label: 'Location' },
        { name: 'calendar', label: 'Calendar' },
        { name: 'search', label: 'Search' },
        { name: 'cog', label: 'Settings' },
      ],
    },
    {
      title: 'FontAwesome5',
      component: FontAwesome5,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'user-circle', label: 'User' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'envelope', label: 'Email' },
        { name: 'phone', label: 'Phone' },
        { name: 'camera', label: 'Camera' },
        { name: 'shopping-bag', label: 'Bag' },
        { name: 'map-marker-alt', label: 'Location' },
        { name: 'calendar-alt', label: 'Calendar' },
        { name: 'search', label: 'Search' },
        { name: 'cog', label: 'Settings' },
      ],
    },
    {
      title: 'Feather',
      component: Feather,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'user', label: 'User' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'mail', label: 'Mail' },
        { name: 'phone', label: 'Phone' },
        { name: 'camera', label: 'Camera' },
        { name: 'shopping-cart', label: 'Cart' },
        { name: 'map-pin', label: 'Location' },
        { name: 'calendar', label: 'Calendar' },
        { name: 'search', label: 'Search' },
        { name: 'settings', label: 'Settings' },
      ],
    },
    {
      title: 'AntDesign',
      component: AntDesign,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'user', label: 'User' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'mail', label: 'Mail' },
        { name: 'phone', label: 'Phone' },
        { name: 'camera', label: 'Camera' },
        { name: 'shoppingcart', label: 'Cart' },
        { name: 'pushpin', label: 'Pin' },
        { name: 'calendar', label: 'Calendar' },
        { name: 'search1', label: 'Search' },
        { name: 'setting', label: 'Settings' },
      ],
    },
    {
      title: 'Entypo',
      component: Entypo,
      icons: [
        { name: 'home', label: 'Home' },
        { name: 'user', label: 'User' },
        { name: 'heart', label: 'Heart' },
        { name: 'star', label: 'Star' },
        { name: 'mail', label: 'Mail' },
        { name: 'phone', label: 'Phone' },
        { name: 'camera', label: 'Camera' },
        { name: 'shopping-cart', label: 'Cart' },
        { name: 'location-pin', label: 'Pin' },
        { name: 'calendar', label: 'Calendar' },
        { name: 'magnifying-glass', label: 'Search' },
        { name: 'cog', label: 'Settings' },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={[styles.mainTitle, { color: theme.colors.onBackground }]}>
          React Native Vector Icons
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Showcase of available icon libraries
        </Text>

        {iconSections.map((section, sectionIndex) => {
          const IconComponent = section.component;
          return (
            <View key={sectionIndex} style={styles.section}>
              <Surface
                style={[styles.sectionHeader, { backgroundColor: theme.colors.elevation.level2 }]}
                elevation={1}
              >
                <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  {section.title}
                </Text>
              </Surface>
              
              <View style={styles.iconGrid}>
                {section.icons.map((icon, iconIndex) => (
                  <Surface
                    key={iconIndex}
                    style={[styles.iconCard, { backgroundColor: theme.colors.surface }]}
                    elevation={1}
                  >
                    <View style={[styles.iconCircle, { backgroundColor: theme.colors.primaryContainer }]}>
                      <IconComponent
                        name={icon.name}
                        size={32}
                        color={theme.colors.primary}
                      />
                    </View>
                    <Text
                      variant="bodySmall"
                      style={[styles.iconLabel, { color: theme.colors.onSurfaceVariant }]}
                      numberOfLines={1}
                    >
                      {icon.label}
                    </Text>
                  </Surface>
                ))}
              </View>
            </View>
          );
        })}

        {/* Usage Example Section */}
        <Surface
          style={[styles.usageSection, { backgroundColor: theme.colors.elevation.level2 }]}
          elevation={2}
        >
          <Text variant="titleMedium" style={[styles.usageTitle, { color: theme.colors.onSurface }]}>
            Usage Example
          </Text>
          <View style={styles.codeBlock}>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontFamily: 'monospace' }}>
              {`import Icon from 'react-native-vector-icons/MaterialCommunityIcons';\n\n<Icon name="home" size={30} color="#900" />`}
            </Text>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  mainTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconCard: {
    width: 80,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLabel: {
    textAlign: 'center',
    fontSize: 11,
  },
  usageSection: {
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  usageTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
});

export default VectorIconsExample;

