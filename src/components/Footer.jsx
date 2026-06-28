import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, MessageSquare, Youtube, Phone } from 'lucide-react';
import { Link as RouterLink, useLocation } from "react-router-dom";
import $icon from '../../images/icon.png';

const Footer = () => {
  const icon = $icon;
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const currentPath = location.pathname;

  const scrollOrNavigate = (targetId) => {
    if (currentPath !== "/") {
      window.location.href = `/#${targetId}`;
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const socialLinks = [
    {
      icon: Github,
      link: 'https://github.com/AnakTentara',
      name: 'GitHub',
      color: '#fff'
    },
    {
      icon: Instagram,
      link: 'https://instagram.com/haikal_mabrur',
      name: 'Instagram',
      color: '#E1306C'
    },
    {
      icon: Phone,
      link: 'https://wa.me/6289675732001',
      name: 'WhatsApp',
      color: '#25D366'
    },
    {
      icon: MessageSquare,
      link: 'https://discord.com/users/804720825109315605',
      name: 'Discord',
      color: '#5865F2'
    },
    {
      icon: Youtube,
      link: 'https://youtube.com/@AnakTentaraIDN',
      name: 'YouTube',
      color: '#FF0000'
    }
  ];

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-slate-950/80 backdrop-blur-md z-10">
      {/* Iridescent top border line */}
      <div className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full" />
      
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <motion.img
                src={icon}
                alt="Haikal Mabrur Logo"
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
                whileHover={{ rotate: 10, scale: 1.05 }}
              />
              <div>
                <h3 className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  Haikal<span className="grad-text">Dev</span>
                </h3>
                <p className="text-slate-500 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Student Developer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Exploring technology, building modern web applications, managing servers, and creating custom Minecraft systems.
            </p>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <li onClick={() => scrollOrNavigate("home")} className="text-slate-400 hover:text-primary transition duration-200 cursor-pointer">
                Home
              </li>
              {currentPath === "/" && (
                <>
                  <li onClick={() => scrollOrNavigate("about")} className="text-slate-400 hover:text-primary transition duration-200 cursor-pointer">
                    About
                  </li>
                  <li onClick={() => scrollOrNavigate("projects")} className="text-slate-400 hover:text-primary transition duration-200 cursor-pointer">
                    Projects
                  </li>
                  <li onClick={() => scrollOrNavigate("contact")} className="text-slate-400 hover:text-primary transition duration-200 cursor-pointer">
                    Contact
                  </li>
                </>
              )}
              <li>
                <RouterLink to='/more-about' className="text-slate-400 hover:text-primary transition duration-200">
                  More Info
                </RouterLink>
              </li>
              <li>
                <RouterLink to='/more-projects' className="text-slate-400 hover:text-primary transition duration-200">
                  Projects Archive
                </RouterLink>
              </li>
              <li>
                <RouterLink to='/downloads' className="text-slate-400 hover:text-primary transition duration-200">
                  Downloads
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Social Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-all shadow-md group relative overflow-hidden"
                  title={social.name}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle, ${social.color}25 0%, transparent 75%)` }}
                  />
                  <social.icon size={18} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <p>© {currentYear} Haikal Mabrur. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-600">Built with React & GSAP</span>
            <span className="text-slate-600">Liquid Glass System 3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;