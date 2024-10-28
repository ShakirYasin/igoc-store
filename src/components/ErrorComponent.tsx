import { XCircleIcon } from "lucide-react";
import Link from "next/link";

interface ErrorComponentProps {
  title: string;
  message: string;
  backToHome: string;
}

export default function ErrorComponent({
  title,
  message,
  backToHome,
}: ErrorComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8">
      <div className="max-w-max">
        <main className="sm:flex">
          <XCircleIcon className="h-12 w-12 text-red-500" aria-hidden="true" />
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>
              <p className="mt-3 text-base text-gray-500">{message}</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {backToHome}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
