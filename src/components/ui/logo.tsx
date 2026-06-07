import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold text-text">
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-white">
          <path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C4.5 5.8 3 7.5 3 9.5C3 11.8 4.8 13.5 7 13.5H8V20C8 21.1 8.9 22 10 22H14C15.1 22 16 21.1 16 20V13.5H17C19.2 13.5 21 11.8 21 9.5C21 7.5 19.5 5.8 17.5 5.5C16.5 3.5 14.5 2 12 2ZM12 4C13.5 4 14.8 4.8 15.5 6.2L15.8 6.8H16.5C17.9 6.8 19 7.9 19 9.3C19 10.5 18.1 11.5 17 11.5H14V20H10V11.5H7C5.9 11.5 5 10.5 5 9.3C5 7.9 6.1 6.8 7.5 6.8H8.2L8.5 6.2C9.2 4.8 10.5 4 12 4Z" />
        </svg>
      </span>
      <span className="text-[15px]">ClinicFlow AI</span>
    </Link>
  );
}
