
import { Suspense } from "react";
import BrowseNotesClient from "./BrowseNotesClient";

export default function BrowseNotesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[#081a2d] via-[#0b3a4a] to-[#061622] text-white overflow-hidden flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
            </div>
        }>
            <BrowseNotesClient />
        </Suspense>
    );
}
