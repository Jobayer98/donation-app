import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import landingPageService from "../services/landingPage.service";
import { uploadImage } from "../utils/cloudinary";
import { updateLandingPageContentSchema } from "../schema/landingPage.schema";

export const getLandingPageContent = asyncHandler(
  async (req: Request, res: Response) => {
    const content = await landingPageService.getLandingPageContent(
      req.user!.id,
    );

    res.json({
      success: true,
      data: content,
    });
  },
);

export const updateLandingPageContent = asyncHandler(
  async (req: Request, res: Response) => {
    let data = updateLandingPageContentSchema.parse(req.body);

    if (req.file) {
      const heroImageUrl = await uploadImage(req.file);
      if (heroImageUrl) {
        data = { ...data, heroImageUrl };
      }
    }

    const content = await landingPageService.updateLandingPageContent(
      req.user!.id,
      data,
    );

    res.json({
      success: true,
      message: "Landing page content updated successfully",
      data: content,
    });
  },
);

export const getPublicLandingPage = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await landingPageService.getPublicLandingPage(
      String(req.params.slug),
    );

    res.json({
      success: true,
      data,
    });
  },
);
