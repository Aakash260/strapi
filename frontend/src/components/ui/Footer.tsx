import React from 'react'
import Link from 'next/link'

interface LogoLink {
  id: number;
  url: string;
  text: string;
  IsExternal: boolean;
}

interface FooterLink {
  id: number;
  url: string;
  text: string;
  IsExternal: boolean;
}

interface FooterData {
  id: number;
  FooterText: string;
  logoLink: LogoLink;
  FooterLinks: FooterLink[];
}

const Footer = ({ data }: { data: FooterData }) => {
  return (
    <footer className="w-full px-6 py-8 bg-gray-50 border-t border-gray-200 mt-12">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href={data.logoLink.url}
            target={data.logoLink.IsExternal ? '_blank' : undefined}
            className="text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {data.logoLink.text}
          </Link>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">{data.FooterText} <span className="text-red-500">♥</span></span>
        </div>
        <div className="flex gap-6 mt-2 md:mt-0">
          {data.FooterLinks.map(link => (
            <Link
              key={link.id}
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target={link.IsExternal ? '_blank' : undefined}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              rel={link.IsExternal ? 'noopener noreferrer' : undefined}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer