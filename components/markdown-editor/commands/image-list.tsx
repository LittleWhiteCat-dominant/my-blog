// HeaderList
import React, { useRef } from 'react';
import InputFile from './input-file';

interface ImageListProps {
  onSelectType?: (type: string, file?: File) => void;
}

const ImageList: React.FC<ImageListProps> = (props) => {
  const inputFile: React.RefObject<HTMLInputElement> = useRef();

  const handleClick = (type: string) => {
    switch(type) {
      case 'base64':
        if (inputFile.current) {
          inputFile.current.click();
        }
        break;
      case 'url':
        const { onSelectType } = props;
        if (typeof onSelectType === 'function') {
          onSelectType(type);
        }
        break;
      default:
        break;
    }

  }

  const onImageChanged = (file: File) => {
    const { onSelectType } = props;
    if (typeof onSelectType === 'function') {
      onSelectType('base64', file);
    }
  }

  return (
    <ul className="header-list">
      <li className="list-item">
        <view onClick={handleClick.bind(this, 'base64')}>
          <text>Base64</text>
          <InputFile
            accept='image/*'
            ref={inputFile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              if (e.target.files && e.target.files.length > 0) {
                onImageChanged(e.target.files[0]);
              }
            }}
          />
        </view>
      </li>
      <li className="list-item">
        <text onClick={handleClick.bind(this, 'url') }>Url</text>
      </li>
    </ul>
  );
}
export default ImageList;