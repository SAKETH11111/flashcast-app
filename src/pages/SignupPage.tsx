import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Github,
  ChevronRight,
  User,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  agreeToTerms: string | null;
}

type PasswordStrength = "weak" | "medium" | "strong" | "none";

export default function SignupPage() {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
    agreeToTerms: null
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>("none");
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Check password strength
  useEffect(() => {
    if (!formState.password) {
      setPasswordStrength("none");
      return;
    }
    
    const hasMinLength = formState.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(formState.password);
    const hasLowerCase = /[a-z]/.test(formState.password);
    const hasNumbers = /[0-9]/.test(formState.password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formState.password);
    
    const strengthScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    
    if (strengthScore <= 2) {
      setPasswordStrength("weak");
    } else if (strengthScore <= 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  }, [formState.password]);
  
  // Get password strength color and label
  const getPasswordStrengthInfo = () => {
    switch (passwordStrength) {
      case "weak":
        return { color: "bg-red-500", label: "Weak" };
      case "medium":
        return { color: "bg-yellow-500", label: "Medium" };
      case "strong":
        return { color: "bg-green-500", label: "Strong" };
      default:
        return { color: "bg-gray-700", label: "" };
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null,
      agreeToTerms: null
    };
    
    // Full name validation
    if (!formState.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formState.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength === "weak") {
      newErrors.password = "Please use a stronger password";
    }
    
    // Confirm password validation
    if (!formState.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Terms agreement validation
    if (!formState.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms and Privacy Policy";
    }
    
    setErrors(newErrors);
    
    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard or home page after successful signup
      console.log("Signup successful", formState);
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Password strength indicator
  const PasswordStrengthIndicator = () => {
    if (formState.password.length === 0) return null;
    
    const { color, label } = getPasswordStrengthInfo();
    
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${color}`}
              initial={{ width: 0 }}
              animate={{ 
                width: passwordStrength === "weak" 
                  ? "33%" 
                  : passwordStrength === "medium" 
                    ? "67%" 
                    : "100%" 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="ml-2 text-xs text-gray-400">{label}</span>
        </div>
        <div className="text-xs text-gray-400">
          {passwordStrength === "weak" && "Use 8+ characters with letters, numbers & symbols"}
          {passwordStrength === "medium" && "Good! Add more variety for a stronger password"}
          {passwordStrength === "strong" && "Excellent password strength!"}
        </div>
      </div>
    );
  };
  
  // Password requirements list
  const PasswordRequirementItem = ({ 
    met, 
    text 
  }: { 
    met: boolean; 
    text: string;
  }) => (
    <li className="flex items-center text-xs">
      {met ? (
        <Check className="w-3.5 h-3.5 text-green-500 mr-1.5 flex-shrink-0" />
      ) : (
        <X className="w-3.5 h-3.5 text-gray-500 mr-1.5 flex-shrink-0" />
      )}
      <span className={met ? "text-gray-300" : "text-gray-500"}>
        {text}
      </span>
    </li>
  );
  
  const PasswordRequirements = () => {
    if (formState.password.length === 0) return null;
    
    const hasMinLength = formState.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(formState.password);
    const hasLowerCase = /[a-z]/.test(formState.password);
    const hasNumbers = /[0-9]/.test(formState.password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formState.password);
    
    return (
      <ul className="mt-2 space-y-1">
        <PasswordRequirementItem met={hasMinLength} text="At least 8 characters" />
        <PasswordRequirementItem met={hasUpperCase} text="At least one uppercase letter" />
        <PasswordRequirementItem met={hasLowerCase} text="At least one lowercase letter" />
        <PasswordRequirementItem met={hasNumbers} text="At least one number" />
        <PasswordRequirementItem met={hasSpecialChars} text="At least one special character" />
      </ul>
    );
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]" />
        <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-md mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Create Account
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of learners on Flashcast
            </motion.p>
          </div>
        </Container>
      </section>
      
      {/* Signup Form Section */}
      <section className="py-8 mb-20">
        <Container>
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-8 shadow-xl">
              {/* Social Signup Options */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 text-center">Sign up with</h2>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    className="flex justify-center items-center py-2.5 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                    aria-label="Sign up with Google"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex justify-center items-center py-2.5 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                    aria-label="Sign up with Apple"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M16.125,0.175c-0.857,0.071-1.714,0.429-2.285,1c-0.571,0.571-0.857,1.429-0.786,2.286c0.857,0,1.714-0.429,2.286-1C15.911,1.89,16.196,1.032,16.125,0.175z M16.982,4.103c-1.143,0-2.071,0.643-2.714,0.643c-0.714,0-1.5-0.571-2.571-0.571c-1.286,0-2.714,0.786-3.428,2.143c-1.429,2.5-0.357,6.214,1,8.214c0.643,0.929,1.5,2,2.571,2c1,0,1.429-0.643,2.643-0.643c1.214,0,1.571,0.643,2.643,0.643c1.071,0,1.786-0.929,2.428-1.857c0.786-1.143,1.071-2.214,1.071-2.286c0,0-2.071-0.786-2.071-3.214c0-2,1.643-3,1.714-3.071C17.911,4.103,16.982,4.103,16.982,4.103z"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex justify-center items-center py-2.5 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                    aria-label="Sign up with GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center mb-8">
                <div className="border-t border-gray-700 flex-grow"></div>
                <span className="mx-4 text-sm text-gray-400">or sign up with email</span>
                <div className="border-t border-gray-700 flex-grow"></div>
              </div>
              
              {/* Email Signup Form */}
              <form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="mb-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-gray-800 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                        errors.fullName 
                          ? "border-red-500" 
                          : "border-gray-700 focus:border-primary/50"
                      )}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <motion.div
                      className="mt-1 flex items-center text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fullName}
                    </motion.div>
                  )}
                </div>
                
                {/* Email Field */}
                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-gray-800 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                        errors.email 
                          ? "border-red-500" 
                          : "border-gray-700 focus:border-primary/50"
                      )}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.div
                      className="mt-1 flex items-center text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </motion.div>
                  )}
                </div>
                
                {/* Password Field */}
                <div className="mb-5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-gray-800 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                        errors.password 
                          ? "border-red-500" 
                          : "border-gray-700 focus:border-primary/50"
                      )}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.div
                      className="mt-1 flex items-center text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </motion.div>
                  )}
                  
                  {/* Password strength indicator */}
                  <PasswordStrengthIndicator />
                  
                  {/* Password requirements */}
                  <PasswordRequirements />
                </div>
                
                {/* Confirm Password Field */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formState.confirmPassword}
                      onChange={handleChange}
                      className={cn(
                        "w-full bg-gray-800 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                        errors.confirmPassword 
                          ? "border-red-500" 
                          : "border-gray-700 focus:border-primary/50"
                      )}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.div
                      className="mt-1 flex items-center text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </motion.div>
                  )}
                </div>
                
                {/* Terms Agreement Checkbox */}
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formState.agreeToTerms}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary/50"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="text-gray-300">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                  {errors.agreeToTerms && (
                    <motion.div
                      className="mt-1 flex items-center text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.agreeToTerms}
                    </motion.div>
                  )}
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 text-white font-medium transition-all duration-300",
                    isSubmitting 
                      ? "bg-primary/70 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-primary/20"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
              
              {/* Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
