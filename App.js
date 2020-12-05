/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './app/data/reducer';
import HomeScreen from './app/ui/screens/HomeScreen';

const store = createStore(reducer);

class App extends React.Component {
  render(): React$Node {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
