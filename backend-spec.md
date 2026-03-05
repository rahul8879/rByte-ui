# RByte.ai — Backend Development Specification

**Stack:** Python · FastAPI · Azure App Service (East Asia)
**Base URL:** `https://rbyteai-backend-aua4hva9dhcxekdq.eastasia-01.azurewebsites.net/api`
**Last updated:** March 2026

---

## 1. Overview

The backend powers the rbyte.ai course landing page. Its primary jobs are:

1. OTP-based phone verification (no passwords)
2. Lead capture from multiple touchpoints on the page
3. Full enrollment intake with qualification data
4. Curriculum PDF delivery
5. Admin visibility into all leads

All routes must be under the `/api/` prefix (confirmed via Swagger). CORS must allow the production frontend domain.

---

## 2. Existing Endpoints (Already Built)

These are confirmed working from the frontend and must remain backward-compatible.

### 2.1 `POST /api/send-otp`
Sends a 6-digit OTP via SMS to the given phone number.

**Request body:**
```json
{
  "phone": "9876543210",
  "country_code": "+91"
}
```
**Response:**
```json
{ "message": "OTP sent successfully" }
```
**Notes:**
- Rate-limit to max 3 OTP requests per phone per 10 minutes
- OTP must expire after 10 minutes
- Store OTP in Redis or an in-memory TTL store (not the database)

---

### 2.2 `POST /api/verify-otp`
Verifies the OTP entered by the user.

**Request body:**
```json
{
  "phone": "9876543210",
  "otp": "482910",
  "country_code": "+91"
}
```
**Response:**
```json
{ "message": "OTP verified successfully", "verified": true }
```
**Notes:**
- Mark OTP as used after one successful verify (prevent replay)
- Return HTTP 400 with `detail` message on failure so the frontend can display it

---

### 2.3 `POST /api/register`
Saves a warm lead — someone who verified their phone but is not yet enrolling.
Called from: (a) "Get Course Details" / Curriculum Download flow, (b) "Register Interest" drawer mode.

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "country_code": "+91",
  "heard_from": "Curriculum Download"
}
```
**`heard_from` possible values from frontend:**
- `"Curriculum Download"` — downloaded syllabus PDF
- `"Homepage Enroll CTA"` — clicked Enroll on hero/pricing
- `"Social Media"`, `"Search Engine"`, `"Friend / Colleague"`, `"Email"`, `"Other"`

**Response:**
```json
{ "message": "Interest registered successfully", "lead_id": "uuid-here" }
```
**Notes:**
- If phone already exists, **update** the record (upsert) — do not create duplicate
- Save `registered_at` timestamp with timezone (IST)
- Save `lead_source = "register"` to distinguish from enroll

---

### 2.4 `POST /api/enroll`
Full enrollment form submission — highest intent lead.
Called from: Enrollment Drawer (full form with qualification questions).

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "country_code": "+91",
  "current_role": "Software Developer",
  "experience": "3-5",
  "programming_experience": "intermediate",
  "goals": "I want to build LLM-powered products and transition to AI engineering.",
  "heard_from": "Social Media",
  "preferred_batch": "june-evening"
}
```
**`experience` values:** `"0-1"`, `"1-3"`, `"3-5"`, `"5-10"`, `"10+"`
**`programming_experience` values:** `"beginner"`, `"intermediate"`, `"advanced"`
**`preferred_batch` values:** `"june-morning"`, `"june-evening"`, `"july-morning"`, `"july-evening"`

**Response:**
```json
{ "message": "Enrollment submitted successfully", "enrollment_id": "uuid-here" }
```
**Notes:**
- Store with `lead_source = "enroll"` and `status = "pending_review"`
- Trigger an **admin notification** (email or WhatsApp) when a new enrollment arrives — this is a hot lead
- If same phone re-enrolls, update existing record rather than duplicate

---

### 2.5 `POST /api/masterclass-register`
Registers someone for the free masterclass event.

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "country_code": "+91",
  "email": "rahul@example.com"
}
```
**Response:**
```json
{ "message": "Registered for masterclass successfully" }
```
**Notes:**
- Save with `lead_source = "masterclass"`
- Send a **confirmation WhatsApp/SMS** to the registrant with event details

---

### 2.6 `GET /api/curriculum`
Serves the curriculum PDF file for download.

**Response:** PDF file (`Content-Type: application/pdf`) or a redirect to a signed Azure Blob Storage URL.

**Notes:**
- This is a public endpoint, no auth required
- Do NOT gate it with auth — the frontend already gates it behind OTP before calling this URL
- Recommended: serve from Azure Blob Storage with a CDN URL for performance

---

### 2.7 `GET /api/debug/status`
Health check endpoint used by the frontend to test connectivity.

**Response:**
```json
{ "status": "ok", "timestamp": "2026-03-05T12:00:00Z" }
```

---

## 3. New Endpoints to Build

These are missing and needed based on the frontend audit.

---

### 3.1 `GET /api/admin/leads` ⚡ HIGH PRIORITY

Returns all leads for the admin dashboard. Protected by API key auth.

**Headers:**
```
X-Admin-Key: <secret>
```

**Query parameters:**
| Param | Type | Description |
|---|---|---|
| `source` | string | Filter by lead_source: `register`, `enroll`, `masterclass` |
| `from_date` | date | ISO date, e.g. `2026-01-01` |
| `to_date` | date | ISO date |
| `status` | string | `pending_review`, `contacted`, `enrolled`, `dropped` |
| `page` | int | Pagination, default 1 |
| `limit` | int | Records per page, default 50 |

**Response:**
```json
{
  "total": 142,
  "page": 1,
  "leads": [
    {
      "id": "uuid",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "phone": "+919876543210",
      "heard_from": "Curriculum Download",
      "lead_source": "register",
      "status": "pending_review",
      "current_role": null,
      "experience": null,
      "preferred_batch": null,
      "goals": null,
      "registered_at": "2026-03-05T14:32:00+05:30"
    }
  ]
}
```

---

### 3.2 `GET /api/admin/leads/export` ⚡ HIGH PRIORITY

Exports all leads as a CSV file for use in Excel / CRM.

**Headers:** `X-Admin-Key: <secret>`

**Response:** CSV file download with all lead fields.

---

### 3.3 `PATCH /api/admin/leads/{lead_id}` MEDIUM PRIORITY

Update lead status (e.g., mark as contacted, enrolled, dropped).

**Request body:**
```json
{
  "status": "contacted",
  "notes": "Called on March 5, interested in June batch"
}
```

---

### 3.4 `GET /api/admin/stats` MEDIUM PRIORITY

Dashboard summary stats.

**Response:**
```json
{
  "total_leads": 142,
  "by_source": {
    "enroll": 38,
    "register": 71,
    "masterclass": 33
  },
  "by_status": {
    "pending_review": 90,
    "contacted": 40,
    "enrolled": 12
  },
  "last_7_days": 28,
  "conversion_rate": "8.4%"
}
```

---

## 4. Database Schema

Recommended: PostgreSQL on Azure Database for PostgreSQL (Flexible Server).

### Table: `leads`

```sql
CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(200) NOT NULL,
  email           VARCHAR(200),
  phone           VARCHAR(20) NOT NULL,
  country_code    VARCHAR(10) NOT NULL DEFAULT '+91',
  lead_source     VARCHAR(50) NOT NULL,   -- 'register', 'enroll', 'masterclass'
  heard_from      VARCHAR(100),
  status          VARCHAR(50) DEFAULT 'pending_review',
  notes           TEXT,

  -- Enrollment-specific fields (null for register/masterclass leads)
  current_role          VARCHAR(200),
  experience            VARCHAR(20),
  programming_experience VARCHAR(20),
  goals                 TEXT,
  preferred_batch       VARCHAR(50),

  registered_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(phone)   -- prevent duplicates; use upsert logic
);
```

### Table: `otp_sessions` (or use Redis)

```sql
CREATE TABLE otp_sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone       VARCHAR(20) NOT NULL,
  otp_hash    VARCHAR(200) NOT NULL,   -- hash the OTP, don't store plain
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN DEFAULT FALSE
);
CREATE INDEX ON otp_sessions(phone);
```

---

## 5. Notifications

### 5.1 Admin Alert on New Enrollment
When `POST /api/enroll` succeeds, send a WhatsApp or email to the admin number (`+919893989103`).

**Message template:**
```
🔥 New Enrollment!
Name: {{name}}
Phone: {{country_code}}{{phone}}
Role: {{current_role}} | Exp: {{experience}}
Batch: {{preferred_batch}}
Source: {{heard_from}}
```

**Recommended:** Use Twilio WhatsApp Business API or MSG91 (popular in India).

### 5.2 Confirmation to Registrant
After successful `POST /api/register` or `POST /api/enroll`, send a WhatsApp to the user:

```
Hi {{name}}! 👋

Thanks for your interest in RByte.ai's AI Engineering Course.

Our team will reach out within 24 hours to discuss:
- Course details & curriculum
- Batch availability
- Scholarship options

Meanwhile, join our community: https://chat.whatsapp.com/...

— Team RByte.ai
```

---

## 6. Security & Middleware

### CORS
Allow only the production domain:
```python
allow_origins = [
    "https://rbyte.ai",
    "https://www.rbyte.ai",
    "http://localhost:3000",   # dev only
]
```

### Rate Limiting
- `/api/send-otp` → max 3 requests per phone per 10 minutes
- All other endpoints → max 30 requests per IP per minute

### Input Validation
- Phone: strip non-digits, must be 10 digits for `+91`
- Email: validate format if provided (not required)
- All text fields: strip and limit length (name max 200 chars, goals max 2000 chars)

### Admin Auth
- Simple API key via `X-Admin-Key` header stored in environment variable
- Do not expose admin endpoints to the public Swagger UI

---

## 7. Environment Variables

```
# Database
DATABASE_URL=postgresql://user:pass@host/dbname

# OTP / SMS Provider
MSG91_API_KEY=...
MSG91_SENDER_ID=RBYTE

# Or Twilio
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Admin
ADMIN_WHATSAPP=+919893989103
ADMIN_EMAIL=admin@rbyte.ai
ADMIN_API_KEY=<strong-random-secret>

# Storage (curriculum PDF)
AZURE_STORAGE_CONNECTION_STRING=...
CURRICULUM_BLOB_URL=https://...blob.core.windows.net/curriculum/rbyte-syllabus.pdf

# App
ENVIRONMENT=production
ALLOWED_ORIGINS=https://rbyte.ai,https://www.rbyte.ai
```

---

## 8. Swagger / OpenAPI

Keep Swagger enabled in development, but disable in production or protect it:
```python
app = FastAPI(
    title="RByte.ai API",
    docs_url="/api/docs" if ENVIRONMENT != "production" else None,
    redoc_url=None,
)
```

---

## 9. Priority Checklist for Backend Developer

| Priority | Task | Status |
|---|---|---|
| 🔴 P0 | OTP send + verify working | ✅ Done |
| 🔴 P0 | `POST /api/register` saves lead to DB | ✅ Done |
| 🔴 P0 | `POST /api/enroll` saves full enrollment to DB | ✅ Done |
| 🔴 P0 | `POST /api/masterclass-register` saves lead | ✅ Done |
| 🔴 P0 | `GET /api/curriculum` serves PDF | ✅ Done |
| 🟠 P1 | Admin `GET /api/admin/leads` with filters | ❌ Build this |
| 🟠 P1 | Admin `GET /api/admin/leads/export` (CSV) | ❌ Build this |
| 🟠 P1 | Admin `GET /api/admin/stats` | ❌ Build this |
| 🟡 P2 | WhatsApp admin alert on new enrollment | ❌ Build this |
| 🟡 P2 | WhatsApp confirmation to registrant | ❌ Build this |
| 🟡 P2 | `PATCH /api/admin/leads/{id}` status update | ❌ Build this |
| 🟢 P3 | Rate limiting on OTP endpoint | ❌ Build this |
| 🟢 P3 | OTP hashing (don't store plain OTP in DB) | ❌ Verify / fix |
| 🟢 P3 | Duplicate phone upsert logic | ❌ Verify / fix |

---

## 10. Questions for Backend Developer

1. Which SMS/OTP provider is currently being used? (MSG91, Twilio, Fast2SMS?)
2. Is there currently a database connected, or are leads being dropped after API response?
3. Is there an admin panel or are leads being viewed directly in the DB?
4. Should curriculum PDF be stored in Azure Blob Storage or served from the API server?
5. Is WhatsApp Business API already set up for the admin number `+919893989103`?
