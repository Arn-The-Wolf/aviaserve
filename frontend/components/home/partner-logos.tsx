const partners = ["Delta", "Emirates", "Lufthansa", "British Airways", "Singapore Airlines", "Qatar Airways"]

export default function PartnerLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {partners.map((partner) => (
        <div
          key={partner}
          className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold tracking-wide text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
        >
          {partner}
        </div>
      ))}
    </div>
  )
}
