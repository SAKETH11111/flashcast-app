import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Pricing page with toggle, comparison table, and FAQ
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const yearlyDiscount = 20; // 20% discount for yearly billing

  // Calculate pricing based on billing cycle
  const getPriceWithDiscount = (monthlyPrice: number) => {
    if (billingCycle === "yearly") {
      const yearlyPrice = monthlyPrice * 12;
      const discountAmount = yearlyPrice * (yearlyDiscount / 100);
      return ((yearlyPrice - discountAmount) / 12).toFixed(2);
    }
    return monthlyPrice.toFixed(2);
  };

  // Pricing plans data
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for casual learners",
      features: [
        { name: "Up to 5 decks", included: true },
        { name: "Basic voice commands", included: true },
        { name: "Progress tracking", included: true },
        { name: "Community templates", included: true },
        { name: "Cloud sync", included: false },
        { name: "Offline mode", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: 9.99,
      description: "For serious students and professionals",
      features: [
        { name: "Unlimited decks", included: true },
        { name: "Advanced voice commands", included: true },
        { name: "Progress tracking", included: true },
        { name: "Community templates", included: true },
        { name: "Cloud sync", included: true },
        { name: "Offline mode", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: 29.99,
      description: "For teams and organizations",
      features: [
        { name: "Unlimited decks", included: true },
        { name: "Advanced voice commands", included: true },
        { name: "Progress tracking", included: true },
        { name: "Community templates", included: true },
        { name: "Cloud sync", included: true },
        { name: "Offline mode", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Custom branding", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How does the free trial work?",
      answer: "Our free trial gives you full access to the Pro plan for 14 days with no credit card required. At the end of your trial, you can choose to subscribe or downgrade to the Free plan.",
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards future billing.",
    },
    {
      question: "Is there a student discount?",
      answer: "Yes! Students and educators can receive 50% off any paid plan. Contact our support team with your academic email address or student ID for verification.",
    },
    {
      question: "How secure is my data?",
      answer: "We take security seriously. All your data is encrypted both in transit and at rest. We use industry-standard security practices and regular audits to ensure your information stays private.",
    },
    {
      question: "Can I get a refund?",
      answer: "If you're not satisfied with your purchase, contact us within 30 days for a full refund, no questions asked.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]" />
        <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choose the plan that's right for your learning journey.
              No hidden fees, cancel anytime.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Billing Toggle Section */}
      <section className="py-8">
        <Container>
          <motion.div 
            className="flex flex-col items-center justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 bg-gray-900/50 p-1 rounded-full border border-gray-800">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  billingCycle === "monthly" 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative",
                  billingCycle === "yearly" 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-xs text-white px-2 py-0.5 rounded-full">
                  Save {yearlyDiscount}%
                </span>
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Pricing Table Section */}
      <section className="py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="rowgroup">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={cn(
                  "rounded-2xl bg-gray-900/70 border border-gray-800 overflow-hidden",
                  plan.popular && "relative border-0"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                    <div className="absolute inset-0 rounded-[14px] bg-gray-900/70" />
                  </div>
                )}
                
                <div className={cn(
                  "relative h-full flex flex-col p-8",
                  plan.popular && "z-10"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="mb-5">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">
                        ${getPriceWithDiscount(plan.price)}
                      </span>
                      <span className="text-gray-400 ml-2">
                        /{billingCycle === "monthly" ? "mo" : "mo, billed yearly"}
                      </span>
                    </div>
                    
                    {billingCycle === "yearly" && plan.price > 0 && (
                      <div className="mt-1 text-green-500 text-sm">
                        Save ${(plan.price * 12 * yearlyDiscount / 100).toFixed(2)} per year
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          <span className={cn(
                            "text-sm",
                            feature.included ? "text-gray-200" : "text-gray-500"
                          )}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    className={cn(
                      "w-full py-3 rounded-lg font-medium transition-all duration-200",
                      plan.popular 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-primary/20" 
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-medium">{item.question}</h3>
                      <span className="relative flex-shrink-0 ml-2 w-5 h-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 12H6"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-400">{item.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Accelerate Your Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of students who've already improved their study efficiency with Flashcast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative h-12 px-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <span>Start Free Trial</span>
                <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 hover:opacity-20 transition-opacity" />
              </button>
              <button className="h-12 px-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300">
                <span>View Demo</span>
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
