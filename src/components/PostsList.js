import React from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { Context as PostsContext } from '../context/PostsContext';
import DeliveryListItem from './DeliveryListItem';

const PostsList = ({ catState }) => {
  const { state, fetchPosts } = React.useContext(PostsContext);

  React.useEffect(() => {
    fetchPosts(catState.selString);
  }, [catState.selString]);

  if (state.posts.length === 0) {
    return <ActivityIndicator size={60} />;
  }
  return (
    <>
      {state.errorMsg ? <Text>{state.errorMsg}</Text> : null}
      <FlatList
        horizontal
        data={state.posts}
        keyExtractor={(post) => post.slug}
        renderItem={({ item }) => {
          return <DeliveryListItem post={item} />;
        }}
      />
    </>
  );
};

export default PostsList;
