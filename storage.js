// localStorage Manager for SkillSprint

const StorageManager = {
    // Keys for localStorage
    KEYS: {
        SELECTED_CAREER: 'skillsprint_selected_career',
        COMPLETED_SKILLS: 'skillsprint_completed_skills',
        SKILL_NOTES: 'skillsprint_skill_notes',
        USER_XP: 'skillsprint_user_xp',
        USER_LEVEL: 'skillsprint_user_level',
        CURRENT_STREAK: 'skillsprint_current_streak',
        LONGEST_STREAK: 'skillsprint_longest_streak',
        LAST_ACTIVITY_DATE: 'skillsprint_last_activity_date',
        UNLOCKED_BADGES: 'skillsprint_unlocked_badges',
        BADGE_DATES: 'skillsprint_badge_dates',
        APP_THEME: 'skillsprint_app_theme'
    },

    // Initialize storage with default values
    initialize() {
        console.log('Initializing storage...');
        
        // Set default theme if not exists
        if (!this.getItem(this.KEYS.APP_THEME)) {
            this.setItem(this.KEYS.APP_THEME, 'light');
        }
        
        // Initialize completed skills if not exists
        if (!this.getItem(this.KEYS.COMPLETED_SKILLS)) {
            this.setItem(this.KEYS.COMPLETED_SKILLS, JSON.stringify([]));
        }
        
        // Initialize skill notes if not exists
        if (!this.getItem(this.KEYS.SKILL_NOTES)) {
            this.setItem(this.KEYS.SKILL_NOTES, JSON.stringify({}));
        }
        
        // Initialize XP if not exists
        if (!this.getItem(this.KEYS.USER_XP)) {
            this.setItem(this.KEYS.USER_XP, '0');
        }
        
        // Initialize level if not exists
        if (!this.getItem(this.KEYS.USER_LEVEL)) {
            this.setItem(this.KEYS.USER_LEVEL, '1');
        }
        
        // Initialize streaks if not exists
        if (!this.getItem(this.KEYS.CURRENT_STREAK)) {
            this.setItem(this.KEYS.CURRENT_STREAK, '0');
        }
        
        if (!this.getItem(this.KEYS.LONGEST_STREAK)) {
            this.setItem(this.KEYS.LONGEST_STREAK, '0');
        }
        
        // Initialize last activity date if not exists
        if (!this.getItem(this.KEYS.LAST_ACTIVITY_DATE)) {
            const today = new Date().toISOString().split('T')[0];
            this.setItem(this.KEYS.LAST_ACTIVITY_DATE, today);
        }
        
        // Initialize badges if not exists
        if (!this.getItem(this.KEYS.UNLOCKED_BADGES)) {
            this.setItem(this.KEYS.UNLOCKED_BADGES, JSON.stringify([]));
        }
        
        if (!this.getItem(this.KEYS.BADGE_DATES)) {
            this.setItem(this.KEYS.BADGE_DATES, JSON.stringify({}));
        }
        
        console.log('Storage initialized successfully');
    },

    // Generic getter with JSON parsing
    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error reading from localStorage key "${key}":`, error);
            return null;
        }
    },

    // Generic setter with JSON stringify
    setItem(key, value) {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, stringValue);
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage key "${key}":`, error);
            return false;
        }
    },

    // Remove item
    removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
            return false;
        }
    },

    // Clear all app data
    clearAll() {
        try {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            this.initialize(); // Re-initialize with defaults
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    },

    // Career selection methods
    getSelectedCareer() {
        return this.getItem(this.KEYS.SELECTED_CAREER);
    },

    setSelectedCareer(careerId) {
        return this.setItem(this.KEYS.SELECTED_CAREER, careerId);
    },

    // Completed skills methods
    getCompletedSkills() {
        const skills = this.getItem(this.KEYS.COMPLETED_SKILLS);
        return Array.isArray(skills) ? skills : [];
    },

    addCompletedSkill(skillId) {
        const skills = this.getCompletedSkills();
        if (!skills.includes(skillId)) {
            skills.push(skillId);
            this.setItem(this.KEYS.COMPLETED_SKILLS, skills);
        }
        return skills;
    },

    removeCompletedSkill(skillId) {
        const skills = this.getCompletedSkills();
        const index = skills.indexOf(skillId);
        if (index > -1) {
            skills.splice(index, 1);
            this.setItem(this.KEYS.COMPLETED_SKILLS, skills);
        }
        return skills;
    },

    isSkillCompleted(skillId) {
        const skills = this.getCompletedSkills();
        return skills.includes(skillId);
    },

    getCompletedSkillsCount() {
        return this.getCompletedSkills().length;
    },

    // Skill notes methods
    getSkillNotes() {
        const notes = this.getItem(this.KEYS.SKILL_NOTES);
        return notes && typeof notes === 'object' ? notes : {};
    },

    getSkillNote(skillId) {
        const notes = this.getSkillNotes();
        return notes[skillId] || '';
    },

    setSkillNote(skillId, note) {
        const notes = this.getSkillNotes();
        if (note && note.trim()) {
            notes[skillId] = note.trim();
        } else {
            delete notes[skillId];
        }
        this.setItem(this.KEYS.SKILL_NOTES, notes);
        return notes;
    },

    deleteSkillNote(skillId) {
        const notes = this.getSkillNotes();
        delete notes[skillId];
        this.setItem(this.KEYS.SKILL_NOTES, notes);
        return notes;
    },

    // XP methods
    getXP() {
        const xp = this.getItem(this.KEYS.USER_XP);
        return parseInt(xp) || 0;
    },

    addXP(amount) {
        const currentXP = this.getXP();
        const newXP = currentXP + amount;
        this.setItem(this.KEYS.USER_XP, newXP.toString());
        return newXP;
    },

    // Level methods
    getLevel() {
        const level = this.getItem(this.KEYS.USER_LEVEL);
        return parseInt(level) || 1;
    },

    setLevel(level) {
        this.setItem(this.KEYS.USER_LEVEL, level.toString());
        return level;
    },

    // Streak methods
    getCurrentStreak() {
        const streak = this.getItem(this.KEYS.CURRENT_STREAK);
        return parseInt(streak) || 0;
    },

    setCurrentStreak(streak) {
        this.setItem(this.KEYS.CURRENT_STREAK, streak.toString());
        return streak;
    },

    incrementStreak() {
        const currentStreak = this.getCurrentStreak();
        const newStreak = currentStreak + 1;
        this.setCurrentStreak(newStreak);
        
        // Update longest streak if needed
        const longestStreak = this.getLongestStreak();
        if (newStreak > longestStreak) {
            this.setLongestStreak(newStreak);
        }
        
        return newStreak;
    },

    resetStreak() {
        this.setCurrentStreak(0);
        return 0;
    },

    getLongestStreak() {
        const streak = this.getItem(this.KEYS.LONGEST_STREAK);
        return parseInt(streak) || 0;
    },

    setLongestStreak(streak) {
        this.setItem(this.KEYS.LONGEST_STREAK, streak.toString());
        return streak;
    },

    // Last activity date methods
    getLastActivityDate() {
        return this.getItem(this.KEYS.LAST_ACTIVITY_DATE);
    },

    setLastActivityDate(date) {
        this.setItem(this.KEYS.LAST_ACTIVITY_DATE, date);
        return date;
    },

    // Badge methods
    getUnlockedBadges() {
        const badges = this.getItem(this.KEYS.UNLOCKED_BADGES);
        return Array.isArray(badges) ? badges : [];
    },

    unlockBadge(badgeId) {
        const badges = this.getUnlockedBadges();
        if (!badges.includes(badgeId)) {
            badges.push(badgeId);
            this.setItem(this.KEYS.UNLOCKED_BADGES, badges);
            
            // Record unlock date
            const dates = this.getBadgeDates();
            dates[badgeId] = new Date().toISOString();
            this.setItem(this.KEYS.BADGE_DATES, dates);
        }
        return badges;
    },

    hasBadge(badgeId) {
        const badges = this.getUnlockedBadges();
        return badges.includes(badgeId);
    },

    getBadgeDates() {
        const dates = this.getItem(this.KEYS.BADGE_DATES);
        return dates && typeof dates === 'object' ? dates : {};
    },

    getBadgeUnlockDate(badgeId) {
        const dates = this.getBadgeDates();
        return dates[badgeId] || null;
    },

    // Theme methods
    getTheme() {
        return this.getItem(this.KEYS.APP_THEME) || 'light';
    },

    setTheme(theme) {
        this.setItem(this.KEYS.APP_THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
        return theme;
    },

    toggleTheme() {
        const currentTheme = this.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    },

    // Statistics and analytics
    getStats() {
        return {
            selectedCareer: this.getSelectedCareer(),
            completedSkills: this.getCompletedSkillsCount(),
            totalXP: this.getXP(),
            level: this.getLevel(),
            currentStreak: this.getCurrentStreak(),
            longestStreak: this.getLongestStreak(),
            unlockedBadges: this.getUnlockedBadges().length,
            lastActivity: this.getLastActivityDate(),
            theme: this.getTheme()
        };
    },

    // Export all data for backup
    exportData() {
        const data = {};
        Object.keys(this.KEYS).forEach(key => {
            data[this.KEYS[key]] = this.getItem(this.KEYS[key]);
        });
        return JSON.stringify(data, null, 2);
    },

    // Import data from backup
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            Object.keys(data).forEach(key => {
                if (Object.values(this.KEYS).includes(key)) {
                    this.setItem(key, data[key]);
                }
            });
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    },

    // Check storage health
    checkStorageHealth() {
        const results = {
            totalItems: 0,
            totalSize: 0,
            issues: []
        };

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                results.totalItems++;
                results.totalSize += (key.length + value.length) * 2; // Approximate size in bytes
            }

            // Check if any required keys are missing
            Object.values(this.KEYS).forEach(key => {
                if (!localStorage.getItem(key)) {
                    results.issues.push(`Missing key: ${key}`);
                }
            });

            // Check size limit (usually 5MB)
            if (results.totalSize > 4.5 * 1024 * 1024) {
                results.issues.push('Storage approaching limit');
            }

            return results;
        } catch (error) {
            console.error('Storage health check failed:', error);
            results.issues.push('Health check failed');
            return results;
        }
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    StorageManager.initialize();
});

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = StorageManager;
}