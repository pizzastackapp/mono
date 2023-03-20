import { FC } from 'react';
import { useRecordContext } from 'react-admin';

interface CustomTitleProps {
  source: string;
}

export const CustomTitle: FC<CustomTitleProps> = ({ source }) => {
  const record = useRecordContext();

  if (!record) {
    return null;
  }

  return <div>{record[source]}</div>;
};
