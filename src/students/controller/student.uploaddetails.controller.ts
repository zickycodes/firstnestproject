import {
  Controller,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Post,
  HttpException,
  Request,
  Inject,
} from '@nestjs/common';
import { StudentUploadService } from '../services/student.upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { StudentDetailDto } from '../dtos/studentdetailsdto';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/sequelize';
import { StudentFileUploads } from 'src/entities/students.paths.file';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadGateway } from 'src/upload.gateway';
import { PaymentInterceptor } from '../payment.interceptor';
// import { Request } from 'express';

// interface AuthRequest extends Request {
//   user?: any;
// }

@Controller('/student')
export class StudentUploadController {
  constructor(
    @InjectModel(StudentFileUploads)
    private userModel: typeof StudentFileUploads,
    private readonly studentService: StudentUploadService,
    private readonly uploadGateway: UploadGateway,
  ) {}

  @Post('/upload-details/waec')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    PaymentInterceptor,
    FileInterceptor('waecfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString() + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (extname(file.originalname).toLowerCase() !== '.pdf') {
          return cb(null, false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
      },
    }),
  )
  async uploadFile(@UploadedFile() file, @Request() req) {
    // console.log('file', file);
    if (file === undefined) {
      throw new HttpException(
        {
          statusCode: 402,
          error: 'Only accept PDF files',
        },
        402,
      );
    }
    // Process the file here
    this.studentService.uploadWaec(file.path, req.user.userId);
  }

  @Post('/upload-details/jamb')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    PaymentInterceptor,
    FileInterceptor('jamb', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString() + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (extname(file.originalname).toLowerCase() !== '.pdf') {
          return cb(null, false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
      },
    }),
  )
  async uploadJambFile(@UploadedFile() file, @Request() req) {
    // console.log('file', file);
    if (file === undefined) {
      throw new HttpException(
        {
          statusCode: 402,
          error: 'Only accept PDF files',
        },
        402,
      );
    }
    // Process the file here
    this.studentService.uploadJamb(file.path, req.user.userId);
  }

  @Post('/upload-details/fslc')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    PaymentInterceptor,
    FileInterceptor('fslc', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString() + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (extname(file.originalname).toLowerCase() !== '.pdf') {
          return cb(null, false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
      },
    }),
  )
  async uploadFSLCFile(@UploadedFile() file, @Request() req) {
    // console.log('file', file);
    if (file === undefined) {
      throw new HttpException(
        {
          statusCode: 402,
          error: 'Only accept PDF files',
        },
        402,
      );
    }
    // Process the file here
    this.studentService.uploadFSLCfile(file.path, req.user.userId);
  }

  @Post('/upload-details/lga')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    PaymentInterceptor,
    FileInterceptor('lga', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString() + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (extname(file.originalname).toLowerCase() !== '.pdf') {
          return cb(null, false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
      },
    }),
  )
  async uploadLGAFile(@UploadedFile() file, @Request() req) {
    // console.log('file', file);
    if (file === undefined) {
      throw new HttpException(
        {
          statusCode: 402,
          error: 'Only accept PDF files',
        },
        402,
      );
    }
    // Process the file here
    this.studentService.uploadLGAfile(file.path, req.user.userId);
  }
  // @Post('/upload-details/jamb')
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, cb) => {
  //       const uniqueFilename = `${uuidv4()}-${file.originalname}`;
  //       cb(null, uniqueFilename);
  //     },
  //   }),
  // async uploadFileJamb(@UploadedFile() file): Promise<any> {
  //   const uniqueFilename = `${uuidv4()}-${file.originalname}`;
  //   console.log(uniqueFilename);
  //   // Process the file and JSON data here
  // }

  // @Post('/upload-details/fslc')
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFileJambfslc(@UploadedFile() file) {
  //   const uniqueFilename = `${uuidv4()}-${file.originalname}`;
  //   console.log(uniqueFilename);
  //   // Process the file and JSON data here
  // }

  // @Post('/upload-details/fslc')
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadLetterofRec(@UploadedFile() file) {
  //   const uniqueFilename = `${uuidv4()}-${file.originalname}`;
  //   console.log(uniqueFilename);
  //   // Process the file and JSON data here
  // }
}
