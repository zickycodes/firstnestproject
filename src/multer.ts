// So Imagine I am uploading a file to a nest.js rest  API server from a client side, and I want to be able to keep track of the progress of the file upload on the server and relay that to the client visually. Give me a code sample for how I would do that with multer on the server

// Sure! Here's an example code snippet using Multer middleware to upload a file and track the progress of the upload on the server:

// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as multer from 'multer';

// @Controller('file')
// export class FileController {
//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file', {
//     storage: multer.memoryStorage(),
//     limits: {
//       fileSize: 1024 * 1024 * 10, // 10 MB
//     },
//   }))
//   async uploadFile(@UploadedFile() file: Express.Multer.File) {
//     // handle uploaded file
//   }
// }

// In this example, we're using the FileInterceptor from NestJS, which wraps the multer middleware to handle file uploads. The FileInterceptor takes two arguments: the name of the file field in the request (in this case, file), and an options object that configures how the file should be uploaded.

// The storage option specifies that we want to store the uploaded file in memory (i.e. RAM), rather than on disk. This is useful for small files or cases where we don't want to save the file permanently on the server.

// The limits option specifies that we want to limit the maximum size of the uploaded file to 10 MB. This is a good practice to prevent denial-of-service attacks and other security issues.

// When a file is uploaded, multer will read it into memory and pass it to the FileInterceptor, which will then call the uploadFile method on the FileController. The @UploadedFile() decorator extracts the uploaded file from the request and makes it available as a parameter in the uploadFile method.

// To track the progress of the file upload, you can use the on('progress') event of the multer middleware. Here's an updated version of the code that uses this event to send progress updates to the client;

// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as multer from 'multer';
// import { Socket } from 'socket.io';

// @Controller('file')
// export class FileController {
//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file', {
//     storage: multer.memoryStorage(),
//     limits: {
//       fileSize: 1024 * 1024 * 10, // 10 MB
//     },
//   }))
//   async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response, @SocketIO() socket: Socket) {
//     const fileSize = file.size;
//     let uploadedBytes = 0;

//     const multerStorage = multer.memoryStorage();
//     const multerUpload = multer({ storage: multerStorage }).single('file');

//     multerUpload.on('file', () => {
//       // file upload started
//       socket.emit('file-upload-started', { fileSize });
//     });

//     multerUpload.on('data', (chunk: Buffer) => {
//       // file chunk uploaded
//       uploadedBytes += chunk.length;
//       socket.emit('file-upload-progress', { uploadedBytes });
//     });

//     multerUpload.on('end', () => {
//       // file upload complete
//       socket.emit('file-upload-complete');
//     });

//     multerUpload(req, res, (err: any) => {
//       if (err) {
//         console.error(err);
//         socket.emit('file-upload-error', { error: err.message });
//       }
//     });
//   }
// }
