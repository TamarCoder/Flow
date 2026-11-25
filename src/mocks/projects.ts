import type { Project } from "@/types/models";

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "სამსახური",
    description: "კვარტლის პრეზენტაცია და გუნდის გეგმები.",
    createdAt: "2026-11-01T09:00:00.000Z",
  },
  {
    id: "p2",
    name: "სახლი",
    description: "ყოველდღიური საქმეები და გადასახადები.",
    createdAt: "2026-11-05T09:00:00.000Z",
  },
  {
    id: "p3",
    name: "პირადი განვითარება",
    description: "კითხვა, კურსები და ჯანმრთელობა.",
    createdAt: "2026-11-10T09:00:00.000Z",
  },
];
