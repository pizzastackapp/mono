import { Create, SimpleForm, TextInput } from 'react-admin';

export const CategoryCreate = () => (
  <Create title="Створити категорію">
    <SimpleForm>
      <TextInput source="title" label="Назва" />
      <TextInput source="slug" label="Слаг" />
      <TextInput source="emoji" label="Емодзі" />
    </SimpleForm>
  </Create>
);
