// const fs = require('fs');
const f = require('faker');
// function write(data) {
//   fs.writeFile('./copy.json', data, err => {
//     if (err) {
//       throw err;
//     }
//     console.log('data successfully write');
//   });
// }
// fs.readFile('./package.json', 'utf-8', (err, data) => {
//   if (!err) {
//     write(data);
//   } else {
//     console.log(`${err} data`);
//   }
// });

// function read(filename) {
//   return new Promise((res, rej) => {
//     fs.readFile(filename, 'utf-8', (err, data) => {
//       if (!err) {
//         res(data);
//       } else {
//         rej(err);
//       }
//     });
//   });
// }

// read('./package.json').then(op => console.log(op));

// function write(newFile, data) {
//   return new Promise((res, rej) => {
//     fs.writeFile(newFile, data, err => {
//       if (err) {
//         rej(err);
//       }
//       res();
//     });
//   });
// }
// read('./package.json')
//   .then(res => write('./other.json', res))
//   .then(log => console.log(log));

// function readAllFile(fileNames) {
//   return new Promise((res, rej) => {
//     fs.readFile(fileNames, 'utf-8', (err, data) => {
//       if (!err) {
//         res(data);
//       } else {
//         rej(err);
//       }
//     });
//   });
// }

// const fileArray = [
//   './another.json',
//   './copy.json',
//   './other.json',
//   './package-lock.json',
//   './package.json'
// ];

// Promise.all(fileArray.map(files => readAllFile(files))).then(data =>
//   console.log(data)
// );

// function write(filePath, data) {
//   return new Promise((res, rej) => {
//     fs.writeFile(filePath, data, err => {
//       if (err) {
//         rej(err);
//       }
//       res();
//     });
//   });
// }

// Promise.all(
//   fileArray.map(file =>
//     readAllFile(file).then(newFileName => write(`./copyFiles/${file}`, newFileName))
//   )
// ).then(console.log('success'));

console.log(f.fake('{{lorem.words}}'));
