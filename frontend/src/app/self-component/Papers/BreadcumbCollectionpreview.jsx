import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

const BreadcumbCollectionpreview = ({ universityName, courseName, categoryName , title }) => {
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

          {/* collection */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/papers-collection"
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                Papers Collection
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-teal-400" />

          {/* universityName */}
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

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/papers-collection/${universityName}/${courseName}`}
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                {courseName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-teal-400" />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/papers-collection/${universityName}/${courseName}/${categoryName}`}
                className="text-teal-500 font-medium hover:text-teal-600 transition-colors"
              >
                {categoryName}
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
};

export default BreadcumbCollectionpreview;