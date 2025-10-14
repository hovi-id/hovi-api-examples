import {
  AnonCredPayload,
  JsonLdPayload,
  MdocPayload,
  SdJwtPayload,
} from "../types";

export const JsonLd: JsonLdPayload = {
  name: "Hovi Employee ID Credential",
  version: "1.0.0",
  description:
    "A verifiable digital identity credential issued to Hovi employees for internal access and verification purposes.",
  attributes: [
    {
      name: "employeeId",
      label: "Employee ID",
      type: "string",
      description: "Unique identifier for the employee",
      required: true,
    },
    {
      name: "fullName",
      label: "Full Name",
      type: "string",
      description: "Full name of the employee",
      required: true,
    },
  ],
  schemaType: "HoviEmployeeSchema",
};

export const SdJwt: SdJwtPayload = {
  name: "Hovi KYC Verification Credential",
  version: "1.0.0",
  description:
    "Selective disclosure credential used to verify a user’s identity during onboarding to Hovi Cloud Wallet services.",
  attributes: [
    {
      name: "firstName",
      label: "First Name",
      type: "string",
      description: "Given name of the individual",
      required: true,
      disclosurable: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "string",
      description: "Family name of the individual",
      required: true,
      disclosurable: true,
    },
  ],
  schemaType: "HoviKycVerificationSchema",
};

export const Mdoc: MdocPayload = {
  name: "Hovi Mobile Access Credential",
  version: "1.0.0",
  description:
    "An mDoc credential for granting secure mobile access to Hovi enterprise applications and resources.",
  attributes: [
    {
      name: "deviceId",
      label: "Device ID",
      type: "string",
      description: "Unique identifier of the registered device",
      required: true,
      disclosurable: false,
    },
    {
      name: "userEmail",
      label: "User Email",
      type: "string",
      description: "Email address associated with the Hovi account",
      required: true,
      disclosurable: true,
    },
  ],
  docType: "HoviMdocAccessSchema",
};

export const AnonCred: AnonCredPayload = {
  name: "Hovi University Student Credential",
  version: "1.0.0",
  description:
    "An anonymous credential issued to students for verifying enrollment without disclosing personal identifiers.",
  attributes: [
    {
      name: "studentId",
      label: "Student ID",
      type: "string",
      description: "Unique ID assigned to the student",
      required: true,
    },
    {
      name: "program",
      label: "Program",
      type: "string",
      description: "Academic program enrolled in",
      required: true,
    },
  ],
  tag: "HoviUniversityCredential",
};
