"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Magnetic from '@/components/Magnetic';

const homeDropdownLinks = [
  { href: "/about", label: "About Us", icon: "fa-info-circle" },
  { href: "/our-vision", label: "Our Vision", icon: "fa-eye" },
  { href: "/our-mission", label: "Our Mission", icon: "fa-bullseye" },
  { href: "/assessment", label: "Assessment Form", icon: "fa-file-text" },
];

const servicesDropdownLinks = [

  { href: "/services/study-abroad", label: "Study Abroad", icon: "fa-graduation-cap" },
  { href: "/services/visit-visa", label: "Visit Visa", icon: "fa-plane" },
  { href: "/services/immigration", label: "Immigration", icon: "fa-globe" },
  { href: "/services/language-courses", label: "Language Courses", icon: "fa-language" },
  { href: "/services/accommodation", label: "Accommodation", icon: "fa-home" },
];


const navLinks = [
  { href: "/why-choose-us", label: "Why Us" },
  { href: "/testimonials", label: "Success Stories" },
  { href: "/event", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const Header = ({ initialSettings }: { initialSettings?: any }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRefHome = useRef<HTMLLIElement>(null);
  const dropdownRefServices = useRef<HTMLLIElement>(null);
  const [settings, setSettings] = useState(initialSettings || {
    email: 'Infinityconsultantsfsd@gmail.com',

  });

  useEffect(() => {
    if (initialSettings) setSettings(initialSettings);
  }, [initialSettings]);

  useEffect(() => {
    const navbar = document.getElementById("navbar_sticky");
    if (!navbar) return;

    let stickyOffset = navbar.offsetTop;

    const handleScroll = () => {
      const navbarHeight = navbar.offsetHeight;
      if (window.scrollY > stickyOffset + 10) {
        if (!navbar.classList.contains("sticky")) {
          navbar.classList.add("sticky");
          document.body.style.paddingTop = navbarHeight + 'px';
        }
      } else {
        if (navbar.classList.contains("sticky")) {
          navbar.classList.remove("sticky");
          document.body.style.paddingTop = '0';
          stickyOffset = navbar.offsetTop;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.paddingTop = '0';
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefHome.current && !dropdownRefHome.current.contains(event.target as Node)) {
        setHomeDropdownOpen(false);
      }
      if (dropdownRefServices.current && !dropdownRefServices.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  const isHomeActive = pathname === '/' || homeDropdownLinks.some(l => isActive(l.href));
  const isServicesActive = servicesDropdownLinks.some(l => isActive(l.href));
  const isDestinationsActive = isActive('/destinations');

  return (
    <section id="header">
      {/* Top Bar */}
      <div className="site-header__top d-none d-lg-block">
        <div className="site-navbar__inner py-1">
          <div className="d-flex gap-4 small text-white">
            <span><i className="fa fa-envelope col_green me-2"></i> {settings.email}</span>
          </div>
          <div className="ms-auto d-flex gap-3 align-items-center text-white small">
            <Link href="/login" className="text-white hover-oran ms-2" title="Login">
              <i className="fa fa-user fs-6"></i>
            </Link>
          </div>
        </div>
      </div>

      <nav className="site-navbar" id="navbar_sticky">
        <div className="site-navbar__inner">
          {/* Brand */}
          <Link href="/" className="site-navbar__brand">
            <Image
              src="/Infinity-Logo-new.webp"
              alt="Infinity Overseas Consultant Logo"
              width={160}
              height={60}
              priority
              style={{ objectFit: 'contain', height: 'auto' }}
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="site-navbar__toggler"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Navigation */}
          <div className={`site-navbar__menu ${menuOpen ? 'site-navbar__menu--open' : ''}`}>
            <ul className="site-navbar__nav">
              {/* Home with Dropdown */}
              <li
                className="site-navbar__nav-item site-navbar__dropdown"
                ref={dropdownRefHome}
                onMouseEnter={() => setHomeDropdownOpen(true)}
                onMouseLeave={() => setHomeDropdownOpen(false)}
              >
                <Link
                  href="/"
                  className={`site-navbar__nav-link ${isHomeActive ? 'site-navbar__nav-link--active' : ''}`}
                  onClick={(e) => {
                    // On mobile, toggle dropdown instead of navigating
                    if (window.innerWidth < 1200) {
                      e.preventDefault();
                      setHomeDropdownOpen(!homeDropdownOpen);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  Home <i className={`fa fa-chevron-down site-navbar__dropdown-arrow ${homeDropdownOpen ? 'site-navbar__dropdown-arrow--open' : ''}`}></i>
                </Link>
                <ul className={`site-navbar__dropdown-menu ${homeDropdownOpen ? 'site-navbar__dropdown-menu--open' : ''}`}>
                  {homeDropdownLinks.map((link, i) => (
                    <li key={i} className="site-navbar__dropdown-item">
                      <Link
                        href={link.href}
                        className={`site-navbar__dropdown-link ${isActive(link.href) ? 'site-navbar__dropdown-link--active' : ''}`}
                        onClick={() => { setMenuOpen(false); setHomeDropdownOpen(false); }}
                      >
                        <i className={`fa ${link.icon} me-2`}></i> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Our Services with Dropdown */}
              <li
                className="site-navbar__nav-item site-navbar__dropdown"
                ref={dropdownRefServices}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link
                  href="#"
                  className={`site-navbar__nav-link ${isServicesActive ? 'site-navbar__nav-link--active' : ''}`}
                  onClick={(e) => {
                    if (window.innerWidth < 1200) {
                      e.preventDefault();
                      setServicesDropdownOpen(!servicesDropdownOpen);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  Services <i className={`fa fa-chevron-down site-navbar__dropdown-arrow ${servicesDropdownOpen ? 'site-navbar__dropdown-arrow--open' : ''}`}></i>
                </Link>
                <ul className={`site-navbar__dropdown-menu ${servicesDropdownOpen ? 'site-navbar__dropdown-menu--open' : ''}`}>
                  {servicesDropdownLinks.map((link, i) => (
                    <li key={i} className="site-navbar__dropdown-item">
                      <Link
                        href={link.href}
                        className={`site-navbar__dropdown-link ${isActive(link.href) ? 'site-navbar__dropdown-link--active' : ''}`}
                        onClick={() => { setMenuOpen(false); setServicesDropdownOpen(false); }}
                      >
                        <i className={`fa ${link.icon} me-2`}></i> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Study Destinations */}
              <li className="site-navbar__nav-item">
                <Link
                  href="/destinations"
                  className={`site-navbar__nav-link ${isActive('/destinations') ? 'site-navbar__nav-link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Destinations
                </Link>
              </li>

              {/* Other Nav Links */}
              {navLinks.map((link, i) => (
                <li key={i} className="site-navbar__nav-item">
                  <Link
                    href={link.href}
                    className={`site-navbar__nav-link ${isActive(link.href) ? 'site-navbar__nav-link--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="site-navbar__cta d-flex align-items-center">
              <Link className="site-navbar__cta-btn" href="/consultation">
                <i className="fa fa-user me-1"></i> Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
