import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import UserInput from '../chat/UserInput';
import ChatScreen from '../chat/ChatScreen';

class HomeScreen extends React.Component {
  render(): React$Node {
    console.log('USER -->' + this.props.username);
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        {!this.props.username ? (
          <UserInput />
        ) : (
          <ChatScreen username={this.props.username} />
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const {
    chat: {username},
  } = state;
  return {username};
};

export default connect(mapStateToProps)(HomeScreen);
