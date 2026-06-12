import { useGetList } from "react-admin";

export interface DashboardStats {
  totalEmployees: number | undefined;
  activeEmployees: number | undefined;
  totalInterns: number | undefined;
  managersCount: number | undefined;
  avgSalary: number;
  maxSalary: number;
  isPending: boolean;
}

export const useDashboardStats = (): DashboardStats => {
  const { total: totalEmployees, isPending: p1 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees, isPending: p2 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    filter: { active: true },
  });

  const { total: totalInterns, isPending: p3 } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
  });

  // Fetch all employees to compute salary stats
  const { data: allEmployees, isPending: p4 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1000 },
  });

  const salaries = allEmployees?.map((e) => e.salary).filter(Boolean) ?? [];
  const avgSalary =
    salaries.length > 0
      ? Math.round(salaries.reduce((a: number, b: number) => a + b, 0) / salaries.length)
      : 0;
  const maxSalary = salaries.length > 0 ? Math.max(...salaries) : 0;

  // Count managers: employees who appear as managerId in interns
  const { data: allInterns, isPending: p5 } = useGetList("interns", {
    pagination: { page: 1, perPage: 1000 },
  });
  const managerIds = new Set(allInterns?.map((i) => i.managerId));
  const managersCount = managerIds.size;

  return {
    totalEmployees,
    activeEmployees,
    totalInterns,
    managersCount,
    avgSalary,
    maxSalary,
    isPending: p1 || p2 || p3 || p4 || p5,
  };
};
