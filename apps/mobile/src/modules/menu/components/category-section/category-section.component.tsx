import { GetMenuQuery } from '@app/core/types';
import { categorySectionStyles } from '@app/modules/menu/components/category-section/category-section.styles';
import { MenuItem } from '@app/modules/menu/components/menu-item/menu-item.component';
import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useState,
} from 'react';
import {
  View,
  Text,
  LayoutChangeEvent,
  LayoutRectangle,
  ScrollView,
} from 'react-native';

interface CategorySectionProps {
  category: GetMenuQuery['categories'][0];
  scrollViewRef: RefObject<ScrollView>;
}

export type CategorySectionViewRef = View & {
  scrollIntoMe: () => void;
};

export const CategorySection = forwardRef<View, CategorySectionProps>(
  ({ category, scrollViewRef }, ref) => {
    const [layout, setLayout] = useState<LayoutRectangle | null>(null);
    const handleOnLayout = (event: LayoutChangeEvent) => {
      setLayout(event.nativeEvent.layout);
    };

    useImperativeHandle<View, CategorySectionViewRef>(
      ref,
      // @ts-ignore
      () => {
        return {
          scrollIntoMe: () => {
            if (!layout) {
              return;
            }

            scrollViewRef.current?.scrollTo({ y: layout.y - 16 });
          },
        };
      },
      [layout, scrollViewRef],
    );

    return (
      <View
        ref={ref}
        onLayout={handleOnLayout}
        style={categorySectionStyles.main}>
        <Text style={categorySectionStyles.categoryTitle}>
          {category.title}
        </Text>
        <View style={categorySectionStyles.pizzaCardWrapper}>
          {category.menu_items.map(menuItem => (
            <MenuItem key={`menuItem-${menuItem.id}`} item={menuItem} />
          ))}
        </View>
      </View>
    );
  },
);
