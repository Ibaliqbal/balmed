import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { getToken } from "next-auth/jwt";

const onlyAdminPage = ["/dashboard"];
const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    // Mengecek apakah url yg di request perlu di otentikasi
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET || "",
      });
      //   jika token tidak ada
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url); // maka redirect ke halaman login, karna tidak ada token(aktivitas registered)
        url.searchParams.set("callbackUrl", encodeURI(req.url)); // jika user sudah mendaftarkan/login, kembalikan url kemabli ke halaman sebelumnya yg redirect
        return NextResponse.redirect(url); // jalankan pengguna ke url tertentu
      }
      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        if (token.role !== "admin" && onlyAdminPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    return middleware(req, next); // jalankan middleware ketika otentikasi/otorisasi berhasil
  };
}
