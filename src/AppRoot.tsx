import React from 'react'
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DataSource} from 'typeorm/browser';

import { Category } from './entities/category';
import { Author } from './entities/author';
import { Post } from './entities/post';

interface IAppProps {

}

interface IAppState {
  progress: string;
  loadedPost: Post | null;
  savedPost: boolean
}

const dataSource = new DataSource({
   database: "test19",
      driver: require('expo-sqlite'),
      entities: [
         Category,
          Author,
          Post
      ],
      synchronize: true,
      type: "expo",
    
})

export default class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      loadedPost: null,
      progress: 'Post is being saved',
      savedPost: false,
    };
    this.runDemo();
  }

  connect() {
    return dataSource.initialize()
  }
 

  async runDemo() {
   const source = await this.connect();
    
    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const author = new Author();
    author.name = "Person";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
    post.categories = [category1, category2];
    post.author = author;

    const postRepository = source.getRepository(Post);
    await postRepository.save(post);

    console.log("Post has been saved");
    this.setState({
      progress: "Post has been saved"
    });

    const loadedPost = await postRepository.findOne({where: {id: post.id}, relations: ["author", "categories"]});

    if (loadedPost) {
      console.log("Post has been loaded: ", loadedPost);
      this.setState({
        loadedPost: loadedPost
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the Expo Example for TypeORM!
        </Text>
        <Text style={styles.small}>
          {this.state.progress}
        </Text>
        <Text style={styles.small}>
          {JSON.stringify(this.state.loadedPost)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  small: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
