import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView';
import WelcomeView from './WelcomeView';

export default function () {
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());

    scrollToBottom(false);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputBarText.trim().length === 0) return;

    const userMessage = { direction: 'right', text: inputBarText };
    const botResponses = handleInput(inputBarText);

    const newMessages = [
      userMessage,
      ...botResponses.map((message) => ({ direction: 'left', text: message }))
    ];

    setMessages((prev) => [...prev, ...newMessages]);
    setInputBarText('');
  };

  const sendPromptMessage = (promptText) => {
    const userMessage = { direction: 'right', text: promptText };
    const botResponses = handleInput(promptText);

    const newMessages = [
      userMessage,
      ...botResponses.map((message) => ({ direction: 'left', text: message }))
    ];

    setMessages((prev) => [...prev, ...newMessages]);
    setInputBarText('');
  };

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {messages.length ? (
          <ChatView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            scrollViewRef={scrollViewRef}
            styles={styles}
            messages={messages}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
          />
        ) : (
          <WelcomeView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
            onPromptPress={sendPromptMessage}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  }
});