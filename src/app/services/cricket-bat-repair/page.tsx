'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Hammer, Scissors, Weight } from 'lucide-react';
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

export default function CricketBatRepairPage() {
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
                    <motion.div variants={fadeUp} className="badge">Professional Refurbishment</motion.div>
                    <motion.h1 variants={fadeUp} className="title-primary" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textAlign: 'left' }}>
                        Bat Restoration
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-lead" style={{ maxWidth: '800px' }}>
                        Your bat is the most important tool in your arsenal. We use traditional techniques, modern epoxy resins, and premium cane to breathe new life into damaged blades so you can return to the crease with absolute confidence.
                    </motion.p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', marginBottom: '4rem' }}
                >
                    <Image src="/gallery_bat_2_1772243000664.png" alt="Restored Cricket Bat" fill style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
                </motion.div>

                {/* Pricing & Services Bento Grid */}
                <div className="bento-grid" style={{ marginBottom: '4rem' }}>

                    {/* Main Service List */}
                    <div className="bento-item" style={{ gridColumn: 'span 8', padding: '3rem', background: 'var(--color-bg-secondary)' }}>
                        <h2 className="title-secondary" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Service Menu</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Service Item */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Full Handle Replacement</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '400px', marginTop: '0.25rem' }}>Complete removal of broken handle, precision splicing of premium multi-piece Sarawak cane, re-twining, and fresh grip.</p>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>$100 - $125</div>
                            </div>

                            {/* Service Item */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Major Crack & Toe Binding</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '400px', marginTop: '0.25rem' }}>Deep epoxy crack injection, structural clamping, and reinforced fiberglass threaded toe binding.</p>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>$45 - $85</div>
                            </div>

                            {/* Service Item */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Weight Reduction & Balancing</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '400px', marginTop: '0.25rem' }}>Careful reprofiling of the blade to shave weight (1-3 oz) and raise the sweet spot without sacrificing ping.</p>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>$70</div>
                            </div>

                            {/* Service Item */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Full Face Refurbishment</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '400px', marginTop: '0.25rem' }}>Removal of old grips/stickers, full machine & hand sanding, raw linseed oiling, and buffing. Looks brand new.</p>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>$60</div>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2rem', fontStyle: 'italic' }}>
                            * Estimates may vary based on the exact condition of the willow. Reach out via the contact form for a precise quote.
                        </p>
                    </div>

                    {/* Side Cards */}
                    <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="bento-item" style={{ flex: 1, padding: '2rem', background: 'var(--color-bg-tertiary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Hammer size={48} color="var(--color-accent-primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Quick Turnaround</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Most standard repairs and refurbishments are completed and ready for pickup within 5-7 business days.</p>
                        </div>
                        <div className="bento-item" style={{ flex: 1, padding: '2rem', background: 'var(--color-bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Weight size={48} color="var(--color-accent-primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Perfect Balance</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>We don't just fix it; we make sure the pick-up feels exactly how you want it before it leaves the shop.</p>
                        </div>
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
