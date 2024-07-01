import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY as string;
const bucket = process.env.NEXT_PUBLIC_S3_BUCKET as string;
const region = process.env.NEXT_PUBLIC_S3_BUCKET_REGION as string;

const client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function createPresignedUrl(key: string) {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command, {
    expiresIn: 3600,
  });

  return url;
}

type DeleteParams = { Key: string }[];

export async function deleteObjectsFromS3(objects: DeleteParams) {
  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: objects,
    },
  });

  try {
    const { Deleted } = await client.send(command);

    return {
      length: Deleted?.length,
      key: Deleted?.map((d) => d.Key),
    };
  } catch (err) {
    console.error(err);
  }
}
