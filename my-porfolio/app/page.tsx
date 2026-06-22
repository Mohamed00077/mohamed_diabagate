"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ProjectCarousel from "./components/ProjectCarousel";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [typingText, setTypingText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phrases = [
      "Coder le futur, maîtriser le web",
      "Développeur Full Stack & Innovateur Tech",
      "Construire les solutions numériques de demain",
      "Transformer les idées en réalité",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        setTypingText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }
      let typeSpeed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvasRef.current.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";

    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0ff";
      ctx.font = fontSize + "px monospace";
      drops.forEach((drop, i) => {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drop * fontSize);
        if (drop * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 200) {
          setActiveSection(el.getAttribute("id") || "");
        }
      });
      const orbs = document.querySelectorAll<HTMLElement>(".floating-orb");
      orbs.forEach((orb, i) => {
        const speed = 0.5 + i * 0.1;
        orb.style.transform = `translateY(${window.pageYOffset * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLogoHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.add("glitch");
    setTimeout(() => el.classList.remove("glitch"), 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = document.createElement("div");
    msg.className =
      "fixed top-20 right-6 bg-green-500/20 border border-green-400 text-green-400 px-6 py-4 rounded-lg z-50";
    msg.textContent = "Message envoyé avec succès ! Je vous répondrai bientôt.";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
    (e.target as HTMLFormElement).reset();
  };

  const navLinks = [
    { id: "home", label: "Accueil" },
    { id: "about", label: "À propos" },
    { id: "skills", label: "Compétences" },
    { id: "projects", label: "Projets" },
    { id: "contact", label: "Contact" },
  ];

  const technicalSkills = [
    { label: "HTML/CSS", pct: 95 },
    { label: "Javascript", pct: 60 },
    { label: "Vue js", pct: 40 },
    { label: "React - Next js ", pct: 45 },
    { label: "Nest js", pct: 40 },
    { label: "PHP/Laravel", pct: 50 },
    { label: "Python/Flask", pct: 45 },
    { label: "Mobile -React Native", pct: 40 },
    { label: "Database Management", pct: 40 },
    { label: "Git/GitHub", pct: 85 },
  ];

  const professionalSkills = [
    { label: "Gestion de projet", pct: 70 },
    { label: "Travail d'équipe", pct: 75 },
    { label: "Communication", pct: 75 },
    { label: "Autonomie", pct: 65 },
    { label: "Adaptabilité", pct: 70 },
  ];

  const projects = [
    {
      img: "post-it.png",
      title: "Post it",
      desc: "Un site web innovant qui utilise une API pour permettre aux utilisateurs d'envoyer des messages anonymement, favorisant ainsi l'expression libre et créative.",
      tags: ["Vue js"],
      link: "https://post-it-iota-rosy.vercel.app/",
    },
    {
      img: "",
      title: "YOWL",
      desc: "Un outil permettant de commenter n'importe quel contenu sur internet simplement en utilisant le lien correspondant, facilitant ainsi les échanges d'idées et d'opinions.",
      tags: ["Vue js, Laravel, Mysql"],
      link: "",
    },
    {
      img: "",
      title: "Show time",
      desc: "Un site de réservation de billets qui simplifie l'achat de places pour vos films préférés, offrant une expérience utilisateur fluide et rapide.",
      tags: ["Nest js, MongoDB"],
      link: "",
    },
    {
      img: "free_add.png",
      title: "Free_add",
      desc: "Une plateforme d'annonces où les utilisateurs peuvent publier divers types d'annonces, qu'il s'agisse d'articles, de services, ou d'autres offres, facilitant ainsi la mise en relation entre acheteurs et vendeurs.",
      tags: ["Laravel, Mysql"],
      link: "https://freeadd-production.up.railway.app/",
    },
    {
      img: "rot.png",
      title: "My rottent tomato",
      desc: "Un site web dédié à la consultation des bandes-annonces de films, permettant aux cinéphiles de découvrir les dernières nouveautés et de se tenir au courant des sorties à venir.",
      tags: ["Next js, Laravel, Mysql"],
      link: "",
    },
    {
      img: "Redditech.jpeg",
      title: "Redditech",
      desc: "Application mobile de gestion de tâches",
      tags: ["React Native"],
      link: "https://expo.dev/accounts/mateo_dev007/projects/mobilapp101/builds/930fbd57-6b17-44cc-af9d-e7162aede31f",
    },
  ];

  const contactInfo = [
    { icon: "📧", label: "Email", value: "momodiabagate@gmail.com" },
    { icon: "📱", label: "Téléphone", value: "+225 01 42 30 94 39" },
    { icon: "📍", label: "Localisation", value: "Abidjan, Côte d'ivoire" },
    { icon: "💼", label: "LinkedIn", value: "www.linkedin.com/in/mohamed-diabagate-375338385" },
  ];

  return (
    <div className="text-white">
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      <div ref={canvasRef} className="matrix-code" id="matrix"></div>

      <div className="fixed inset-0 cyber-grid"></div>

      <div className="floating-orb w-20 h-20 top-10 left-10"     style={{ animationDelay: "0s" }}></div>
      <div className="floating-orb w-12 h-12 top-1/3 right-20"   style={{ animationDelay: "2s" }}></div>
      <div className="floating-orb w-16 h-16 bottom-20 left-1/4" style={{ animationDelay: "4s" }}></div>
      <div className="floating-orb w-8 h-8 top-2/3 right-1/3"    style={{ animationDelay: "6s" }}></div>

      <nav className="fixed top-0 w-full z-50 hologram">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div
              className="orbitron text-2xl font-bold neon-text cursor-pointer"
              onMouseEnter={handleLogoHover}
            >
              &lt;MOMO/&gt;
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className={`hover:text-cyan-400 transition-all duration-300 relative group uppercase ${
                    activeSection === id ? "text-cyan-400" : ""
                  }`}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-2xl"
              aria-label="Ouvrir/fermer le menu"
            >
              ≡
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden hologram">
            <div className="px-6 py-4 space-y-4">
              {navLinks.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block hover:text-cyan-400 transition-colors uppercase"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="relative inline-block mb-12">
              <div className="pulse-ring w-64 h-64"></div>
              <div className="pulse-ring w-64 h-64" style={{ animationDelay: "1s" }}></div>
              <div className="relative w-64 h-64 mx-auto hologram rounded-full overflow-hidden">
                <Image src="/photo.png" alt="Momo" fill className="object-cover" />
              </div>
            </div>

            <div className="orbitron text-6xl md:text-8xl font-black mb-6">
              <span className="neon-text">Mohamed</span>
              <br />
              <span className="text-4xl md:text-6xl text-cyan-300">Diabagate / Dev</span>
            </div>

            <div className="text-2xl md:text-3xl text-cyan-200 mb-8">
              <div className="h-12">
                {typingText}
                <span className="border-r-2 border-cyan-400 animate-pulse ml-1"></span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a
                href="/CV_Mohamed_Diabagate.pdf"
                download
                className="hologram px-12 py-4 text-xl font-bold neon-text hover:bg-cyan-900/30 transition-all duration-300 transform hover:scale-105"
              >
                ENGAGEZ-MOI
              </a>
              <Link
                href="#projects"
                className="border-2 border-cyan-400 px-12 py-4 text-xl font-bold text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
              >
                VOIR LES PROJETS
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-16">
              {[
                { value: "0+", label: "Années d'expérience" },
                { value: "8+", label: "Projets réalisés" },
                { value: "90%", label: "Taux de satisfaction" },
              ].map(({ value, label }) => (
                <div key={label} className="hologram p-6 rounded-lg">
                  <div className="orbitron text-4xl font-bold neon-text mb-2">{value}</div>
                  <div className="text-cyan-200">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="orbitron text-5xl font-bold neon-text mb-4">À PROPOS DE MOI</h2>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <div className="hologram p-8 rounded-lg">
                <div className="relative w-full h-80">
                  <Image src="/code.png" alt="À propos" fill className="object-cover rounded-lg" />
                </div>
              </div>
            </div>

            <div className="fade-in space-y-6">
              <h3 className="text-3xl font-bold text-cyan-300 mb-4">Développeur Full Stack</h3>

              <p className="text-lg text-gray-300 leading-relaxed">
                Bienvenue dans mon univers numérique ! Je suis Diabagate Mohamed, un développeur
                débutant passionné, récemment diplômé d'une formation en développement web. Bien que
                je sois nouveau dans le domaine, ma curiosité pour les technologies et mon désir
                d'apprendre me motivent à explorer les possibilités infinies du web.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Je me concentre sur la création d'interfaces front-end attrayantes et intuitives,
                tout en apprenant les bases des architectures back-end. Mon objectif est de
                développer des expériences numériques qui soient non seulement fonctionnelles, mais
                aussi agréables à utiliser. J'ai acquis des compétences dans les frameworks modernes
                et je suis impatient de continuer à me perfectionner dans les pratiques de
                développement.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { title: "Frontend", sub: "Vue js - Next js - React" },
                  { title: "Backend", sub: "Laravel - Nest js" },
                  { title: "Database", sub: "Mysql - MongoDb" },
                  { title: "Système", sub: "Linux - Windows" },
                  { title: "Autre", sub: "Outils divers" },
                ].map(({ title, sub }) => (
                  <div key={title} className="hologram p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold neon-text">{title}</div>
                    <div className="text-sm text-gray-400">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="orbitron text-3xl sm:text-5xl font-bold neon-text mb-4">COMPÉTENCES</h2>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="fade-in">
              <h3 className="text-2xl font-bold text-cyan-300 mb-8">Compétences techniques</h3>
              <div className="space-y-6">
                {technicalSkills.map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-semibold">{label}</span>
                      <span className="text-cyan-400">{pct}%</span>
                    </div>
                    <div className="skill-bar h-3">
                      <div className="skill-progress" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in">
              <h3 className="text-2xl font-bold text-cyan-300 mb-8">Compétences professionnelles</h3>
              <div className="space-y-6">
                {professionalSkills.map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-semibold">{label}</span>
                      <span className="text-cyan-400">{pct}%</span>
                    </div>
                    <div className="skill-bar h-3">
                      <div className="skill-progress" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="orbitron text-5xl font-bold neon-text mb-4">PROJETS</h2>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>
          <ProjectCarousel projects={projects} />
        </div>
      </section>

      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="orbitron text-5xl font-bold neon-text mb-4">CONTACT</h2>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in">
              <h3 className="text-2xl font-bold text-cyan-300 mb-8">Entrons en contact</h3>

              <p className="text-lg text-gray-300 mb-8">
                Passionné par le développement web, je suis prêt à donner vie à vos idées avec des
                solutions dynamiques et performantes.
              </p>

              <div className="space-y-6">
                {contactInfo.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center space-x-4">
                    <div className="w-12 h-12 hologram rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 text-xl">{icon}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{label}</div>
                      <div className="text-cyan-400">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-cyan-300 mb-4">Suivez-moi</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: "🐦", href: "www.linkedin.com/in/mohamed-diabagate-375338385" },
                    { icon: "💻", href: "https://github.com/Mohamed00077" },
                  ].map(({ icon, href }, i) => (
                    <Link
                      key={i}
                      href={href}
                      className="w-12 h-12 hologram rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-colors"
                    >
                      {icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="fade-in">
              <form onSubmit={handleSubmit} className="hologram p-8 rounded-lg space-y-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6">Envoyer un message</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Prénom</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 cyber-input rounded-lg"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Nom</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 cyber-input rounded-lg"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 cyber-input rounded-lg"
                    placeholder="jean@exemple.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Sujet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 cyber-input rounded-lg"
                    placeholder="Discussion de projet"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 cyber-input rounded-lg resize-none"
                    placeholder="Parlez-moi de votre projet..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 hologram text-xl font-bold neon-text hover:bg-cyan-900/30 transition-all duration-300 transform hover:scale-105"
                >
                  ENVOYER LE MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-cyan-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="orbitron text-2xl font-bold neon-text mb-4">&lt;Momo/&gt;</div>
              <p className="text-gray-400">
                Développeur passionné, toujours en quête d'innovation et d'apprentissage.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-cyan-300 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {["Développement Web", "Applications Mobile", "API & Backend"].map((s) => (
                  <li key={s}>
                    <Link href="#" className="hover:text-cyan-400 transition-colors">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-cyan-300 mb-4">Technologies</h4>
              <ul className="space-y-2 text-gray-400">
                {["React / Next.js", "Laravel", "Python", "Mysql/PostgreSQL"].map((t) => (
                  <li key={t}>
                    <Link href="#" className="hover:text-cyan-400 transition-colors">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-cyan-300 mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                {navLinks.slice(1).map(({ id, label }) => (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="hover:text-cyan-400 transition-colors capitalize"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-cyan-900/30 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} DIABAGATE MOHAMED. Tous droits réservés. | Conçu
              avec ⚡ et passion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}