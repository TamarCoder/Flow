import { Suspense } from "react";
import TaskDetails from "@/components/TaskDetails/TaskDetails";

// Ids come from the URL at request time, so the screen renders inside Suspense
// (Cache Components is on in next.config.ts).
export default function TaskPage() {
  return (
    <Suspense>
      <TaskDetails />
    </Suspense>
  );
}
