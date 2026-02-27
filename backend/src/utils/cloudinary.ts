import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/config";
import logger from "./logger";

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

/**
 * Upload an image to Cloudinary
 * @param filePath Path to the file or Buffer
 * @param folder Folder name in Cloudinary
 * @returns Upload result or null
 */
export const uploadImage = async (
  file: string | Buffer | Express.Multer.File,
  folder: string = "organizations",
): Promise<string | null> => {
  try {
    let result;
    
    if (typeof file === 'string' || Buffer.isBuffer(file)) {
        result = await cloudinary.uploader.upload(file as string, {
            folder: folder,
            resource_type: "auto",
        });
    } else if ((file as Express.Multer.File).path) {
        result = await cloudinary.uploader.upload((file as Express.Multer.File).path, {
            folder: folder,
            resource_type: "auto",
        });
    } else if ((file as Express.Multer.File).buffer) {
        // If using memory storage
        result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: folder, resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end((file as Express.Multer.File).buffer);
        });
    } else {
        throw new Error("Invalid file format for upload");
    }

    return (result as any).secure_url;
  } catch (error) {
    logger.error("Cloudinary upload error:", error);
    return null;
  }
};

/**
 * Delete an image from Cloudinary
 * @param publicId Public ID of the image
 */
export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error("Cloudinary delete error:", error);
  }
};

export default cloudinary;
