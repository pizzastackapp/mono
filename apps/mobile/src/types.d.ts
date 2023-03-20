declare module 'use-dynamic-refs' {
  const useDynamicRefs: <T>() => ((key: string) => React.RefObject<T>)[];
  export default useDynamicRefs;
}

declare module '@env' {
  export const HASURA_URL: string;
  export const NODE_ENV: string;
  export const CLOUDINARY_CLOUD_NAME: string;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
