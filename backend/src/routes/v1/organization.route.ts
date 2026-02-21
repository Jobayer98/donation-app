import { Router } from "express";
import { addMember, createOrganization, deleteOrganization, getMyOrganizations, getOrganization, removeMember, updateMemberRole, updateOrganization } from "../../controllers/organization.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { appRateLimit } from "../../middlewares/rateLimit.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { addMemberSchema, createOrganizationSchema, updateMemberRoleSchema, updateOrganizationSchema } from "../../schema/organization.schema";

const router = Router();

router.use(appRateLimit, isAuthenticated, authorize("FUND_RAISER"));

router.post("/", validateBody(createOrganizationSchema), createOrganization);
router.get("/", getMyOrganizations);
router.get("/:id", getOrganization);
router.put("/:id", validateBody(updateOrganizationSchema), updateOrganization);
router.delete("/:id", deleteOrganization);

router.post("/:id/members", validateBody(addMemberSchema), addMember);
router.put("/:id/members/:memberId", validateBody(updateMemberRoleSchema), updateMemberRole);
router.delete("/:id/members/:memberId", removeMember);

export default router;
