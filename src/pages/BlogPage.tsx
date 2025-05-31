import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Search, Tag, Clock, User, Calendar, ChevronRight, BookOpen, Bookmark, TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for blog data
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  category: string;
  featured?: boolean;
}

interface Category {
  name: string;
  count: number;
}

// Blog post data (placeholder)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Science of Spaced Repetition: Why Flashcards Work",
    excerpt: "Discover how spaced repetition can improve your memory retention by up to 80% and why it's the secret behind effective flashcard learning.",
    content: "Full content here...",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "May 15, 2025",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    tags: ["Learning Science", "Memory", "Study Techniques"],
    category: "Learning Science",
    featured: true
  },
  {
    id: "2",
    title: "Voice-Controlled Learning: The Future of Education",
    excerpt: "How voice technology is transforming education and making learning more accessible for students of all abilities.",
    content: "Full content here...",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "April 28, 2025",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1739&q=80",
    tags: ["Voice Technology", "EdTech", "Accessibility"],
    category: "Technology",
    featured: true
  },
  {
    id: "3",
    title: "5 Study Techniques Backed by Cognitive Psychology",
    excerpt: "Research-proven methods to enhance your learning efficiency and retain information longer.",
    content: "Full content here...",
    author: {
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "April 10, 2025",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    tags: ["Study Techniques", "Psychology", "Productivity"],
    category: "Study Tips",
  },
  {
    id: "4",
    title: "Creating Effective Flashcards: A Comprehensive Guide",
    excerpt: "Learn how to design flashcards that optimize learning and help you remember information more effectively.",
    content: "Full content here...",
    author: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "March 22, 2025",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1722&q=80",
    tags: ["Flashcards", "Design", "Learning Tools"],
    category: "Study Tips",
  },
  {
    id: "5",
    title: "The Digital Learner's Toolkit: Essential Apps for Students",
    excerpt: "Discover the best digital tools that can transform your learning experience and boost your academic performance.",
    content: "Full content here...",
    author: {
      name: "Aisha Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "March 8, 2025",
    readingTime: "9 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    tags: ["EdTech", "Apps", "Digital Learning"],
    category: "Technology",
  },
  {
    id: "6",
    title: "Learning a New Language with Flashcards: Strategies that Work",
    excerpt: "How to leverage spaced repetition and flashcards to master vocabulary and grammar in any language.",
    content: "Full content here...",
    author: {
      name: "Carlos Mendez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "February 20, 2025",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    tags: ["Language Learning", "Flashcards", "Memory Techniques"],
    category: "Language Learning",
  },
  {
    id: "7",
    title: "How to Study for Medical Exams Using Active Recall",
    excerpt: "Medical students share their strategies for mastering complex information through active recall and spaced repetition.",
    content: "Full content here...",
    author: {
      name: "Dr. Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1612459284970-e8f027596582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "February 5, 2025",
    readingTime: "12 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    tags: ["Medical Education", "Active Recall", "Study Techniques"],
    category: "Professional Learning",
  },
  {
    id: "8",
    title: "The Neuroscience of Learning: How Your Brain Processes Information",
    excerpt: "Understanding the biological mechanisms behind learning can help you optimize your study habits.",
    content: "Full content here...",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "January 18, 2025",
    readingTime: "11 min read",
    image: "https://images.unsplash.com/photo-1559757175-7cb056abe917?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1741&q=80",
    tags: ["Neuroscience", "Learning Science", "Brain"],
    category: "Learning Science",
    featured: true
  },
];

// Categories data (generated from blog posts)
const generateCategories = (posts: BlogPost[]): Category[] => {
  const categoryCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    if (categoryCounts[post.category]) {
      categoryCounts[post.category]++;
    } else {
      categoryCounts[post.category] = 1;
    }
  });
  
  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count
  }));
};

// All tags (generated from blog posts)
const generateTags = (posts: BlogPost[]): string[] => {
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet);
};

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

// Blog Card Component
const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4 flex items-center space-x-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-white text-sm">{post.category}</span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1 text-gray-400 text-xs">
            <Calendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-xs">
            <Clock className="w-3 h-3" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 pt-0 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-300">{post.author.name}</span>
        </div>
        
        <button className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1 text-sm">
          <span>Read</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Featured Post Card Component
const FeaturedPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl h-[400px] group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={post.image} 
        alt={post.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Bookmark className="w-4 h-4 text-primary" />
          <span className="text-white text-sm font-medium">Featured</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
          {post.title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <div>
              <div className="text-white">{post.author.name}</div>
              <div className="text-gray-400 text-sm">{post.date}</div>
            </div>
          </div>
          
          <button className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <span>Read Article</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Blog Page Component
export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  
  const categories = generateCategories(blogPosts);
  const allTags = generateTags(blogPosts);
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // Filter posts based on search, category, and tags
  useEffect(() => {
    let result = blogPosts;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) || 
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    // Tags filter
    if (selectedTags.length > 0) {
      result = result.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    setFilteredPosts(result);
  }, [searchQuery, selectedCategory, selectedTags]);
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
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
              Flashcast Blog
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Insights, tips, and the latest research on effective learning techniques
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  className="w-full bg-gray-900/80 border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                <TrendingUp className="mr-2 text-primary" />
                Featured Articles
              </h2>
              <a href="#all-posts" className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map(post => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}
      
      {/* Main Content Section */}
      <section className="py-16" id="all-posts">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-primary" />
                  Filters
                </h3>
                
                {/* Categories */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Categories</h4>
                  <ul className="space-y-3">
                    <li>
                      <button
                        className={cn(
                          "w-full text-left flex items-center justify-between transition-colors",
                          selectedCategory === null 
                            ? "text-primary font-medium" 
                            : "text-gray-300 hover:text-white"
                        )}
                        onClick={() => setSelectedCategory(null)}
                      >
                        <span>All Categories</span>
                        <span className="text-sm bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                          {blogPosts.length}
                        </span>
                      </button>
                    </li>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <button
                          className={cn(
                            "w-full text-left flex items-center justify-between transition-colors",
                            selectedCategory === category.name 
                              ? "text-primary font-medium" 
                              : "text-gray-300 hover:text-white"
                          )}
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.name ? null : category.name
                          )}
                        >
                          <span>{category.name}</span>
                          <span className="text-sm bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                            {category.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Tags */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag, index) => (
                      <button
                        key={index}
                        className={cn(
                          "text-sm px-3 py-1.5 rounded-full transition-colors",
                          selectedTags.includes(tag)
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Blog Posts Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <BookOpen className="mr-2 text-primary" />
                  All Articles
                  {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                    <span className="ml-2 text-lg text-gray-400">
                      ({filteredPosts.length} results)
                    </span>
                  )}
                </h2>
                
                {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                  <button
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedTags([]);
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-gray-400 mb-4">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <button
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedTags([]);
                    }}
                  >
                    Reset all filters
                  </button>
                </div>
              )}
              
              {/* Pagination (placeholder) */}
              {filteredPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex space-x-2">
                    {[1, 2, 3].map(page => (
                      <button
                        key={page}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          page === 1
                            ? "bg-primary text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        )}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with Learning Tips
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Subscribe to our newsletter for the latest articles, research, and learning techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
