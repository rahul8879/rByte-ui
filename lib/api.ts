const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://rbyteai-backend-aua4hva9dhcxekdq.eastasia-01.azurewebsites.net";

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const text = await res.text();
    let data: T | null = null;
    try { data = JSON.parse(text) as T; } catch { data = text as unknown as T; }
    if (!res.ok) {
      const errMsg = (data as any)?.detail || (data as any)?.message || `Error ${res.status}`;
      return { data: null, error: errMsg, status: res.status };
    }
    return { data, error: null, status: res.status };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Network error", status: 0 };
  }
}

// OTP
export const sendOtp = (payload: { phone: string; country_code: string }) =>
  apiFetch<{ message: string }>("/api/send-otp", { method: "POST", body: JSON.stringify(payload) });

export const verifyOtp = (payload: { phone: string; country_code: string; otp: string }) =>
  apiFetch<{ message: string; verified: boolean }>("/api/verify-otp", { method: "POST", body: JSON.stringify(payload) });

// Lead capture
export const registerLead = (payload: { name: string; email?: string; phone: string; country_code: string; heard_from?: string }) =>
  apiFetch<{ message: string; id: number }>("/api/register", { method: "POST", body: JSON.stringify(payload) });

// Demo session registration (includes role, triggers WhatsApp community notification on backend)
export const registerDemoLead = (payload: { name: string; email?: string; phone: string; country_code: string; role: string }) =>
  apiFetch<{ message: string; id: number }>("/api/demo-register", {
    method: "POST",
    body: JSON.stringify({ ...payload, heard_from: "Demo Session Registration" }),
  });

export const enrollStudent = (payload: { name: string; email: string; phone: string; country_code: string; current_role: string; experience: string; programming_experience: string; goals: string; heard_from?: string; preferred_batch: string }) =>
  apiFetch<{ message: string; id: number }>("/api/enroll", { method: "POST", body: JSON.stringify(payload) });

export const registerMasterclass = (payload: { name: string; email?: string; phone: string; country_code: string }) =>
  apiFetch<{ message: string; id: number }>("/api/masterclass-register", { method: "POST", body: JSON.stringify(payload) });

// Curriculum PDF — pass user info so every download is tracked
export function getCurriculumUrl(lead?: { name?: string; phone?: string; email?: string }): string {
  const params = new URLSearchParams();
  if (lead?.name) params.set("name", lead.name);
  if (lead?.phone) params.set("phone", lead.phone);
  if (lead?.email) params.set("email", lead.email);
  const qs = params.toString();
  return `${BASE_URL}/api/curriculum${qs ? `?${qs}` : ""}`;
}
