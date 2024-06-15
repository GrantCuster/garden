import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { promises as fs } from "fs";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function uploadFileToS3(filePath: string, bucketName: string, key: string) {
  const fileContent = await fs.readFile(filePath);
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: "image/png",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(`Successfully uploaded ${filePath} to ${bucketName}/${key}`);
    return data;
  } catch (err) {
    console.error(`Error uploading ${filePath} to ${bucketName}/${key}`, err);
    throw err;
  }
}
