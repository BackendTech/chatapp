/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import io from 'socket.io-client';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

let count = 1;
const USER_NAME = Platform.OS == 'ios' ? 'GAJENDRA' : 'ATUL';
class App extends React.Component {
  listViewRef;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.socket = io('http://203.212.221.239:3001/');
    this.socket.on('connect', this.onConnect);
    this.socket.on('message', this.onEvent);
    this.socket.on('disconnect', this.onDisconect);
  }

  onConnect = () => {
    console.log('Connected ---->');
  };
  onEvent = ({value, sender}) => {
    const {data} = this.state;
    this.setState({
      data: [...data, {id: 'Id_' + count, title: value, sender: sender}],
    });
    count++;
    this.listViewRef.scrollToEnd({animated: true});
  };
  onDisconect = () => {
    console.log('onDisconect ---->');
  };

  sendMessage = () => {
    const {value, data} = this.state;
    if (!value) {
      return;
    }
    this.socket.emit('message', {value: value, sender: USER_NAME});
    this.setState({
      data: [...data, {id: 'Id_' + count, title: value, sender: 'You'}],
      value: undefined,
    });
    count++;
  };
  renderItem = ({item: {title, sender}}) => {
    return (
      <View style={[sender === 'You' ? styles.sender : styles.receiver]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{sender}</Text>
      </View>
    );
  };

  onTextChange = (text) => {
    this.setState({value: text});
  };

  render(): React$Node {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <FlatList
                ref={(ref) => {
                  this.listViewRef = ref;
                }}
              style={styles.list}
              data={this.state.data}
              renderItem={this.renderItem}
            />
            <TextInput
              onChangeText={this.onTextChange}
              value={this.state.value}
              style={styles.input}
            />
            <Button
              title="Send"
              style={styles.button}
              onPress={this.sendMessage}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighter,
    flex: 1,
    flexDirection: 'column',
    padding: 8,
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
  list: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    padding: 8,
    margin: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  receiver: {
    padding: 5,
    margin: 3,
    marginRight: 40,
    backgroundColor: 'white',
  },
  sender: {
    padding: 5,
    margin: 3,
    marginLeft: 40,
    backgroundColor: 'white',
  },
});

export default App;
