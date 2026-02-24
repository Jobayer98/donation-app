import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import { appConfig } from "./config";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Donation App API",
    version: "1.0.0",
    description: "API for donation management",
  },
  servers: [
    {
      url: appConfig.base_url,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      // common response schema
      SuccessResponseSchema: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
          data: {
            type: "object",
          },
        },
      },

      // error response schema
      ErrorResponseSchema: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },

      // Register Schema
      RegisterSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },

      // Login Schema
      LoginSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },

      // Verify Email Schema
      VerifyEmailSchema: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
        },
      },

      // Forgot Password Schema
      ForgotPasswordSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
        },
      },

      // Reset Password Schema
      ResetPasswordSchema: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },

      // Campaign Schema
      CampaignSchema: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          type: {
            type: "string",
          },
          goalAmount: {
            type: "number",
          },
          startDate: {
            type: "string",
          },
          endDate: {
            type: "string",
          },
          category: {
            type: "string",
          },
        },
      },

      // Campaign Status Schema
      CampaignStatusSchema: {
        type: "string",
        enum: ["DRAFT", "ACTIVE", "PAUSED", "COMPLETED"],
      },

      // Donation Schema
      DonationSchema: {
        type: "object",
        properties: {
          campaignId: {
            type: "string",
          },
          amount: {
            type: "number",
          },
          isAnonymous: {
            type: "boolean",
          },
          provider: {
            type: "string",
            enum: ["sslcommerz", "stripe", "bkash"],
          },
        },
      },

      // Create Organization Schema
      CreateOrganizationSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
        },
      },

      // Update Organization Schema
      UpdateOrganizationSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          settings: {
            type: "object",
          },
          logoUrl: {
            type: "string",
          },
          primaryColor: {
            type: "string",
            format: "hex-color",
          },
          secondaryColor: {
            type: "string",
            format: "hex-color",
          },
          customDomain: {
            type: "string",
          },
        },
      },

      // Payment Schema
      PaymentSchema: {
        type: "object",
        properties: {
          donationId: {
            type: "string",
          },
          amount: {
            type: "number",
          },
          provider: {
            type: "string",
            enum: ["sslcommerz", "stripe", "bkash"],
          },
        },
      },

      // Payment Provider Schema
      PaymentProviderSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          currency: {
            type: "string",
          },
          config: {
            type: "object",
            properties: {
              apiKey: {
                type: "string",
              },
              secretKey: {
                type: "string",
              },
            },
          },
        },
      },

      // Update Onboarding Schema
      UpdateOnboardingStepSchema: {
        type: "object",
        properties: {
          step: {
            type: "string",
          },
        },
      },

      // Add member schema
      AddMemberSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          role: {
            type: "string",
          },
        },
      },

      // Update member role schema
      UpdateMemberRoleSchema: {
        type: "object",
        properties: {
          role: {
            type: "string",
          },
        },
      },

      // Subscribe schema
      SubscribeSchema: {
        type: "object",
        properties: {
          planId: {
            type: "string",
          },
        },
      },

      // Cancel subscription schema
      CancelSubscriptionSchema: {
        type: "object",
        properties: {
          planId: {
            type: "string",
          },
        },
      },

      // Plan Schema
      PlanSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          price: {
            type: "string",
          },
          type: {
            type: "enum",
            enum: ["FREE", "PRO"],
          },
          interval: {
            type: "enum",
            enum: ["MONTHLY", "YEARLY"],
          },
          features: {
            type: "object",
          },
          limits: {
            type: "object",
            properties: {
              maxCampaigns: {
                type: "number",
              },
              maxPaymentProviders: {
                type: "number",
              },
            },
          },
          isActive: {
            type: "boolean",
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ["./src/routes/v1/*.ts", "./src/routes/v1/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
