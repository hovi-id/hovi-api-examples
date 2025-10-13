import { createCredentialTemplate } from "./helper/credential";
import { createTenant } from "./helper/tenant";
import { createVerificationTemplate } from "./helper/verification";
import { createCredentialOffer } from "./OpenID/issue";
import { sendProofRequest } from "./OpenID/verify";

async function main() {
  const tenantRespnse = await createTenant();
  const createCredentialTemplateResponse = await createCredentialTemplate(
    tenantRespnse.response.tenantId
  );
  const offerCredential = await createCredentialOffer(
    tenantRespnse.response.tenantId,
    {
      credentialTemplateId:
        createCredentialTemplateResponse.response.credentialTemplateId,
    }
  );

  const creatteVerificationTemplateResponse = await createVerificationTemplate(
    tenantRespnse.response.tenantId,
    {
      restriction: {
        credentialTemplateId:
          createCredentialTemplateResponse.response.credentialTemplateId,
      },
    }
  );
  const sentProofRequest = await sendProofRequest(
    tenantRespnse.response.tenantId,
    creatteVerificationTemplateResponse.response.verificationTemplateId
  );
}
main();
