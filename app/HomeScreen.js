import React, { Component } from 'react';
import { 
    Text,
    ListView,
    StyleSheet,
    View,
    Image
} from 'react-native';

const REQUEST_URL = 'https://api.github.com/search/repositories?q=topic:react%20native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home Screen',
    tabBarLabel: 'Repos',
  }
  

  constructor(props) {
      super(props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false
      }
  }  

  componentDidMount() {
      this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          loaded: true,
        })
      })
      .done()
  }

  render() {
     return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRepo}
          style={styles.listView}
        />
      );
  }

  renderRepo(repo) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: repo.owner.avatar_url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{repo.name}</Text>
          <Text style={styles.year}>{repo.description}</Text>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
