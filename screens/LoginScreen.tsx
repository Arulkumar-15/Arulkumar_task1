import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
  IconButton,
  Chip,
  Avatar,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateMobileNumber = (number: string): boolean => {
    // Basic validation: 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const handleSendOTP = () => {
    setMobileError('');
    
    if (!mobileNumber.trim()) {
      setMobileError('Mobile number is required');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleLogin = () => {
    setOtpError('');
    
    if (!otp.trim()) {
      setOtpError('OTP is required');
      return;
    }

    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }

    // Mock OTP validation - accept any 6-digit OTP
    if (otp === '123456') {
      onLoginSuccess();
    } else {
      setOtpError('Invalid OTP. Try 123456');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Header with Icon */}
        <View style={styles.header}>
          <View 
            style={[
              styles.iconContainer, 
              { backgroundColor: theme.colors.primaryContainer }
            ]}
          >
            <MaterialCommunityIcons 
              name="shield-lock-outline" 
              size={60} 
              color={theme.colors.primary}
            />
          </View>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.onBackground }]}
          >
            Welcome Back
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Sign in with your mobile number
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.content}>
          <View style={styles.form}>
            {/* Mobile Number Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChangeText={(text) => {
                  setMobileNumber(text.replace(/[^0-9]/g, ''));
                  setMobileError('');
                }}
                mode="outlined"
                keyboardType="phone-pad"
                maxLength={10}
                error={!!mobileError}
                disabled={otpSent}
                style={styles.input}
                left={<TextInput.Icon icon="cellphone" />}
                right={
                  otpSent ? (
                    <TextInput.Icon icon="check-circle" color={theme.colors.primary} />
                  ) : null
                }
                placeholder="Enter your mobile number"
                outlineStyle={styles.inputOutline}
              />
              {mobileError ? (
                <View style={styles.errorContainer}>
                  <MaterialIcons 
                    name="error-outline" 
                    size={20} 
                    color={theme.colors.error}
                    style={styles.errorIcon}
                  />
                  <Text style={[styles.errorText, { color: theme.colors.error }]}>
                    {mobileError}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Send OTP Button */}
            {!otpSent && (
              <Button
                mode="contained"
                onPress={handleSendOTP}
                disabled={isLoading}
                loading={isLoading}
                style={styles.button}
                contentStyle={styles.buttonContent}
                icon="send"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            )}

            {/* OTP Input Section */}
            {otpSent && (
              <Animated.View style={styles.otpSection}>
                <Chip
                  icon="information"
                  mode="flat"
                  style={[styles.chip, { backgroundColor: theme.colors.secondaryContainer }]}
                  textStyle={{ color: theme.colors.onSecondaryContainer }}
                >
                  OTP sent to +91 {mobileNumber}
                </Chip>

                <View style={styles.inputWrapper}>
                  <TextInput
                    label="Enter OTP"
                    value={otp}
                    onChangeText={(text) => {
                      setOtp(text.replace(/[^0-9]/g, ''));
                      setOtpError('');
                    }}
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={6}
                    error={!!otpError}
                    style={styles.input}
                    left={<TextInput.Icon icon="lock-outline" />}
                    placeholder="Enter 6-digit OTP"
                    outlineStyle={styles.inputOutline}
                  />
                  {otpError ? (
                    <View style={styles.errorContainer}>
                      <MaterialIcons 
                        name="error-outline" 
                        size={20} 
                        color={theme.colors.error}
                        style={styles.errorIcon}
                      />
                      <Text style={[styles.errorText, { color: theme.colors.error }]}>
                        {otpError}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <Surface
                  style={[styles.hintCard, { backgroundColor: theme.colors.surfaceVariant }]}
                  elevation={0}
                >
                  <MaterialCommunityIcons 
                    name="lightbulb-on-outline" 
                    size={24} 
                    color={theme.colors.primary}
                  />
                  <Text
                    variant="bodySmall"
                    style={[styles.hintText, { color: theme.colors.onSurfaceVariant }]}
                  >
                    For testing, use OTP: <Text style={{ fontWeight: 'bold' }}>123456</Text>
                  </Text>
                </Surface>

                <Button
                  mode="contained"
                  onPress={handleLogin}
                  disabled={otp.length !== 6}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  icon="login"
                >
                  Login
                </Button>

                <Button
                  mode="text"
                  onPress={() => {
                    setOtpSent(false);
                    setOtp('');
                    setOtpError('');
                  }}
                  style={styles.textButton}
                  icon="pencil"
                >
                  Change Mobile Number
                </Button>
              </Animated.View>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            variant="bodySmall"
            style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}
          >
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorIcon: {
    marginRight: 4,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
  form: {
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 13,
    flex: 1,
  },
  button: {
    borderRadius: 12,
    marginTop: 4,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  textButton: {
    marginTop: -8,
  },
  otpSection: {
    gap: 20,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  hintCard: {
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -8,
  },
  hintText: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default LoginScreen;

