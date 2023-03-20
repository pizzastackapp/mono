import { useGetSettingsQuery } from '@app/core/types';
import { SettingEditToolbar } from '@app/modules/settings/components/setting-edit-toolbar/setting-edit-toolbar.component';
import {
  Edit,
  Loading,
  ReferenceInput,
  SelectInput,
  SimpleForm,
} from 'react-admin';

export const SettingEdit = () => {
  const { data, loading } = useGetSettingsQuery();

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <Edit
      mutationMode="pessimistic"
      title="Налаштування"
      id={data.settings[0].id}
      resource="settings"
    >
      <SimpleForm toolbar={<SettingEditToolbar />}>
        <ReferenceInput source="drinks_category" reference="categories">
          <SelectInput optionText="title" label="Категорія напоїв" fullWidth />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
