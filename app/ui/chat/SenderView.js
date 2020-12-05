import React from 'react';
import io from 'socket.io-client';
import {Button, StyleSheet, TextInput} from 'react-native';
import {addMessage} from '../../data/chat/actions';
import {connect} from 'react-redux';

let count = 1;
class SenderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = io('http://192.168.3.70:3001/');
    this.socket.on('connect', this.onConnect);
    this.socket.on('message', this.onEvent);
    this.socket.on('disconnect', this.onDisconect);
  }

  onConnect = () => {
    console.log('Connected ---->');
  };

  onEvent = ({value, sender}) => {
    const {addMessage} = this.props;
    addMessage({id: 'Id_' + count, title: value, sender: sender});
    count++;
    this.props.scrollToEnd();
  };

  onDisconect = () => {
    console.log('onDisconect ---->');
  };

  sendMessage = () => {
    const {value} = this.state;
    const {username, addMessage} = this.props;
    if (!value) {
      return;
    }
    this.setState({value: undefined});
    this.socket.emit('message', {value: value, sender: username});
    addMessage({id: 'Id_' + count, title: value, sender: 'You'});
    count++;
  };

  onTextChange = (text) => {
    this.setState({value: text});
  };

  render(): React$Node {
    return (
      <>
        <TextInput
          placeholder={"What's UP!"}
          onChangeText={this.onTextChange}
          value={this.state.value}
          style={styles.input}
        />
        <Button title="SEND" style={styles.button} onPress={this.sendMessage} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    padding: 8,
    margin: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (data) => {
      dispatch(addMessage(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(SenderView);
