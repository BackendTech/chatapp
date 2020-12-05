import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {addUser} from '../../data/chat/actions';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onUserNameChange = (username) => {
    this.setState({userEntered: username});
  };

  addUser = () => {
    console.log('added ->', this.state.userEntered);
    this.props.addUser(this.state.userEntered);
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder={'Enter username!'}
            onChangeText={this.onUserNameChange}
            value={this.state.userEntered}
            style={styles.input}
          />
          <Button title="SUBMIT" style={styles.button} onPress={this.addUser} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', flex: 1},
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
    addUser: (username) => {
      dispatch(addUser(username));
    },
  };
};
export default connect(null, mapDispatchToProps)(UserInput);
