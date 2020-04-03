import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import catch22Api from '../api/catch22delivery';

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState('');

  const getCategories = async () => {
    try {
      const response = await catch22Api.get('/categories', {
        params: {
          per_page: 50
        }
      });
      setCategories(response.data);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <Text style={styles.headerStyle}>Categories</Text>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <ScrollView
        style={styles.categoryBoxStyles}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
      >
        {categories.map((cat, i) => (
          <Text key={cat.id} style={styles.itemStyle}>
            {cat.name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 24,
    textAlign: 'center'
  },
  categoryBoxStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap'
    // justifyContent: 'center'
  },
  contentContainerStyle: {
    justifyContent: 'center'
  },
  itemStyle: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    margin: 4
  }
});

export default Categories;
