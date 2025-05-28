import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface cloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary credentials not found" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const originalSize = formData.get("originalSize") as string;

    if (!file) {
      return NextResponse.json({ error: "File is not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<cloudinaryUploadResult>(
      (resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { 
            resource_type: "video",
            folder: "video-uploads", 
            transformation: [
                {quality: "auto", fetch_format: "mp4"}
            ]
          },
          (error, result) => {
            if (error || !result || typeof result.duration !== "number") {
              reject(new Error("Invalid upload result"));
            } else {
              resolve(result as unknown as cloudinaryUploadResult);
            }
          }
        );
        upload_stream.end(buffer);
      }
    );

    const video = await prisma.video.create({
        data:{
            title,
            description,
            publicId: result.public_id,
            originalSize: originalSize,
            compressedSize: String(result.bytes),
            duration: result.duration || 0,
        }
    })
    return NextResponse.json(video);


  } catch (error: any) {
    console.log("Upload video failed ", error);
    return NextResponse.json(
      { error: "Failed to upload video on cloudinary" },
      { status: 500 }
    );
  }finally{
    await prisma.$disconnect();
  }
}
