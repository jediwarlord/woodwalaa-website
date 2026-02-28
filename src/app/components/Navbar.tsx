'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Axe, PenTool, Menu, X } from 'lucide-react';
import '../dropdown.css';

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setMobileMenuOpen(false);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="navbar-pill-container" style={{ position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '90%', maxWidth: '800px' }}>
            {/* Main Pill */}
            <div className={`navbar-pill ${mobileMenuOpen ? 'open' : ''}`} style={{ width: '100%', position: 'relative', margin: 0, transform: 'none', left: 'auto', top: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem' }}>
                <Link href="/" onClick={closeMobileMenu} style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff', flexShrink: 0 }}>
                    WOOD<span style={{ color: 'var(--color-accent-primary)' }}>WALAA</span>
                </Link>

                {/* Desktop Links */}
                {!isMobile && (
                    <>
                        <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', width: 'auto', order: 0, paddingTop: 0 }}>
                            <div className="nav-dropdown-wrapper">
                                <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    Services <ChevronDown size={14} />
                                </button>
                                <div className="nav-dropdown-menu">
                                    <Link href="/services/artisan-woodwork" className="dropdown-item">
                                        <Axe size={16} color="var(--color-accent-primary)" />
                                        <div>
                                            <div style={{ color: '#fff' }}>Artisan Woodwork</div>
                                            <div style={{ fontSize: '0.7rem', marginTop: '2px' }}>Bespoke tables & furniture</div>
                                        </div>
                                    </Link>
                                    <Link href="/services/cricket-bat-repair" className="dropdown-item">
                                        <PenTool size={16} color="var(--color-accent-primary)" />
                                        <div>
                                            <div style={{ color: '#fff' }}>Cricket Bat Repair</div>
                                            <div style={{ fontSize: '0.7rem', marginTop: '2px' }}>Professional refurbishment</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <Link href="/#contact" className="nav-link">Contact</Link>
                        </div>

                        <Link href="/#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                            Get Started
                        </Link>
                    </>
                )}

                {/* Mobile Hamburger Toggle */}
                {isMobile && (
                    <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem' }}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobile && mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute', top: 'calc(100% + 0.5rem)', left: 0, right: 0,
                            background: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(20px)',
                            border: '1px solid var(--color-border)', borderRadius: '16px',
                            padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden'
                        }}
                    >
                        <Link href="/services/artisan-woodwork" onClick={closeMobileMenu} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '12px', background: 'var(--color-bg-tertiary)' }}>
                            <Axe size={20} color="var(--color-accent-primary)" />
                            <div style={{ fontWeight: 600 }}>Artisan Woodwork</div>
                        </Link>
                        <Link href="/services/cricket-bat-repair" onClick={closeMobileMenu} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '12px', background: 'var(--color-bg-tertiary)' }}>
                            <PenTool size={20} color="var(--color-accent-primary)" />
                            <div style={{ fontWeight: 600 }}>Cricket Bat Repair</div>
                        </Link>
                        <Link href="/#contact" onClick={closeMobileMenu} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '12px', color: 'var(--color-text-secondary)' }}>
                            <div style={{ fontWeight: 500 }}>Contact Us</div>
                        </Link>
                        <Link href="/#contact" onClick={closeMobileMenu} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                            Get Started
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
