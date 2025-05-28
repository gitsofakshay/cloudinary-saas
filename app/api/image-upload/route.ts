import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';


// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface cloudinaryUploadResult {
    public_id: string,
    [key: string] : any,
}

export async function POST(request: NextRequest){
    const  {userId} = await auth();

    if (!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({error: "File is not found"},{status: 400})
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<cloudinaryUploadResult>((resolve,reject)=>{
            const upload_stream = cloudinary.uploader.upload_stream(
                {folder: "Next-cloudinary-uploads"},
                (error, result)=> {
                    if(error) reject(error)
                    else resolve(result as cloudinaryUploadResult)
                }
            )
            upload_stream.end(buffer)
        })

        return NextResponse.json({publicId: result.public_id},{status: 200})


    } catch (error:any) {
        console.log("Upload images failed ",error)
        return NextResponse.json({error: "Failed to upload images on cloudinary"},{status: 500})
    }
}