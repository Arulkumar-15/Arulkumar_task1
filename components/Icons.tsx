/**
 * Common Icons Component
 * 
 * Pre-configured icon components for easy reuse throughout the app.
 * This provides a centralized place to manage icon usage and styling.
 */

import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

// Standard icon sizes
export const IconSize = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48,
} as const;

// Common Material Community Icons
export const HomeIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="home" size={size} color={color || theme.colors.primary} style={style} />;
};

export const AccountIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="account" size={size} color={color || theme.colors.primary} style={style} />;
};

export const BellIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="bell-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const EmailIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="email-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const PhoneIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="phone" size={size} color={color || theme.colors.primary} style={style} />;
};

export const CameraIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="camera" size={size} color={color || theme.colors.primary} style={style} />;
};

export const HeartIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="heart-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const HeartFilledIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="heart" size={size} color={color || theme.colors.primary} style={style} />;
};

export const StarIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="star-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const StarFilledIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="star" size={size} color={color || theme.colors.primary} style={style} />;
};

export const CartIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="cart-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const SettingsIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="cog-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const SearchIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="magnify" size={size} color={color || theme.colors.primary} style={style} />;
};

export const MenuIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="menu" size={size} color={color || theme.colors.primary} style={style} />;
};

export const CloseIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="close" size={size} color={color || theme.colors.primary} style={style} />;
};

export const CheckIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="check" size={size} color={color || theme.colors.primary} style={style} />;
};

export const PlusIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="plus" size={size} color={color || theme.colors.primary} style={style} />;
};

export const EditIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="pencil" size={size} color={color || theme.colors.primary} style={style} />;
};

export const DeleteIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="delete" size={size} color={color || theme.colors.primary} style={style} />;
};

export const LocationIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="map-marker" size={size} color={color || theme.colors.primary} style={style} />;
};

export const CalendarIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="calendar" size={size} color={color || theme.colors.primary} style={style} />;
};

export const LockIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="lock-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const UnlockIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="lock-open-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ShieldIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="shield-lock-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const EyeIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="eye-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const EyeOffIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="eye-off-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const BookmarkIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="bookmark-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ShareIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="share-variant" size={size} color={color || theme.colors.primary} style={style} />;
};

export const DownloadIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="download" size={size} color={color || theme.colors.primary} style={style} />;
};

export const UploadIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="upload" size={size} color={color || theme.colors.primary} style={style} />;
};

export const RefreshIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialCommunityIcons name="refresh" size={size} color={color || theme.colors.primary} style={style} />;
};

// Material Icons
export const FavoriteIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialIcons name="favorite" size={size} color={color || theme.colors.primary} style={style} />;
};

export const FavoriteBorderIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialIcons name="favorite-border" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ErrorIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialIcons name="error-outline" size={size} color={color || theme.colors.error} style={style} />;
};

export const WarningIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialIcons name="warning" size={size} color={color || '#FF9800'} style={style} />;
};

export const InfoIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <MaterialIcons name="info-outline" size={size} color={color || theme.colors.primary} style={style} />;
};

// Ionicons
export const ChevronRightIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <Ionicons name="chevron-forward" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <Ionicons name="chevron-back" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ChevronUpIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <Ionicons name="chevron-up" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ChevronDownIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <Ionicons name="chevron-down" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ArrowBackIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <Ionicons name="arrow-back" size={size} color={color || theme.colors.primary} style={style} />;
};

export const ArrowForwardIcon: React.FC<IconProps> = ({ size = IconSize.medium, color, style }) => {
  const theme = useTheme();
  return <Ionicons name="arrow-forward" size={size} color={color || theme.colors.primary} style={style} />;
};

// Export all icon libraries for custom usage
export { MaterialCommunityIcons, MaterialIcons, Ionicons };

/**
 * Usage Example:
 * 
 * import { HomeIcon, IconSize } from './components/Icons';
 * 
 * <HomeIcon size={IconSize.large} color="#FF0000" />
 */

