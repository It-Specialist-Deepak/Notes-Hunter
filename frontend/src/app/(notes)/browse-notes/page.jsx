import { Suspense } from "react";
import BrowseNotesClient from "../../self-component/Notes/BrowseNotesClient";

export default function BrowseNotesPage() {

    return (
        <Suspense fallback={<div className="p-4">Loading notes...</div>}>
            <BrowseNotesClient />
        </Suspense>
    );
}
