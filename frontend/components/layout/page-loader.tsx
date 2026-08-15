export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#f4f8fc] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-sky-100 border-t-sky-500" />
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="mt-3 h-3 w-full rounded bg-slate-50" />
        <div className="mt-2 h-3 w-5/6 rounded bg-slate-50" />
      </div>
    </div>
  )
}
