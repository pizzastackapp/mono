import { getManyReferenceFilter } from '@app/common/data/get-many-reference-filter';
import { JoinedOrdersMenuItem } from '@app/modules/orders/order.types';
import { useDataProvider } from 'react-admin';

interface MutateOptions {
  id: string;
  newReferences: JoinedOrdersMenuItem[];
}

export const useMenuOrderInput = () => {
  const dataProvider = useDataProvider();

  const joinResource = 'orders_menu';
  const resourceField = 'order_id';
  const referenceField = 'menu_id';

  const mutate = async ({ id, newReferences }: MutateOptions) => {
    const prevReferences = await dataProvider.getManyReference(joinResource, {
      id,
      target: resourceField,
      ...getManyReferenceFilter,
    });

    const addedReferences = newReferences.filter((newReference) => {
      return !newReference.id;
    });

    const removedReferences = prevReferences.data?.filter(
      (prevReference) =>
        !newReferences.some((ref) => ref.id === prevReference.id)
    );

    const editedReferences = newReferences.filter((newRef) => {
      const prevRef = prevReferences.data?.find((ref) => ref.id === newRef.id);

      if (!prevRef) {
        return false;
      }

      return (
        newRef.menu_id !== prevRef.menu_id || newRef.amount !== prevRef.amount
      );
    });

    if (addedReferences.length > 0) {
      await Promise.all(
        addedReferences.map((reference) => {
          const newOrdersMenuItem = {
            [resourceField]: id,
            [referenceField]: reference.menu_id,
            amount: reference.amount,
          };

          return dataProvider.create(joinResource, {
            data: newOrdersMenuItem,
          });
        })
      );
    }

    if (removedReferences.length > 0) {
      const removedIds = removedReferences.map(
        (removedReference) => removedReference.id
      );
      await dataProvider.deleteMany(joinResource, { ids: removedIds });
    }

    if (editedReferences.length > 0) {
      await Promise.all(
        editedReferences.map((reference) => {
          const data = {
            id: reference.id,
            [referenceField]: reference.menu_id,
            amount: reference.amount,
          };

          const previousData = prevReferences.data.find(
            (prefRef) => prefRef.id === reference.id
          );

          return dataProvider.update(joinResource, {
            id: reference.id!,
            data,
            previousData,
          });
        })
      );
    }
  };

  return { mutate };
};
