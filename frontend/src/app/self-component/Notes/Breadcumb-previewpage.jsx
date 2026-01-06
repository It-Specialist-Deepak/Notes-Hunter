import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcumbPreviewPage({ previewNotes }) {
  return (
    <div className="w-full flex justify-start ">
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
                href="/browse-notes"
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                Browse Notes
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-teal-400" />

          {/* Current Page */}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-teal-700 font-semibold">
              {previewNotes?.title || "Note Details"}
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
