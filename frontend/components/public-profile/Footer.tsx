import React from "react";
import Link from "next/link";
import {
  Leaf,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Pricing", href: "#" },
    { label: "NGO Registration", href: "#" },
    { label: "Donation Tools", href: "#" },
    { label: "Campaign API", href: "#" },
    { label: "Partner Program", href: "#" },
  ],
  transparency: [
    { label: "How We Verify", href: "#" },
    { label: "Fee Structure", href: "#" },
    { label: "Security", href: "#" },
    { label: "Support Center", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="p-1.5 bg-green-600 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">EcoKind</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              A modern SaaS platform for managing donations, tracking impact,
              and building trust between donors and non-profits.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span>support@ecokind.io</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <Link href="#" className="hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Trust & Safety
            </h4>
            <ul className="space-y-2">
              {footerLinks.transparency.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EcoKind Technologies Inc. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
