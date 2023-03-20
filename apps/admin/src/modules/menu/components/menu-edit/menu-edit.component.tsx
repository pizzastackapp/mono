import { CloudinaryInput } from '@app/common/components/cloudinary-input/cloudinary-input.component';
import { CustomTitle } from '@app/common/components/custom-title/custom-title.component';
import {
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const MenuEdit = () => (
  <Edit title={<CustomTitle source="title" />} mutationMode="pessimistic">
    <SimpleForm>
      <TextInput source="title" fullWidth label="Назва" />
      <ReferenceInput source="category_id" reference="categories">
        <SelectInput optionText="title" label="Категорія" />
      </ReferenceInput>
      <CloudinaryInput source="image" label="Фото" />
      <TextInput source="ingredients" fullWidth label="Інгридієнти" />
      <NumberInput source="price" label="Ціна в грн." />
      <NumberInput source="weight" label="Вага в гр." />
    </SimpleForm>
  </Edit>
);
