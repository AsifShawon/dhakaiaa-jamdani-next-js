export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-24 grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton h-72 w-full rounded-xl" />
      ))}
    </div>
  );
}
