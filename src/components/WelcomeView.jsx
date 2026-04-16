import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

      {/* TITLE */}
      <Text style={styles.title}>Emma&apos;s Hair Salon</Text>

      {/* REAL HAIR SALON IMAGE */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1562322140-8baeececf3df' }}
        style={styles.heroImage}
      />

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>
        Book a service, repeat an appointment, or get a style suggestion.
      </Text>

      {/* PROMPTS */}
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

      {/* INPUT */}
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
    paddingTop: 50,
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

  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 15
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8228b6',
    marginBottom: 20
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