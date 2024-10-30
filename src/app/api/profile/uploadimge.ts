'use server'

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export async function uploadToS3(formData: FormData) {
    const file = formData.get('file') as File;
    
    if (!file) throw new Error('No file provided');
    
    const s3Client = new S3Client({
        region: "ap-southeast-2",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY as string,
            secretAccessKey: process.env.AWS_SECRET_KEY as string,
        },
    });

    const bucketName = process.env.AWS_BUCKET as string;

    if (!bucketName) {
        throw new Error('S3 Bucket name is not provided');
    }

    const ext = file.name.split('.').pop();
    const newFilename = `file-${Date.now()}.${ext}`;

    const chunks = [];
     // @ts-expect-error ignore this errpor
    for await (const chunk of file.stream()) {
        chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucket =  process.env.AWS_BUCKET as string

    await s3Client.send(new PutObjectCommand({
        Bucket:bucket,  // Ensure Bucket is correctly passed here
        Key: newFilename,
        ACL: 'public-read',
        Body: buffer,
        ContentType: file.type,
    }));

    return {
        newFilename,
        ext,
        url:`https://${bucket}.s3.amazonaws.com/${newFilename}`
    };
}
