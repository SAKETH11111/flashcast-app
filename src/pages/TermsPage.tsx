import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  FileText, 
  User, 
  AlertTriangle, 
  Shield, 
  Copyright, 
  Zap, 
  Globe, 
  Mail,
  ChevronRight,
  Bookmark,
  Scale
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

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  
  // Reference to content sections for scroll tracking
  const sectionRefs = {
    "introduction": useRef<HTMLDivElement>(null),
    "acceptance": useRef<HTMLDivElement>(null),
    "user-accounts": useRef<HTMLDivElement>(null),
    "service-usage": useRef<HTMLDivElement>(null),
    "prohibited-uses": useRef<HTMLDivElement>(null),
    "intellectual-property": useRef<HTMLDivElement>(null),
    "user-content": useRef<HTMLDivElement>(null),
    "third-party": useRef<HTMLDivElement>(null),
    "disclaimer": useRef<HTMLDivElement>(null),
    "limitation-liability": useRef<HTMLDivElement>(null),
    "indemnification": useRef<HTMLDivElement>(null),
    "termination": useRef<HTMLDivElement>(null),
    "governing-law": useRef<HTMLDivElement>(null),
    "changes": useRef<HTMLDivElement>(null),
    "contact": useRef<HTMLDivElement>(null)
  };
  
  // Table of contents items
  const tocItems = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "acceptance", title: "Acceptance of Terms", level: 2 },
    { id: "user-accounts", title: "User Accounts", level: 2 },
    { id: "service-usage", title: "Service Usage", level: 2 },
    { id: "prohibited-uses", title: "Prohibited Uses", level: 2 },
    { id: "intellectual-property", title: "Intellectual Property", level: 2 },
    { id: "user-content", title: "User Content", level: 2 },
    { id: "third-party", title: "Third-Party Services", level: 2 },
    { id: "disclaimer", title: "Disclaimer of Warranties", level: 2 },
    { id: "limitation-liability", title: "Limitation of Liability", level: 2 },
    { id: "indemnification", title: "Indemnification", level: 2 },
    { id: "termination", title: "Termination", level: 2 },
    { id: "governing-law", title: "Governing Law", level: 2 },
    { id: "changes", title: "Changes to Terms", level: 2 },
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
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Please read these terms carefully before using our service
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
      
      {/* Terms of Service Content */}
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
                    Welcome to Flashcast ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") 
                    govern your use of our website, mobile application, and services (collectively, the "Service") operated by Flashcast.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Our Service provides a platform for creating, managing, and studying with digital flashcards, utilizing 
                    voice control, spaced repetition, and other learning technologies to enhance the educational experience.
                  </p>
                  <p className="text-gray-300 mb-6">
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of 
                    the Terms, then you do not have permission to access or use our Service.
                  </p>
                </div>
                
                {/* Acceptance of Terms Section */}
                <div ref={sectionRefs["acceptance"]} className="mt-12">
                  <h2 id="acceptance" className="flex items-center text-3xl font-bold mb-6 group">
                    Acceptance of Terms
                    <a href="#acceptance" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    By creating an account or using any part of the Service, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms. If you are using the Service on behalf of an organization, you are 
                    agreeing to these Terms for that organization and confirming that you have the authority to bind that 
                    organization to these Terms.
                  </p>
                  <p className="text-gray-300 mb-6">
                    We may update these Terms from time to time. If we make material changes, we will notify you through the 
                    Service or by other means to provide you with the opportunity to review the changes before they become effective. 
                    Your continued use of the Service after we publish or send a notice about our changes to these Terms means that 
                    you are consenting to the updated Terms.
                  </p>
                </div>
                
                {/* User Accounts Section */}
                <div ref={sectionRefs["user-accounts"]} className="mt-12">
                  <h2 id="user-accounts" className="flex items-center text-3xl font-bold mb-6 group">
                    User Accounts
                    <a href="#user-accounts" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    When you create an account with us, you guarantee that the information you provide is accurate, complete, 
                    and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate 
                    termination of your account on the Service.
                  </p>
                  <p className="text-gray-300 mb-4">
                    You are responsible for maintaining the confidentiality of your account and password, including but not 
                    limited to the restriction of access to your computer and/or account. You agree to accept responsibility 
                    for any and all activities or actions that occur under your account and/or password.
                  </p>
                  <p className="text-gray-300 mb-4">
                    You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. 
                    We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.
                  </p>
                  <p className="text-gray-300 mb-6">
                    You must be at least 13 years old to create an account. If you are under 18, you represent that you have your 
                    parent or guardian's permission to use the Service and that they have read and agreed to these Terms on your behalf.
                  </p>
                </div>
                
                {/* Service Usage Section */}
                <div ref={sectionRefs["service-usage"]} className="mt-12">
                  <h2 id="service-usage" className="flex items-center text-3xl font-bold mb-6 group">
                    Service Usage
                    <a href="#service-usage" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Our Service allows you to create, store, share, and study with digital flashcards. We offer different 
                    subscription plans with varying features and limitations.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Subscription Terms</h3>
                  <p className="text-gray-300 mb-4">
                    Some features of the Service require payment of fees. If you choose a paid subscription:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>You agree to pay all fees in accordance with the billing terms in effect when you subscribe.</li>
                    <li>Subscription fees are charged at the beginning of your subscription and on each renewal date.</li>
                    <li>Subscriptions automatically renew for the same period unless you cancel before the renewal date.</li>
                    <li>You can cancel your subscription at any time through your account settings.</li>
                    <li>Refunds are provided in accordance with our Refund Policy.</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-4">Free Trial</h3>
                  <p className="text-gray-300 mb-4">
                    We may offer a free trial of our premium features. At the end of the trial period, you will be automatically 
                    charged the applicable subscription fee unless you cancel before the trial ends. You may cancel your trial at 
                    any time through your account settings.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Service Modifications</h3>
                  <p className="text-gray-300 mb-6">
                    We reserve the right to modify, suspend, or discontinue the Service (or any part or content thereof) at any 
                    time with or without notice to you, and we will not be liable to you or to any third party for any such 
                    modification, suspension, or discontinuation.
                  </p>
                </div>
                
                {/* Prohibited Uses Section */}
                <div ref={sectionRefs["prohibited-uses"]} className="mt-12">
                  <h2 id="prohibited-uses" className="flex items-center text-3xl font-bold mb-6 group">
                    Prohibited Uses
                    <a href="#prohibited-uses" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    You agree not to use the Service for any purpose that is prohibited by these Terms. You are responsible for 
                    all of your activity in connection with the Service.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Prohibited activities include, but are not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
                    <li>Violating or infringing other people's intellectual property, privacy, publicity, or other legal rights</li>
                    <li>Impersonating another person or entity or falsely stating or misrepresenting your affiliation with a person or entity</li>
                    <li>Engaging in any harassing, intimidating, predatory, or stalking conduct</li>
                    <li>Using the Service to transmit any unauthorized advertising, promotional materials, junk mail, spam, or any other form of solicitation</li>
                    <li>Interfering with, disrupting, or creating an undue burden on the Service or the networks or services connected to the Service</li>
                    <li>Attempting to bypass any measures of the Service designed to prevent or restrict access</li>
                    <li>Using any robot, spider, or other automatic device, process, or means to access the Service for any purpose</li>
                    <li>Introducing any viruses, trojan horses, worms, logic bombs, or other harmful material to the Service</li>
                    <li>Collecting or tracking the personal information of other users</li>
                  </ul>
                  
                  <p className="text-gray-300 mb-6">
                    We reserve the right to terminate your use of the Service for violating any of the prohibited uses or for any 
                    other reason at our sole discretion.
                  </p>
                </div>
                
                {/* Intellectual Property Section */}
                <div ref={sectionRefs["intellectual-property"]} className="mt-12">
                  <h2 id="intellectual-property" className="flex items-center text-3xl font-bold mb-6 group">
                    Intellectual Property
                    <a href="#intellectual-property" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    The Service and its original content (excluding User Content), features, and functionality are and will remain 
                    the exclusive property of Flashcast and its licensors. The Service is protected by copyright, trademark, and 
                    other laws of both the United States and foreign countries.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our trademarks and trade dress may not be used in connection with any product or service without the prior 
                    written consent of Flashcast.
                  </p>
                  <p className="text-gray-300 mb-6">
                    The software that powers our Service is proprietary and you agree not to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Modify, create derivative works from, decompile, or reverse engineer any portion of the Service</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    <li>Use any data mining, robots, or similar data gathering and extraction methods</li>
                  </ul>
                </div>
                
                {/* User Content Section */}
                <div ref={sectionRefs["user-content"]} className="mt-12">
                  <h2 id="user-content" className="flex items-center text-3xl font-bold mb-6 group">
                    User Content
                    <a href="#user-content" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Our Service allows you to create, upload, post, send, and store content, including flashcards, decks, 
                    text, images, and other materials ("User Content"). You retain all rights in, and are solely responsible 
                    for, the User Content you create or upload to the Service.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">License to Flashcast</h3>
                  <p className="text-gray-300 mb-4">
                    By submitting User Content to the Service, you grant Flashcast a worldwide, non-exclusive, royalty-free, 
                    sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, 
                    and perform the User Content in connection with the Service and Flashcast's business operations, including 
                    for promoting and redistributing part or all of the Service.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">User Content Representations</h3>
                  <p className="text-gray-300 mb-4">
                    You represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>You own or have the necessary rights to use and authorize us to use all intellectual property rights in and to any User Content.</li>
                    <li>Your User Content does not violate the privacy rights, publicity rights, copyrights, contractual rights, intellectual property rights, or any other rights of any person or entity.</li>
                    <li>Your User Content does not contain any material that solicits personal information from anyone under 18 or exploit people under the age of 18 in a sexual or violent manner.</li>
                    <li>Your User Content does not violate any applicable law, regulation, or rule.</li>
                    <li>Your User Content does not contain any material that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, or otherwise objectionable.</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-4">Content Monitoring</h3>
                  <p className="text-gray-300 mb-6">
                    We do not assume any liability for User Content that you or any other user or third party posts or sends 
                    through the Service. We reserve the right, but have no obligation, to monitor and review User Content on the 
                    Service and to remove any User Content that violates these Terms or that we find objectionable for any reason.
                  </p>
                </div>
                
                {/* Third-Party Services Section */}
                <div ref={sectionRefs["third-party"]} className="mt-12">
                  <h2 id="third-party" className="flex items-center text-3xl font-bold mb-6 group">
                    Third-Party Services
                    <a href="#third-party" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    The Service may contain links to third-party websites, services, or resources that are not owned or controlled 
                    by Flashcast. We do not endorse or assume any responsibility for any such third-party sites, information, 
                    materials, products, or services.
                  </p>
                  <p className="text-gray-300 mb-4">
                    If you access a third-party website or service from the Service, you do so at your own risk, and you understand 
                    that these Terms and our Privacy Policy do not apply to your use of such sites. You expressly relieve Flashcast 
                    from any and all liability arising from your use of any third-party website, service, or content.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Additionally, your dealings with or participation in promotions of advertisers found on the Service, including 
                    payment and delivery of goods, and any other terms are solely between you and such advertisers. You agree that 
                    Flashcast shall not be responsible for any loss or damage of any sort relating to your dealings with such advertisers.
                  </p>
                </div>
                
                {/* Disclaimer of Warranties Section */}
                <div ref={sectionRefs["disclaimer"]} className="mt-12">
                  <h2 id="disclaimer" className="flex items-center text-3xl font-bold mb-6 group">
                    Disclaimer of Warranties
                    <a href="#disclaimer" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
                    <p className="text-gray-300 mb-4">
                      THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. FLASHCAST AND ITS SUPPLIERS AND LICENSORS 
                      HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES 
                      OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. NEITHER FLASHCAST NOR ITS SUPPLIERS 
                      AND LICENSORS MAKES ANY WARRANTY THAT THE SERVICE WILL BE ERROR FREE OR THAT ACCESS THERETO WILL BE CONTINUOUS 
                      OR UNINTERRUPTED.
                    </p>
                    <p className="text-gray-300">
                      YOU UNDERSTAND THAT YOU USE THE SERVICE AT YOUR OWN DISCRETION AND RISK.
                    </p>
                  </div>
                </div>
                
                {/* Limitation of Liability Section */}
                <div ref={sectionRefs["limitation-liability"]} className="mt-12">
                  <h2 id="limitation-liability" className="flex items-center text-3xl font-bold mb-6 group">
                    Limitation of Liability
                    <a href="#limitation-liability" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
                    <p className="text-gray-300 mb-4">
                      IN NO EVENT WILL FLASHCAST, OR ITS SUPPLIERS OR LICENSORS, BE LIABLE WITH RESPECT TO ANY SUBJECT MATTER OF 
                      THESE TERMS UNDER ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY, OR OTHER LEGAL OR EQUITABLE THEORY FOR:
                    </p>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                      <li>ANY SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES;</li>
                      <li>THE COST OF PROCUREMENT FOR SUBSTITUTE PRODUCTS OR SERVICES;</li>
                      <li>INTERRUPTION OF USE OR LOSS OR CORRUPTION OF DATA;</li>
                      <li>ANY STATEMENTS OR REPRESENTATIONS MADE BY ANY THIRD PARTY; OR</li>
                      <li>ANY AMOUNT, IN THE AGGREGATE, IN EXCESS OF THE GREATER OF (A) FEES PAID TO FLASHCAST DURING THE 12 MONTHS PRIOR TO THE CAUSE OF ACTION ARISING, OR (B) $100.00.</li>
                    </ul>
                    <p className="text-gray-300">
                      SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE 
                      ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY TO YOU.
                    </p>
                  </div>
                </div>
                
                {/* Indemnification Section */}
                <div ref={sectionRefs["indemnification"]} className="mt-12">
                  <h2 id="indemnification" className="flex items-center text-3xl font-bold mb-6 group">
                    Indemnification
                    <a href="#indemnification" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    You agree to indemnify, defend, and hold harmless Flashcast, its affiliates, officers, directors, employees, 
                    consultants, agents, suppliers, and licensors from any and all claims, liabilities, damages, losses, costs, 
                    expenses, and fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising 
                    from: (a) your User Content; (b) your use of the Service; (c) your violation of these Terms; (d) your violation 
                    of any rights of any other person or entity; or (e) any viruses, trojan horses, worms, time bombs, spyware, 
                    malware, cancelbots, or other similar harmful or deleterious programming routines input by you into the Service.
                  </p>
                </div>
                
                {/* Termination Section */}
                <div ref={sectionRefs["termination"]} className="mt-12">
                  <h2 id="termination" className="flex items-center text-3xl font-bold mb-6 group">
                    Termination
                    <a href="#termination" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, 
                    under our sole discretion, for any reason whatsoever, including, without limitation, if you breach these Terms.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, 
                    you may simply discontinue using the Service or delete your account through the account settings.
                  </p>
                  <p className="text-gray-300 mb-6">
                    All provisions of these Terms which by their nature should survive termination shall survive termination, 
                    including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </div>
                
                {/* Governing Law Section */}
                <div ref={sectionRefs["governing-law"]} className="mt-12">
                  <h2 id="governing-law" className="flex items-center text-3xl font-bold mb-6 group">
                    Governing Law
                    <a href="#governing-law" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    These Terms shall be governed and construed in accordance with the laws of the State of California, 
                    United States, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                    If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                    of these Terms will remain in effect.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Any disputes arising out of or relating to these Terms or the Service shall be resolved exclusively in the 
                    state or federal courts located in San Francisco County, California, and you consent to the personal jurisdiction 
                    of those courts.
                  </p>
                </div>
                
                {/* Changes to Terms Section */}
                <div ref={sectionRefs["changes"]} className="mt-12">
                  <h2 id="changes" className="flex items-center text-3xl font-bold mb-6 group">
                    Changes to Terms
                    <a href="#changes" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                    material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a 
                    material change will be determined at our sole discretion.
                  </p>
                  <p className="text-gray-300 mb-6">
                    By continuing to access or use our Service after any revisions become effective, you agree to be bound by the 
                    revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
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
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-medium mb-4">Flashcast, Inc.</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <Mail className="w-5 h-5 text-primary mr-3 mt-1" />
                        <span>legal@flashcast.com</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="w-5 h-5 text-primary mr-3 mt-1" />
                        <span>123 Learning Avenue, San Francisco, CA 94107, USA</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-300">
                    For legal notices, please send correspondence to legal@flashcast.com or to our physical address, 
                    Attention: Legal Department.
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
