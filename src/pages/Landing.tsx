import PublicNavbar from "@/components/PublicNavbar";
import Scene3D from "@/components/three/Scene3D";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FlaskConical, Shield, BarChart3, Users, Microscope, FileCheck, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const services = [
  { icon: FlaskConical, title: "Clinical Trials", desc: "Phase I-IV clinical trials with rigorous protocols and global compliance standards." },
  { icon: Shield, title: "Regulatory Affairs", desc: "End-to-end regulatory support for FDA, EMA, and international submissions." },
  { icon: BarChart3, title: "Data Analytics", desc: "Advanced biostatistics and real-time data monitoring for trial outcomes." },
  { icon: Microscope, title: "Lab Services", desc: "State-of-the-art laboratory facilities for pharmacokinetic and biomarker analysis." },
  { icon: Users, title: "Site Management", desc: "Comprehensive clinical site management across multi-center trials." },
  { icon: FileCheck, title: "Quality Assurance", desc: "GCP-compliant quality systems ensuring data integrity and patient safety." },
];

const Landing = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Scene3D showDNA showParticles className="absolute inset-0 opacity-30" />
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-primary font-medium">
              <FlaskConical size={16} /> Leading Clinical Research Organization
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl lg:text-6xl font-bold font-display leading-tight text-foreground">
              Advancing <span className="gradient-text">Medicine</span> Through Science
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg">
              BMR delivers world-class biomedical research, clinical trials, and regulatory expertise to bring life-saving therapies to patients worldwide.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <a href="#services" className="gradient-bg text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2">
                Our Services <ArrowRight size={18} />
              </a>
              <a href="#contact" className="glass-card px-8 py-3 rounded-lg font-semibold text-foreground hover:bg-secondary transition-all">
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="hidden lg:block">
            <Scene3D showDNA showParticles={false} interactive className="h-[500px] w-full" />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto text-center space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="text-4xl font-bold font-display text-foreground">
              About <span className="gradient-text">BMR</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg leading-relaxed">
              Bio Medical Research (BMR) is a premier clinical research organization specializing in multi-phase drug development, biomarker discovery, and regulatory compliance. With over a decade of experience, our team of scientists, clinicians, and data experts drive innovation in pharmaceutical research across therapeutic areas including oncology, cardiology, neurology, and infectious diseases.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-3 gap-6 pt-8">
              {[{ num: "200+", label: "Clinical Trials" }, { num: "48", label: "Team Members" }, { num: "15+", label: "Years Experience" }].map((s) => (
                <div key={s.label} className="glass-card p-6">
                  <p className="text-3xl font-bold font-display gradient-text">{s.num}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-4xl font-bold font-display text-center text-foreground mb-16">
            Our <span className="gradient-text">Services</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="stat-card group cursor-default">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-display text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-4xl font-bold font-display text-center text-foreground mb-16">
            Contact <span className="gradient-text">Us</span>
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Headquarters</p>
                  <p className="text-sm text-muted-foreground">123 Research Park Drive, Cambridge, MA 02142</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">contact@bmresearch.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (617) 555-0142</p>
                </div>
              </div>
            </motion.div>

            <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="glass-card p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <input className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              </div>
              <button type="submit" className="w-full gradient-bg text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 BMR - Bio Medical Research. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
