import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  Shield, 
  Lock, 
  Database, 
  Share2, 
  UserCheck, 
  Globe, 
  Mail,
  ChevronRight,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";

// Reading Progress Bar Component
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

// Table of Contents Component
const TableOfContents = ({ 
  items,
  activeSection,
  onItemClick
}: { 
  items: { id: string; title: string; level: number }[];
  activeSection: string;
  onItemClick: (id: string) => void;
}) => {
  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-4 sticky top-24">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Bookmark className="w-4 h-4 mr-2 text-primary" />
        On This Page
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemClick(item.id)}
              className={cn(
                "text-left text-sm transition-colors w-full",
                "hover:text-primary",
                activeSection === item.id ? "text-primary font-medium" : "text-gray-400",
                item.level === 2 ? "pl-0" : "pl-3"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  
  // Reference to content sections for scroll tracking
  const sectionRefs = {
    "introduction": useRef<HTMLDivElement>(null),
    "information-collection": useRef<HTMLDivElement>(null),
    "information-usage": useRef<HTMLDivElement>(null),
    "information-storage": useRef<HTMLDivElement>(null),
    "information-sharing": useRef<HTMLDivElement>(null),
    "cookies": useRef<HTMLDivElement>(null),
    "user-rights": useRef<HTMLDivElement>(null),
    "gdpr": useRef<HTMLDivElement>(null),
    "ccpa": useRef<HTMLDivElement>(null),
    "children": useRef<HTMLDivElement>(null),
    "changes": useRef<HTMLDivElement>(null),
    "contact": useRef<HTMLDivElement>(null)
  };
  
  // Table of contents items
  const tocItems = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "information-collection", title: "Information We Collect", level: 2 },
    { id: "information-usage", title: "How We Use Your Information", level: 2 },
    { id: "information-storage", title: "Data Storage and Security", level: 2 },
    { id: "information-sharing", title: "Information Sharing", level: 2 },
    { id: "cookies", title: "Cookies and Tracking", level: 2 },
    { id: "user-rights", title: "Your Rights and Choices", level: 2 },
    { id: "gdpr", title: "GDPR Compliance", level: 2 },
    { id: "ccpa", title: "CCPA Compliance", level: 2 },
    { id: "children", title: "Children's Privacy", level: 2 },
    { id: "changes", title: "Changes to This Policy", level: 2 },
    { id: "contact", title: "Contact Us", level: 2 }
  ];
  
  // Scroll to section when clicking on TOC item
  const scrollToSection = (id: string) => {
    const element = sectionRefs[id as keyof typeof sectionRefs]?.current;
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };
  
  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for determining active section
      
      // Find the section that is currently in view
      let currentSection = "introduction";
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current && ref.current.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);
  
  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]" />
        <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your privacy is important to us
            </motion.p>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Last updated: May 15, 2025
            </motion.p>
          </div>
        </Container>
      </section>
      
      {/* Privacy Policy Content */}
      <section className="py-10 mb-20">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <main className="lg:col-span-8">
              <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 md:p-8 prose prose-invert max-w-none">
                {/* Introduction Section */}
                <div ref={sectionRefs["introduction"]}>
                  <h2 id="introduction" className="flex items-center text-3xl font-bold mb-6 group">
                    Introduction
                    <a href="#introduction" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    At Flashcast ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                    website, mobile application, and services (collectively, the "Service").
                  </p>
                  <p className="text-gray-300 mb-6">
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
                    We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by 
                    updating the "Last updated" date of this Privacy Policy.
                  </p>
                </div>
                
                {/* Information Collection Section */}
                <div ref={sectionRefs["information-collection"]} className="mt-12">
                  <h2 id="information-collection" className="flex items-center text-3xl font-bold mb-6 group">
                    Information We Collect
                    <a href="#information-collection" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  
                  <h3 className="text-xl font-medium mb-4">Personal Information</h3>
                  <p className="text-gray-300 mb-4">
                    We may collect personal information that you provide to us, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Name, email address, and contact details</li>
                    <li>Account credentials (username and password)</li>
                    <li>Profile information</li>
                    <li>Payment information (processed by our secure payment providers)</li>
                    <li>Communication preferences</li>
                    <li>User-generated content (such as flashcards and study materials)</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-4">Automatically Collected Information</h3>
                  <p className="text-gray-300 mb-4">
                    When you access our Service, we may automatically collect certain information, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Device information (type, model, operating system)</li>
                    <li>IP address and location information</li>
                    <li>Browser type and settings</li>
                    <li>Usage data and interaction with the Service</li>
                    <li>Performance data and error reports</li>
                    <li>Referring websites</li>
                  </ul>
                </div>
                
                {/* Information Usage Section */}
                <div ref={sectionRefs["information-usage"]} className="mt-12">
                  <h2 id="information-usage" className="flex items-center text-3xl font-bold mb-6 group">
                    How We Use Your Information
                    <a href="#information-usage" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Providing, maintaining, and improving our Service</li>
                    <li>Processing transactions and managing your account</li>
                    <li>Personalizing your experience and delivering content relevant to your interests</li>
                    <li>Analyzing usage patterns to enhance our Service</li>
                    <li>Communicating with you about updates, offers, and support</li>
                    <li>Protecting our rights, property, or safety</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                  
                  <p className="text-gray-300 mb-6">
                    We process your information for these purposes based on our legitimate business interests, 
                    to perform our contract with you, to comply with legal obligations, and/or with your consent.
                  </p>
                </div>
                
                {/* Data Storage and Security Section */}
                <div ref={sectionRefs["information-storage"]} className="mt-12">
                  <h2 id="information-storage" className="flex items-center text-3xl font-bold mb-6 group">
                    Data Storage and Security
                    <a href="#information-storage" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against 
                    unauthorized or unlawful processing, accidental loss, destruction, or damage.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Data Retention</h3>
                  <p className="text-gray-300 mb-4">
                    We will retain your personal information only for as long as is necessary for the purposes set out in this 
                    Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal 
                    obligations, resolve disputes, and enforce our policies.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Security Measures</h3>
                  <p className="text-gray-300 mb-4">
                    Our security measures include, but are not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and audits</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Monitoring for suspicious activities</li>
                    <li>Employee training on data protection</li>
                  </ul>
                  
                  <p className="text-gray-300 mb-6">
                    While we strive to use commercially acceptable means to protect your personal information, 
                    no method of transmission over the Internet or method of electronic storage is 100% secure. 
                    Therefore, we cannot guarantee its absolute security.
                  </p>
                </div>
                
                {/* Information Sharing Section */}
                <div ref={sectionRefs["information-sharing"]} className="mt-12">
                  <h2 id="information-sharing" className="flex items-center text-3xl font-bold mb-6 group">
                    Information Sharing
                    <a href="#information-sharing" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We may share your information in the following situations:
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Service Providers</h3>
                  <p className="text-gray-300 mb-4">
                    We may share your information with third-party vendors, service providers, contractors, or agents 
                    who perform services for us or on our behalf and require access to such information to do that work.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Business Transfers</h3>
                  <p className="text-gray-300 mb-4">
                    If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information 
                    may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on 
                    our Service of any change in ownership or uses of your personal information.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Legal Requirements</h3>
                  <p className="text-gray-300 mb-4">
                    We may disclose your information where we are legally required to do so in order to comply with applicable 
                    law, governmental requests, a judicial proceeding, court order, or legal process.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">With Your Consent</h3>
                  <p className="text-gray-300 mb-6">
                    We may disclose your personal information for any other purpose with your consent.
                  </p>
                </div>
                
                {/* Cookies and Tracking Section */}
                <div ref={sectionRefs["cookies"]} className="mt-12">
                  <h2 id="cookies" className="flex items-center text-3xl font-bold mb-6 group">
                    Cookies and Tracking
                    <a href="#cookies" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We use cookies and similar tracking technologies to track activity on our Service and hold certain information.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li><span className="font-medium">Essential Cookies:</span> Required for the operation of our Service</li>
                    <li><span className="font-medium">Preference Cookies:</span> Allow us to remember your preferences and settings</li>
                    <li><span className="font-medium">Analytics Cookies:</span> Help us understand how visitors interact with our Service</li>
                    <li><span className="font-medium">Marketing Cookies:</span> Used to track visitors across websites to display relevant advertisements</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-4">Your Cookie Choices</h3>
                  <p className="text-gray-300 mb-6">
                    Most web browsers allow you to control cookies through their settings preferences. However, 
                    if you limit the ability of websites to set cookies, you may impact your overall user experience. 
                    Some browsers offer a "Do Not Track" feature that signals to websites that you do not want to have 
                    your online activities tracked. We currently do not respond to "Do Not Track" signals.
                  </p>
                </div>
                
                {/* User Rights Section */}
                <div ref={sectionRefs["user-rights"]} className="mt-12">
                  <h2 id="user-rights" className="flex items-center text-3xl font-bold mb-6 group">
                    Your Rights and Choices
                    <a href="#user-rights" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li><span className="font-medium">Access:</span> The right to request copies of your personal information</li>
                    <li><span className="font-medium">Rectification:</span> The right to request that we correct inaccurate information</li>
                    <li><span className="font-medium">Erasure:</span> The right to request that we delete your personal information</li>
                    <li><span className="font-medium">Restriction:</span> The right to request that we restrict the processing of your information</li>
                    <li><span className="font-medium">Data Portability:</span> The right to request that we transfer your information to another organization</li>
                    <li><span className="font-medium">Objection:</span> The right to object to our processing of your personal information</li>
                  </ul>
                  
                  <p className="text-gray-300 mb-6">
                    To exercise any of these rights, please contact us using the information provided in the "Contact Us" section. 
                    We may need to verify your identity before responding to your request.
                  </p>
                </div>
                
                {/* GDPR Compliance Section */}
                <div ref={sectionRefs["gdpr"]} className="mt-12">
                  <h2 id="gdpr" className="flex items-center text-3xl font-bold mb-6 group">
                    GDPR Compliance
                    <a href="#gdpr" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    If you are a resident of the European Economic Area (EEA), you have certain data protection rights under 
                    the General Data Protection Regulation (GDPR).
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Legal Basis for Processing</h3>
                  <p className="text-gray-300 mb-4">
                    We will only process your personal information when we have a legal basis to do so. Legal bases include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Your consent</li>
                    <li>Performance of a contract with you</li>
                    <li>Compliance with a legal obligation</li>
                    <li>Protection of your vital interests</li>
                    <li>Performance of a task carried out in the public interest</li>
                    <li>Our legitimate interests, provided they do not override your fundamental rights and freedoms</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-4">International Transfers</h3>
                  <p className="text-gray-300 mb-6">
                    Your information may be transferred to — and maintained on — computers located outside of your state, province, 
                    country, or other governmental jurisdiction where the data protection laws may differ. If you are located outside 
                    the United States and choose to provide information to us, please note that we transfer the information to the 
                    United States and process it there. When we transfer personal data outside of the EEA, we ensure an adequate 
                    level of protection for the rights of data subjects based on the adequacy of the receiving country's data 
                    protection laws, contractual obligations placed on the recipient of the data, or EU-US Privacy Shield principles.
                  </p>
                </div>
                
                {/* CCPA Compliance Section */}
                <div ref={sectionRefs["ccpa"]} className="mt-12">
                  <h2 id="ccpa" className="flex items-center text-3xl font-bold mb-6 group">
                    CCPA Compliance
                    <a href="#ccpa" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    If you are a resident of California, you have specific rights regarding your personal information under 
                    the California Consumer Privacy Act (CCPA).
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">California Consumer Rights</h3>
                  <p className="text-gray-300 mb-4">
                    The CCPA provides California residents with the following rights:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li><span className="font-medium">Right to Know:</span> You have the right to request that we disclose certain information about our collection and use of your personal information over the past 12 months.</li>
                    <li><span className="font-medium">Right to Delete:</span> You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions.</li>
                    <li><span className="font-medium">Right to Opt-Out of Sales:</span> You have the right to opt-out of the sale of your personal information. Note that we do not sell personal information.</li>
                    <li><span className="font-medium">Right to Non-Discrimination:</span> You have the right not to be discriminated against for exercising any of your CCPA rights.</li>
                  </ul>
                  
                  <p className="text-gray-300 mb-6">
                    To exercise your rights under the CCPA, please contact us using the information provided in the "Contact Us" section.
                  </p>
                </div>
                
                {/* Children's Privacy Section */}
                <div ref={sectionRefs["children"]} className="mt-12">
                  <h2 id="children" className="flex items-center text-3xl font-bold mb-6 group">
                    Children's Privacy
                    <a href="#children" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Our Service is not directed to anyone under the age of 13. We do not knowingly collect personally identifiable 
                    information from children under 13. If you are a parent or guardian and you are aware that your child has 
                    provided us with personal information, please contact us. If we become aware that we have collected personal 
                    information from a child under age 13 without verification of parental consent, we take steps to remove that 
                    information from our servers.
                  </p>
                </div>
                
                {/* Changes to Policy Section */}
                <div ref={sectionRefs["changes"]} className="mt-12">
                  <h2 id="changes" className="flex items-center text-3xl font-bold mb-6 group">
                    Changes to This Policy
                    <a href="#changes" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                    Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You are 
                    advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are 
                    effective when they are posted on this page.
                  </p>
                </div>
                
                {/* Contact Section */}
                <div ref={sectionRefs["contact"]} className="mt-12">
                  <h2 id="contact" className="flex items-center text-3xl font-bold mb-6 group">
                    Contact Us
                    <a href="#contact" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-medium mb-4">Flashcast, Inc.</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <Mail className="w-5 h-5 text-primary mr-3 mt-1" />
                        <span>privacy@flashcast.com</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="w-5 h-5 text-primary mr-3 mt-1" />
                        <span>123 Learning Avenue, San Francisco, CA 94107, USA</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-300">
                    For privacy-specific concerns, you can also contact our Data Protection Officer at dpo@flashcast.com.
                  </p>
                </div>
              </div>
            </main>
            
            {/* Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4">
              <TableOfContents 
                items={tocItems}
                activeSection={activeSection}
                onItemClick={scrollToSection}
              />
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
