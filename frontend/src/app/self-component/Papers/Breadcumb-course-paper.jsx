import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbcourse({ universityName , courseName}) {


  return (
    <div className="w-full flex justify-start">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2 text-sm md:text-base">

          {/* Home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-teal-400" />

          {/* Category */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/papers-collection"
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                Collection
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-teal-400" />
           {/* Category */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/papers-collection/${universityName}`}
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                  {universityName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
           <BreadcrumbSeparator className="text-teal-400" />
          {/* Current Page */}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-teal-700 font-semibold">
          {courseName}
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
