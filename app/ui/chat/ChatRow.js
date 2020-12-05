import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class ChatRow extends React.Component {
  render(): React$Node {
    const {title, sender} = this.props;
    const isSender = this.props.sender === 'You';
    return (
      <View style={[isSender ? styles.sender : styles.receiver]}>
        <Text style={[styles.title, {color: isSender ? 'white' : 'black'}]}>
          {title}
        </Text>
        <Text style={[styles.subTitle, {color: isSender ? 'white' : 'black'}]}>
          {sender}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  receiver: {
    borderRadius: 8,
    padding: 5,
    margin: 3,
    marginRight: 40,
    backgroundColor: Colors.lighter,
  },
  sender: {
    borderRadius: 8,
    padding: 5,
    margin: 3,
    marginLeft: 40,
    backgroundColor: '#2B547E',
  },
});

export default ChatRow;
