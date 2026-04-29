import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="mb-5 text-base-content/70">Page not found.</p>
        <Link href="/Shop" className="btn btn-primary">
          Go to Shop
        </Link>
      </div>
    </div>
  );
}
