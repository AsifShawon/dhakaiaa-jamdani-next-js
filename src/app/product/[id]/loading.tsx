export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="skeleton h-96 rounded-xl" />
        <div className="space-y-4">
          <div className="skeleton h-10 w-2/3" />
          <div className="skeleton h-6 w-1/3" />
          <div className="skeleton h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
