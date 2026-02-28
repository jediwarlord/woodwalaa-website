'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ArtisanWoodworkPage() {
    return (
        <main style={{ paddingBottom: '4rem', paddingTop: '6rem' }}>
            <Navbar />

            {/* Hero Section */}
            <section className="container">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    style={{ marginBottom: '4rem' }}
                >
                    <Link href="/#services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <motion.div variants={fadeUp} className="badge">Bespoke Production</motion.div>
                    <motion.h1 variants={fadeUp} className="title-primary" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textAlign: 'left' }}>
                        Artisan Woodwork
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-lead" style={{ maxWidth: '800px' }}>
                        From sweeping dining tables with live edges to minimalist modern cabinetry, every piece is designed to command a room. We work with premium sustainable hardwoods and innovative resins to create functional art.
                    </motion.p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', marginBottom: '4rem' }}
                >
                    <Image src="/gallery_wood_2_1772242976093.png" alt="Custom Woodwork" fill style={{ objectFit: 'cover' }} />
                </motion.div>

                {/* Process & Offerings Layout */}
                <div className="bento-grid" style={{ marginBottom: '4rem' }}>
                    <div className="bento-item" style={{ gridColumn: 'span 8', padding: '3rem', background: 'var(--color-bg-secondary)' }}>
                        <h2 className="title-secondary" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Our Expertise</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Live Edge Dining Tables</h4>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Sustainably sourced, kiln-dried slabs paired with modern steel or acrylic bases.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Executive Desks</h4>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Ergonomic, statement-piece desks featuring integrated wire management and hidden charging.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Epoxy River Pours</h4>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Crystal clear or pigmented epoxy seamlessly blended with high-character burls.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Architectural Accents</h4>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Custom floating shelves, sculptural room dividers, and slatted feature walls.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bento-item" style={{ gridColumn: 'span 4', padding: '3rem', background: 'var(--color-bg-tertiary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>The Process</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <CheckCircle2 color="var(--color-accent-primary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span><strong style={{ color: '#fff' }}>Consultation:</strong> We discuss your vision, dimensions, and space.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <CheckCircle2 color="var(--color-accent-primary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span><strong style={{ color: '#fff' }}>Lumber Selection:</strong> You choose the exact slab or grain pattern.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <CheckCircle2 color="var(--color-accent-primary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span><strong style={{ color: '#fff' }}>Fabrication:</strong> Updates provided throughout the milling process.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <CheckCircle2 color="var(--color-accent-primary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span><strong style={{ color: '#fff' }}>White-Glove Delivery:</strong> Safe transportation and in-room assembly.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                    WOOD<span style={{ color: 'var(--color-accent-primary)' }}>WALAA</span>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} WoodWalaa.
                </p>
            </footer>
        </main>
    );
}
