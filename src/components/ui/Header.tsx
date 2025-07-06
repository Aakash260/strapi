import React from "react";
import Link from "next/link";
import { getUserMeLoader } from "@/lib/service/getUserMeLoader";
import { LogoutButton } from "../custom/LogOutBtn";
import { SummaryForm } from "../forms/SummaryForm";

interface LogoText {
  id: number;
  url: string;
  text: string;
  IsExternal: boolean;
}

interface CTA {
  id: number;
  url: string;
  text: string;
  IsExternal: boolean;
}

interface HeaderData {
  id: number;
  logoText: LogoText;
  cta: CTA;
}

interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({
  userData,
}: {
  readonly userData: AuthUserProps;
}) {
  return (
    <div className="flex items-center gap-3 text-sm sm:text-base">
      <Link
        href="/dashboard/account"
        className="font-medium hover:text-primary transition-colors"
      >
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
}

const Header = async ({ data }: { data: HeaderData }) => {
  const user = await getUserMeLoader();

  return (
    <header className="w-full px-4 sm:px-8 py-4 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Logo */}
        <Link
          href={data.logoText.url}
          target={data.logoText.IsExternal ? "_blank" : undefined}
          className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {data.logoText.text}
        </Link>

        {/* Summary form centered if logged in */}
        {user.ok && (
          <div className="w-full sm:w-auto flex justify-center">
            <SummaryForm />
          </div>
        )}

        {/* CTA or user info */}
        <div className="w-full sm:w-auto flex justify-end">
          {user.ok ? (
            <LoggedInUser userData={user.data} />
          ) : (
            <Link
              href={data.cta.url}
              target={data.cta.IsExternal ? "_blank" : undefined}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow"
            >
              {data.cta.text}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
