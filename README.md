
# hovi-api-examples
A clean, minimalist set of TypeScript examples demonstrating end-to-end credential issuance and verification workflows using the **Hovi Platform API**.


---

## 🚀 Quick Start

### 1. Setup

First, navigate to the `typescript/api` directory and install the dependencies.

```bash
# Navigate to the API directory
cd typescript/api
# Install dependencies
npm install
````

### 2\. Configure API Key

Create a new file named `.env` in the `typescript/api` directory by copying the example file.

```bash
cp .env.example .env
```

Edit the `.env` file and add your Hovi API key and base URL:

```
BASE_URL=https://api.hovi.id
API_KEY=<YOUR_ECOSYSTEM_API_KEY_HERE>
```

### 3\. Run a Workflow

The entry point for all examples is `index.ts`. By default, the **OpenID SD-JWT workflow** is enabled as it provides the quickest feedback loop (it does not require a pre-established wallet connection).

To run the default workflow:

```bash
npm start
```

You will see QR codes printed to your terminal. Scan these with a compatible digital wallet (like Hovi Wallet) to accept the credential offer and respond to the proof request.

-----

## 🏗️ Project Architecture

This project is built on two core principles:

1.  **Explicit Naming:** All functions are named explicitly for their exact action (e.g., `createCredentialTemplateJsonLd`, `offerCredentialAnoncred`). There are no generic wrappers with confusing `format` parameters.
2.  **Centralized Utilities (DRY):** All common logic is centralized in the `typescript/api/utils` folder:
      * `tenant.ts`: Handles tenant creation.
      * `templates.ts`: Handles creation for all credential and verification templates.
      * `connection-poll.ts`: Provides a single, reusable function for polling connection status.
      * `logger.ts`: Provides a simple console logger.

**Note:** Verification logic remains in the ecosystem-specific folders (`Cheqd/verify.ts`, `Indicio/verify.ts`, etc.).

-----

## 📚 Managing Example Workflows

To run a different workflow, simply edit `typescript/api/index.ts` and change which function is called in `main()`.

All workflow files (e.g., `cheqd.ts`, `open-id.ts`) are fully sequenced, running every step from Tenant creation to Proof Request, with no vital steps commented out.

### Available Workflows

| Ecosystem | Credential Type | Function Name | Notes |
| :--- | :--- | :--- | :--- |
| **OpenID** | SD-JWT | `openIdSdJwtWorkFlow()` | **(Default)** Full flow, QR-based. |
| **OpenID** | JSON-LD | `openIdJsonLdWorkFlow()` | Full flow, QR-based. |
| **OpenID** | mDoc | `openIDmDocWorkFlow()` | Full flow, QR-based. |
| **Cheqd** | JSON-LD | `cheqdJsonLdWorkFlow()` | Full flow, requires Connection scan. |
| **Cheqd** | Anoncred | `cheqdAnoncredWorkFlow()` | Full flow, requires Connection scan. |
| **Indicio** | JSON-LD | `indicioJsonLdWorkFlow()` | Full flow, requires Connection scan. |
| **Indicio** | Anoncred | `indicioAnoncredWorkFlow()` | Full flow, requires Connection scan. |
| **PrivadoID**| JSON-LD | `privadoJsonLdWorkFlow()` | Full flow, requires Connection scan. |


