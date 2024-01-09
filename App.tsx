import { StyleSheet, View, Text, Pressable, TextInput, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView } from 'react-native'
import { useEffect } from 'react';
import { useFonts, Inter_600SemiBold, Inter_700Bold, Inter_400Regular, Inter_900Black } from '@expo-google-fonts/inter';
import React, { useState } from 'react'
import * as SplashScreen from 'expo-splash-screen';
import MarkdownDisplay from './components/MarkdownDisplay';

const template = `
# Markdown Editor

Hello **World**!
`;

export default function App() {
  const [fontLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);


  const [content, setContent] = useState(template);
  const [tab, setTab] = useState('edit');

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.page}>

      {
        tab === 'edit' ? (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={50}
              style={styles.input}
              textAlignVertical='top'
            />
          </KeyboardAvoidingView>
        ) : (
          <MarkdownDisplay>{content}</MarkdownDisplay>
        )
      }
      <View style={styles.tabContainer}>

        <Pressable onPress={() => setTab('edit')}
          style={[styles.tab, { borderColor: (tab === 'edit') ? 'mediumorchid' : 'gray' }]}>
          <Text style={[styles.tabText, {
            color: (tab === 'edit') ? 'mediumorchid' : 'gray'
          }]}>Edit</Text>
        </Pressable>

        <Pressable onPress={() => setTab('preview')}
          style={[styles.tab, {
            borderColor: (tab === 'preview') ? 'mediumorchid' : 'gray',
          }]}>
          <Text style={[styles.tabText, {
            color: (tab === 'preview') ? 'mediumorchid' : 'gray'
          }]}>Preview</Text>
        </Pressable>

      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10
  },
  tab: {
    flex: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  tabText: {
    fontFamily: 'InterBold'
  }
});

