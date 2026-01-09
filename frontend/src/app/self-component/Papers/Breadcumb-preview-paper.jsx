import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbPaperPreview({category , title}) {


  return (
    <div className="w-full flex justify-start mb-5 mt-1">
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
                href="/browse-papers"
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                Browse Papers
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-teal-400" />
           {/* Category */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/browse-papers/${category}`}
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                  {category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
           <BreadcrumbSeparator className="text-teal-400" />
         
          {/* Current Page */}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-teal-700 font-semibold">
         {title}
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
