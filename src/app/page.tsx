'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Mail, MapPin, Phone, ArrowRight, Zap, PenTool, ArrowUpRight } from 'lucide-react';
import './globals.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main style={{ paddingBottom: '4rem' }}>
      {/* Floating Pill Navigation */}
      <nav className="navbar-pill">
        <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>
          WOOD<span style={{ color: 'var(--color-accent-primary)' }}>WALAA</span>
        </div>
        <div className="nav-links">
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
          Get Started
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-center" style={{ minHeight: '100vh', paddingTop: '6rem' }}>
        <motion.div
          className="container"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.div variants={fadeUp} className="badge">
            <Zap size={14} style={{ marginRight: '6px' }} /> Premium Craftsmanship
          </motion.div>
          <motion.h1 variants={fadeUp} className="title-primary" style={{ maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Elevate Your Space & Game.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lead" style={{ margin: '0 auto 3rem auto' }}>
            WoodWalaa merges timeless artisan woodworking with modern, precision cricket bat restoration. Welcome to the future of craft.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#services" className="btn btn-primary">
              Explore Services <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Us
            </a>
          </motion.div>
        </motion.div>

        {/* Abstract Background Glows */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,94,0,0.15) 0%, rgba(10,10,10,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
      </section>

      {/* Bento Grid Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="bento-grid"
          >
            {/* Bento Item 1: Artisan Large */}
            <motion.div
              variants={fadeUp}
              className="bento-item"
              style={{ gridColumn: 'span 12', minHeight: '400px' }}
            >
              <div className="bento-image-wrapper">
                <Image src="/artisan_piece_1772217440927.png" alt="Artisan Woodworking" fill style={{ objectFit: 'cover', filter: 'brightness(0.6)' }} />
              </div>
              <div className="bento-content">
                <div className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>Bespoke</div>
                <h3>Artisan Woodpieces</h3>
                <p style={{ maxWidth: '600px' }}>From modern sculptural objects to heirloom-quality furniture, we craft striking pieces that command attention in any modern space.</p>
                <ArrowUpRight size={28} color="var(--color-accent-primary)" style={{ position: 'absolute', top: '2rem', right: '2rem' }} />
              </div>
            </motion.div>

            {/* Bento Item 2: Cricket Bats */}
            <motion.div
              variants={fadeUp}
              className="bento-item"
              style={{ gridColumn: 'span 7', minHeight: '350px' }}
            >
              <div className="bento-image-wrapper">
                <Image src="/cricket_bat_repair_1772217427649.png" alt="Cricket Bat Repair" fill style={{ objectFit: 'cover', filter: 'brightness(0.5)' }} />
              </div>
              <div className="bento-content">
                <div className="badge">Professional</div>
                <h3>Cricket Bat Services</h3>
                <p>Precision handle replacement, weight reduction, and crack binding for the perfect balance. We breathe new life into your blade.</p>
                <ArrowUpRight size={24} color="var(--color-accent-primary)" style={{ position: 'absolute', top: '2rem', right: '2rem' }} />
              </div>
            </motion.div>

            {/* Bento Item 3: Feature Highlight / Text Card */}
            <motion.div
              variants={fadeUp}
              className="bento-item"
              style={{ gridColumn: 'span 5', minHeight: '350px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--color-bg-tertiary)' }}
            >
              <PenTool size={48} color="var(--color-accent-primary)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Meticulous Process</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Every cut, sand, and finish is executed with scientific precision. We utilize advanced techniques and premium sustainable materials to ensure longevity and unparalleled performance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}
          >
            <motion.div variants={fadeUp} style={{ gridColumn: 'span 5' }}>
              <h2 className="title-secondary">Start a<br /><span style={{ color: 'var(--color-accent-primary)' }}>Project.</span></h2>
              <p className="text-lead" style={{ marginBottom: '3rem' }}>Ready to commission a masterpiece or restore your favorite bat? Drop us a line.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={20} color="var(--color-text-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>HQ Address</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>123 Artisan Lane, Woodshire 90210</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} color="var(--color-text-primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Email Support</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>hello@woodwalaa.com</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ gridColumn: 'span 7' }} className="bento-item">
              <div style={{ padding: '3rem', background: 'var(--color-bg-secondary)', width: '100%', height: '100%' }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="input-group" style={{ flex: '1 1 45%' }}>
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" className="input-field" placeholder="John Doe" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="input-group" style={{ flex: '1 1 45%' }}>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" className="input-field" placeholder="john@example.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="service">Inquiry Type</label>
                    <select id="service" className="input-field" required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} style={{ appearance: 'none' }}>
                      <option value="" disabled>Select an option...</option>
                      <option value="custom_woodwork">Custom Woodwork</option>
                      <option value="bat_repair">Cricket Bat Repair</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="message">Project Details</label>
                    <textarea id="message" className="input-field" rows={5} placeholder="Tell us about your requirements..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                  </div>

                  {status === 'success' && (
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: '12px', color: '#4caf50', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                      Submission successful. We will contact you shortly.
                    </div>
                  )}
                  {status === 'error' && (
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(244, 67, 54, 0.1)', border: '1px solid rgba(244,67,54,0.3)', borderRadius: '12px', color: '#f44336', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                      An error occurred. Please try again.
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Processing...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', margin: '4rem 2rem 0 2rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
          WOOD<span style={{ color: 'var(--color-accent-primary)' }}>WALAA</span>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} WoodWalaa.
        </p>
      </footer>

      {/* Mobile adjustments inline since we are mimicking specifically */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 992px) {
          .bento-item { grid-column: span 12 !important; }
          #contact > div > div { display: flex !important; flex-direction: column !important; }
          #contact .bento-item { width: 100% !important; }
        }
      `}} />
    </main>
  );
}
