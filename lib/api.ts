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

// ── OTP ──
export const sendOtp = (payload: { phone: string; country_code: string }) =>
  apiFetch<{ message: string }>("/api/send-otp", { method: "POST", body: JSON.stringify(payload) });

export const verifyOtp = (payload: { phone: string; country_code: string; otp: string }) =>
  apiFetch<{ message: string; verified: boolean }>("/api/verify-otp", { method: "POST", body: JSON.stringify(payload) });

// ── Lead capture ──
export const registerLead = (payload: { name: string; email?: string; phone: string; country_code: string; heard_from?: string }) =>
  apiFetch<{ message: string; id: number }>("/api/register", { method: "POST", body: JSON.stringify(payload) });

export const enrollStudent = (payload: { name: string; email: string; phone: string; country_code: string; current_role: string; experience: string; programming_experience: string; goals: string; heard_from?: string; preferred_batch: string }) =>
  apiFetch<{ message: string; id: number }>("/api/enroll", { method: "POST", body: JSON.stringify(payload) });

export const registerMasterclass = (payload: { name: string; email?: string; phone: string; country_code: string }) =>
  apiFetch<{ message: string; id: number }>("/api/masterclass-register", { method: "POST", body: JSON.stringify(payload) });

export const registerDemo = (payload: { name: string; phone: string; country_code: string; email?: string; role?: string }) =>
  apiFetch<{ success: boolean; message: string; id: number; invite_link: string; session_date: string }>("/api/demo-register", { method: "POST", body: JSON.stringify(payload) });

// ── Curriculum PDF ──
export function getCurriculumUrl(lead?: { name?: string; phone?: string; email?: string }): string {
  const params = new URLSearchParams();
  if (lead?.name) params.set("name", lead.name);
  if (lead?.phone) params.set("phone", lead.phone);
  if (lead?.email) params.set("email", lead.email);
  const qs = params.toString();
  return `${BASE_URL}/api/curriculum${qs ? `?${qs}` : ""}`;
}

// ── Blog ──
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author: string;
  tags: string[];
  status: "draft" | "published";
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  category?: string;
  author?: string;
  tags?: string[];
  status?: "draft" | "published";
  featured?: boolean;
}

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "";
const adminHeaders = { "Content-Type": "application/json", "X-Admin-Key": ADMIN_KEY };

export const getBlogPosts = (params?: { category?: string; page?: number; page_size?: number }) => {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.page_size) qs.set("page_size", String(params.page_size));
  return apiFetch<BlogListResponse>(`/api/blog/posts${qs.toString() ? `?${qs}` : ""}`);
};

export const getFeaturedPost = () => apiFetch<{ post: BlogPost | null }>("/api/blog/posts/featured");
export const getBlogPost = (slug: string) => apiFetch<{ post: BlogPost }>(`/api/blog/posts/${slug}`);

export const adminGetAllPosts = () =>
  apiFetch<BlogListResponse>("/api/blog/admin/posts", { headers: adminHeaders });

export const adminCreatePost = (payload: CreatePostPayload) =>
  apiFetch<BlogPost>("/api/blog/admin/posts", { method: "POST", headers: adminHeaders, body: JSON.stringify(payload) });

export const adminUpdatePost = (id: number, payload: Partial<CreatePostPayload>) =>
  apiFetch<BlogPost>(`/api/blog/admin/posts/${id}`, { method: "PUT", headers: adminHeaders, body: JSON.stringify(payload) });

export const adminDeletePost = (id: number) =>
  apiFetch<{ success: boolean }>(`/api/blog/admin/posts/${id}`, { method: "DELETE", headers: adminHeaders });

export const adminTogglePublish = (id: number) =>
  apiFetch<{ success: boolean; status: string }>(`/api/blog/admin/posts/${id}/publish`, { method: "PATCH", headers: adminHeaders });
