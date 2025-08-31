function defineCareerPaths() {
    const careerPaths = {
        // --- Tech ---
        "Software Engineer": {
            description: "Build, test, and maintain software applications and systems.",
            tags: ["Programming", "Problem Solving", "Logic"],
            interests: { "AI & Data Science": 3, "Gaming": 2, "Science & Research": 1 },
            strengths: { "Problem Solving": 3, "Tech Savviness": 3, "Logic": 2, "Organization": 1 },
            personality: { "The Innovator": 3, "The Thinker": 2, "The Organizer": 1 }
        },
        "Data Scientist": {
            description: "Analyze complex data to extract meaningful insights and predict trends.",
            tags: ["Analytics", "Statistics", "Machine Learning"],
            interests: { "AI & Data Science": 3, "Science & Research": 2, "Finance & Economics": 2 },
            strengths: { "Research & Analysis": 3, "Statistics": 3, "Problem Solving": 2, "Tech Savviness": 1 },
            personality: { "The Thinker": 3, "The Innovator": 2, "The Explorer": 1 }
        },
        "Product Manager": {
            description: "Guide the success of a product and lead the cross-functional team that is responsible for improving it.",
            tags: ["Leadership", "Strategy", "Communication"],
            interests: { "Business & Entrepreneurship": 3, "Design & Creativity": 2, "Marketing & Advertising": 1 },
            strengths: { "Leadership": 3, "Strategic Thinking": 3, "Communication": 2, "Organization": 1 },
            personality: { "The Leader": 3, "The Organizer": 2, "The Speaker": 1 }
        },
        "IT Support Specialist": {
            description: "Provide technical assistance and troubleshooting for computer systems.",
            tags: ["Problem Solving", "Customer Service", "Tech Savvy"],
            interests: { "Tech Savviness": 3, "Helping Others": 2 },
            strengths: { "Problem Solving": 3, "Patience": 3, "Communication": 2, "Active Listening": 1 },
            personality: { "The Helper": 3, "The Thinker": 1 }
        },

        // --- Creative ---
        "UX/UI Designer": {
            description: "Create user-friendly and visually appealing interfaces for digital products.",
            tags: ["Design Thinking", "Empathy", "Creativity"],
            interests: { "Design & Creativity": 3, "Psychology & Sociology": 2, "Content Creation": 1 },
            strengths: { "Empathy": 3, "Creativity": 3, "Research & Analysis": 2, "Attention to Detail": 1 },
            personality: { "The Dreamer": 3, "The Helper": 2, "The Thinker": 1 }
        },
        "Graphic Designer": {
            description: "Create visual concepts to communicate ideas that inspire and inform.",
            tags: ["Creativity", "Art", "Visual Communication"],
            interests: { "Design & Creativity": 3, "Arts & Entertainment": 2, "Marketing & Advertising": 1 },
            strengths: { "Creativity": 3, "Attention to Detail": 3, "Tech Savviness": 2 },
            personality: { "The Dreamer": 3, "The Innovator": 1 }
        },
        "Content Creator / YouTuber": {
            description: "Produce entertaining or educational material for online audiences.",
            tags: ["Video Production", "Creativity", "Social Media"],
            interests: { "Content Creation": 3, "Arts & Entertainment": 2, "Marketing & Advertising": 1, "Gaming": 1 },
            strengths: { "Creativity": 3, "Public Speaking": 2, "Tech Savviness": 2, "Communication": 1 },
            personality: { "The Speaker": 3, "The Dreamer": 2, "The Explorer": 1 }
        },
        "Architect": {
            description: "Plan and design buildings and other structures.",
            tags: ["Design", "Mathematics", "Project Management"],
            interests: { "Design & Creativity": 3, "Construction & Infrastructure": 3 },
            strengths: { "Problem Solving": 3, "Creativity": 2, "Attention to Detail": 2, "Logic": 1 },
            personality: { "The Innovator": 3, "The Organizer": 2, "The Thinker": 1 }
        },

        // --- Business & Finance ---
        "Marketing Manager": {
            description: "Develop and implement marketing strategies to promote a brand.",
            tags: ["Communication", "Creativity", "Analytics"],
            interests: { "Marketing & Advertising": 3, "Content Creation": 2, "Psychology & Sociology": 1 },
            strengths: { "Communication": 3, "Creativity": 2, "Research & Analysis": 2, "Strategic Thinking": 1 },
            personality: { "The Speaker": 3, "The Organizer": 2, "The Leader": 1 }
        },
        "Financial Analyst": {
            description: "Analyze financial data to help companies make business decisions.",
            tags: ["Finance", "Statistics", "Problem Solving"],
            interests: { "Finance & Economics": 3, "Business & Entrepreneurship": 2 },
            strengths: { "Statistics": 3, "Research & Analysis": 3, "Attention to Detail": 2, "Problem Solving": 1 },
            personality: { "The Thinker": 3, "The Organizer": 1 }
        },
        "Human Resources Manager": {
            description: "Oversee employee relations, recruitment, and administrative functions.",
            tags: ["Communication", "Empathy", "Organization"],
            interests: { "Helping Others": 3, "Business & Entrepreneurship": 2, "Psychology & Sociology": 1 },
            strengths: { "Empathy": 3, "Communication": 3, "Organization": 2, "Active Listening": 1 },
            personality: { "The Helper": 3, "The Organizer": 2, "The Speaker": 1 }
        },
        "Sales Director": {
            description: "Lead sales teams to meet revenue goals and grow the business.",
            tags: ["Leadership", "Negotiation", "Communication"],
            interests: { "Business & Entrepreneurship": 3, "Marketing & Advertising": 2 },
            strengths: { "Communication": 3, "Negotiation": 3, "Leadership": 2, "Public Speaking": 1 },
            personality: { "The Leader": 3, "The Speaker": 2 }
        },
        "Project Manager": {
            description: "Plan, execute, and oversee projects to ensure they are completed on time and within budget.",
            tags: ["Organization", "Leadership", "Problem Solving"],
            interests: { "Business & Entrepreneurship": 3, "Organization": 3 },
            strengths: { "Organization": 3, "Leadership": 3, "Communication": 2, "Problem Solving": 1 },
            personality: { "The Organizer": 3, "The Leader": 2 }
        },

        // --- Healthcare ---
        "Doctor / Physician": {
            description: "Diagnose and treat human diseases, ailments, and injuries.",
            tags: ["Medicine", "Problem Solving", "Empathy"],
            interests: { "Healthcare & Medicine": 3, "Science & Research": 2, "Helping Others": 1 },
            strengths: { "Problem Solving": 3, "Empathy": 2, "Attention to Detail": 2, "Active Listening": 1 },
            personality: { "The Helper": 3, "The Thinker": 2, "The Leader": 1 }
        },
        "Nurse": {
            description: "Provide and coordinate patient care, educate patients, and provide advice and emotional support.",
            tags: ["Healthcare", "Empathy", "Patience"],
            interests: { "Healthcare & Medicine": 3, "Helping Others": 3 },
            strengths: { "Empathy": 3, "Patience": 3, "Organization": 2, "Active Listening": 1 },
            personality: { "The Helper": 3, "The Organizer": 1 }
        },
        "Psychologist / Therapist": {
            description: "Help people cope with mental health issues and life challenges.",
            tags: ["Mental Health", "Empathy", "Communication"],
            interests: { "Psychology & Sociology": 3, "Healthcare & Medicine": 2, "Helping Others": 1 },
            strengths: { "Active Listening": 3, "Empathy": 3, "Communication": 2, "Research & Analysis": 1 },
            personality: { "The Helper": 3, "The Thinker": 2 }
        },
        "Veterinarian": {
            description: "Care for the health of animals by diagnosing, treating, and researching medical conditions.",
            tags: ["Animals", "Medicine", "Problem Solving"],
            interests: { "Healthcare & Medicine": 3, "Science & Research": 2, "Helping Others": 2 },
            strengths: { "Empathy": 3, "Problem Solving": 3, "Attention to Detail": 2, "Patience": 1 },
            personality: { "The Helper": 3, "The Thinker": 2 }
        },

        // --- Engineering & Science ---
        "Civil Engineer": {
            description: "Design, build, and supervise infrastructure projects such as roads, buildings, and bridges.",
            tags: ["Engineering", "Problem Solving", "Mathematics"],
            interests: { "Construction & Infrastructure": 3, "Science & Research": 1 },
            strengths: { "Problem Solving": 3, "Logic": 3, "Organization": 2, "Tech Savviness": 1 },
            personality: { "The Organizer": 3, "The Thinker": 2, "The Innovator": 1 }
        },
        "Mechanical Engineer": {
            description: "Design, develop, build, and test mechanical devices, including tools, engines, and machines.",
            tags: ["Engineering", "Innovation", "Problem Solving"],
            interests: { "Mechanical Aptitude": 3, "Science & Research": 2 },
            strengths: { "Problem Solving": 3, "Tech Savviness": 3, "Creativity": 1, "Logic": 1 },
            personality: { "The Innovator": 3, "The Thinker": 2 }
        },
        "Research Scientist": {
            description: "Conduct experiments and analyze data to expand scientific knowledge.",
            tags: ["Science", "Research", "Problem Solving"],
            interests: { "Science & Research": 3, "AI & Data Science": 1 },
            strengths: { "Research & Analysis": 3, "Problem Solving": 2, "Patience": 2, "Statistics": 1 },
            personality: { "The Thinker": 3, "The Explorer": 2, "The Innovator": 1 }
        },
        "Environmental Scientist": {
            description: "Use knowledge of the natural sciences to protect the environment and human health.",
            tags: ["Environment", "Research", "Advocacy"],
            interests: { "Science & Research": 3, "Law & Politics": 1 },
            strengths: { "Research & Analysis": 3, "Problem Solving": 2, "Communication": 1 },
            personality: { "The Explorer": 3, "The Thinker": 2, "The Helper": 1 }
        },

        // --- Other Professions ---
        "Lawyer": {
            description: "Advise and represent clients in legal matters.",
            tags: ["Law", "Research", "Communication"],
            interests: { "Law & Politics": 3, "Writing & Journalism": 1 },
            strengths: { "Research & Analysis": 3, "Logic": 3, "Communication": 2, "Negotiation": 1 },
            personality: { "The Thinker": 2, "The Speaker": 1 }
        },
        "Teacher / Educator": {
            description: "Instruct students in a wide range of subjects and skills.",
            tags: ["Education", "Communication", "Patience"],
            interests: { "Education & Mentoring": 3, "Helping Others": 2 },
            strengths: { "Communication": 3, "Patience": 3, "Public Speaking": 2, "Organization": 1 },
            personality: { "The Helper": 3, "The Speaker": 2, "The Organizer": 1 }
        },
        "Chef": {
            description: "Lead a kitchen, create menus, and prepare high-quality dishes.",
            tags: ["Culinary", "Creativity", "Organization"],
            interests: { "Culinary Arts": 3, "Design & Creativity": 1 },
            strengths: { "Creativity": 3, "Organization": 2, "Attention to Detail": 2, "Patience": 1 },
            personality: { "The Dreamer": 2, "The Organizer": 2, "The Innovator": 1 }
        },
        "Pilot": {
            description: "Fly and navigate aircraft for airlines, corporations, or the military.",
            tags: ["Aviation", "Problem Solving", "Attention to Detail"],
            interests: { "Aviation & Travel": 3, "Tech Savviness": 1 },
            strengths: { "Problem Solving": 3, "Attention to Detail": 3, "Organization": 2, "Logic": 1 },
            personality: { "The Organizer": 2, "The Thinker": 1 }
        }
    };
    return careerPaths;
}

function predictCareer(userProfile, careerPaths) {
    const scores = {};
    const categoryWeights = { interests: 1.5, strengths: 1.0, personality: 1.2 };

    for (const career in careerPaths) {
        let score = 0;
        const traits = careerPaths[career];
        for (const category in categoryWeights) {
            if (userProfile[category]) {
                for (const trait of userProfile[category]) {
                    if (traits[category] && traits[category][trait]) {
                        score += traits[category][trait] * categoryWeights[category];
                    }
                }
            }
        }
        scores[career] = score;
    }

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) {
        return [];
    }

    const normalizedScores = {};
    for (const career in scores) {
        normalizedScores[career] = {
            score: Math.min(Math.round((scores[career] / maxScore) * 95), 100),
            description: careerPaths[career].description,
            tags: careerPaths[career].tags
        };
    }

    const sortedCareers = Object.entries(normalizedScores)
        .sort(([, a], [, b]) => b.score - a.score)
        .filter(([, data]) => data.score > 0);

    return sortedCareers.slice(0, 5); // Return top 5 matches
}

module.exports = { defineCareerPaths, predictCareer };