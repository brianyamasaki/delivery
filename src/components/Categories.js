import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import catch22Api from '../api/catch22delivery';
import { Context as CategoriesContext } from '../context/CategoryContext';

const Categories = ({ style }) => {
  const { state, fetchCategories, toggleCategory } = React.useContext(
    CategoriesContext
  );

  React.useEffect(() => {
    fetchCategories();
  }, []);

  if (state.categories.length === 0) {
    return null;
  }
  return (
    <View style={style}>
      <Text style={styles.headerStyle}>Categories</Text>
      {state.errorMsg ? <Text>{state.errorMsg}</Text> : null}
      <ScrollView
        style={styles.categoryBoxStyles}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
      >
        {state.categories.map((cat, i) => {
          if (state.selectedCategories[i]) {
            return (
              <Button
                key={cat.id}
                style={styles.itemStyle}
                title={cat.name}
                iconRight
                icon={
                  <FontAwesome
                    name='check'
                    size={20}
                    style={{ color: 'white', paddingLeft: 3 }}
                  />
                }
                onPress={() => toggleCategory(i)}
              />
            );
          }
          return (
            <Button
              key={cat.id}
              style={styles.itemStyle}
              title={cat.name}
              type='outline'
              onPress={() => toggleCategory(i)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

Categories.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5
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
    margin: 4
  }
});

export default Categories;
