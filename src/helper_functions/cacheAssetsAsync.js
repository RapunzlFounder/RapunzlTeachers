import { Image } from 'react-native';

// import { Asset, Font } from 'react-native-unimodules';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image == 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function cacheAssetsAsync({ images = [], fonts = [] }) {
  return Promise.all([
    ...cacheImages(images),
    ...cacheFonts(fonts),
  ]);
}
