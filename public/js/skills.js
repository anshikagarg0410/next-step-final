// Sign out functionality
        function signout() {
            if (confirm("Are you sure you want to sign out?")) {
                // Clear session data (in a real environment)
                // sessionStorage.clear();
                // localStorage.clear();

                // Navigate to login page using relative path
                window.location.href = "/";
            }
        }

        // Initialize page functionality
        document.addEventListener('DOMContentLoaded', function () {

            // Add sign out event listener
            const signoutBtn = document.querySelector('.signout');
            if (signoutBtn) {
                signoutBtn.addEventListener('click', signout);
            }

            // Handle navigation links with relative paths
            const navLinks = document.querySelectorAll('.links a');
            navLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    window.location.href = href;
                });
            });

            // Course action buttons functionality
            const courseButtons = document.querySelectorAll('.btn-action');
            courseButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const courseCard = this.closest('.course-card');
                    const courseTitle = courseCard.querySelector('h3').textContent;
                    const badge = courseCard.querySelector('.badge');
                    const buttonText = this.textContent.trim();

                    handleCourseAction(courseTitle, badge, buttonText, courseCard);
                });
            });

            // Add hover effects to course cards
            addCourseCardInteractions();

            // Initialize progress animations
            animateProgressBars();

            // Add course completion tracking
            initializeCourseTracking();
        });

        // Handle different course actions
        function handleCourseAction(courseTitle, badge, buttonText, courseCard) {
            const courseName = courseTitle.split(' ').slice(0, 3).join(' '); // Get first 3 words

            switch (buttonText) {
                case 'Review':
                    alert(`Opening review for: ${courseName}`);
                    // In a real app, this would open a review modal or page
                    break;

                case 'Continue':
                    alert(`Continuing: ${courseName}`);
                    // Update progress and redirect to course
                    updateCourseProgress(courseCard, 75);
                    break;

                case 'Start':
                    if (confirm(`Start learning: ${courseName}?`)) {
                        startCourse(courseCard, courseName);
                    }
                    break;

                default:
                    console.log('Unknown action:', buttonText);
            }
        }

        // Start a new course
        function startCourse(courseCard, courseName) {
            const badge = courseCard.querySelector('.badge');
            const button = courseCard.querySelector('.btn-action');

            // Update badge to "In Progress"
            if (badge) {
                badge.textContent = 'In Progress';
                badge.className = 'badge inprogress';
            }

            // Update button text
            if (button) {
                button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Continue';
            }

            // Add progress bar if it doesn't exist
            const existingProgress = courseCard.querySelector('.progress');
            if (!existingProgress) {
                addProgressBar(courseCard, 5); // Start with 5% progress
            }

            // Update overall progress
            updateOverallProgress();

            alert(`You've started: ${courseName}! Keep up the great work!`);
        }

        // Add progress bar to a course card
        function addProgressBar(courseCard, progressPercent = 0) {
            const courseInfo = courseCard.querySelector('.course-info');
            const progressHTML = `
        <div class="progress">
            <div class="progress-header">
                <span>Progress</span>
                <span class="progress-text">${progressPercent}% Complete</span>
            </div>
            <div class="progress-bar small">
                <div class="progress-fill" style="--progress:${progressPercent}%"></div>
            </div>
        </div>
    `;

            courseInfo.insertAdjacentHTML('beforeend', progressHTML);
        }

        // Update course progress
        function updateCourseProgress(courseCard, newProgress) {
            const progressText = courseCard.querySelector('.progress-text');
            const progressFill = courseCard.querySelector('.progress-fill');

            if (progressText && progressFill) {
                progressText.textContent = `${newProgress}% Complete`;
                progressFill.style.setProperty('--progress', `${newProgress}%`);

                // If course is completed
                if (newProgress >= 100) {
                    const badge = courseCard.querySelector('.badge');
                    const button = courseCard.querySelector('.btn-action');

                    if (badge) {
                        badge.textContent = 'Completed';
                        badge.className = 'badge completed';
                    }

                    if (button) {
                        button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Review';
                    }
                }
            }

            updateOverallProgress();
        }

        // Update overall career path progress
        function updateOverallProgress() {
            const allProgressBars = document.querySelectorAll('.course-card .progress-fill');
            let totalProgress = 0;
            let courseCount = 0;

            allProgressBars.forEach(bar => {
                const progressStyle = bar.style.getPropertyValue('--progress');
                if (progressStyle) {
                    totalProgress += parseInt(progressStyle);
                    courseCount++;
                }
            });

            if (courseCount > 0) {
                const overallProgress = Math.round(totalProgress / courseCount);
                const overallProgressBar = document.querySelector('.card .progress-fill');
                const overallProgressText = document.querySelector('.card .progress-text');

                if (overallProgressBar && overallProgressText) {
                    overallProgressBar.style.setProperty('--progress', `${overallProgress}%`);
                    overallProgressText.textContent = `${overallProgress}% Complete`;
                }
            }
        }

        // Add interactive hover effects to course cards
        function addCourseCardInteractions() {
            const courseCards = document.querySelectorAll('.course-card');

            courseCards.forEach(card => {
                card.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 4px 12px rgba(106, 13, 173, 0.15)';
                    this.style.transition = 'all 0.3s ease';
                });

                card.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        }

        // Animate progress bars on page load
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');

            progressBars.forEach((bar, index) => {
                const progress = bar.style.getPropertyValue('--progress') || '0%';
                bar.style.setProperty('--progress', '0%');

                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.setProperty('--progress', progress);
                }, index * 200); // Stagger animations
            });
        }

        // Initialize course completion tracking
        function initializeCourseTracking() {
            // In a real application, this would load from a database or localStorage
            // For now, we'll just track interactions in the session

            const completedCourses = [];
            const inProgressCourses = [];

            // Store course interactions
            window.trackCourseInteraction = function (courseTitle, action) {
                console.log(`Course: ${courseTitle}, Action: ${action}`);
                // In real app: send to analytics or save to database
            };
        }

        // Utility function to show notifications
        function showNotification(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#6a0dad'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

            document.body.appendChild(notification);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Export functions for external use if needed
        window.SkillsPage = {
            startCourse,
            updateCourseProgress,
            showNotification,
            updateOverallProgress
        };
