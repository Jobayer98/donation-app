import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

class OnboardingService {
  async getStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        onboardingStep: true,
        verificationStatus: true,
        subscription: { select: { plan: { select: { type: true } } } }
      }
    });

    if (!user) throw new ApiError(404, "User not found");

    const steps = [
      { step: 1, title: "Verify Email", completed: user.verificationStatus },
      { step: 2, title: "Choose Plan", completed: !!user.subscription },
      { step: 3, title: "Setup Payment Provider", completed: false },
      { step: 4, title: "Create First Campaign", completed: false }
    ];

    // Check payment provider
    const hasProvider = await prisma.paymentProvider.count({
      where: { fundRaiserId: userId }
    });
    steps[2].completed = hasProvider > 0;

    // Check campaign
    const hasCampaign = await prisma.campaign.count({
      where: { fundraiserId: userId }
    });
    steps[3].completed = hasCampaign > 0;

    return {
      completed: user.onboardingCompleted,
      currentStep: user.onboardingStep,
      steps
    };
  }

  async updateStep(userId: string, step: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { onboardingStep: step }
    });
  }

  async completeOnboarding(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        onboardingCompleted: true,
        onboardingStep: 4
      }
    });
  }

  async skipOnboarding(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true }
    });
  }
}

export default new OnboardingService();
