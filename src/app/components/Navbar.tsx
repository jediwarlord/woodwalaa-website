'use client';

import Link from 'next/link';
import { ChevronDown, Axe, PenTool } from 'lucide-react';
import '../dropdown.css';

export default function Navbar() {
    return (
        <nav className="navbar-pill">
            <Link href="/" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>
                WOOD<span style={{ color: 'var(--color-accent-primary)' }}>WALAA</span>
            </Link>

            <div className="nav-links">
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
        </nav>
    );
}
