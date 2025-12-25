// Gamification Engine for SkillSprint

const GamificationEngine = {
    // Level configuration
    LEVELS: [
        { level: 1, title: 'Beginner', xpRequired: 0, color: '#94a3b8' },
        { level: 2, title: 'Explorer', xpRequired: 100, color: '#3b82f6' },
        { level: 3, title: 'Learner', xpRequired: 300, color: '#8b5cf6' },
        { level: 4, title: 'Achiever', xpRequired: 600, color: '#10b981' },
        { level: 5, title: 'Specialist', xpRequired: 1000, color: '#f59e0b' },
        { level: 6, title: 'Expert', xpRequired: 1500, color: '#ef4444' },
        { level: 7, title: 'Master', xpRequired: 2200, color: '#ec4899' },
        { level: 8, title: 'Grandmaster', xpRequired: 3000, color: '#6366f1' },
        { level: 9, title: 'Legend', xpRequired: 4000, color: '#f97316' },
        { level: 10, title: 'Champion', xpRequired: 5000, color: '#06b6d4' }
    ],

    // Badge configuration
    BADGES: [
        {
            id: 'first_skill',
            title: 'First Step',
            description: 'Complete your first skill',
            icon: 'fas fa-star',
            color: '#fbbf24',
            requirement: { type: 'skills_completed', count: 1 }
        },
        {
            id: 'five_skills',
            title: 'Quick Learner',
            description: 'Complete 5 skills',
            icon: 'fas fa-bolt',
            color: '#10b981',
            requirement: { type: 'skills_completed', count: 5 }
        },
        {
            id: 'ten_skills',
            title: 'Skill Collector',
            description: 'Complete 10 skills',
            icon: 'fas fa-gem',
            color: '#8b5cf6',
            requirement: { type: 'skills_completed', count: 10 }
        },
        {
            id: 'three_day_streak',
            title: 'Consistent Learner',
            description: 'Maintain a 3-day streak',
            icon: 'fas fa-calendar-check',
            color: '#3b82f6',
            requirement: { type: 'streak', count: 3 }
        },
        {
            id: 'seven_day_streak',
            title: 'Weekly Warrior',
            description: 'Maintain a 7-day streak',
            icon: 'fas fa-fire',
            color: '#ef4444',
            requirement: { type: 'streak', count: 7 }
        },
        {
            id: 'thirty_day_streak',
            title: 'Monthly Master',
            description: 'Maintain a 30-day streak',
            icon: 'fas fa-crown',
            color: '#f97316',
            requirement: { type: 'streak', count: 30 }
        },
        {
            id: 'first_level',
            title: 'Level Up!',
            description: 'Reach Level 2',
            icon: 'fas fa-level-up-alt',
            color: '#06b6d4',
            requirement: { type: 'level', count: 2 }
        },
        {
            id: 'level_five',
            title: 'Halfway There',
            description: 'Reach Level 5',
            icon: 'fas fa-mountain',
            color: '#10b981',
            requirement: { type: 'level', count: 5 }
        },
        {
            id: 'level_ten',
            title: 'Peak Performer',
            description: 'Reach Level 10',
            icon: 'fas fa-trophy',
            color: '#fbbf24',
            requirement: { type: 'level', count: 10 }
        },
        {
            id: 'roadmap_complete',
            title: 'Roadmap Master',
            description: 'Complete an entire career roadmap',
            icon: 'fas fa-flag-checkered',
            color: '#8b5cf6',
            requirement: { type: 'roadmap_complete', count: 1 }
        },
        {
            id: 'note_taker',
            title: 'Knowledge Keeper',
            description: 'Add notes to 5 different skills',
            icon: 'fas fa-book',
            color: '#3b82f6',
            requirement: { type: 'notes_added', count: 5 }
        },
        {
            id: 'multicareer',
            title: 'Versatile Learner',
            description: 'Make progress in 2 different career paths',
            icon: 'fas fa-random',
            color: '#ec4899',
            requirement: { type: 'careers_tried', count: 2 }
        }
    ],

    // XP reward configuration
    XP_REWARDS: {
        SKILL_COMPLETION: 10,
        SECTION_COMPLETION: 25,
        ROADMAP_COMPLETION: 100,
        DAILY_STREAK_BONUS: 5,
        NOTE_ADDED: 2,
        LEVEL_UP: 50
    },

    // Initialize gamification
    initialize() {
        console.log('Initializing gamification engine...');
        this.updateStreak();
        this.checkBadgeUnlocks();
    },

    // Calculate level based on XP
    calculateLevel(xp) {
        let level = 1;
        let nextLevelXP = 0;
        let currentLevelXP = 0;
        
        for (let i = this.LEVELS.length - 1; i >= 0; i--) {
            if (xp >= this.LEVELS[i].xpRequired) {
                level = this.LEVELS[i].level;
                currentLevelXP = this.LEVELS[i].xpRequired;
                nextLevelXP = i < this.LEVELS.length - 1 ? this.LEVELS[i + 1].xpRequired : currentLevelXP + 1000;
                break;
            }
        }
        
        return {
            level,
            title: this.LEVELS.find(l => l.level === level)?.title || 'Beginner',
            xp,
            currentLevelXP,
            nextLevelXP,
            progress: nextLevelXP > currentLevelXP ? 
                ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100,
            color: this.LEVELS.find(l => l.level === level)?.color || '#94a3b8'
        };
    },

    // Award XP for skill completion
    awardSkillCompletion(skillId, skillXP = 10) {
        const xpEarned = skillXP;
        const newXP = StorageManager.addXP(xpEarned);
        
        // Check for level up
        const oldLevel = StorageManager.getLevel();
        const newLevelInfo = this.calculateLevel(newXP);
        const newLevel = newLevelInfo.level;
        
        if (newLevel > oldLevel) {
            StorageManager.setLevel(newLevel);
            this.awardLevelUp(newLevel);
            
            // Show level up notification
            this.showNotification(`🎉 Level Up! You reached Level ${newLevel} - ${newLevelInfo.title}`, 'success');
        }
        
        // Check badges
        this.checkBadgeUnlocks();
        
        return {
            xpEarned,
            newXP,
            newLevel,
            leveledUp: newLevel > oldLevel
        };
    },

    // Award XP for level up
    awardLevelUp(level) {
        const xpEarned = this.XP_REWARDS.LEVEL_UP * level;
        StorageManager.addXP(xpEarned);
        return xpEarned;
    },

    // Award XP for streak
    awardStreakBonus() {
        const streak = StorageManager.getCurrentStreak();
        if (streak > 0) {
            const xpEarned = streak * this.XP_REWARDS.DAILY_STREAK_BONUS;
            StorageManager.addXP(xpEarned);
            return xpEarned;
        }
        return 0;
    },

    // Update streak based on last activity
    updateStreak() {
        const lastActivity = StorageManager.getLastActivityDate();
        const today = new Date().toISOString().split('T')[0];
        
        if (!lastActivity) {
            StorageManager.setLastActivityDate(today);
            return 0;
        }
        
        const lastDate = new Date(lastActivity);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            // Same day, streak continues
            return StorageManager.getCurrentStreak();
        } else if (diffDays === 1) {
            // Consecutive day, increment streak
            const newStreak = StorageManager.incrementStreak();
            StorageManager.setLastActivityDate(today);
            
            // Award streak bonus
            this.awardStreakBonus();
            
            // Show streak notification if it's a milestone
            if (newStreak === 3 || newStreak === 7 || newStreak === 30) {
                this.showNotification(`🔥 ${newStreak}-day streak! Keep going!`, 'success');
            }
            
            return newStreak;
        } else {
            // Streak broken
            StorageManager.resetStreak();
            StorageManager.setLastActivityDate(today);
            
            this.showNotification('Streak reset. Start a new one today!', 'info');
            return 0;
        }
    },

    // Check and unlock badges
    checkBadgeUnlocks() {
        const stats = this.getUserStats();
        const unlockedBadges = StorageManager.getUnlockedBadges();
        const newlyUnlocked = [];
        
        this.BADGES.forEach(badge => {
            if (!unlockedBadges.includes(badge.id)) {
                if (this.checkBadgeRequirement(badge, stats)) {
                    StorageManager.unlockBadge(badge.id);
                    newlyUnlocked.push(badge);
                    
                    // Show badge notification
                    this.showNotification(`🏆 Badge Unlocked: ${badge.title}!`, 'success');
                }
            }
        });
        
        return newlyUnlocked;
    },

    // Check if badge requirement is met
    checkBadgeRequirement(badge, stats) {
        switch (badge.requirement.type) {
            case 'skills_completed':
                return stats.completedSkills >= badge.requirement.count;
                
            case 'streak':
                return stats.currentStreak >= badge.requirement.count;
                
            case 'level':
                return stats.level >= badge.requirement.count;
                
            case 'roadmap_complete':
                // This would need roadmap completion tracking
                return false;
                
            case 'notes_added':
                const notes = StorageManager.getSkillNotes();
                return Object.keys(notes).length >= badge.requirement.count;
                
            case 'careers_tried':
                // This would need career history tracking
                return false;
                
            default:
                return false;
        }
    },

    // Get user statistics for badge checking
    getUserStats() {
        return {
            completedSkills: StorageManager.getCompletedSkillsCount(),
            currentStreak: StorageManager.getCurrentStreak(),
            level: StorageManager.getLevel(),
            xp: StorageManager.getXP()
        };
    },

    // Get all badges with unlock status
    getAllBadgesWithStatus() {
        const unlockedBadges = StorageManager.getUnlockedBadges();
        const badgeDates = StorageManager.getBadgeDates();
        
        return this.BADGES.map(badge => ({
            ...badge,
            unlocked: unlockedBadges.includes(badge.id),
            unlockDate: badgeDates[badge.id] || null
        }));
    },

    // Get level information
    getLevelInfo(level) {
        return this.LEVELS.find(l => l.level === level) || this.LEVELS[0];
    },

    // Get next level information
    getNextLevelInfo(currentXP) {
        const currentLevelInfo = this.calculateLevel(currentXP);
        const nextLevel = currentLevelInfo.level + 1;
        return this.LEVELS.find(l => l.level === nextLevel) || null;
    },

    // Show notification (toast)
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    min-width: 300px;
                    max-width: 400px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    border-left: 4px solid #3b82f6;
                }
                
                [data-theme="dark"] .notification {
                    background: #1e293b;
                    color: white;
                }
                
                .notification-success {
                    border-left-color: #10b981;
                }
                
                .notification-info {
                    border-left-color: #3b82f6;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #64748b;
                    line-height: 1;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    },

    // Get progress statistics
    getProgressStats(completedSkills, totalSkills) {
        const percentage = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
        
        let status = 'Not Started';
        let color = '#94a3b8';
        
        if (percentage > 0 && percentage < 25) {
            status = 'Getting Started';
            color = '#3b82f6';
        } else if (percentage >= 25 && percentage < 50) {
            status = 'Making Progress';
            color = '#8b5cf6';
        } else if (percentage >= 50 && percentage < 75) {
            status = 'Halfway There';
            color = '#f59e0b';
        } else if (percentage >= 75 && percentage < 100) {
            status = 'Almost There';
            color = '#10b981';
        } else if (percentage === 100) {
            status = 'Completed!';
            color = '#ef4444';
        }
        
        return {
            percentage,
            status,
            color,
            completedSkills,
            totalSkills
        };
    },

    // Calculate XP needed for next level
    getXPForNextLevel(currentXP) {
        const levelInfo = this.calculateLevel(currentXP);
        return levelInfo.nextLevelXP - currentXP;
    },

    // Get achievement progress
    getAchievementProgress() {
        const stats = this.getUserStats();
        const badges = this.getAllBadgesWithStatus();
        
        const unlockedBadges = badges.filter(b => b.unlocked).length;
        const totalBadges = badges.length;
        
        const nextLevel = this.getNextLevelInfo(stats.xp);
        const nextLevelXP = nextLevel ? nextLevel.xpRequired - stats.xp : 0;
        
        return {
            badges: {
                unlocked: unlockedBadges,
                total: totalBadges,
                percentage: Math.round((unlockedBadges / totalBadges) * 100)
            },
            level: {
                current: stats.level,
                next: nextLevel ? nextLevel.level : null,
                xpNeeded: nextLevelXP,
                progress: this.calculateLevel(stats.xp).progress
            },
            streak: {
                current: stats.currentStreak,
                longest: StorageManager.getLongestStreak()
            }
        };
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    GamificationEngine.initialize();
});

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = GamificationEngine;
}