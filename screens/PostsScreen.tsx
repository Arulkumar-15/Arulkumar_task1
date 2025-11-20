import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  Text,
  Card,
  useTheme,
  Surface,
  Button,
  Chip,
  IconButton,
  Searchbar,
  Avatar,
} from 'react-native-paper';
import { postsApi, Post } from '../services/api';
import { storageService } from '../services/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PostsScreenProps {
  navigation?: any;
}

// Skeleton Loading Component
const SkeletonCard: React.FC<{ theme: any }> = ({ theme }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface },
      ]}
      mode="elevated"
      elevation={1}
    >
      <Card.Content>
        <View style={styles.postHeader}>
          <Animated.View 
            style={[
              styles.skeletonPostNumber, 
              { backgroundColor: theme.colors.surfaceVariant, opacity }
            ]} 
          />
          <View style={styles.postActions}>
            <Animated.View 
              style={[
                styles.skeletonIcon, 
                { backgroundColor: theme.colors.surfaceVariant, opacity }
              ]} 
            />
            <Animated.View 
              style={[
                styles.skeletonIcon, 
                { backgroundColor: theme.colors.surfaceVariant, opacity, marginLeft: 8 }
              ]} 
            />
          </View>
        </View>
        <Animated.View 
          style={[
            styles.skeletonTitle, 
            { backgroundColor: theme.colors.surfaceVariant, opacity }
          ]} 
        />
        <Animated.View 
          style={[
            styles.skeletonBody, 
            { backgroundColor: theme.colors.surfaceVariant, opacity, marginTop: 10 }
          ]} 
        />
        <Animated.View 
          style={[
            styles.skeletonBodyShort, 
            { backgroundColor: theme.colors.surfaceVariant, opacity, marginTop: 6 }
          ]} 
        />
        <View style={[styles.postFooter, { marginTop: 16 }]}>
          <View style={styles.postStats}>
            <Animated.View 
              style={[
                styles.skeletonSmall, 
                { backgroundColor: theme.colors.surfaceVariant, opacity }
              ]} 
            />
            <Animated.View 
              style={[
                styles.skeletonSmall, 
                { backgroundColor: theme.colors.surfaceVariant, opacity, marginLeft: 12 }
              ]} 
            />
          </View>
          <Animated.View 
            style={[
              styles.skeletonButton, 
              { backgroundColor: theme.colors.surfaceVariant, opacity }
            ]} 
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const PostsScreen: React.FC<PostsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'network' | 'api' | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      }
      setError(null);
      setErrorType(null);
      setIsOffline(false);
      
      const data = await postsApi.getAllPosts();
      setPosts(data);
      setFilteredPosts(data);
      setIsOffline(false);
    } catch (err) {
      // Determine error type
      const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
      const isNetworkError = errorMessage.includes('network') || 
                            errorMessage.includes('internet') || 
                            errorMessage.includes('connection') ||
                            errorMessage.includes('timeout') ||
                            errorMessage.includes('fetch');
      
      // If API call fails, try to load from cache
      const cachedPosts = await storageService.loadPosts();
      
      if (cachedPosts && cachedPosts.length > 0) {
        setPosts(cachedPosts);
        setFilteredPosts(cachedPosts);
        setIsOffline(true);
        setError(null);
        setErrorType(null);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        setErrorType(isNetworkError ? 'network' : 'api');
        setIsOffline(false);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Load cached posts first for faster initial render
    const loadCachedPosts = async () => {
      const cachedPosts = await storageService.loadPosts();
      if (cachedPosts && cachedPosts.length > 0) {
        setPosts(cachedPosts);
        setFilteredPosts(cachedPosts);
        setLoading(false);
      }
    };
    
    loadCachedPosts();
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    // Filter posts based on search query
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(true);
  }, [fetchPosts]);

  const handleRetry = () => {
    fetchPosts();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading && !refreshing && posts.length === 0) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Header */}
        <Surface
          style={[styles.header, { backgroundColor: theme.colors.elevation.level2 }]}
          elevation={0}
        >
          <View style={styles.headerContent}>
            <Text variant="headlineMedium" style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
              Posts
            </Text>
            <View style={styles.headerActions}>
              <IconButton
                icon="filter-variant"
                size={24}
                iconColor={theme.colors.onSurface}
                disabled
              />
            </View>
          </View>
          
          {/* Search Bar */}
          <Searchbar
            placeholder="Search posts..."
            onChangeText={handleSearch}
            value={searchQuery}
            style={[styles.searchBar, { backgroundColor: theme.colors.surfaceVariant }]}
            iconColor={theme.colors.onSurfaceVariant}
            inputStyle={{ color: theme.colors.onSurface }}
            elevation={0}
            editable={false}
          />
        </Surface>

        {/* Skeleton Loading */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <SkeletonCard key={item} theme={theme} />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (error) {
    const isNetworkError = errorType === 'network';
    
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Surface
          style={[
            styles.errorContainer,
            { backgroundColor: isNetworkError ? theme.colors.tertiaryContainer : theme.colors.errorContainer },
          ]}
          elevation={2}
        >
          {/* Error Illustration */}
          <View style={[
            styles.errorIconContainer, 
            { backgroundColor: isNetworkError ? theme.colors.tertiary : theme.colors.error }
          ]}>
            {isNetworkError ? (
              <MaterialCommunityIcons
                name="wifi-off"
                size={50}
                color={theme.colors.onTertiary}
              />
            ) : (
              <MaterialIcons
                name="error-outline"
                size={50}
                color={theme.colors.onError}
              />
            )}
          </View>

          {/* Error Title */}
          <Text
            variant="headlineSmall"
            style={[
              styles.errorTitle, 
              { color: isNetworkError ? theme.colors.onTertiaryContainer : theme.colors.onErrorContainer }
            ]}
          >
            {isNetworkError ? 'No Internet Connection' : 'Oops! Something went wrong'}
          </Text>

          {/* Error Message */}
          <Text
            variant="bodyMedium"
            style={[
              styles.errorMessage,
              { color: isNetworkError ? theme.colors.onTertiaryContainer : theme.colors.onErrorContainer },
            ]}
          >
            {isNetworkError 
              ? 'Please check your internet connection and try again.' 
              : 'We encountered an issue while loading posts. Please try again later.'}
          </Text>

          {/* Error Details (Collapsible) */}
          {!isNetworkError && (
            <View style={[styles.errorDetails, { backgroundColor: theme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons 
                name="information-outline" 
                size={16} 
                color={theme.colors.onSurfaceVariant}
                style={styles.errorDetailsIcon}
              />
              <Text
                variant="bodySmall"
                style={[styles.errorDetailsText, { color: theme.colors.onSurfaceVariant }]}
              >
                {error}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.errorActions}>
            <Button
              mode="contained"
              onPress={handleRetry}
              style={styles.retryButton}
              contentStyle={styles.buttonContent}
              icon="refresh"
              buttonColor={isNetworkError ? theme.colors.tertiary : theme.colors.error}
            >
              Try Again
            </Button>
          </View>

          {/* Additional Help Text */}
          {isNetworkError && (
            <View style={styles.helpTextContainer}>
              <Text
                variant="bodySmall"
                style={[styles.helpText, { color: theme.colors.onTertiaryContainer }]}
              >
                Tips to fix connection issues:
              </Text>
              <View style={styles.helpList}>
                <Text style={[styles.helpListItem, { color: theme.colors.onTertiaryContainer }]}>
                  • Check if WiFi or mobile data is turned on
                </Text>
                <Text style={[styles.helpListItem, { color: theme.colors.onTertiaryContainer }]}>
                  • Try switching between WiFi and mobile data
                </Text>
                <Text style={[styles.helpListItem, { color: theme.colors.onTertiaryContainer }]}>
                  • Restart your router or device
                </Text>
              </View>
            </View>
          )}
        </Surface>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <Surface
        style={[styles.header, { backgroundColor: theme.colors.elevation.level2 }]}
        elevation={0}
      >
        <View style={styles.headerContent}>
          <Text variant="headlineMedium" style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
            Posts
          </Text>
          <View style={styles.headerActions}>
            <IconButton
              icon="filter-variant"
              size={24}
              iconColor={theme.colors.onSurface}
              onPress={() => console.log('Filter pressed')}
            />
          </View>
        </View>
        
        {/* Search Bar */}
        <Searchbar
          placeholder="Search posts..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surfaceVariant }]}
          iconColor={theme.colors.onSurfaceVariant}
          inputStyle={{ color: theme.colors.onSurface }}
          elevation={0}
        />

        {/* Offline Banner */}
        {isOffline && (
          <Chip
            icon="wifi-off"
            mode="flat"
            style={[styles.offlineChip, { backgroundColor: theme.colors.secondaryContainer }]}
            textStyle={{ color: theme.colors.onSecondaryContainer }}
            onClose={() => setIsOffline(false)}
          >
            Offline Mode - Showing cached data
          </Chip>
        )}
      </Surface>

      {/* Posts List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        {filteredPosts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons 
              name="text-search" 
              size={100} 
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="titleLarge"
              style={[styles.emptyTitle, { color: theme.colors.onSurface }]}
            >
              No posts found
            </Text>
            <Text
              variant="bodyMedium"
              style={[styles.emptyMessage, { color: theme.colors.onSurfaceVariant }]}
            >
              {searchQuery ? 'Try adjusting your search query' : 'Pull down to refresh'}
            </Text>
          </View>
        ) : (
          filteredPosts.map((post, index) => (
            <TouchableOpacity
              key={post.id}
              activeOpacity={0.7}
              onPress={() => console.log('Post pressed:', post.id)}
            >
              <Card
                style={[
                  styles.card,
                  { backgroundColor: theme.colors.surface },
                ]}
                mode="elevated"
                elevation={1}
              >
                <Card.Content>
                  <View style={styles.postHeader}>
                    <View style={[styles.postNumber, { backgroundColor: theme.colors.primaryContainer }]}>
                      <Text variant="labelSmall" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                        #{post.id}
                      </Text>
                    </View>
                    <View style={styles.postActions}>
                      <IconButton
                        icon="bookmark-outline"
                        size={20}
                        iconColor={theme.colors.onSurfaceVariant}
                        onPress={() => console.log('Bookmark pressed')}
                        style={styles.iconButtonSmall}
                      />
                      <IconButton
                        icon="share-variant-outline"
                        size={20}
                        iconColor={theme.colors.onSurfaceVariant}
                        onPress={() => console.log('Share pressed')}
                        style={styles.iconButtonSmall}
                      />
                    </View>
                  </View>
                  <Text
                    variant="titleLarge"
                    style={[
                      styles.postTitle,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {post.title}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.postBody,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                    numberOfLines={3}
                  >
                    {post.body}
                  </Text>
                  <View style={styles.postFooter}>
                    <View style={styles.postStats}>
                      <MaterialCommunityIcons 
                        name="eye-outline" 
                        size={20} 
                        color={theme.colors.onSurfaceVariant}
                      />
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginLeft: 4 }}>
                        {Math.floor(Math.random() * 1000) + 100}
                      </Text>
                      <MaterialCommunityIcons 
                        name="heart-outline" 
                        size={20} 
                        color={theme.colors.onSurfaceVariant}
                        style={{ marginLeft: 12 }}
                      />
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginLeft: 4 }}>
                        {Math.floor(Math.random() * 100) + 10}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.readMoreButton}>
                      <Text variant="labelMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                        Read More
                      </Text>
                      <Ionicons 
                        name="chevron-forward" 
                        size={18} 
                        color={theme.colors.primary}
                        style={styles.readMoreIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  searchBar: {
    elevation: 0,
    borderRadius: 12,
    marginBottom: 12,
  },
  offlineChip: {
    alignSelf: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postNumber: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -8,
  },
  iconButtonSmall: {
    margin: 0,
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postBody: {
    lineHeight: 22,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreIcon: {
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    opacity: 0.7,
  },
  loadingContainer: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  loadingText: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  loadingSubtext: {
    marginTop: 8,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  // Skeleton styles
  skeletonPostNumber: {
    width: 50,
    height: 28,
    borderRadius: 12,
  },
  skeletonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  skeletonTitle: {
    width: '80%',
    height: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  skeletonBody: {
    width: '100%',
    height: 16,
    borderRadius: 6,
  },
  skeletonBodyShort: {
    width: '70%',
    height: 16,
    borderRadius: 6,
  },
  skeletonSmall: {
    width: 60,
    height: 20,
    borderRadius: 6,
  },
  skeletonButton: {
    width: 90,
    height: 24,
    borderRadius: 8,
  },
  // Enhanced error styles
  errorDetails: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 8,
    width: '100%',
  },
  errorDetailsIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  errorDetailsText: {
    flex: 1,
    lineHeight: 18,
  },
  errorActions: {
    width: '100%',
    marginTop: 8,
  },
  helpTextContainer: {
    marginTop: 24,
    width: '100%',
  },
  helpText: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  helpList: {
    marginLeft: 8,
  },
  helpListItem: {
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 4,
  },
});

export default PostsScreen;

