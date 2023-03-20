import { GetMenuQuery } from '@app/core/types';
import { categoriesSectionStyles } from '@app/modules/menu/components/categories-section/categories-section.styles';
import { CategorySectionViewRef } from '@app/modules/menu/components/category-section/category-section.component';
import React, { FC, RefObject } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CategoriesSectionProps {
  categories: GetMenuQuery['categories'];
  getRef: (key: string) => RefObject<CategorySectionViewRef>;
}

export const CategoriesSection: FC<CategoriesSectionProps> = ({
  categories,
  getRef,
}) => {
  const handleTouchCategoryButton = (id: string) => {
    const currentRef = getRef(`category-${id}`);
    currentRef.current?.scrollIntoMe();
  };

  return (
    <View>
      <Text style={categoriesSectionStyles.categoriesTitle}>Категорії</Text>
      <View style={categoriesSectionStyles.categoriesBtnsContainer}>
        {categories.map(category => (
          <TouchableOpacity
            style={categoriesSectionStyles.categoryBtn}
            key={`category-btn-${category.id}`}
            onPress={() => handleTouchCategoryButton(category.id)}>
            <Text style={categoriesSectionStyles.categoryBtnText}>
              {category.emoji} {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
