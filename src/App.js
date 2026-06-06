import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ArrowUpRight, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [spinDirection, setSpinDirection] = useState(1);

  const { scrollYProgress, scrollY } = useScroll();
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const cursorVariants = {
    default: { x: cursorPos.x - 16, y: cursorPos.y - 16, opacity: 1, backgroundColor: "rgba(139, 92, 246, 0.4)", mixBlendMode: "multiply", border: "none" },
    hover: { x: cursorPos.x - 32, y: cursorPos.y - 32, opacity: 1, height: 64, width: 64, backgroundColor: "rgba(139, 92, 246, 0.1)", mixBlendMode: "normal", border: "1px solid rgba(139, 92, 246, 0.6)" }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Accesion X",
      image: "/project1.jpg",
      link: "https://accession-x.vercel.app/",
      description: "A comprehensive digital solution emphasizing user experience and modern design principles. Built with a focus on seamless interactions and robust architecture."
    },
    {
      id: 2,
      title: "Chic Station",
      image: "/project2.jpg",
      link: "https://stationchic-reservation.vercel.app/",
      description: "An elegant reservation platform designed for seamless booking and chic aesthetics. Features a refined user interface that elevates the booking experience."
    },
    {
      id: 3,
      title: "SKonnect",
      image: "/skonnectlogo.png",
      description: "SKonnect bridges the gap between Sangguniang Kabataan leaders and the youth using advanced machine learning, real-time analytics, and interactive engagement tools.",
      link: "https://skonnect-project.vercel.app/"
    },
    {
      id: 4,
      title: "Rostify",
      image: "/rostifylogo.png",
      description: "Rostify streamlines workforce scheduling by automating roster creation, real-time updates, and reporting in a single platform. It improves efficiency and coordination while reducing manual workload and scheduling errors.",
      link: "https://rostify-26.vercel.app/"
    }
  ];

  const certificates = [
    { id: 1, title: "Certificate 1", image: "/certificate1.jpg" },
    { id: 2, title: "Certificate 2", image: "/certificate2.jpg" },
    { id: 3, title: "Certificate 3", image: "/certificate3.jpg" },
    { id: 4, title: "Certificate 4", image: "/certificate4.png" },
    { id: 5, title: "Certificate 5", image: "/certificate5.jpg" },
    { id: 6, title: "Certificate 6", image: "/certificate6.png" }
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

  const skills = ["React", "UI/UX Design", "JavaScript", "Tailwind CSS", "Figma", "Interaction Design"];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const openCertModal = (certIndex) => {
    setSelectedCertIndex(certIndex);
    setShowCertModal(true);
  };

  const nextCert = (e) => {
    e.stopPropagation();
    setSpinDirection(1);
    setSelectedCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = (e) => {
    e.stopPropagation();
    setSpinDirection(-1);
    setSelectedCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#FAF9F6] flex flex-col items-center justify-center z-[9999]">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-light tracking-[0.5em] text-violet-600 uppercase"
        >
          Nisrine
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans selection:bg-violet-200 selection:text-violet-900 relative">
      <motion.div
        variants={cursorVariants}
        animate={cursorVariant}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] hidden md:flex items-center justify-center transition-colors"
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {cursorVariant === "hover" && <span className="text-[10px] uppercase font-bold text-violet-800">View</span>}
      </motion.div>
      
      {/* Simple Static Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0" 
           style={{ backgroundImage: `radial-gradient(#DDD6FE 1px, transparent 1px)`, backgroundSize: '32px 32px' }}>
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-violet-400 origin-left z-[9999]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Minimal Logo Positioned at Top Left */}
      <motion.div 
        className="fixed top-8 left-8 z-40 cursor-pointer group" 
        onClick={scrollToTop}
        animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-xl font-medium tracking-[0.2em] uppercase text-slate-800 group-hover:text-violet-600 transition-colors">
          Nisrine<span className="text-violet-500 font-bold">.</span>
        </div>
      </motion.div>

      {/* Elegant Top Navigation Pill */}
      <motion.nav
        className="fixed top-6 right-6 md:right-8 z-50 flex flex-row items-center justify-center gap-2 sm:gap-4 px-4 py-2 bg-white/80 backdrop-blur-md border border-violet-100 rounded-full shadow-lg hidden sm:flex"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseLeave={() => setHoveredNavItem(null)}
      >
        {['About', 'Work', 'Credentials', 'Contact'].map((item) => {
          const sectionId = item === 'Work' ? 'projects' : item === 'Credentials' ? 'certificate' : item.toLowerCase();
          const isActive = activeSection === sectionId;
          const isHovered = hoveredNavItem === item;
          return (
            <button 
              key={item}
              onClick={() => scrollToSection(sectionId)} 
              onMouseEnter={() => setHoveredNavItem(item)}
              className={`relative text-xs tracking-[0.1em] uppercase font-medium transition-colors px-4 py-2 rounded-full ${isActive || isHovered ? 'text-violet-700' : 'text-slate-500'}`}
            >
              {isHovered && (
                <motion.div
                  layoutId="navHoverPill"
                  className="absolute inset-0 bg-violet-100/60 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {item}
              {isActive && !isHovered && (
                <motion.div
                  layoutId="navActiveDot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md border border-violet-100 rounded-full sm:hidden text-slate-600 shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center sm:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white border border-violet-100 rounded-full text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.nav 
              className="flex flex-col items-center gap-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
            >
              {['About', 'Work', 'Credentials', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  onClick={() => {
                    scrollToSection(item === 'Work' ? 'projects' : item === 'Credentials' ? 'certificate' : item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl tracking-[0.1em] uppercase font-light text-slate-600 hover:text-violet-600 transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </motion.nav>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 flex justify-center gap-8"
            >
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.1em] font-medium text-slate-400 hover:text-violet-600 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden min-h-screen flex items-center z-10">
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 lg:gap-24">
            <motion.div
              className="flex-1 text-center md:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="inline-block mb-6 px-4 py-1.5 border border-violet-200 bg-white/50 rounded-full">
                <p className="text-violet-600 text-[10px] sm:text-xs font-semibold tracking-[0.1em] uppercase">Digital Portfolio</p>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-slate-800 leading-[1.1]">
                Nisrine Bacasmo
              </motion.h1>
              <motion.h2 variants={fadeIn} className="text-xs sm:text-sm tracking-[0.2em] uppercase text-violet-500 font-medium mb-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-5">
                <span>Web Developer</span>
                <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-violet-300"></span>
                <span>UI/UX Designer</span>
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg sm:text-xl text-slate-600 mb-8 font-light max-w-lg mx-auto md:mx-0 leading-relaxed">
                I design intuitive web interfaces from concept to launch, combining clean visuals with smooth interactive elements. Focused on user experience, modern aesthetics, and seamless functionality.
              </motion.p>

              <motion.div variants={fadeIn} className="flex items-center justify-center md:justify-start gap-6 mb-10">
                <a href="https://github.com/NISRINE20" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors">
                  <GithubIcon className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-[0.1em] font-medium">GitHub</span>
                </a>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                <a href="https://www.linkedin.com/in/nisrine-bacasmo-158391323/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-[0.1em] font-medium">LinkedIn</span>
                </a>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3.5 rounded-full bg-slate-800 text-white font-medium hover:bg-violet-600 transition-colors w-full sm:w-auto shadow-sm"
                >
                  Let's Connect
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto"
                >
                  View Collection
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{ y: yHeroImage }}
            >
              <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[440px] lg:w-[400px] lg:h-[520px]">
                <div className="absolute inset-0 bg-violet-200/50 rounded-[2rem] rotate-3 z-0 transition-transform hover:rotate-6 duration-500"></div>
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-violet-100 shadow-xl z-10 mix-blend-multiply">
                  <img
                    src="/profile.png"
                    alt="Nisrine"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity mix-blend-multiply"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative bg-white/50 border-y border-violet-100/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="lg:w-1/2">
              <h2 className="text-2xl lg:text-4xl tracking-[0.3em] uppercase text-violet-600 font-light mb-8">About Me</h2>

              <blockquote className="border-l-2 border-violet-300 pl-6 mb-8 mt-4">
                <p className="text-xl lg:text-2xl font-light text-slate-700 leading-snug italic">
                  I don't just write code; I craft it. Every project is an opportunity to refine the art of digital building.
                </p>
              </blockquote>

              <p className="text-slate-600 font-light leading-relaxed text-lg max-w-xl">
                My philosophy is rooted in craftsmanship. Whether it's perfecting a micro-animation or optimizing backend performance, I take immense pride in the details that others might overlook.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="lg:w-1/2 w-full p-8 lg:p-12 bg-white rounded-[2rem] border border-violet-100 shadow-sm">
              <h3 className="text-xl lg:text-2xl tracking-[0.3em] uppercase text-violet-600 font-light mb-8">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-5 py-2.5 rounded-full bg-slate-50 text-slate-700 border border-slate-100 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-2xl lg:text-4xl tracking-[0.3em] uppercase text-violet-600 font-light mb-4">My Work</h2>
            </div>
            <p className="text-slate-600 font-light max-w-md text-lg leading-relaxed mb-4">A meticulous selection of recent works, from conceptual UI designs to fully engineered applications.</p>
          </motion.div>

          <div className="flex flex-col gap-24">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10`}
                >
                  {/* Image Block */}
                  <div 
                    className="w-full lg:w-3/5"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <a href={project.link !== "#" ? project.link : undefined} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl group shadow-sm bg-white border border-violet-100 hover:shadow-2xl transition-all duration-500">
                      <div className="relative h-[350px] lg:h-[500px] w-full overflow-hidden flex items-center justify-center p-6 lg:p-8">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-contain [clip-path:circle(150%_at_50%_50%)] group-hover:[clip-path:circle(40%_at_50%_50%)] group-hover:rotate-[360deg] transition-all duration-[800ms] ease-out opacity-90 group-hover:opacity-100 drop-shadow-lg"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-violet-900/5 transition-colors duration-500 pointer-events-none"></div>
                      </div>
                    </a>
                  </div>

                  {/* Text Block */}
                  <div className={`w-full lg:w-2/5 flex flex-col justify-center ${isEven ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-6 h-[2px] bg-violet-300"></span>
                      <span className="text-xs uppercase tracking-[0.1em] text-violet-500 font-bold">Project 0{idx + 1}</span>
                    </div>
                    <h4 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-4">{project.title}</h4>
                    <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">{project.description}</p>
                    <a
                      href={project.link !== "#" ? project.link : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-violet-500 uppercase tracking-[0.1em] text-xs font-semibold hover:text-violet-700 transition-colors w-max group"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="certificate" className="py-24 px-6 bg-white border-y border-violet-100/50 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-2xl lg:text-4xl tracking-[0.3em] uppercase text-violet-600 font-light">My Certifications</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                variants={fadeIn}
                whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                className="bg-[#FAF9F6] border border-violet-100 rounded-[2rem] p-4 shadow-sm cursor-pointer group hover:shadow-xl transition-all duration-500"
                onClick={() => openCertModal(idx)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                style={{ perspective: 1000 }}
              >
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-white border border-slate-100 mb-6 flex items-center justify-center p-4">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 opacity-90 drop-shadow-sm"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-800 text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full transition-opacity backdrop-blur-sm shadow-sm">
                      View Certificate
                    </span>
                  </div>
                </div>
                <div className="px-2 pb-2 text-center">
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{cert.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={downloadAllCertificates}
              className="px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium w-full sm:w-auto shadow-sm"
            >
              Archive ZIP
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3.5 rounded-full bg-slate-800 text-white hover:bg-violet-600 transition-colors text-sm font-bold w-full sm:w-auto text-center shadow-sm"
            >
              Download CV
            </a>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertModal && selectedCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-2 sm:p-4"
            onClick={() => setShowCertModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden p-4 sm:p-6 flex items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={prevCert} className="z-20 p-3 bg-slate-50 hover:bg-violet-50 rounded-full text-slate-500 hover:text-violet-600 transition-colors shrink-0 shadow-sm border border-slate-100 hidden sm:block">
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex-1 overflow-hidden h-[75vh] sm:h-[80vh] rounded-xl flex items-center justify-center relative w-full">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedCertIndex}
                    src={certificates[selectedCertIndex]?.image} 
                    alt={certificates[selectedCertIndex]?.title} 
                    className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-md"
                    initial={{ opacity: 0, scale: 0.8, x: spinDirection * 400, rotateY: spinDirection * -45 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: spinDirection * -400, rotateY: spinDirection * 45 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    style={{ transformPerspective: 1200 }}
                  />
                </AnimatePresence>
              </div>

              <button onClick={nextCert} className="z-20 p-3 bg-slate-50 hover:bg-violet-50 rounded-full text-slate-500 hover:text-violet-600 transition-colors shrink-0 shadow-sm border border-slate-100 hidden sm:block">
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Mobile controls overlaid */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 sm:hidden z-30">
                <button onClick={prevCert} className="p-3 bg-white/90 backdrop-blur shadow-md rounded-full text-slate-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextCert} className="p-3 bg-white/90 backdrop-blur shadow-md rounded-full text-slate-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-30 shadow-sm border border-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-violet-100 p-10 md:p-16 text-center shadow-sm">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl lg:text-4xl tracking-[0.3em] uppercase text-violet-600 font-light mb-6">Contact</h2>
            <p className="text-slate-600 font-light mb-12 text-lg mt-4">Open for new opportunities, collaborations, or just a simple chat about design and technology.</p>

            <div className="flex justify-center gap-6 mb-12">
              {contactLinks.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    if (c.id === "phone") window.location.href = c.href;
                    else window.open(c.href, c.id === "facebook" ? "_blank" : "_self");
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-violet-50 hover:text-violet-600 border border-slate-100 transition-colors"
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
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-8 pt-8 border-t border-slate-100">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.1em] font-medium text-slate-400 hover:text-violet-600 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-violet-100 bg-white/50">
        <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">© {new Date().getFullYear()} NISRINE. Designed with intention.</p>
      </footer>
    </div>
  );
}

export default App;
