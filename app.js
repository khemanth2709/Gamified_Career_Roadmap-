// Main Application Controller for SkillSprint

const SkillSprintApp = {
    // State management
    state: {
        currentCareer: null,
        selectedSkillForNotes: null,
        isInitialized: false
    },

    // Initialize the application
    initialize() {
        console.log('Initializing SkillSprint...');
        
        // Initialize storage first
        StorageManager.initialize();
        
        // Apply theme
        const theme = StorageManager.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('themeSwitch').checked = theme === 'dark';
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadInitialData();
        
        // Render career selection
        this.renderCareerSelection();
        
        // Render badges
        this.renderBadges();
        
        // Update dashboard
        this.updateDashboard();
        
        // Update streak on load
        GamificationEngine.updateStreak();
        
        this.state.isInitialized = true;
        console.log('SkillSprint initialized successfully');
    },

    // Set up all event listeners
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeSwitch').addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            StorageManager.setTheme(theme);
        });

        // Reset progress button
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                StorageManager.clearAll();
                this.initialize();
                GamificationEngine.showNotification('Progress reset successfully', 'info');
            }
        });

        // Back to selection button
        document.getElementById('backToSelection').addEventListener('click', () => {
            this.showCareerSelection();
        });

        // Notes modal
        document.getElementById('closeNotesModal').addEventListener('click', () => {
            this.closeNotesModal();
        });

        document.getElementById('saveNote').addEventListener('click', () => {
            this.saveSkillNote();
        });

        document.getElementById('clearNote').addEventListener('click', () => {
            document.getElementById('noteContent').value = '';
        });

        // Close modal on outside click
        document.getElementById('notesModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('notesModal')) {
                this.closeNotesModal();
            }
        });
    },

    // Load initial data from storage
    loadInitialData() {
        const selectedCareer = StorageManager.getSelectedCareer();
        if (selectedCareer) {
            this.state.currentCareer = selectedCareer;
            this.showRoadmap(selectedCareer);
        }
    },

    // Render career selection cards
    renderCareerSelection() {
        const careerGrid = document.getElementById('careerGrid');
        const careers = getAllCareers();
        
        careerGrid.innerHTML = careers.map(career => {
            const stats = getCareerStats(career.id);
            const completedSkills = StorageManager.getCompletedSkills();
            const completionData = getCareerCompletionData(career.id, completedSkills);
            
            return `
                <div class="career-card ${this.state.currentCareer === career.id ? 'selected' : ''}" 
                     data-career-id="${career.id}"
                     onclick="SkillSprintApp.selectCareer('${career.id}')">
                    <div class="career-icon-large" style="background: ${career.color}">
                        <i class="${career.icon}"></i>
                    </div>
                    <h3>${career.title}</h3>
                    <p class="text-muted">${career.description}</p>
                    <div class="career-stats">
                        <span><i class="fas fa-bullseye"></i> ${stats.totalSkills} skills</span>
                        <span><i class="fas fa-layer-group"></i> ${stats.totalSections} sections</span>
                    </div>
                    ${completionData.overallPercentage > 0 ? `
                        <div class="progress-bar" style="margin-top: 1rem; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                            <div style="width: ${completionData.overallPercentage}%; height: 100%; background: ${career.color}; border-radius: 3px;"></div>
                        </div>
                        <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.8rem;">
                            ${completionData.completedSkills}/${completionData.totalSkills} skills (${completionData.overallPercentage}%)
                        </p>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    // Select a career path
    selectCareer(careerId) {
        this.state.currentCareer = careerId;
        StorageManager.setSelectedCareer(careerId);
        
        // Update UI
        this.showRoadmap(careerId);
        this.updateDashboard();
        this.renderCareerSelection(); // Update selection UI
        
        // Show notification
        GamificationEngine.showNotification(`Selected ${getCareerById(careerId).title} path`, 'info');
    },

    // Show career roadmap
    showRoadmap(careerId) {
        const career = getCareerById(careerId);
        if (!career) return;
        
        // Update title
        document.getElementById('roadmapTitle').innerHTML = `
            <i class="${career.icon}" style="color: ${career.color}"></i>
            ${career.title} Roadmap
        `;
        
        // Render roadmap sections
        this.renderRoadmapSections(career);
        
        // Show roadmap, hide selection
        document.getElementById('careerSelection').style.display = 'none';
        document.getElementById('skillRoadmap').style.display = 'block';
        
        // Scroll to roadmap
        document.getElementById('skillRoadmap').scrollIntoView({ behavior: 'smooth' });
    },

    // Render roadmap sections
    renderRoadmapSections(career) {
        const roadmapContent = document.getElementById('roadmapContent');
        const completedSkills = StorageManager.getCompletedSkills();
        
        roadmapContent.innerHTML = career.sections.map(section => {
            const sectionSkills = section.skills;
            const completedSectionSkills = sectionSkills.filter(skill => 
                completedSkills.includes(skill.id)
            ).length;
            const sectionPercentage = Math.round((completedSectionSkills / sectionSkills.length) * 100);
            
            return `
                <div class="roadmap-section fade-in">
                    <div class="section-header-bar">
                        <h3><i class="fas fa-layer-group"></i> ${section.title}</h3>
                        <span class="section-progress">${completedSectionSkills}/${sectionSkills.length} skills</span>
                    </div>
                    <div class="section-skills">
                        ${sectionSkills.map(skill => {
                            const isCompleted = completedSkills.includes(skill.id);
                            const note = StorageManager.getSkillNote(skill.id);
                            
                            return `
                                <div class="skill-item" data-skill-id="${skill.id}">
                                    <div class="skill-checkbox">
                                        <input type="checkbox" id="skill-${skill.id}" 
                                               ${isCompleted ? 'checked' : ''}
                                               onchange="SkillSprintApp.toggleSkillCompletion('${skill.id}', ${skill.xp})">
                                        <label for="skill-${skill.id}" class="checkmark"></label>
                                    </div>
                                    <div class="skill-content">
                                        <div class="skill-title">
                                            <h4>${skill.title}</h4>
                                            <span class="skill-category">${skill.category}</span>
                                        </div>
                                        <p class="text-muted" style="font-size: 0.9rem; margin: 0;">${skill.description}</p>
                                        ${note ? `
                                            <p class="skill-note" style="margin-top: 0.5rem; font-size: 0.85rem; color: #3b82f6;">
                                                <i class="fas fa-sticky-note"></i> ${note.substring(0, 100)}${note.length > 100 ? '...' : ''}
                                            </p>
                                        ` : ''}
                                    </div>
                                    <div class="skill-actions">
                                        <button class="skill-btn" onclick="SkillSprintApp.openNotesModal('${skill.id}')"
                                                title="Add notes">
                                            <i class="fas fa-sticky-note"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Show career selection view
    showCareerSelection() {
        document.getElementById('careerSelection').style.display = 'block';
        document.getElementById('skillRoadmap').style.display = 'none';
        
        // Update dashboard career info
        this.updateDashboard();
    },

    // Toggle skill completion
    toggleSkillCompletion(skillId, skillXP) {
        const isCompleted = StorageManager.isSkillCompleted(skillId);
        let completedSkills;
        
        if (isCompleted) {
            completedSkills = StorageManager.removeCompletedSkill(skillId);
            // Remove XP for uncompleting
            StorageManager.addXP(-skillXP);
        } else {
            completedSkills = StorageManager.addCompletedSkill(skillId);
            // Award XP for completing
            const result = GamificationEngine.awardSkillCompletion(skillId, skillXP);
            
            // Show XP notification
            GamificationEngine.showNotification(`+${skillXP} XP! Total: ${result.newXP} XP`, 'success');
        }
        
        // Update streak
        StorageManager.setLastActivityDate(new Date().toISOString().split('T')[0]);
        
        // Update UI
        if (this.state.currentCareer) {
            this.renderRoadmapSections(getCareerById(this.state.currentCareer));
            this.updateDashboard();
            this.renderBadges();
        }
    },

    // Open notes modal for a skill
    openNotesModal(skillId) {
        this.state.selectedSkillForNotes = skillId;
        
        // Find skill details
        let skillDetails = null;
        if (this.state.currentCareer) {
            const career = getCareerById(this.state.currentCareer);
            for (const section of career.sections) {
                const skill = section.skills.find(s => s.id === skillId);
                if (skill) {
                    skillDetails = skill;
                    break;
                }
            }
        }
        
        if (skillDetails) {
            document.getElementById('noteSkillTitle').value = skillDetails.title;
            document.getElementById('noteContent').value = StorageManager.getSkillNote(skillId) || '';
            document.getElementById('notesModal').classList.add('active');
        }
    },

    // Close notes modal
    closeNotesModal() {
        document.getElementById('notesModal').classList.remove('active');
        this.state.selectedSkillForNotes = null;
    },

    // Save skill note
    saveSkillNote() {
        if (!this.state.selectedSkillForNotes) return;
        
        const note = document.getElementById('noteContent').value.trim();
        StorageManager.setSkillNote(this.state.selectedSkillForNotes, note);
        
        // Award XP for note taking
        if (note) {
            const xpEarned = GamificationEngine.XP_REWARDS.NOTE_ADDED;
            StorageManager.addXP(xpEarned);
            GamificationEngine.showNotification(`+${xpEarned} XP for taking notes!`, 'success');
        }
        
        // Update UI
        if (this.state.currentCareer) {
            this.renderRoadmapSections(getCareerById(this.state.currentCareer));
            this.updateDashboard();
            this.renderBadges();
        }
        
        this.closeNotesModal();
        GamificationEngine.showNotification('Note saved successfully', 'success');
    },

    // Update dashboard with current stats
    updateDashboard() {
        const completedSkillsCount = StorageManager.getCompletedSkillsCount();
        const xp = StorageManager.getXP();
        const currentStreak = StorageManager.getCurrentStreak();
        const longestStreak = StorageManager.getLongestStreak();
        
        // Get level info
        const levelInfo = GamificationEngine.calculateLevel(xp);
        
        // Update progress circle
        const progressCircle = document.querySelector('.progress-bar');
        const progressPercent = document.getElementById('progressPercent');
        
        let percentage = 0;
        if (this.state.currentCareer) {
            const career = getCareerById(this.state.currentCareer);
            const completionData = getCareerCompletionData(this.state.currentCareer, StorageManager.getCompletedSkills());
            percentage = completionData.overallPercentage;
            
            // Update current career display
            document.getElementById('currentCareer').innerHTML = `
                <div class="career-icon" style="background: ${career.color}">
                    <i class="${career.icon}"></i>
                </div>
                <div class="career-details">
                    <h4>${career.title}</h4>
                    <p class="text-muted">${completionData.completedSkills}/${career.totalSkills} skills completed</p>
                </div>
            `;
            
            // Update skill counts
            document.getElementById('completedSkills').textContent = completionData.completedSkills;
            document.getElementById('totalSkills').textContent = career.totalSkills;
        } else {
            document.getElementById('currentCareer').innerHTML = `
                <div class="career-icon">
                    <i class="fas fa-code"></i>
                </div>
                <div class="career-details">
                    <h4>Select a Career</h4>
                    <p class="text-muted">Choose a path to begin your journey</p>
                </div>
            `;
            document.getElementById('completedSkills').textContent = completedSkillsCount;
            document.getElementById('totalSkills').textContent = '0';
        }
        
        // Update progress circle
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (percentage / 100) * circumference;
        
        if (progressCircle) {
            progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        progressPercent.textContent = `${percentage}%`;
        
        // Update level display
        document.getElementById('currentLevelBadge').innerHTML = `
            <span class="level-number">${levelInfo.level}</span>
            <span class="level-title">${levelInfo.title}</span>
        `;
        document.getElementById('currentLevelBadge').style.background = levelInfo.color;
        
        document.getElementById('currentXP').textContent = xp;
        document.getElementById('nextLevelXP').textContent = GamificationEngine.getXPForNextLevel(xp);
        
        const xpFill = document.getElementById('xpFill');
        if (xpFill) {
            xpFill.style.width = `${levelInfo.progress}%`;
        }
        
        // Update streak display
        document.getElementById('currentStreak').textContent = currentStreak;
        document.getElementById('streakDays').textContent = currentStreak === 1 ? '1-day' : `${currentStreak}-day`;
        document.getElementById('longestStreak').textContent = longestStreak;
        
        // Update flame animation for active streak
        const flameIcon = document.querySelector('.flame-icon');
        if (flameIcon) {
            if (currentStreak > 0) {
                flameIcon.style.animation = 'pulse 2s infinite';
            } else {
                flameIcon.style.animation = 'none';
            }
        }
    },

    // Render badges
    renderBadges() {
        const badgesGrid = document.getElementById('badgesGrid');
        const badges = GamificationEngine.getAllBadgesWithStatus();
        const badgeDates = StorageManager.getBadgeDates();
        
        badgesGrid.innerHTML = badges.map(badge => {
            const unlockDate = badgeDates[badge.id];
            const dateStr = unlockDate ? new Date(unlockDate).toLocaleDateString() : '';
            
            return `
                <div class="badge-item ${badge.unlocked ? 'unlocked' : 'locked'}">
                    ${!badge.unlocked ? '<div class="badge-lock"><i class="fas fa-lock"></i></div>' : ''}
                    <div class="badge-icon" style="${badge.unlocked ? `background: ${badge.color}` : ''}">
                        <i class="${badge.icon}"></i>
                    </div>
                    <h4>${badge.title}</h4>
                    <p class="text-muted" style="font-size: 0.8rem;">${badge.description}</p>
                    ${unlockDate ? `
                        <p class="badge-date">Unlocked: ${dateStr}</p>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    SkillSprintApp.initialize();
});

// Expose app to global scope for onclick handlers
window.SkillSprintApp = SkillSprintApp;

// Helper functions exposed globally
window.getAllCareers = getAllCareers;
window.getCareerById = getCareerById;
window.getCareerStats = getCareerStats;
window.getCareerCompletionData = getCareerCompletionData;