"use client"

export interface UserProfile {
  id: string
  name: string
  email: string
  age?: number
  gender?: string
  city?: string
  bio?: string
  interests?: string[]
  profileImage?: string
  onboarding_completed: boolean
  skills?: string[]
  primarySkill?: string
  domainPreference?: string
}

export interface DiscoveryUser {
  id: string
  name: string
  age: number
  gender: string
  city: string
  bio: string
  interests: string[]
  category: string
  profileImage: string
  rating: number
  skills: string[]
  primarySkill: string
  domainPreference: string
}

const USERS_STORAGE_KEY = "teamforge_users"
const CURRENT_USER_STORAGE_KEY = "teamforge_current_user"
const ACCEPTED_PROFILES_KEY = "teamforge_accepted"
const REJECTED_PROFILES_KEY = "teamforge_rejected"

const DISCOVERY_USERS: DiscoveryUser[] = [
  {
    id: "user_1",
    name: "Arjun Sharma",
    age: 26,
    gender: "Male",
    city: "Mumbai",
    bio: "Full-stack developer passionate about web technologies and open source. 5 years of experience in building scalable applications.",
    interests: ["Web Development", "Audio Design", "Electronic Music", "Sound Design"],
    category: "Development",
    profileImage: "/indian-musician-arjun.jpg",
    rating: 4.8,
    skills: ["React", "Node.js", "Python", "MongoDB"],
    primarySkill: "Backend",
    domainPreference: "Backend",
  },
  {
    id: "user_2",
    name: "Priya Kapoor",
    age: 24,
    gender: "Female",
    city: "Delhi",
    bio: "UI/UX Designer with expertise in creating beautiful digital experiences. Passionate about design systems and accessibility.",
    interests: ["Dance", "Choreography", "Contemporary", "Classical Dance"],
    category: "Design",
    profileImage: "/indian-dancer-priya.jpg",
    rating: 4.9,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    primarySkill: "Design",
    domainPreference: "Design",
  },
  {
    id: "user_3",
    name: "Rajesh Kumar",
    age: 28,
    gender: "Male",
    city: "Bangalore",
    bio: "Frontend Engineer specializing in React and modern JavaScript. Love creating interactive and performant web applications.",
    interests: ["Web Development", "React", "Node.js", "Open Source"],
    category: "Development",
    profileImage: "/indian-developer-rajesh.jpg",
    rating: 4.7,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    primarySkill: "Frontend",
    domainPreference: "Frontend",
  },
  {
    id: "user_4",
    name: "Sneha Patel",
    age: 25,
    gender: "Female",
    city: "Ahmedabad",
    bio: "Product Designer with 3 years of experience. Expert in building intuitive user interfaces and conducting UX research.",
    interests: ["UI Design", "UX Research", "Prototyping", "Design Systems"],
    category: "Design",
    profileImage: "/indian-designer-sneha.jpg",
    rating: 4.8,
    skills: ["UI Design", "Wireframing", "CSS", "JavaScript"],
    primarySkill: "Design",
    domainPreference: "Design",
  },
  {
    id: "user_5",
    name: "Vikram Singh",
    age: 27,
    gender: "Male",
    city: "Pune",
    bio: "ML Engineer with passion for AI/ML projects. Experienced with TensorFlow, PyTorch, and building machine learning models.",
    interests: ["Digital Art", "Illustration", "Concept Art", "Animation"],
    category: "Development",
    profileImage: "/indian-artist-vikram.jpg",
    rating: 4.6,
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
    primarySkill: "AI/ML",
    domainPreference: "AI/ML",
  },
  {
    id: "user_6",
    name: "Ananya Gupta",
    age: 26,
    gender: "Female",
    city: "Hyderabad",
    bio: "DevOps Engineer with expertise in cloud infrastructure. Proficient in AWS, Docker, Kubernetes, and CI/CD pipelines.",
    interests: ["Content Writing", "Storytelling", "Copywriting", "Social Media"],
    category: "Development",
    profileImage: "/indian-writer-ananya.jpg",
    rating: 4.7,
    skills: ["AWS", "Docker", "Kubernetes", "Linux"],
    primarySkill: "DevOps",
    domainPreference: "DevOps",
  },
  {
    id: "user_7",
    name: "Nikhil Desai",
    age: 29,
    gender: "Male",
    city: "Chennai",
    bio: "React Native Developer building cross-platform mobile applications. Experienced with iOS and Android development.",
    interests: ["Business Strategy", "Startups", "Marketing", "Growth Hacking"],
    category: "Development",
    profileImage: "/indian-entrepreneur-nikhil.jpg",
    rating: 4.5,
    skills: ["React Native", "Swift", "Java", "Firebase"],
    primarySkill: "Mobile",
    domainPreference: "Mobile",
  },
  {
    id: "user_8",
    name: "Divya Sharma",
    age: 24,
    gender: "Female",
    city: "Kolkata",
    bio: "Visual Designer and creative director. Specialized in branding, visual identity, and creating compelling visual narratives.",
    interests: ["Photography", "Photo Editing", "Visual Storytelling", "Portfolio"],
    category: "Design",
    profileImage: "/indian-photographer-divya.jpg",
    rating: 4.8,
    skills: ["Graphic Design", "Adobe Creative Suite", "Figma", "Branding"],
    primarySkill: "Design",
    domainPreference: "Design",
  },
  {
    id: "user_9",
    name: "Arun Nair",
    age: 25,
    gender: "Male",
    city: "Kochi",
    bio: "Backend Engineer with expertise in microservices and scalable systems. Proficient in Java and Spring Boot.",
    interests: ["Classical Music", "Sitar", "Music Teaching", "Raag"],
    category: "Development",
    profileImage: "/indian-classical-musician-arun.jpg",
    rating: 4.9,
    skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
    primarySkill: "Backend",
    domainPreference: "Backend",
  },
  {
    id: "user_10",
    name: "Pooja Reddy",
    age: 27,
    gender: "Female",
    city: "Indore",
    bio: "Full-stack developer with 6 years of experience. Passionate about building end-to-end solutions with modern tech stack.",
    interests: ["Graphic Design", "Branding", "Logo Design", "Print Design"],
    category: "Development",
    profileImage: "/indian-graphic-designer-pooja.jpg",
    rating: 4.7,
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    primarySkill: "Frontend",
    domainPreference: "Frontend",
  },
]

export const authUtils = {
  getAllUsers: (): UserProfile[] => {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  },

  register: (email: string, password: string, name: string): { success: boolean; error?: string } => {
    if (typeof window === "undefined") return { success: false, error: "Client-side only" }

    const users = authUtils.getAllUsers()

    if (users.some((u) => u.email === email)) {
      return { success: false, error: "Email already registered" }
    }

    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      name,
      email,
      onboarding_completed: false,
    }

    users.push(newUser)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser))

    return { success: true }
  },

  login: (email: string, password: string): { success: boolean; error?: string; onboarding_completed?: boolean } => {
    if (typeof window === "undefined") return { success: false, error: "Client-side only" }

    const users = authUtils.getAllUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      return { success: false, error: "User not found" }
    }

    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user))
    return { success: true, onboarding_completed: user.onboarding_completed }
  },

  getCurrentUser: (): UserProfile | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
    return user ? JSON.parse(user) : null
  },

  updateProfile: (updates: Partial<UserProfile>): { success: boolean; error?: string } => {
    if (typeof window === "undefined") return { success: false, error: "Client-side only" }

    const currentUser = authUtils.getCurrentUser()
    if (!currentUser) return { success: false, error: "No user logged in" }

    const users = authUtils.getAllUsers()
    const userIndex = users.findIndex((u) => u.id === currentUser.id)

    if (userIndex === -1) return { success: false, error: "User not found" }

    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedUser))

    return { success: true }
  },

  logout: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
  },

  getDiscoveryUsers: (): DiscoveryUser[] => {
    return DISCOVERY_USERS
  },

  acceptProfile: (userId: string): void => {
    if (typeof window === "undefined") return
    const accepted = JSON.parse(localStorage.getItem(ACCEPTED_PROFILES_KEY) || "[]")
    if (!accepted.includes(userId)) {
      accepted.push(userId)
      localStorage.setItem(ACCEPTED_PROFILES_KEY, JSON.stringify(accepted))
    }
  },

  rejectProfile: (userId: string): void => {
    if (typeof window === "undefined") return
    const rejected = JSON.parse(localStorage.getItem(REJECTED_PROFILES_KEY) || "[]")
    if (!rejected.includes(userId)) {
      rejected.push(userId)
      localStorage.setItem(REJECTED_PROFILES_KEY, JSON.stringify(rejected))
    }
  },

  getAcceptedProfiles: (): string[] => {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem(ACCEPTED_PROFILES_KEY) || "[]")
  },

  getRejectedProfiles: (): string[] => {
    if (typeof window === "undefined") return []
    return JSON.parse(localStorage.getItem(REJECTED_PROFILES_KEY) || "[]")
  },

  getDiscoveryUsersBySkill: (skill: string): DiscoveryUser[] => {
    if (!skill) return DISCOVERY_USERS
    return DISCOVERY_USERS.filter(
      (user) =>
        user.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())) ||
        user.domainPreference.toLowerCase().includes(skill.toLowerCase()),
    )
  },

  getAllSkills: (): string[] => {
    const skillsSet = new Set<string>()
    DISCOVERY_USERS.forEach((user) => {
      user.skills.forEach((skill) => skillsSet.add(skill))
      skillsSet.add(user.domainPreference)
    })
    return Array.from(skillsSet).sort()
  },

  getDomainPreferences: (): string[] => {
    return ["Frontend", "Backend", "Design", "AI/ML", "DevOps", "Mobile"]
  },
}
