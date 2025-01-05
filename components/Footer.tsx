import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram,  Mail,  MapPin } from 'lucide-react'
import { FaLinkedin } from "react-icons/fa"


export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/apaclogo.png"
                alt="APAC Website"
                width={150}
                height={50}
                className="invert"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Experience excellence at Asia Pacific Analytics Club. Where passion meets data.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-[90px]">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/clubEvent" className="text-gray-400 hover:text-white transition-colors">
                 Event
                </Link>
              </li>
              <li>
                <Link href="/merch" className="text-gray-400 hover:text-white transition-colors">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contactUs" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:ml-[30px]">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <a href="mailto:asiapacificanalyticsclubapu@gmail.com" className="hover:text-white transition-colors">
                asiapacificanalyticsclubapu@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Jalan Teknologi 5, Taman Teknologi Malaysia<br />57000 Kuala Lumpur</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:ml-[20px]">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/asiapacificanalyticsclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/apu.apac/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/asia-pacific-analytics-club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Asia Pacific Analytic Club. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

