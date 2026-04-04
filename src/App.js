import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { User, Briefcase, Award, Mail } from "lucide-react";

const AuroraBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30"
      style={{ backgroundImage: 'radial-gradient(circle, #fda4af, #e11d48, transparent 70%)' }}
      animate={{
        x: [0, 50, 0, -50, 0],
        y: [0, -50, 50, 0, 0],
        scale: [1, 1.2, 1, 1.1, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
      style={{ backgroundImage: 'radial-gradient(circle, #fbcfe8, #be185d, transparent 70%)' }}
      animate={{
        x: [0, -60, 0, 60, 0],
        y: [0, 60, -60, 0, 0],
        scale: [1, 1.3, 1, 1.2, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[90px] opacity-20"
      style={{ backgroundImage: 'radial-gradient(circle, #c084fc, #7e22ce, transparent 70%)' }}
      animate={{
        x: [0, 40, -40, 0],
        y: [0, 40, 0, -40],
        scale: [1, 1.1, 1.2, 1]
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  // Interactive Background states
  const mouseX = useMotionValue(-1000); // Start off-screen
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Accesion X",
      image: "/project1.jpg",
      link: "https://accession-x.vercel.app/",
      description: "A comprehensive digital solution emphasizing user experience and modern design principles."
    },
    {
      id: 2,
      title: "Chic Station",
      image: "/project2.jpg",
      link: "https://stationchic-reservation.vercel.app/",
      description: "An elegant reservation platform designed for seamless booking and chic aesthetics."
    },
    {
      id: 3,
      title: "Upcoming Project",
      image: "/project3.jpg",
      description: "Currently in development. Stay tuned for more creative solutions.",
      link: "#"
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Certificate 1",
      image: "/certificate1.jpg",
      description: "Professional Achievement"
    },
    {
      id: 2,
      title: "Certificate 2",
      image: "/certificate2.jpg",
      description: "Skill Development"
    },
    {
      id: 3,
      title: "Certificate 3",
      image: "/certificate3.jpg",
      description: "Course Completion"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", link: "https://www.linkedin.com/in/nisrine-bacasmo-158391323/" },
    { name: "GitHub", link: "https://github.com/NISRINE20" },
    { name: "Instagram", link: "https://www.instagram.com/0109_1720_03/" },
  ];

  const contactLinks = [
    { id: "phone", href: "tel:09123456789", title: "Phone" },
    { id: "email", href: "mailto:bacasmonisrine1995@gmail.com", title: "Email" },
    { id: "facebook", href: "https://www.facebook.com/bacamo.nisrine20", title: "Facebook" },
  ];

  const skills = ["React", "UI/UX Design", "JavaScript", "Tailwind CSS", "Figma", "Problem Solving"];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const openCertModal = (cert) => {
    setSelectedCert(cert);
    setShowCertModal(true);
  };

  const downloadAllCertificates = async () => {
    try {
      const zip = new JSZip();
      await Promise.all(
        certificates.map(async (cert) => {
          const pdfPath = cert.pdf || `/certificate${cert.id}.pdf`;
          let res = await fetch(pdfPath);
          if (res.ok) {
            const blob = await res.blob();
            zip.file(`${cert.title.replace(/\s+/g, "_")}.pdf`, blob);
            return;
          }
          res = await fetch(cert.image);
          if (res.ok) {
            const blob = await res.blob();
            const ext = cert.image.split(".").pop().split("?")[0];
            zip.file(`${cert.title.replace(/\s+/g, "_")}.${ext}`, blob);
          }
        })
      );
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "certificates.zip");
    } catch (err) {
      console.error("Download failed", err);
      const link = document.createElement('a');
      link.href = "/resume.pdf";
      link.download = "resume.pdf";
      link.click();
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[9999]">
        <svg width="400" height="120" viewBox="0 0 400 120" className="overflow-visible">
          <defs>
            <linearGradient id="rose-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="transparent"
            strokeWidth="1.5"
            stroke="url(#rose-gradient)"
            initial={{ pathLength: 0, fill: "rgba(251, 113, 133, 0)" }}
            animate={{
              pathLength: 1,
              fill: "rgba(251, 113, 133, 1)"
            }}
            transition={{
              pathLength: { duration: 2.2, ease: "easeInOut" },
              fill: { duration: 1, ease: "easeIn", delay: 1.8 }
            }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "3.5rem", fontWeight: "700", letterSpacing: "8px" }}
          >
            NISRINE.
          </motion.text>
        </svg>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "180px" }}
          transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
          className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-rose-500/30 selection:text-rose-200 relative overflow-hidden">
      {/* Interactive Ambient Spotlight */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      {/* Aurora Mesh Gradient Background */}
      <AuroraBackground />
      {/* Minimal Logo Positioned at Top Left */}
      <div className="absolute top-6 left-6 z-40">
        <div className="text-2xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-400">
          NISRINE.
        </div>
      </div>

      {/* Floating Navigation Dock */}
      <motion.nav
        className="fixed left-4 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-xl border border-rose-500/20 rounded-full shadow-2xl shadow-rose-900/20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        <button onClick={() => scrollToSection("about")} className="group relative p-3 rounded-full hover:bg-rose-500/10 transition-colors"
          aria-label="About">
          <User className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-rose-300 text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            About Me
          </span>
        </button>
        <button onClick={() => scrollToSection("projects")} className="group relative p-3 rounded-full hover:bg-rose-500/10 transition-colors"
          aria-label="Projects">
          <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-rose-300 text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Projects
          </span>
        </button>
        <button onClick={() => scrollToSection("certificate")} className="group relative p-3 rounded-full hover:bg-rose-500/10 transition-colors"
          aria-label="Credentials">
          <Award className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-rose-300 text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Credentials
          </span>
        </button>
        <button onClick={() => scrollToSection("contact")} className="group relative p-3 rounded-full hover:bg-rose-500/10 transition-colors"
          aria-label="Contact">
          <Mail className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
          <span className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-rose-300 text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Contact
          </span>
        </button>
      </motion.nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-rose-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]"></div>

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">

            <motion.div
              className="flex-1 text-center md:text-left z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5">
                <p className="text-rose-300 text-xs sm:text-sm font-medium tracking-widest uppercase">Welcome to my space</p>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-400">Nisrine</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg sm:text-xl text-slate-400 mb-8 font-light max-w-lg mx-auto md:mx-0 leading-relaxed">
                An IT Student & UI/UX Designer dedicated to crafting elegant, functional, and user-centered digital experiences.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white font-medium hover:shadow-lg hover:shadow-rose-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  Let's Talk
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-4 rounded-full border border-slate-700 hover:border-rose-400 text-slate-300 font-medium transition-all hover:bg-rose-500/5"
                >
                  View My Work
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 flex justify-center z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative group w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-400/20 to-transparent rounded-full blur-2xl group-hover:bg-rose-400/30 transition-all duration-700 delay-100"></div>
                <div className="absolute inset-4 rounded-full border border-rose-500/20 animate-[spin_20s_linear_infinite]"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt="Nisrine"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-rose-900/10 mix-blend-overlay"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-4 relative bg-slate-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="lg:w-7/12">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-10 text-white tracking-tight leading-[1.2]">Crafting <br /><span className="italic text-rose-300 font-light">Digital Elegance.</span></h2>

              <blockquote className="border-l-2 border-rose-400/50 pl-8 mb-10">
                <p className="text-2xl lg:text-3xl font-serif font-light text-slate-300 leading-snug italic">
                  "I believe in purposeful design—where every pixel serves a function, and simplicity is the ultimate sophistication."
                </p>
              </blockquote>

              <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg max-w-xl">
                <p>
                  As an IT student, I bring a unique blend of strategic thinking and refined aesthetics to every project. My passion lies in transforming complex requirements into seamless, intuitive interfaces that users love. I am constantly learning, evolving, and refining my craft to build professional-grade applications.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="lg:w-5/12 bg-slate-900/50 backdrop-blur-md p-10 border border-slate-800/80 rounded-3xl" data-cursor="HOVER">
              <h3 className="text-sm tracking-widest uppercase text-rose-300 font-semibold mb-8">My Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(244, 63, 94, 0.1)", borderColor: "rgba(244, 63, 94, 0.3)" }}
                    className="px-6 py-3 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-sm font-medium transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-24 px-4 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-900/5 rounded-full blur-[100px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight">Featured Projects</h2>
            <p className="mt-4 text-slate-400 font-light max-w-2xl mx-auto">A selection of my recent works ranging from conceptual designs to fully built applications.</p>
          </motion.div>

          <div className="flex flex-col gap-32">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-0`}
                >
                  {/* Image Block */}
                  <div className="w-full lg:w-7/12 relative group" data-cursor="VIEW PROJECT">
                    <a href={project.link !== "#" ? project.link : undefined} target="_blank" rel="noopener noreferrer">
                      <div className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-[2rem]">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover origin-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </a>
                  </div>
                  {/* Text Block */}
                  <div className={`w-full lg:w-6/12 bg-slate-950/80 backdrop-blur-xl p-10 lg:p-16 border border-slate-800/50 ${isEven ? 'lg:-ml-20' : 'lg:-mr-20'} z-10 rounded-3xl shadow-2xl`}>
                    <h3 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">{project.title}</h3>
                    <p className="text-slate-400 font-light text-lg leading-relaxed mb-8">{project.description}</p>
                    <a href={project.link !== "#" ? project.link : undefined} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-rose-300 uppercase tracking-widest text-xs font-bold hover:text-rose-400 transition-colors" data-cursor="OPEN">
                      <span className="mr-3">Discover Project</span>
                      <div className="w-8 h-[1px] bg-rose-300"></div>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="certificate" className="py-24 px-4 bg-slate-900/30 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.2]">My <span className="italic font-light text-rose-300">Credentials.</span></h2>
            <p className="mt-4 text-slate-400 font-light">Certifications validating my skills and continuous growth.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {certificates.map((cert) => (
              <TiltCard key={cert.id}>
                <motion.div
                  variants={fadeIn}
                  onClick={() => openCertModal(cert)}
                  className="group h-full cursor-pointer rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 hover:border-rose-500/30 transition-all shadow-xl shadow-black/50"
                >
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs tracking-widest uppercase text-rose-300 font-semibold mb-1">Click to view</p>
                      <h3 className="text-lg font-medium text-white">{cert.title}</h3>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={downloadAllCertificates}
              className="px-8 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-rose-400/50 transition-all text-sm font-medium w-full sm:w-auto"
            >
              Download Certificates (ZIP)
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all text-sm font-medium w-full sm:w-auto text-center"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showCertModal && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
            onClick={() => setShowCertModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden shadow-rose-900/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-4 right-4 bg-slate-800/80 hover:bg-rose-500 text-slate-300 hover:text-white w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors z-10 backdrop-blur-sm"
              >
                ✕
              </button>
              <div className="overflow-auto max-h-[90vh] p-2 bg-slate-950/50">
                <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto rounded-xl object-contain shadow-inner" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
        <div className="max-w-3xl mx-auto relative z-10 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800/80 p-10 md:p-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">Let's Create Together</h2>
            <p className="text-slate-400 font-light mb-12">I am currently open for new opportunities or collaborations. Feel free to reach out to me directly.</p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {contactLinks.map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  title={c.title}
                  target={c.id === "facebook" ? "_blank" : undefined}
                  rel={c.id === "facebook" ? "noopener noreferrer" : undefined}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-rose-500 hover:text-white hover:border-rose-400 transition-all hover:-translate-y-1 shadow-md shadow-slate-900/50 group"
                >
                  {c.id === "phone" && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  )}
                  {c.id === "email" && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  )}
                  {c.id === "facebook" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                  )}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-8 border-t border-slate-800/50 pt-10">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest font-semibold text-slate-400 hover:text-rose-400 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center bg-slate-950 border-t border-slate-900 border-rose-900/20">
        <p className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} NISRINE. Crafted with elegance.</p>
      </footer>
    </div>
  );
}

export default App;
