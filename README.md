# Local Image Resizing
https://github.com/GoogleChromeLabs/squoosh

squoosh App에서 제공하는 라이브러리로 한번에 많은 이미지를 돌립시다. 


```bash
npm run resize
```

1. input 폴더에 변경할 이미지들을 담습니다.

2. 변경할 사이즈나 퀄리티를 조정합니다

```js
// 30줄
await image.encode({
// 자세한 옵션은 다음 링크에서 확인할 수 있습니다.
// https://github.com/GoogleChromeLabs/squoosh/blob/dev/src/features/encoders/webP/client/index.tsx
    webp: {
        quality: 90, // 변경 
    },
});

// 60줄
const inputDirectory = __dirname + "/input";
const outputDirectory = __dirname + "/output";
const resizeWidth = 150; // RESIZE 인자
const resizeHeight = 150; // RESIZE 인자

processImagesInDirectory(
  inputDirectory,
  outputDirectory,
  resizeWidth,
  resizeHeight
);
```

