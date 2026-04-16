import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import InputBar from './InputBar';

export default function ({
  scrollToBottom,
  sendMessage,
  setInputBarText,
  inputBarText,
  onPromptPress
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Emma&apos;s Hair Salon Assistant</Text>
        <Text style={styles.subtitle}>
          Book a service, repeat a past appointment, or let the assistant suggest a style for you.
        </Text>

        <View style={styles.promptContainer}>
          <TouchableOpacity
            style={styles.promptButton}
            onPress={() => onPromptPress('repeat last appointment')}
          >
            <Text style={styles.promptText}>Repeat last appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.promptButton}
            onPress={() => onPromptPress('show services')}
          >
            <Text style={styles.promptText}>Show services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.promptButton}
            onPress={() => onPromptPress('suggest a style')}
          >
            <Text style={styles.promptText}>Suggest a style</Text>
          </TouchableOpacity>
        </View>
      </View>

      <InputBar
        onSendPressed={sendMessage}
        onSizeChange={() => scrollToBottom(false)}
        onChangeText={setInputBarText}
        text={inputBarText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'white'
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8228b6',
    marginBottom: 30
  },

  promptContainer: {
    gap: 12,
    marginBottom: 20
  },

  promptButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },

  promptText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#631aa7'
  }
});