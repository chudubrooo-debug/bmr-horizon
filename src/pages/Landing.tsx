import PublicNavbar from "@/components/PublicNavbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import ServiceModal from "@/components/ServiceModal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FlaskConical, Shield, BarChart3, Users, Microscope, FileCheck, ArrowRight,
  Mail, Phone, MapPin, Search, ClipboardCheck, UserCheck, Scale,
  Heart, Lightbulb, Handshake, Award, BadgeCheck, Target,
  Building2, BedDouble, Globe, Activity, Stethoscope, Brain,
  Bone, Baby, Eye, Pill, Beaker, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const services = [
  {
    icon: Search, title: "Feasibility & Site Selection",
    desc: "Strategic site identification, feasibility assessments, and optimal site selection for trial success.",
    details: [
      "Comprehensive feasibility assessments across therapeutic areas",
      "Strategic site identification leveraging our hospital network",
      "Demographic analysis and patient population evaluation",
      "Regulatory landscape assessment for each site",
      "Site capability and infrastructure evaluation",
    ],
  },
  {
    icon: ClipboardCheck, title: "Project Management (Phase I–IV)",
    desc: "End-to-end clinical trial project management with expert oversight from study design to final report.",
    details: [
      "End-to-end Phase I-IV clinical trial management",
      "Protocol design and sample size calculations",
      "Timeline management with proactive milestone tracking",
      "Stakeholder communication and resource optimization",
      "Comprehensive oversight from study design to final report submission",
    ],
  },
  {
    icon: UserCheck, title: "Patient Recruitment & Retention",
    desc: "Strategic recruitment and retention strategies ensuring target enrollment with patient-centric approaches.",
    details: [
      "Enhanced enrollment strategies for rapid recruitment",
      "Patient engagement and retention programs",
      "Diverse demographic representation across our hospital network",
      "Community outreach and awareness campaigns",
      "Real-time recruitment tracking and optimization",
    ],
  },
  {
    icon: Scale, title: "Regulatory Support",
    desc: "Full regulatory compliance support, documentation, and agency liaison services across global jurisdictions.",
    details: [
      "Ethics Committee registrations and institutional setup",
      "CTD/eCTD submission support (IND/CTA, NDA/MAA, ANDA)",
      "Lifecycle management — annual reports, variations, renewals",
      "Direct regulatory agency liaison and communication",
      "TMF compilation in CTD format for EU and USFDA",
    ],
  },
  {
    icon: Shield, title: "Quality Assurance",
    desc: "Comprehensive GxP audit and quality assurance services for pharmaceutical and biotech manufacturers.",
    details: [
      "GCP, Site, QMS, and Vendor audits",
      "GCP compliance services for all phase studies",
      "Safety database management and monitoring",
      "100% USFDA and DCGI inspection success record",
      "Audit-readiness programs and compliance training",
    ],
  },
  {
    icon: Users, title: "Clinical Trial Staff Support",
    desc: "Dedicated CRCs, monitors, and clinical staff to support your trial operations with expertise and efficiency.",
    details: [
      "Experienced Clinical Managers and Research Coordinators",
      "Expert Physicians and Medical Advisors",
      "Dedicated Quality Assurance teams",
      "Onsite trial management and day-to-day coordination",
      "Medical monitor and medical advisor support on request",
    ],
  },
];

const coreValues = [
  { icon: Award, title: "Quality", desc: "Highest standards in data integrity, regulatory compliance, and service delivery.", tag: "Excellence in Every Detail" },
  { icon: Heart, title: "Patient-Centric", desc: "Patients at the center — their safety, comfort, and well-being throughout the trial journey.", tag: "Patient Safety First" },
  { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge technologies and methodologies to enhance trial efficiency and data quality.", tag: "Forward-Thinking Solutions" },
  { icon: Handshake, title: "Collaboration", desc: "Strong partnerships with sponsors, CROs, investigators, and sites for shared success.", tag: "Partnership Approach" },
  { icon: BadgeCheck, title: "Integrity", desc: "Highest ethical standards with transparency, honesty, and accountability in all operations.", tag: "Unwavering Ethics" },
  { icon: Target, title: "Individual Growth", desc: "Investing in talent, nurturing professional development that strengthens our team.", tag: "Continuous Development" },
];

const regulatoryData = [
  { name: "USFDA", inspections: 2, success: 100 },
  { name: "DCGI", inspections: 3, success: 100 },
  { name: "Regulatory Audits", inspections: 5, success: 100 },
];

const inspectionTimeline = [
  { year: "2013", event: "USFDA Inspection", result: "Successful" },
  { year: "2016", event: "DCGI Inspection", result: "Successful" },
  { year: "2018", event: "DCGI Inspection", result: "Successful" },
  { year: "2019", event: "DCGI Inspection", result: "Successful" },
  { year: "2026", event: "USFDA Inspection", result: "Successful" },
];

const hospitals = [
  { name: "Renova Neelima Hospital", type: "Private Multi-Specialty", beds: 105, location: "Sanathnagar, Hyderabad" },
  { name: "Aster Prime Hospital", type: "Private Multi-Specialty", beds: 210, location: "Ameerpet, Hyderabad" },
  { name: "Landmark Hospitals", type: "Private Multi-Specialty", beds: 100, location: "Nizampet, Kukatpally" },
  { name: "Paarthiv Lung Care Center", type: "Super-Specialty", beds: 25, location: "Erragadda, Hyderabad" },
  { name: "Renova Century Hospital", type: "Private Multi-Specialty", beds: 200, location: "Banjara Hills, Hyderabad" },
];

const therapeuticAreas = [
  { icon: Activity, name: "Cardiology" },
  { icon: Brain, name: "Neurology" },
  { icon: Stethoscope, name: "Pulmonology" },
  { icon: Bone, name: "Orthopedics" },
  { icon: Baby, name: "Pediatrics" },
  { icon: Eye, name: "Ophthalmology" },
  { icon: Pill, name: "Oncology" },
  { icon: Beaker, name: "Nutraceuticals" },
  { icon: FlaskConical, name: "Dermatology" },
  { icon: Microscope, name: "Endocrinology" },
];

const COLORS = ["hsl(211,80%,42%)", "hsl(185,100%,40%)", "hsl(145,60%,45%)"];

const Landing = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AnimatedBackground variant="hero" className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass-card px-4 py-2 text-xs font-semibold text-primary uppercase tracking-wider">
              <FlaskConical size={14} /> Site Management Organization
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl lg:text-6xl font-bold font-display leading-tight text-foreground">
              Your Trusted Partner in{" "}
              <span className="gradient-text">Clinical Excellence</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              BMR delivers customized and adaptable outsourcing solutions for clinical trials, regulatory excellence, and patient-centric research across Asia, Europe, and the USA.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              {["Clinical Trials", "Regulatory Excellence", "Patient-Centric"].map((t) => (
                <span key={t} className="px-4 py-1.5 rounded-full text-xs font-semibold border border-primary/20 text-primary bg-primary/5">{t}</span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4 pt-2">
              <a href="#services" className="gradient-bg text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg">
                Our Services <ArrowRight size={18} />
              </a>
              <a href="#contact" className="glass-card px-8 py-3 rounded-lg font-semibold text-foreground hover:bg-secondary transition-all">
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="hidden lg:block">
            <AnimatedBackground variant="dna" className="h-[500px] w-full" />
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 border-y border-border/50 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { label: "NABH Affiliated", icon: BadgeCheck },
              { label: "CDSCO Registered", icon: Shield },
              { label: "USFDA Inspected", icon: Award },
              { label: "100% Inspection Success", icon: FileCheck },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <b.icon size={18} className="text-primary" />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About BMR-SMO */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto text-center space-y-6">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              About <span className="gradient-text">BMR-SMO</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              BMR (Biomedical Research) is a prominent global provider of Site Management Organization (SMO) services,
              delivering customized and adaptable outsourcing solutions to meet specific clinical trial requirements.
              With 15+ years of experience since 2010 and a network spanning Asia, Europe, and the USA, we bring trust, expertise,
              and dedication to every engagement.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <AnimatedCounter end={15} suffix="+" label="Years Experience" sublabel="Since 2010" />
            <AnimatedCounter end={100} suffix="%" label="Inspection Success" sublabel="USFDA & DCGI" />
            <AnimatedCounter end={640} suffix="+" label="Hospital Beds" sublabel="5 Affiliated Hospitals" />
            <AnimatedCounter end={5} label="Regulatory Audits" sublabel="All Successful" />
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="stat-card space-y-4">
              <h3 className="text-xl font-bold font-display gradient-text">Our Mission</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Provide comprehensive project management ensuring protocol adherence to successful trial completion</span></li>
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Deliver smart, innovative solutions at competitive costs with customized services</span></li>
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Be a benchmark of excellence in clinical trial management services</span></li>
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Provide quality and reliable data that sponsors and CROs can trust</span></li>
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="stat-card space-y-4">
              <h3 className="text-xl font-bold font-display gradient-text">Our Vision</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Deliver trust, experience, expertise and dedication in every engagement</span></li>
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Maintain a highly trained clinical trials network for superior outcomes</span></li>
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Be the preferred choice for clinical research across Asia, Europe, USA and beyond</span></li>
                <li className="flex gap-3"><ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Build a lasting legacy of quality and trust between sponsors and CROs</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What Drives Us</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              Our Core <span className="gradient-text">Values</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="stat-card group cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 gradient-bg opacity-5 rounded-bl-full" />
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <v.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-display text-foreground mb-1">{v.title}</h3>
                <p className="text-xs font-semibold text-primary mb-2">{v.tag}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What We Offer</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              Comprehensive <span className="gradient-text">Service Portfolio</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From feasibility to trial completion, we provide end-to-end support at every stage of your clinical research journey.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="stat-card group cursor-pointer"
                onClick={() => { setSelectedService(s); setModalOpen(true); }}
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold font-display text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal service={selectedService} open={modalOpen} onOpenChange={setModalOpen} />

      {/* Regulatory Excellence */}
      <section id="regulatory" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Trust & Compliance</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              Regulatory <span className="gradient-text">Excellence</span>
            </motion.h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Chart */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="stat-card">
              <h3 className="text-lg font-semibold font-display text-foreground mb-6">Inspection Track Record</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={regulatoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="inspections" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Inspections" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full gradient-bg" />
                <span className="font-semibold text-pharma-green">100% Success Rate</span>
                <span className="text-muted-foreground">across all inspections</span>
              </div>
            </motion.div>
            {/* Timeline */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="stat-card">
              <h3 className="text-lg font-semibold font-display text-foreground mb-6">Inspection Timeline</h3>
              <div className="space-y-6">
                {inspectionTimeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold">{item.year}</div>
                      {i < inspectionTimeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-semibold text-foreground">{item.event}</p>
                      <p className="text-xs text-pharma-green font-medium mt-0.5">✓ {item.result}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {["NABH Affiliated", "CDSCO Registered", "USFDA Inspected"].map((c) => (
                  <div key={c} className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs font-semibold text-primary">{c}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Infrastructure</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              Our Hospital <span className="gradient-text">Network</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              All affiliated hospitals are strategically located in Hyderabad, Telangana — providing excellent patient access and diverse demographic representation.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="col-span-2 md:col-span-3 grid grid-cols-3 gap-4">
              <div className="stat-card text-center">
                <BedDouble size={28} className="text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold font-display gradient-text">640+</p>
                <p className="text-sm text-muted-foreground">Total Beds</p>
              </div>
              <div className="stat-card text-center">
                <Building2 size={28} className="text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold font-display gradient-text">5</p>
                <p className="text-sm text-muted-foreground">Hospitals</p>
              </div>
              <div className="stat-card text-center">
                <Globe size={28} className="text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold font-display gradient-text">Hyderabad</p>
                <p className="text-sm text-muted-foreground">Strategic Location</p>
              </div>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {hospitals.map((h, i) => (
              <motion.div key={h.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="glass-card p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-foreground">{h.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{h.beds} Beds</span>
                </div>
                <p className="text-xs text-primary font-medium">{h.type}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin size={12} /> {h.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapeutic Expertise */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Experience & Expertise</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              Therapeutic <span className="gradient-text">Expertise</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Successfully conducted clinical trials across a diverse range of therapeutic specialties, demonstrating our versatility and depth of expertise.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {therapeuticAreas.map((area, i) => (
              <motion.div key={area.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="stat-card text-center group cursor-default py-8">
                <area.icon size={28} className="mx-auto text-primary group-hover:scale-110 transition-transform mb-3" />
                <p className="text-sm font-semibold text-foreground">{area.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Partner With Excellence</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold font-display text-foreground">
              Contact <span className="gradient-text">Us</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Your success is our mission. Contact BMR-SMO today to discuss how we can support your clinical research needs.
            </motion.p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Office Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">2nd Floor, Sri Data Sai Building, Street 1A, Bhagyanagar Colony, KPHB, Kukatpally, Hyderabad-500072, Telangana, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 9440141524</p>
                  <p className="text-xs text-muted-foreground mt-1">Available for consultation · Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">biomedicalresearch.ar@gmail.com</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4">
                {["NABH Affiliated", "CDSCO Registered", "USFDA Inspected"].map((c) => (
                  <div key={c} className="text-center p-3 rounded-lg glass-card">
                    <BadgeCheck size={20} className="text-primary mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{c}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="glass-card p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <input className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none" placeholder="Tell us about your clinical research needs..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <button type="submit" className="w-full gradient-bg text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">BMR-SMO</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Your Trusted Partner in Clinical Excellence. Delivering customized outsourcing solutions for clinical trials worldwide.</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Feasibility & Site Selection</li>
                <li>Project Management</li>
                <li>Patient Recruitment</li>
                <li>Regulatory Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">Accreditations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>NABH Affiliated Institutions</li>
                <li>CDSCO Registered</li>
                <li>USFDA Inspected</li>
                <li>100% Inspection Success Rate</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2026 BMR-SMO — Biomedical Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
