import { cloudinary } from '@app/core/cloudinary';
import { AdvancedImage } from '@cloudinary/react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from '@mui/material';
import { FC, useRef } from 'react';
import { Button } from 'react-admin';

interface CloudinaryInputUIProps {
  label: string;
  disabled: boolean;
  onImageSelected: (image: File) => void;
  value?: string;
  fitImage?: boolean;
}

export const CloudinaryInputUI: FC<CloudinaryInputUIProps> = ({
  label,
  disabled,
  onImageSelected,
  value,
  fitImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }

    const [file] = Array.from(e.target.files);

    onImageSelected(file);
  };

  const onUploadClick = () => {
    inputRef.current?.click();
  };

  const image = cloudinary.image(value);
  const transformations = ['w_384', 'h_240', 'dpr_2.0'];

  if (fitImage) {
    transformations.push('c_pad');
  }

  image.addTransformation(transformations.join(','));

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileInputChange}
      />
      <Card variant="outlined">
        <CardHeader title={label} />
        <CardContent>
          {value ? (
            // @ts-expect-error
            <AdvancedImage cldImg={image} width={384} height={240} />
          ) : (
            <Skeleton variant="rectangular" width={384} height={240} />
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={onUploadClick}
            disabled={disabled}
          >
            <Typography>Завантажити</Typography>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
