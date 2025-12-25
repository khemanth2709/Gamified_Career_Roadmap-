// Career Roadmaps Data
const careerRoadmaps = {
    'frontend-developer': {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        icon: 'fas fa-code',
        description: 'Build interactive user interfaces and web applications',
        color: '#4361ee',
        totalSkills: 12,
        sections: [
            {
                id: 'basics',
                title: 'Basics Foundation',
                skills: [
                    {
                        id: 'html',
                        title: 'HTML & Semantic Structure',
                        description: 'Master HTML5 tags, semantic elements, accessibility',
                        category: 'Core',
                        xp: 10,
                        resources: [
                            'MDN HTML Guide',
                            'HTML5 Doctor'
                        ]
                    },
                    {
                        id: 'css',
                        title: 'CSS & Responsive Design',
                        description: 'Flexbox, Grid, media queries, CSS variables',
                        category: 'Core',
                        xp: 10,
                        resources: [
                            'CSS-Tricks',
                            'Flexbox Froggy'
                        ]
                    },
                    {
                        id: 'js-basics',
                        title: 'JavaScript Fundamentals',
                        description: 'Variables, functions, DOM manipulation, ES6+',
                        category: 'Core',
                        xp: 15,
                        resources: [
                            'JavaScript.info',
                            'Eloquent JavaScript'
                        ]
                    }
                ]
            },
            {
                id: 'core',
                title: 'Core Development',
                skills: [
                    {
                        id: 'git',
                        title: 'Git & Version Control',
                        description: 'Git commands, branching, pull requests, GitHub',
                        category: 'Tool',
                        xp: 10,
                        resources: [
                            'Git Handbook',
                            'GitHub Learning Lab'
                        ]
                    },
                    {
                        id: 'responsive',
                        title: 'Advanced Responsive Design',
                        description: 'Mobile-first approach, CSS frameworks, breakpoints',
                        category: 'CSS',
                        xp: 15,
                        resources: [
                            'Responsive Design Patterns',
                            'Bootstrap Documentation'
                        ]
                    },
                    {
                        id: 'js-advanced',
                        title: 'Advanced JavaScript',
                        description: 'Async/await, promises, APIs, modules',
                        category: 'JavaScript',
                        xp: 20,
                        resources: [
                            'You Don\'t Know JS',
                            'JavaScript30'
                        ]
                    }
                ]
            },
            {
                id: 'frameworks',
                title: 'Frameworks & Tools',
                skills: [
                    {
                        id: 'react',
                        title: 'React.js',
                        description: 'Components, hooks, state management, routing',
                        category: 'Framework',
                        xp: 25,
                        resources: [
                            'React Documentation',
                            'React Patterns'
                        ]
                    },
                    {
                        id: 'vue',
                        title: 'Vue.js',
                        description: 'Vue components, Vuex, Vue Router',
                        category: 'Framework',
                        xp: 20,
                        resources: [
                            'Vue.js Guide',
                            'Vue Mastery'
                        ]
                    },
                    {
                        id: 'testing',
                        title: 'Testing & Debugging',
                        description: 'Jest, React Testing Library, DevTools',
                        category: 'Tool',
                        xp: 15,
                        resources: [
                            'Testing Library Docs',
                            'Chrome DevTools'
                        ]
                    }
                ]
            },
            {
                id: 'advanced',
                title: 'Advanced Topics',
                skills: [
                    {
                        id: 'performance',
                        title: 'Web Performance',
                        description: 'Optimization, lazy loading, Core Web Vitals',
                        category: 'Advanced',
                        xp: 20,
                        resources: [
                            'Web.dev',
                            'Google Lighthouse'
                        ]
                    },
                    {
                        id: 'accessibility',
                        title: 'Web Accessibility',
                        description: 'WCAG, ARIA, screen readers, keyboard navigation',
                        category: 'Advanced',
                        xp: 15,
                        resources: [
                            'A11Y Project',
                            'W3C WAI'
                        ]
                    },
                    {
                        id: 'typescript',
                        title: 'TypeScript',
                        description: 'Static typing, interfaces, generics',
                        category: 'Advanced',
                        xp: 25,
                        resources: [
                            'TypeScript Handbook',
                            'TypeScript Deep Dive'
                        ]
                    }
                ]
            }
        ]
    },
    'backend-developer': {
        id: 'backend-developer',
        title: 'Backend Developer',
        icon: 'fas fa-server',
        description: 'Build server-side logic, APIs, and databases',
        color: '#3a0ca3',
        totalSkills: 12,
        sections: [
            {
                id: 'basics',
                title: 'Backend Foundation',
                skills: [
                    {
                        id: 'nodejs',
                        title: 'Node.js & Runtime',
                        description: 'Node.js fundamentals, NPM, event loop',
                        category: 'Core',
                        xp: 15,
                        resources: [
                            'Node.js Docs',
                            'Node School'
                        ]
                    },
                    {
                        id: 'javascript',
                        title: 'JavaScript on Server',
                        description: 'ES6+, modules, error handling',
                        category: 'Core',
                        xp: 10,
                        resources: [
                            'Node Patterns',
                            'Best Practices'
                        ]
                    },
                    {
                        id: 'git-backend',
                        title: 'Git for Backend',
                        description: 'Version control, collaboration workflows',
                        category: 'Tool',
                        xp: 10,
                        resources: [
                            'Git Workflows',
                            'GitHub Actions'
                        ]
                    }
                ]
            },
            {
                id: 'databases',
                title: 'Databases',
                skills: [
                    {
                        id: 'sql',
                        title: 'SQL & Relational DBs',
                        description: 'PostgreSQL/MySQL, queries, optimization',
                        category: 'Database',
                        xp: 20,
                        resources: [
                            'SQL Bolt',
                            'PostgreSQL Docs'
                        ]
                    },
                    {
                        id: 'nosql',
                        title: 'NoSQL Databases',
                        description: 'MongoDB, document modeling, aggregation',
                        category: 'Database',
                        xp: 20,
                        resources: [
                            'MongoDB University',
                            'Mongoose Docs'
                        ]
                    },
                    {
                        id: 'orm',
                        title: 'ORM & ODMs',
                        description: 'Prisma, Mongoose, query building',
                        category: 'Database',
                        xp: 15,
                        resources: [
                            'Prisma Docs',
                            'Sequelize Guide'
                        ]
                    }
                ]
            },
            {
                id: 'apis',
                title: 'APIs & Architecture',
                skills: [
                    {
                        id: 'rest',
                        title: 'RESTful APIs',
                        description: 'Design principles, endpoints, HTTP methods',
                        category: 'API',
                        xp: 20,
                        resources: [
                            'REST API Tutorial',
                            'API Design Guide'
                        ]
                    },
                    {
                        id: 'graphql',
                        title: 'GraphQL',
                        description: 'Schemas, resolvers, Apollo/Relay',
                        category: 'API',
                        xp: 25,
                        resources: [
                            'GraphQL Docs',
                            'How to GraphQL'
                        ]
                    },
                    {
                        id: 'authentication',
                        title: 'Authentication & Security',
                        description: 'JWT, OAuth, bcrypt, security best practices',
                        category: 'Security',
                        xp: 20,
                        resources: [
                            'JWT.io',
                            'OWASP Guide'
                        ]
                    }
                ]
            },
            {
                id: 'deployment',
                title: 'Deployment & DevOps',
                skills: [
                    {
                        id: 'docker',
                        title: 'Docker & Containers',
                        description: 'Dockerfiles, containers, Docker Compose',
                        category: 'DevOps',
                        xp: 20,
                        resources: [
                            'Docker Get Started',
                            'Docker Handbook'
                        ]
                    },
                    {
                        id: 'cloud',
                        title: 'Cloud Platforms',
                        description: 'AWS/Azure/GCP, serverless, scaling',
                        category: 'DevOps',
                        xp: 25,
                        resources: [
                            'AWS Free Tier',
                            'Serverless Framework'
                        ]
                    },
                    {
                        id: 'cicd',
                        title: 'CI/CD Pipeline',
                        description: 'GitHub Actions, Jenkins, deployment automation',
                        category: 'DevOps',
                        xp: 20,
                        resources: [
                            'GitHub Actions Docs',
                            'CI/CD Best Practices'
                        ]
                    }
                ]
            }
        ]
    },
    'data-analyst': {
        id: 'data-analyst',
        title: 'Data Analyst',
        icon: 'fas fa-chart-bar',
        description: 'Analyze data to uncover insights and support decision-making',
        color: '#4cc9f0',
        totalSkills: 12,
        sections: [
            {
                id: 'foundation',
                title: 'Data Foundation',
                skills: [
                    {
                        id: 'excel',
                        title: 'Excel & Spreadsheets',
                        description: 'Formulas, pivot tables, data cleaning',
                        category: 'Tool',
                        xp: 10,
                        resources: [
                            'Excel Jet',
                            'Microsoft Learn'
                        ]
                    },
                    {
                        id: 'sql-analysis',
                        title: 'SQL for Analysis',
                        description: 'Complex queries, joins, window functions',
                        category: 'Database',
                        xp: 15,
                        resources: [
                            'Mode SQL Tutorial',
                            'SQLZoo'
                        ]
                    },
                    {
                        id: 'stats',
                        title: 'Statistics Fundamentals',
                        description: 'Probability, distributions, hypothesis testing',
                        category: 'Math',
                        xp: 20,
                        resources: [
                            'Khan Academy Stats',
                            'StatQuest'
                        ]
                    }
                ]
            },
            {
                id: 'programming',
                title: 'Programming & Analysis',
                skills: [
                    {
                        id: 'python',
                        title: 'Python for Data',
                        description: 'Pandas, NumPy, data manipulation',
                        category: 'Programming',
                        xp: 20,
                        resources: [
                            'Python Data Science Handbook',
                            'Real Python'
                        ]
                    },
                    {
                        id: 'r',
                        title: 'R Programming',
                        description: 'Tidyverse, ggplot2, statistical modeling',
                        category: 'Programming',
                        xp: 15,
                        resources: [
                            'R for Data Science',
                            'Swirl R'
                        ]
                    },
                    {
                        id: 'cleaning',
                        title: 'Data Cleaning',
                        description: 'Missing values, outliers, normalization',
                        category: 'Process',
                        xp: 15,
                        resources: [
                            'Data Cleaning Checklist',
                            'OpenRefine'
                        ]
                    }
                ]
            },
            {
                id: 'visualization',
                title: 'Visualization & Tools',
                skills: [
                    {
                        id: 'tableau',
                        title: 'Tableau / Power BI',
                        description: 'Dashboards, visualizations, business intelligence',
                        category: 'Tool',
                        xp: 20,
                        resources: [
                            'Tableau Public',
                            'Microsoft Power BI'
                        ]
                    },
                    {
                        id: 'python-viz',
                        title: 'Python Visualization',
                        description: 'Matplotlib, Seaborn, Plotly',
                        category: 'Programming',
                        xp: 15,
                        resources: [
                            'Matplotlib Tutorials',
                            'Seaborn Gallery'
                        ]
                    },
                    {
                        id: 'dashboard',
                        title: 'Dashboard Design',
                        description: 'UX principles, KPI selection, storytelling',
                        category: 'Design',
                        xp: 15,
                        resources: [
                            'Storytelling with Data',
                            'Dashboard Design Patterns'
                        ]
                    }
                ]
            },
            {
                id: 'advanced',
                title: 'Advanced Analytics',
                skills: [
                    {
                        id: 'machine-learning',
                        title: 'Machine Learning Basics',
                        description: 'Regression, classification, clustering',
                        category: 'Advanced',
                        xp: 25,
                        resources: [
                            'Scikit-learn Tutorials',
                            'Machine Learning Crash Course'
                        ]
                    },
                    {
                        id: 'big-data',
                        title: 'Big Data Tools',
                        description: 'Spark, Hadoop, distributed computing',
                        category: 'Advanced',
                        xp: 25,
                        resources: [
                            'Apache Spark Docs',
                            'Databricks Learning'
                        ]
                    },
                    {
                        id: 'communication',
                        title: 'Data Storytelling',
                        description: 'Presenting insights, report writing, stakeholder communication',
                        category: 'Soft Skill',
                        xp: 15,
                        resources: [
                            'Data Storytelling Guide',
                            'Effective Data Visualization'
                        ]
                    }
                ]
            }
        ]
    },
    'ui-ux-designer': {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        icon: 'fas fa-palette',
        description: 'Design intuitive user interfaces and experiences',
        color: '#f72585',
        totalSkills: 12,
        sections: [
            {
                id: 'foundation',
                title: 'Design Foundation',
                skills: [
                    {
                        id: 'design-principles',
                        title: 'Design Principles',
                        description: 'Balance, contrast, hierarchy, alignment',
                        category: 'Theory',
                        xp: 15,
                        resources: [
                            'Design Principles',
                            'Gestalt Principles'
                        ]
                    },
                    {
                        id: 'color-theory',
                        title: 'Color Theory',
                        description: 'Color psychology, palettes, accessibility',
                        category: 'Theory',
                        xp: 15,
                        resources: [
                            'Color in UI Design',
                            'Color Hunt'
                        ]
                    },
                    {
                        id: 'typography',
                        title: 'Typography',
                        description: 'Type pairing, hierarchy, readability',
                        category: 'Theory',
                        xp: 10,
                        resources: [
                            'Typewolf',
                            'Google Fonts Pairings'
                        ]
                    }
                ]
            },
            {
                id: 'tools',
                title: 'Design Tools',
                skills: [
                    {
                        id: 'figma',
                        title: 'Figma',
                        description: 'Components, prototyping, design systems',
                        category: 'Tool',
                        xp: 20,
                        resources: [
                            'Figma Tutorials',
                            'Figma Community'
                        ]
                    },
                    {
                        id: 'adobe-xd',
                        title: 'Adobe XD',
                        description: 'Wireframing, prototyping, UI kits',
                        category: 'Tool',
                        xp: 15,
                        resources: [
                            'Adobe XD Learn',
                            'UI Kits'
                        ]
                    },
                    {
                        id: 'sketch',
                        title: 'Sketch',
                        description: 'Vector editing, symbols, export options',
                        category: 'Tool',
                        xp: 15,
                        resources: [
                            'Sketch Handbook',
                            'Sketch App Sources'
                        ]
                    }
                ]
            },
            {
                id: 'ux-process',
                title: 'UX Process',
                skills: [
                    {
                        id: 'research',
                        title: 'User Research',
                        description: 'Interviews, surveys, personas, empathy maps',
                        category: 'Research',
                        xp: 20,
                        resources: [
                            'NN/g Articles',
                            'User Research Methods'
                        ]
                    },
                    {
                        id: 'wireframing',
                        title: 'Wireframing & Prototyping',
                        description: 'Low-fidelity to high-fidelity, interactive prototypes',
                        category: 'Process',
                        xp: 15,
                        resources: [
                            'Wireframing Guide',
                            'Prototyping Tools'
                        ]
                    },
                    {
                        id: 'testing',
                        title: 'Usability Testing',
                        description: 'Test planning, moderation, analysis',
                        category: 'Research',
                        xp: 20,
                        resources: [
                            'Usability Testing Guide',
                            'UserTesting.com'
                        ]
                    }
                ]
            },
            {
                id: 'advanced',
                title: 'Advanced Design',
                skills: [
                    {
                        id: 'design-systems',
                        title: 'Design Systems',
                        description: 'Component libraries, tokens, documentation',
                        category: 'Advanced',
                        xp: 25,
                        resources: [
                            'Design Systems Repo',
                            'Atomic Design'
                        ]
                    },
                    {
                        id: 'motion',
                        title: 'Motion Design',
                        description: 'Micro-interactions, animations, transitions',
                        category: 'Advanced',
                        xp: 20,
                        resources: [
                            'Principles of Animation',
                            'Lottie Files'
                        ]
                    },
                    {
                        id: 'accessibility-design',
                        title: 'Accessibility in Design',
                        description: 'WCAG, inclusive design, assistive tech',
                        category: 'Advanced',
                        xp: 15,
                        resources: [
                            'Inclusive Components',
                            'A11y Project'
                        ]
                    }
                ]
            }
        ]
    }
};

// Get all career paths
function getAllCareers() {
    return Object.values(careerRoadmaps);
}

// Get specific career by ID
function getCareerById(careerId) {
    return careerRoadmaps[careerId];
}

// Calculate total XP for a career
function calculateCareerTotalXP(careerId) {
    const career = getCareerById(careerId);
    if (!career) return 0;
    
    let totalXP = 0;
    career.sections.forEach(section => {
        section.skills.forEach(skill => {
            totalXP += skill.xp;
        });
    });
    return totalXP;
}

// Get career statistics
function getCareerStats(careerId) {
    const career = getCareerById(careerId);
    if (!career) return null;
    
    const stats = {
        totalSkills: 0,
        totalSections: career.sections.length,
        totalXP: 0,
        categories: new Set()
    };
    
    career.sections.forEach(section => {
        stats.totalSkills += section.skills.length;
        section.skills.forEach(skill => {
            stats.totalXP += skill.xp;
            stats.categories.add(skill.category);
        });
    });
    
    return stats;
}

// Sample function to get career completion data
function getCareerCompletionData(careerId, completedSkills = []) {
    const career = getCareerById(careerId);
    if (!career) return null;
    
    const completionData = {
        careerId: careerId,
        totalSkills: 0,
        completedSkills: 0,
        sectionProgress: {},
        totalXP: 0,
        earnedXP: 0
    };
    
    career.sections.forEach(section => {
        const sectionSkills = section.skills.length;
        const completedSectionSkills = section.skills.filter(skill => 
            completedSkills.includes(skill.id)
        ).length;
        
        completionData.totalSkills += sectionSkills;
        completionData.completedSkills += completedSectionSkills;
        completionData.sectionProgress[section.id] = {
            total: sectionSkills,
            completed: completedSectionSkills,
            percentage: Math.round((completedSectionSkills / sectionSkills) * 100)
        };
        
        // Calculate XP
        section.skills.forEach(skill => {
            completionData.totalXP += skill.xp;
            if (completedSkills.includes(skill.id)) {
                completionData.earnedXP += skill.xp;
            }
        });
    });
    
    completionData.overallPercentage = completionData.totalSkills > 0 ? 
        Math.round((completionData.completedSkills / completionData.totalSkills) * 100) : 0;
    
    return completionData;
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = { careerRoadmaps, getAllCareers, getCareerById, calculateCareerTotalXP, getCareerStats, getCareerCompletionData };
}