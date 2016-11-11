// A sample image file:
export const imageFile='Z/image.jpg';
export const imageFileSize=32764;
export const exifKey0='Make';
export const exifValue0='Canon';

// Our test bucket: https://s3.amazonaws.com/waldo-recruiting
export const bucketSpec={
  endPoint: 's3.amazonaws.com',
  bucket: 'waldo-recruiting'
};

// This bucket contains 129 photos:
export const sampleLength=129;
export const firstPhotoId=
  '0003b8d6-d2d8-4436-a398-eab8d696f0f9.68cccdd4-e431-457d-8812-99ab561bf867.jpg';
export const firstPhotoSize=6306109;

// Out test mongodb data base runs locally:
export const dbSpec= {
  url:'mongodb://localhost:27017/test',
};


