import { FC, ChangeEventHandler } from 'react';
import { Button } from '@mui/material';
import { Apikey, imgbbUrl } from 'core/lib/imgbb';

const FileLoader: FC = () => {
  const handleCapture: ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    if (!files) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = async () => {
      if (!fileReader.result) return;

      const payload = JSON.stringify({ key: Apikey, image: fileReader.result });

      await fetch(imgbbUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload,
      });
    };
  };

  return (
    <>
      <input
        accept='image/*'
        style={{ display: 'none' }}
        id='raised-button-file'
        multiple
        onChange={handleCapture}
        type='file'
      />

      <label htmlFor='raised-button-file'>
        <Button variant='text' component='span'>
          Добавить фотографии
        </Button>
      </label>
    </>
  );
};

export default FileLoader;
