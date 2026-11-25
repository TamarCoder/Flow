import { Suspense } from "react";
import ProjectTasks from "@/components/ProjectTasks/ProjectTasks";

// The project id is only known at request time, so the screen renders inside Suspense
// (Cache Components is on in next.config.ts).
export default function ProjectTasksPage() {
  return (
    <Suspense>
      <ProjectTasks />
    </Suspense>
  );
}
