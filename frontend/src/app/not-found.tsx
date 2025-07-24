import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <Image
        src="/images/404.png" // Place your image in the public folder
        alt="404 Illustration"
        width={500}
        height={500}
        className="mb-6"
      />
      <p className="text-xl mb-6">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="px-4 py-2 text-violet-600 text-xl underline transition">
        Go Home
      </Link>
    </div>
  );
}