export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="skeleton h-12 w-1/3 mb-4" />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
      </div>
    </div>
  );
}
