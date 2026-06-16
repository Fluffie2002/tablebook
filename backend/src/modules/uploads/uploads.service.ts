import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadsService {
  private readonly s3: S3Client;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get<string>('AWS_REGION') ?? 'ap-southeast-1',
    });
  }

  async createPresignedUrl(filename: string, contentType: string) {
    const bucket = this.config.get<string>('AWS_S3_BUCKET') ?? 'tablebook-dev';
    const key = `restaurants/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    return {
      key,
      uploadUrl: await getSignedUrl(this.s3, command, { expiresIn: 60 }),
      publicUrl: `https://${bucket}.s3.amazonaws.com/${key}`,
    };
  }
}
