import { getManyReferenceFilter } from '@app/common/data/get-many-reference-filter';
import { useDataProvider } from 'react-admin';

interface UseManyToManyInputOptions {
  joinResource: string;
  resourceField: string;
  referenceField: string;
}

interface MutateJoinResourceOptions {
  id: string;
  newReferences: string[];
}

export const useManyToManyInput = ({
  joinResource,
  resourceField,
  referenceField,
}: UseManyToManyInputOptions) => {
  const dataProvider = useDataProvider();

  const mutateJoinResource = async ({
    id,
    newReferences,
  }: MutateJoinResourceOptions) => {
    const prevReferences = await dataProvider.getManyReference(joinResource, {
      id,
      target: resourceField,
      ...getManyReferenceFilter,
    });

    const addedReferences = newReferences.filter((newReference) => {
      return !prevReferences.data?.find(
        (prevRef) => prevRef.id === newReference
      );
    });

    const removedReferences = prevReferences.data?.filter(
      (prevReference) => !newReferences.includes(prevReference.id)
    );

    if (addedReferences.length > 0) {
      await Promise.all(
        addedReferences.map((referenceId) => {
          const newOrdersMenuItem = {
            [resourceField]: id,
            [referenceField]: referenceId,
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
  };

  const fieldsProps = {
    joinResource,
    resourceField,
    referenceField,
  };

  return { mutateJoinResource, fieldsProps };
};
