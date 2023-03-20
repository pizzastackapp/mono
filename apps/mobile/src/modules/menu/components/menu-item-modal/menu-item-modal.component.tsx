import { Button } from '@app/common/components/button/button.component';
import { RoundButton } from '@app/common/components/round-button/round-button.component';
import { useCloudinaryImage } from '@app/common/hooks/use-cloudinary-image.hook';
import { useGetMenuQuery } from '@app/core/types';
import { menuItemModalStyles } from '@app/modules/menu/components/menu-item-modal/menu-item-modal.styles';
import { menuImageSize } from '@app/modules/menu/utils/menu-image-size';
import React from 'react';
import { FC } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import CrossIcon from '@app/assets/icons/cross.svg';
import PlusIcon from '@app/assets/icons/plus.svg';
import MinusIcon from '@app/assets/icons/minus.svg';
import { useNavigation } from '@react-navigation/native';

interface MenuItemModalProps {}

export const MenuItemModal: FC<MenuItemModalProps> = ({}) => {
  const { data } = useGetMenuQuery({ nextFetchPolicy: 'cache-only' });
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;
  const { width, height } = menuImageSize({
    width: windowWidth,
    originalHeight: 241,
    originalWidth: 375,
  });

  const transformations = [`w_${width}`, `h_${height}`];
  const image = useCloudinaryImage(
    data?.categories[1].menu_items[2].image!,
    transformations,
  );
  const pizza = data?.categories[1].menu_items[2]!;

  if (!data) {
    return null;
  }

  return (
    <View style={menuItemModalStyles.overlay}>
      <View style={menuItemModalStyles.wrapper}>
        <Image
          style={menuItemModalStyles.itemImage}
          source={{
            uri: image.createCloudinaryURL(),
          }}
        />
        <RoundButton
          buttonStyle={menuItemModalStyles.closeButton}
          onPress={() => navigation.goBack()}>
          <CrossIcon />
        </RoundButton>
        <View style={menuItemModalStyles.infoWrapper}>
          <View style={menuItemModalStyles.mainInfoWrapper}>
            <Text style={menuItemModalStyles.title}>{pizza.title}</Text>
            <Text style={menuItemModalStyles.price}>{pizza.price} грн.</Text>
          </View>
          <Text style={menuItemModalStyles.ingredients}>
            {pizza.ingredients}
          </Text>
        </View>
        {/** @TODO add flex gap between elements 16px */}
        <View style={menuItemModalStyles.cartActionsWrapper}>
          <View style={menuItemModalStyles.changeCartWrapper}>
            <RoundButton size="LARGE">
              <MinusIcon />
            </RoundButton>
            <Text style={menuItemModalStyles.cartQuantity}>2</Text>
            <RoundButton size="LARGE">
              <PlusIcon />
            </RoundButton>
          </View>
          <Button label="Додати в корзину" />
        </View>
      </View>
    </View>
  );
};
