import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ChatRow from './ChatRow';
import SenderView from './SenderView';
import {connect} from 'react-redux';

class ChatScreen extends React.Component {
  listViewRef;
  renderItem = ({item: {title, sender}}) => {
    return <ChatRow title={title} sender={sender} />;
  };

  scrollToEnd = () => {
    this.listViewRef.scrollToEnd({animated: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => {
            this.listViewRef = ref;
          }}
          style={styles.list}
          data={this.props.items}
          renderItem={this.renderItem}
        />
        <SenderView
          username={this.props.username}
          scrollToEnd={this.scrollToEnd}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    padding: 8,
  },
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const {
    chat: {items},
  } = state;
  return {items};
};
export default connect(mapStateToProps)(ChatScreen);
