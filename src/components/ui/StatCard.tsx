interface StatCardProps {
  value: string | number;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col items-center gap-1 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}
