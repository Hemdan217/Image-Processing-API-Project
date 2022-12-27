import path from 'path';
import fs, { existsSync } from 'fs';
// eslint-disable-next-line import/no-unresolved, import/extensions
import create from '../utilities/create';
// eslint-disable-next-line import/no-unresolved, import/extensions
import resize from '../utilities/resize';

const imagesFolder = path.resolve(process.cwd(), './assets/images');
const thumbFolder = path.resolve(process.cwd(), './assets/thumb');
// eslint-disable-next-line spaced-comment
///// Make sure to  all the files in thumbFolder
fs.readdir(thumbFolder, (err, files) => {
  if (err) throw err;

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-shadow
    fs.unlink(path.join(thumbFolder, file), err => {
      if (err) throw err;
    });
  }
});

// eslint-disable-next-line no-console
// console.log(thumbFolder);

describe('2. Checking The Utilities', () => {
  it('2.1 should return a Generated image', async () => {
    const outputFile = path.join(
      thumbFolder,
      `placeholder_${444}_${500}_${238}_${10}.jpg`
    );
    await create(outputFile, 444, 500, 238, 10, 240);
    /// Check if it was generated and exists
    expect(existsSync(outputFile)).toEqual(true);
  });

  it('2.2 should return a resized image', async () => {
    const imagePath = 'santamonica';
    const width = 640;
    const height = 800;
    const outputFile = path.join(
      thumbFolder,
      `${imagePath}_${width}_${height}.jpg`
    );
    await resize(imagesFolder, imagePath, outputFile, width, height);
    /// Check if it was resized and exists
    expect(existsSync(outputFile)).toEqual(true);
  });

  it('2.3 should return a false becuase we send it a wrong file', async () => {
    const imagePath = 'ffff';
    const width = 640;
    const height = 800;
    const outputFile = path.join(
      thumbFolder,
      `${imagePath}_${width}_${height}.jpg`
    );

    resize(imagesFolder, imagePath, outputFile, width, height);
    expect(existsSync(outputFile)).toEqual(false);
  });
  it('2.4 should return a the number of files in thumbFolder 3 = > Genrated from tests 2.1 2.2 1.1 ', async () => {
    fs.readdir(thumbFolder, (err, files) => {
      expect(files.length).toEqual(3);
    });
  });
});
