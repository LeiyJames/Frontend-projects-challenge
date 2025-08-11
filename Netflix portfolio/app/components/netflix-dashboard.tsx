"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Bell,
  User,
  Play,
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Menu,
  X,
  Bug,
  Shield,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NetflixDashboardProps {
  profileName: string
  onBack: () => void
}

export default function NetflixDashboard({ profileName, onBack }: NetflixDashboardProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Profile-specific data
  const getProfileData = () => {
    switch (profileName) {
      case "Onyeka":
        return {
          role: "Software QA Engineer",
          featured: {
            title: "Automated Testing Framework",
            description:
              "A comprehensive automated testing framework built with Selenium, TestNG, and Jenkins. Features include cross-browser testing, API testing, performance testing, and detailed reporting with CI/CD integration.",
            image: "/placeholder.svg?height=600&width=1200&text=Automated+Testing+Framework",
            category: "Quality Assurance",
            technologies: ["Selenium", "TestNG", "Jenkins", "Java", "REST Assured", "Postman"],
            github: "https://github.com/onyeka/qa-framework",
            live: "https://qa-dashboard-demo.com",
            duration: "8 months",
            team: "QA Team Lead",
          },
          projects: [
            {
              id: "1",
              title: "E-commerce Testing Suite",
              description:
                "Comprehensive testing suite for e-commerce platform covering functional, regression, and performance testing with automated test execution and reporting.",
              image: "/placeholder.svg?height=300&width=500&text=E-commerce+Testing",
              technologies: ["Cypress", "Jest", "Playwright", "K6", "Allure"],
              category: "Functional Testing",
              github: "https://github.com/onyeka/ecommerce-tests",
              features: ["Cross-browser testing", "API testing", "Performance testing", "Visual regression"],
              duration: "6 months",
            },
            {
              id: "2",
              title: "Mobile App Testing Framework",
              description:
                "Mobile testing framework for iOS and Android applications with device farm integration, automated UI testing, and crash reporting analysis.",
              image: "/placeholder.svg?height=300&width=500&text=Mobile+Testing",
              technologies: ["Appium", "XCUITest", "Espresso", "Firebase Test Lab"],
              category: "Mobile Testing",
              github: "https://github.com/onyeka/mobile-testing",
              features: ["Device farm integration", "Automated UI testing", "Crash analysis", "Performance monitoring"],
              duration: "5 months",
            },
            {
              id: "3",
              title: "API Testing Automation",
              description:
                "RESTful API testing framework with contract testing, load testing, and security testing capabilities integrated with CI/CD pipelines.",
              image: "/placeholder.svg?height=300&width=500&text=API+Testing",
              technologies: ["REST Assured", "Postman", "Newman", "JMeter", "OWASP ZAP"],
              category: "API Testing",
              github: "https://github.com/onyeka/api-testing",
              features: ["Contract testing", "Load testing", "Security testing", "CI/CD integration"],
              duration: "4 months",
            },
            {
              id: "4",
              title: "Test Data Management System",
              description:
                "Centralized test data management system with data generation, masking, and environment synchronization for consistent testing across teams.",
              image: "/placeholder.svg?height=300&width=500&text=Test+Data+Management",
              technologies: ["Python", "PostgreSQL", "Docker", "Faker", "Apache Airflow"],
              category: "Test Management",
              github: "https://github.com/onyeka/test-data-mgmt",
              features: ["Data generation", "Data masking", "Environment sync", "Version control"],
              duration: "7 months",
            },
            {
              id: "5",
              title: "Performance Testing Dashboard",
              description:
                "Real-time performance testing dashboard with load testing execution, monitoring, and detailed analytics for web applications.",
              image: "/placeholder.svg?height=300&width=500&text=Performance+Dashboard",
              technologies: ["JMeter", "Grafana", "InfluxDB", "Jenkins", "AWS"],
              category: "Performance Testing",
              github: "https://github.com/onyeka/perf-dashboard",
              features: ["Real-time monitoring", "Load testing", "Performance analytics", "Alerting"],
              duration: "6 months",
            },
            {
              id: "6",
              title: "Accessibility Testing Tools",
              description:
                "Automated accessibility testing tools with WCAG compliance checking, screen reader testing, and accessibility reporting.",
              image: "/placeholder.svg?height=300&width=500&text=Accessibility+Testing",
              technologies: ["axe-core", "Pa11y", "NVDA", "JAWS", "Lighthouse"],
              category: "Accessibility Testing",
              github: "https://github.com/onyeka/a11y-testing",
              features: ["WCAG compliance", "Screen reader testing", "Color contrast", "Keyboard navigation"],
              duration: "4 months",
            },
          ],
          skills: {
            testing: [
              { name: "Selenium WebDriver", level: 95, years: 6 },
              { name: "Cypress", level: 90, years: 4 },
              { name: "Playwright", level: 85, years: 3 },
              { name: "TestNG/JUnit", level: 92, years: 5 },
              { name: "Appium", level: 88, years: 4 },
              { name: "REST Assured", level: 90, years: 5 },
            ],
            tools: [
              { name: "JIRA", level: 95, years: 7 },
              { name: "TestRail", level: 88, years: 5 },
              { name: "Jenkins", level: 85, years: 4 },
              { name: "Postman", level: 92, years: 6 },
              { name: "JMeter", level: 80, years: 3 },
            ],
            programming: [
              { name: "Java", level: 88, years: 5 },
              { name: "Python", level: 85, years: 4 },
              { name: "JavaScript", level: 82, years: 4 },
              { name: "SQL", level: 90, years: 6 },
            ],
            methodologies: [
              { name: "Agile/Scrum", level: 95, years: 7 },
              { name: "Test-Driven Development", level: 88, years: 5 },
              { name: "Behavior-Driven Development", level: 85, years: 4 },
              { name: "Risk-Based Testing", level: 90, years: 6 },
            ],
          },
          about: {
            bio: "I'm Onyeka, a dedicated Software QA Engineer with 7+ years of experience in test automation, quality assurance, and ensuring software reliability. I specialize in building robust testing frameworks, implementing CI/CD testing strategies, and leading quality initiatives across development teams.",
            experience: "7+ years",
            location: "Austin, TX",
            email: "onyeka@example.com",
            phone: "+1 (555) 234-5678",
            availability: "Available for QA consulting",
            interests: ["Test Automation", "Quality Engineering", "DevOps", "Mentoring"],
            education: [
              {
                degree: "Master of Science in Software Engineering",
                school: "University of Texas at Austin",
                year: "2017",
                focus: "Software Quality & Testing Methodologies",
              },
              {
                degree: "Bachelor of Science in Computer Science",
                school: "Texas A&M University",
                year: "2015",
                focus: "Software Development & Quality Assurance",
              },
            ],
            certifications: [
              "ISTQB Advanced Level Test Analyst",
              "Certified Selenium Professional",
              "AWS Certified Developer Associate",
              "Agile Testing Certified Professional",
            ],
          },
        }

      case "Thelma":
        return {
          role: "Technical Support Specialist",
          featured: {
            title: "Customer Support Portal & Knowledge Base",
            description:
              "A comprehensive customer support platform with AI-powered chatbot, ticket management system, knowledge base, and real-time customer communication tools. Features automated issue resolution and customer satisfaction tracking.",
            image: "/placeholder.svg?height=600&width=1200&text=Support+Portal",
            category: "Technical Support",
            technologies: ["React", "Node.js", "MongoDB", "Socket.io", "OpenAI", "Zendesk API"],
            github: "https://github.com/thelma/support-portal",
            live: "https://support-portal-demo.com",
            duration: "10 months",
            team: "Support Team Lead",
          },
          projects: [
            {
              id: "1",
              title: "IT Helpdesk Management System",
              description:
                "Complete IT helpdesk solution with ticket tracking, asset management, remote support capabilities, and automated escalation workflows.",
              image: "/placeholder.svg?height=300&width=500&text=IT+Helpdesk",
              technologies: ["ServiceNow", "PowerShell", "Active Directory", "TeamViewer API"],
              category: "IT Support",
              github: "https://github.com/thelma/it-helpdesk",
              features: ["Ticket management", "Asset tracking", "Remote support", "SLA monitoring"],
              duration: "8 months",
            },
            {
              id: "2",
              title: "Network Monitoring Dashboard",
              description:
                "Real-time network monitoring and alerting system with automated diagnostics, performance tracking, and incident response workflows.",
              image: "/placeholder.svg?height=300&width=500&text=Network+Monitoring",
              technologies: ["PRTG", "Nagios", "Python", "Grafana", "Slack API"],
              category: "Network Support",
              github: "https://github.com/thelma/network-monitor",
              features: ["Real-time monitoring", "Automated alerts", "Performance analytics", "Incident tracking"],
              duration: "6 months",
            },
            {
              id: "3",
              title: "Customer Onboarding System",
              description:
                "Streamlined customer onboarding platform with guided setup, documentation, training modules, and progress tracking for new users.",
              image: "/placeholder.svg?height=300&width=500&text=Customer+Onboarding",
              technologies: ["Vue.js", "Laravel", "MySQL", "Intercom", "Loom"],
              category: "Customer Success",
              github: "https://github.com/thelma/onboarding-system",
              features: ["Guided setup", "Progress tracking", "Training modules", "Support integration"],
              duration: "5 months",
            },
            {
              id: "4",
              title: "Remote Support Tools Suite",
              description:
                "Collection of remote support tools including screen sharing, file transfer, system diagnostics, and customer communication platform.",
              image: "/placeholder.svg?height=300&width=500&text=Remote+Support",
              technologies: ["Electron", "WebRTC", "Socket.io", "Node.js", "React"],
              category: "Remote Support",
              github: "https://github.com/thelma/remote-support",
              features: ["Screen sharing", "File transfer", "System diagnostics", "Chat support"],
              duration: "7 months",
            },
            {
              id: "5",
              title: "Knowledge Base Management",
              description:
                "AI-powered knowledge base with smart search, content recommendations, user feedback, and automated content updates.",
              image: "/placeholder.svg?height=300&width=500&text=Knowledge+Base",
              technologies: ["Elasticsearch", "React", "Python", "OpenAI", "PostgreSQL"],
              category: "Knowledge Management",
              github: "https://github.com/thelma/knowledge-base",
              features: ["Smart search", "AI recommendations", "User feedback", "Content analytics"],
              duration: "6 months",
            },
            {
              id: "6",
              title: "Support Analytics Platform",
              description:
                "Comprehensive analytics platform for support metrics, customer satisfaction tracking, agent performance, and operational insights.",
              image: "/placeholder.svg?height=300&width=500&text=Support+Analytics",
              technologies: ["Tableau", "Python", "SQL", "Power BI", "REST APIs"],
              category: "Support Analytics",
              github: "https://github.com/thelma/support-analytics",
              features: ["Performance metrics", "Customer satisfaction", "Trend analysis", "Custom reports"],
              duration: "9 months",
            },
          ],
          skills: {
            support: [
              { name: "ServiceNow", level: 95, years: 6 },
              { name: "Zendesk", level: 92, years: 5 },
              { name: "Freshdesk", level: 88, years: 4 },
              { name: "JIRA Service Management", level: 90, years: 5 },
              { name: "Salesforce Service Cloud", level: 85, years: 3 },
            ],
            technical: [
              { name: "Windows Server", level: 90, years: 7 },
              { name: "Active Directory", level: 88, years: 6 },
              { name: "PowerShell", level: 85, years: 5 },
              { name: "SQL Server", level: 82, years: 4 },
              { name: "VMware", level: 80, years: 4 },
            ],
            networking: [
              { name: "TCP/IP", level: 88, years: 6 },
              { name: "DNS/DHCP", level: 85, years: 5 },
              { name: "VPN Configuration", level: 82, years: 4 },
              { name: "Firewall Management", level: 80, years: 4 },
            ],
            soft: [
              { name: "Customer Communication", level: 98, years: 8 },
              { name: "Problem Solving", level: 95, years: 8 },
              { name: "Technical Documentation", level: 92, years: 7 },
              { name: "Team Leadership", level: 88, years: 5 },
            ],
          },
          about: {
            bio: "I'm Thelma, a passionate Technical Support Specialist with 8+ years of experience in customer service, IT support, and technical problem-solving. I excel at bridging the gap between complex technical solutions and user-friendly support experiences.",
            experience: "8+ years",
            location: "Seattle, WA",
            email: "thelma@example.com",
            phone: "+1 (555) 345-6789",
            availability: "Available for support consulting",
            interests: ["Customer Success", "IT Infrastructure", "Process Improvement", "Team Training"],
            education: [
              {
                degree: "Bachelor of Science in Information Technology",
                school: "University of Washington",
                year: "2016",
                focus: "Network Administration & Customer Support",
              },
              {
                degree: "Associate Degree in Computer Support",
                school: "Seattle Community College",
                year: "2014",
                focus: "Help Desk & Technical Support",
              },
            ],
            certifications: [
              "CompTIA A+ Certified",
              "Microsoft Certified: Azure Fundamentals",
              "ITIL Foundation Certified",
              "HDI Customer Service Representative",
            ],
          },
        }

      case "Kids":
        return {
          role: "Data Analytics Specialist",
          featured: {
            title: "Real-Time Business Intelligence Dashboard",
            description:
              "An advanced business intelligence platform with real-time data processing, interactive visualizations, predictive analytics, and automated reporting. Features machine learning models for forecasting and anomaly detection.",
            image: "/placeholder.svg?height=600&width=1200&text=BI+Dashboard",
            category: "Data Analytics",
            technologies: ["Python", "Tableau", "Apache Spark", "PostgreSQL", "TensorFlow", "AWS"],
            github: "https://github.com/kids/bi-dashboard",
            live: "https://bi-dashboard-demo.com",
            duration: "12 months",
            team: "Data Team Lead",
          },
          projects: [
            {
              id: "1",
              title: "Customer Behavior Analytics",
              description:
                "Advanced customer behavior analysis platform with segmentation, churn prediction, lifetime value calculation, and personalization recommendations.",
              image: "/placeholder.svg?height=300&width=500&text=Customer+Analytics",
              technologies: ["Python", "Pandas", "Scikit-learn", "Plotly", "MongoDB"],
              category: "Customer Analytics",
              github: "https://github.com/kids/customer-analytics",
              features: ["Customer segmentation", "Churn prediction", "LTV analysis", "Recommendation engine"],
              duration: "8 months",
            },
            {
              id: "2",
              title: "Sales Forecasting Model",
              description:
                "Machine learning-powered sales forecasting system with time series analysis, seasonal adjustments, and confidence intervals for accurate predictions.",
              image: "/placeholder.svg?height=300&width=500&text=Sales+Forecasting",
              technologies: ["R", "Prophet", "ARIMA", "Shiny", "PostgreSQL"],
              category: "Predictive Analytics",
              github: "https://github.com/kids/sales-forecasting",
              features: [
                "Time series analysis",
                "Seasonal forecasting",
                "Confidence intervals",
                "Interactive dashboards",
              ],
              duration: "6 months",
            },
            {
              id: "3",
              title: "Marketing Campaign Optimizer",
              description:
                "Data-driven marketing campaign optimization platform with A/B testing, attribution modeling, and ROI analysis across multiple channels.",
              image: "/placeholder.svg?height=300&width=500&text=Marketing+Optimizer",
              technologies: ["Python", "Apache Airflow", "Redshift", "Looker", "Google Analytics API"],
              category: "Marketing Analytics",
              github: "https://github.com/kids/marketing-optimizer",
              features: ["A/B testing", "Attribution modeling", "ROI analysis", "Multi-channel tracking"],
              duration: "10 months",
            },
            {
              id: "4",
              title: "Supply Chain Analytics",
              description:
                "Comprehensive supply chain analytics platform with inventory optimization, demand forecasting, and supplier performance tracking.",
              image: "/placeholder.svg?height=300&width=500&text=Supply+Chain",
              technologies: ["Python", "Apache Kafka", "Elasticsearch", "Kibana", "Docker"],
              category: "Operations Analytics",
              github: "https://github.com/kids/supply-chain",
              features: ["Inventory optimization", "Demand forecasting", "Supplier analytics", "Real-time monitoring"],
              duration: "9 months",
            },
            {
              id: "5",
              title: "Financial Risk Assessment",
              description:
                "Advanced financial risk assessment system with credit scoring, fraud detection, and portfolio risk analysis using machine learning algorithms.",
              image: "/placeholder.svg?height=300&width=500&text=Risk+Assessment",
              technologies: ["Python", "XGBoost", "Apache Spark", "Kafka", "Cassandra"],
              category: "Financial Analytics",
              github: "https://github.com/kids/risk-assessment",
              features: ["Credit scoring", "Fraud detection", "Portfolio analysis", "Risk modeling"],
              duration: "11 months",
            },
            {
              id: "6",
              title: "Healthcare Data Pipeline",
              description:
                "HIPAA-compliant healthcare data pipeline with patient analytics, treatment effectiveness analysis, and operational efficiency metrics.",
              image: "/placeholder.svg?height=300&width=500&text=Healthcare+Analytics",
              technologies: ["Python", "Apache NiFi", "Snowflake", "Power BI", "Azure"],
              category: "Healthcare Analytics",
              github: "https://github.com/kids/healthcare-pipeline",
              features: ["Patient analytics", "Treatment analysis", "Compliance monitoring", "Operational metrics"],
              duration: "14 months",
            },
          ],
          skills: {
            analytics: [
              { name: "Python", level: 95, years: 6 },
              { name: "R", level: 90, years: 5 },
              { name: "SQL", level: 95, years: 7 },
              { name: "Tableau", level: 92, years: 5 },
              { name: "Power BI", level: 88, years: 4 },
              { name: "Looker", level: 85, years: 3 },
            ],
            machine_learning: [
              { name: "Scikit-learn", level: 90, years: 4 },
              { name: "TensorFlow", level: 85, years: 3 },
              { name: "XGBoost", level: 88, years: 4 },
              { name: "Prophet", level: 82, years: 2 },
            ],
            big_data: [
              { name: "Apache Spark", level: 88, years: 4 },
              { name: "Hadoop", level: 80, years: 3 },
              { name: "Kafka", level: 85, years: 3 },
              { name: "Elasticsearch", level: 82, years: 3 },
            ],
            cloud: [
              { name: "AWS", level: 88, years: 4 },
              { name: "Azure", level: 85, years: 3 },
              { name: "Snowflake", level: 90, years: 4 },
              { name: "Redshift", level: 85, years: 3 },
            ],
          },
          about: {
            bio: "I'm a Data Analytics Specialist with 6+ years of experience in transforming raw data into actionable business insights. I specialize in building scalable analytics solutions, implementing machine learning models, and creating compelling data visualizations that drive strategic decision-making.",
            experience: "6+ years",
            location: "New York, NY",
            email: "analytics@example.com",
            phone: "+1 (555) 456-7890",
            availability: "Available for data consulting",
            interests: ["Machine Learning", "Data Visualization", "Business Intelligence", "Statistical Modeling"],
            education: [
              {
                degree: "Master of Science in Data Science",
                school: "Columbia University",
                year: "2018",
                focus: "Machine Learning & Statistical Analysis",
              },
              {
                degree: "Bachelor of Science in Statistics",
                school: "NYU Stern School of Business",
                year: "2016",
                focus: "Business Analytics & Quantitative Methods",
              },
            ],
            certifications: [
              "Google Cloud Professional Data Engineer",
              "AWS Certified Data Analytics Specialty",
              "Tableau Desktop Certified Professional",
              "Microsoft Certified: Azure Data Scientist Associate",
            ],
          },
        }

      default: // Emenalio - Full-Stack Developer (original)
        return {
          role: "Full-Stack Developer",
          featured: {
            title: "AI-Powered E-Commerce Platform",
            description:
              "A cutting-edge e-commerce solution featuring AI-driven product recommendations, real-time inventory management, and seamless payment processing. Built with Next.js 14, TypeScript, Prisma, and integrated with OpenAI for personalized shopping experiences.",
            image: "/placeholder.svg?height=600&width=1200&text=AI+E-Commerce+Platform",
            category: "Full-Stack Development",
            technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI", "Stripe"],
            github: "https://github.com/emenalio/ai-ecommerce",
            live: "https://ai-ecommerce-demo.vercel.app",
            duration: "6 months",
            team: "Solo Project",
          },
          projects: [
            {
              id: "1",
              title: "Real-Time Chat Application",
              description:
                "A scalable chat application with real-time messaging, file sharing, and video calls. Features include end-to-end encryption, message reactions, and custom emoji support.",
              image: "/placeholder.svg?height=300&width=500&text=Chat+Application",
              technologies: ["React", "Node.js", "Socket.io", "MongoDB", "WebRTC"],
              category: "Full-Stack",
              github: "https://github.com/emenalio/chat-app",
              live: "https://chat-app-demo.com",
              features: ["Real-time messaging", "Video calls", "File sharing", "End-to-end encryption"],
              duration: "4 months",
            },
            {
              id: "2",
              title: "Task Management Dashboard",
              description:
                "A comprehensive project management tool with Kanban boards, time tracking, team collaboration, and advanced analytics. Includes drag-and-drop functionality and real-time updates.",
              image: "/placeholder.svg?height=300&width=500&text=Task+Dashboard",
              technologies: ["Vue.js", "Express.js", "PostgreSQL", "Redis", "Chart.js"],
              category: "Web Application",
              github: "https://github.com/emenalio/task-manager",
              live: "https://task-manager-demo.com",
              features: ["Kanban boards", "Time tracking", "Team collaboration", "Analytics"],
              duration: "5 months",
            },
            {
              id: "3",
              title: "Cryptocurrency Trading Bot",
              description:
                "An automated trading bot with machine learning algorithms for market prediction. Features include risk management, portfolio optimization, and real-time market analysis.",
              image: "/placeholder.svg?height=300&width=500&text=Trading+Bot",
              technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker"],
              category: "Machine Learning",
              github: "https://github.com/emenalio/crypto-bot",
              features: ["ML predictions", "Risk management", "Portfolio optimization", "Real-time analysis"],
              duration: "8 months",
            },
            {
              id: "4",
              title: "Social Media Analytics Platform",
              description:
                "A comprehensive analytics platform for social media management with sentiment analysis, engagement tracking, and automated reporting features.",
              image: "/placeholder.svg?height=300&width=500&text=Analytics+Platform",
              technologies: ["Angular", "Spring Boot", "MySQL", "Apache Kafka", "D3.js"],
              category: "Data Analytics",
              github: "https://github.com/emenalio/social-analytics",
              live: "https://social-analytics-demo.com",
              features: ["Sentiment analysis", "Engagement tracking", "Automated reports", "Real-time data"],
              duration: "6 months",
            },
            {
              id: "5",
              title: "Mobile Fitness Tracker",
              description:
                "A cross-platform mobile app for fitness tracking with workout plans, nutrition logging, and progress visualization. Includes social features and gamification.",
              image: "/placeholder.svg?height=300&width=500&text=Fitness+Tracker",
              technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
              category: "Mobile Development",
              github: "https://github.com/emenalio/fitness-tracker",
              features: ["Workout tracking", "Nutrition logging", "Social features", "Gamification"],
              duration: "7 months",
            },
            {
              id: "6",
              title: "Cloud Infrastructure Manager",
              description:
                "A DevOps tool for managing cloud infrastructure with automated deployments, monitoring, and cost optimization. Supports multiple cloud providers.",
              image: "/placeholder.svg?height=300&width=500&text=Cloud+Manager",
              technologies: ["Go", "Kubernetes", "Terraform", "Prometheus", "Grafana"],
              category: "DevOps",
              github: "https://github.com/emenalio/cloud-manager",
              features: ["Multi-cloud support", "Auto-scaling", "Cost optimization", "Monitoring"],
              duration: "9 months",
            },
          ],
          skills: {
            frontend: [
              { name: "React", level: 95, years: 5 },
              { name: "Next.js", level: 90, years: 3 },
              { name: "TypeScript", level: 88, years: 4 },
              { name: "Vue.js", level: 85, years: 3 },
              { name: "Angular", level: 80, years: 2 },
              { name: "Svelte", level: 75, years: 1 },
            ],
            backend: [
              { name: "Node.js", level: 92, years: 5 },
              { name: "Python", level: 88, years: 4 },
              { name: "Go", level: 82, years: 2 },
              { name: "Java", level: 78, years: 3 },
              { name: "C#", level: 75, years: 2 },
            ],
            database: [
              { name: "PostgreSQL", level: 90, years: 4 },
              { name: "MongoDB", level: 85, years: 3 },
              { name: "Redis", level: 80, years: 2 },
              { name: "MySQL", level: 88, years: 4 },
            ],
            cloud: [
              { name: "AWS", level: 85, years: 3 },
              { name: "Vercel", level: 92, years: 3 },
              { name: "Docker", level: 88, years: 3 },
              { name: "Kubernetes", level: 75, years: 2 },
            ],
          },
          about: {
            bio: "I'm Emenalio, a passionate full-stack developer with 6+ years of experience building scalable web applications and innovative digital solutions. I specialize in modern JavaScript frameworks, cloud architecture, and creating exceptional user experiences.",
            experience: "6+ years",
            location: "San Francisco, CA",
            email: "emenalio@example.com",
            phone: "+1 (555) 123-4567",
            availability: "Available for freelance projects",
            interests: ["AI/ML", "Open Source", "Mentoring", "Tech Speaking"],
            education: [
              {
                degree: "Master of Science in Computer Science",
                school: "Stanford University",
                year: "2018",
                focus: "Machine Learning & Distributed Systems",
              },
              {
                degree: "Bachelor of Science in Software Engineering",
                school: "UC Berkeley",
                year: "2016",
                focus: "Web Technologies & Database Systems",
              },
            ],
            certifications: [
              "AWS Solutions Architect Professional",
              "Google Cloud Professional Developer",
              "MongoDB Certified Developer",
              "Kubernetes Administrator (CKA)",
            ],
          },
        }
    }
  }

  const portfolioData = getProfileData()

  const renderHome = () => (
    <>
      {/* Featured Project Hero */}
      <div className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${portfolioData.featured.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16">
          <div className="max-w-4xl">
            <Badge className="bg-red-600 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 px-3 py-1">
              {portfolioData.featured.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white">
              {portfolioData.featured.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed max-w-3xl">
              {portfolioData.featured.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {portfolioData.featured.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-gray-800/80 text-white text-xs sm:text-sm px-2 sm:px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Live Demo
              </Button>
              <Button
                variant="outline"
                className="border-gray-400 text-white hover:bg-gray-800/50 px-6 sm:px-8 py-3 text-base sm:text-lg bg-transparent w-full sm:w-auto"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-white">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.projects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setHoveredItem(project.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">{project.title}</h3>
                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 self-start">
                    {project.category}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {project.live && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 bg-transparent text-white hover:bg-gray-800 w-full sm:w-auto"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    View Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  const renderProjects = () => (
    <div className="px-4 sm:px-6 lg:px-16 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-white">All Projects</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
        {portfolioData.projects.map((project) => (
          <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h2>
                <Badge variant="outline" className="border-gray-600 text-gray-300 self-start">
                  {project.category}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">{project.description}</p>
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features?.map((feature, index) => (
                    <li key={index} className="text-gray-400 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-300 text-xs sm:text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="text-sm text-gray-400">Duration: {project.duration}</div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {project.live && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-gray-600 bg-transparent text-white hover:bg-gray-800 w-full sm:w-auto"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSkills = () => (
    <div className="px-4 sm:px-6 lg:px-16 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-white">
        Skills & Expertise
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {Object.entries(portfolioData.skills).map(([category, skills]) => (
          <div key={category} className="bg-gray-900 rounded-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 capitalize text-white">
              {category === "frontend"
                ? "Frontend Development"
                : category === "backend"
                  ? "Backend Development"
                  : category === "database"
                    ? "Database & Storage"
                    : category === "cloud"
                      ? "Cloud & DevOps"
                      : category === "testing"
                        ? "Testing & QA"
                        : category === "tools"
                          ? "QA Tools"
                          : category === "programming"
                            ? "Programming Languages"
                            : category === "methodologies"
                              ? "QA Methodologies"
                              : category === "support"
                                ? "Support Platforms"
                                : category === "technical"
                                  ? "Technical Skills"
                                  : category === "networking"
                                    ? "Networking"
                                    : category === "soft"
                                      ? "Soft Skills"
                                      : category === "analytics"
                                        ? "Analytics & Visualization"
                                        : category === "machine_learning"
                                          ? "Machine Learning"
                                          : category === "big_data"
                                            ? "Big Data Technologies"
                                            : category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                    <span className="font-semibold text-white text-sm sm:text-base">{skill.name}</span>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <span className="text-xs sm:text-sm text-gray-400">{skill.years} years</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="px-4 sm:px-6 lg:px-16 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-white">About Me</h1>

        {/* Bio Section */}
        <div className="bg-gray-900 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Biography</h2>
          <div className="flex items-center mb-4">
            {profileName === "Onyeka" && <Bug className="w-6 h-6 text-red-600 mr-3" />}
            {profileName === "Thelma" && <Shield className="w-6 h-6 text-red-600 mr-3" />}
            {profileName === "Kids" && <BarChart3 className="w-6 h-6 text-red-600 mr-3" />}
            {profileName === "Emenalio" && <User className="w-6 h-6 text-red-600 mr-3" />}
            <Badge className="bg-red-600 text-white">{portfolioData.role}</Badge>
          </div>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">{portfolioData.about.bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-white">
                  <strong>Experience:</strong> {portfolioData.about.experience}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-white">
                  <strong>Location:</strong> {portfolioData.about.location}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-white break-all">
                  <strong>Email:</strong> {portfolioData.about.email}
                </span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-white">
                  <strong>Phone:</strong> {portfolioData.about.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-white">
                  <strong>Status:</strong> {portfolioData.about.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-gray-900 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Education</h2>
          <div className="space-y-4 sm:space-y-6">
            {portfolioData.about.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-red-600 pl-4 sm:pl-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{edu.degree}</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  {edu.school} • {edu.year}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Focus: {edu.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-900 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {portfolioData.about.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                <span className="text-sm sm:text-base text-white">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-gray-900 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Interests</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {portfolioData.about.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-sm"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:text-gray-300">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <h1 className="text-red-600 text-xl sm:text-2xl font-bold tracking-wider">LEIGH</h1>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <button
                onClick={() => setActiveSection("home")}
                className={`hover:text-gray-300 transition-colors ${activeSection === "home" ? "text-white font-semibold" : "text-gray-400"}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveSection("projects")}
                className={`hover:text-gray-300 transition-colors ${activeSection === "projects" ? "text-white font-semibold" : "text-gray-400"}`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveSection("skills")}
                className={`hover:text-gray-300 transition-colors ${activeSection === "skills" ? "text-white font-semibold" : "text-gray-400"}`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveSection("about")}
                className={`hover:text-gray-300 transition-colors ${activeSection === "about" ? "text-white font-semibold" : "text-gray-400"}`}
              >
                About
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-gray-300 transition-colors" />
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-gray-300 transition-colors" />
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs sm:text-sm hidden sm:inline">{profileName}</span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <nav className="flex flex-col space-y-2 p-4">
              <button
                onClick={() => {
                  setActiveSection("home")
                  setMobileMenuOpen(false)
                }}
                className={`text-left py-2 px-3 rounded hover:bg-gray-800 transition-colors ${activeSection === "home" ? "text-white font-semibold bg-gray-800" : "text-gray-400"}`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveSection("projects")
                  setMobileMenuOpen(false)
                }}
                className={`text-left py-2 px-3 rounded hover:bg-gray-800 transition-colors ${activeSection === "projects" ? "text-white font-semibold bg-gray-800" : "text-gray-400"}`}
              >
                Projects
              </button>
              <button
                onClick={() => {
                  setActiveSection("skills")
                  setMobileMenuOpen(false)
                }}
                className={`text-left py-2 px-3 rounded hover:bg-gray-800 transition-colors ${activeSection === "skills" ? "text-white font-semibold bg-gray-800" : "text-gray-400"}`}
              >
                Skills
              </button>
              <button
                onClick={() => {
                  setActiveSection("about")
                  setMobileMenuOpen(false)
                }}
                className={`text-left py-2 px-3 rounded hover:bg-gray-800 transition-colors ${activeSection === "about" ? "text-white font-semibold bg-gray-800" : "text-gray-400"}`}
              >
                About
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="pt-16 sm:pt-20">
        {activeSection === "home" && renderHome()}
        {activeSection === "projects" && renderProjects()}
        {activeSection === "skills" && renderSkills()}
        {activeSection === "about" && renderAbout()}
      </div>
    </div>
  )
}
