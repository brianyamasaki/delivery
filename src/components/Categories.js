import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import catch22Api from '../api/catch22delivery';
import { Context as CategoriesContext } from '../context/CategoryContext';
import CategoryButton from './CategoryButton';
import { FontAwesome } from '@expo/vector-icons';

const Categories = ({ style }) => {
  const { state, fetchCategories, toggleCategory } = React.useContext(
    CategoriesContext
  );
  const [showDropdown, setShowDropdown] = React.useState(false);

  const textFromSelectedCategories = () => {
    const catStrings = [];
    state.selectedCategories.forEach((sel, i) => {
      if (sel) {
        catStrings.push(state.categories[i].name);
      }
    });
    return catStrings.join(', ');
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  if (state.categories.length === 0) {
    return null;
  }
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <View style={styles.rowStyle}>
          {showDropdown ? (
            <FontAwesome name='chevron-up' size={30} />
          ) : (
            <FontAwesome name='chevron-down' size={30} />
          )}
          <View>
            <Text style={styles.headerStyle}>Categories</Text>
            <Text style={styles.subHeadStyle}>
              {textFromSelectedCategories()}
            </Text>
          </View>
          {showDropdown ? (
            <FontAwesome name='chevron-up' size={30} />
          ) : (
            <FontAwesome name='chevron-down' size={30} />
          )}
        </View>
      </TouchableOpacity>
      {state.errorMsg ? <Text>{state.errorMsg}</Text> : null}
      {!showDropdown ? null : (
        <View style={styles.categoryBoxStyles}>
          {state.categories.map((cat, i) => (
            <CategoryButton
              key={cat.id}
              cat={cat}
              isSelected={state.selectedCategories[i]}
              toggleCategory={() => toggleCategory(i)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

Categories.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'center'
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subHeadStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 2
  },
  categoryBoxStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  },
  contentContainerStyle: {
    justifyContent: 'center'
  },
  itemStyle: {
    margin: 4
  }
});

export default Categories;
