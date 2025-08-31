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

            // Get the navigation buttons by their IDs
            const prevBtn = document.getElementById('prevBtn');
            const submitBtn = document.getElementById('submitBtn');

            // Add a click event listener to the "Previous" button
            if (prevBtn) {
                prevBtn.addEventListener('click', function () {
                    // Navigate back to the strengths page using relative path
                    window.location.href = '/profile/strengths';
                });
            } else {
                console.warn("Previous button not found with ID 'prevBtn'");
            }

            // Add visual feedback for goal selections
            addGoalSelectionEffects();

            // Add form validation indicators
            setupValidationIndicators();
        });

        // Handle the complete form submission process
        function handleFormSubmission() {
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn ? submitBtn.textContent : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
            }

            // Collect all form data
            const formData = collectAllFormData();

            // Validate the submission
            const validation = validateSubmission(formData);

            if (!validation.isValid) {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }

                alert(validation.message);
                return;
            }

            // Log the complete data for testing
            console.log("Complete Form Data:", formData);

            // Simulate form submission delay
            setTimeout(() => {
                // Show success message
                showSuccessMessage(formData);

                // Store completion status
                // sessionStorage.setItem('formCompleted', 'true');
                // sessionStorage.setItem('completionTime', new Date().toISOString());

                // Redirect to dashboard after short delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);

            }, 1000);
        }

        // Collect all form data from this page and potentially stored data
        function collectAllFormData() {
            const formData = {
                goals: collectSelectedGoals(),
                personality: collectPersonalityData(),
                timestamp: new Date().toISOString(),
                // Add previously stored data if available
                // interests: JSON.parse(sessionStorage.getItem('userInterests') || '[]'),
                // strengths: JSON.parse(sessionStorage.getItem('userStrengths') || '[]'),
                // profile: JSON.parse(sessionStorage.getItem('studentData') || '{}')
            };

            return formData;
        }

        // Function to collect the user's selected goals
        function collectSelectedGoals() {
            const goals = [];
            const checkboxes = document.querySelectorAll('.goal-box input[type="checkbox"]');

            if (checkboxes.length === 0) {
                // Try alternative selectors
                const fallbackCheckboxes = document.querySelectorAll('.goal-item input[type="checkbox"], .personality-option input[type="checkbox"]');
                return collectGoalsFromCheckboxes(fallbackCheckboxes);
            }

            return collectGoalsFromCheckboxes(checkboxes);
        }

        // Helper function to collect goals from checkboxes
        function collectGoalsFromCheckboxes(checkboxes) {
            const goals = [];

            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const goalBox = checkbox.closest('.goal-box');
                    if (goalBox) {
                        const goalTitle = goalBox.querySelector('.goal-title');
                        if (goalTitle) {
                            goals.push(goalTitle.innerText.trim());
                        } else {
                            // Fallback: use the entire goal box text
                            goals.push(goalBox.textContent.trim().replace(/\s+/g, ' '));
                        }
                    } else {
                        // Alternative fallback for different HTML structures
                        const label = checkbox.closest('label');
                        if (label) {
                            goals.push(label.textContent.trim());
                        }
                    }
                }
            });

            return goals;
        }

        // Collect personality-related data (if any on this page)
        function collectPersonalityData() {
            const personalityData = {};

            // Look for radio buttons or other personality indicators
            const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
            radioButtons.forEach(radio => {
                if (radio.name) {
                    personalityData[radio.name] = radio.value;
                }
            });

            // Look for select dropdowns
            const selects = document.querySelectorAll('select');
            selects.forEach(select => {
                if (select.name && select.value) {
                    personalityData[select.name] = select.value;
                }
            });

            return personalityData;
        }

        // Validate the form submission
        function validateSubmission(formData) {
            if (formData.goals.length === 0) {
                return {
                    isValid: false,
                    message: "Please select at least one goal before submitting!"
                };
            }

            // Add more validation as needed
            if (formData.goals.length > 5) {
                return {
                    isValid: false,
                    message: "Please select no more than 5 goals to focus on."
                };
            }

            return {
                isValid: true,
                message: "Validation passed"
            };
        }

        // Show success message with animation
        function showSuccessMessage(formData) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-overlay';
            successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your profile has been created successfully!</p>
            <p class="success-details">
                ${formData.goals.length} goal${formData.goals.length === 1 ? '' : 's'} selected<br>
                Redirecting to your dashboard...
            </p>
        </div>
    `;

            successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(106, 13, 173, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
    `;

            const style = document.createElement('style');
            style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .success-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            animation: slideUp 0.5s ease;
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .success-icon {
            font-size: 60px;
            color: #27ae60;
            margin-bottom: 20px;
        }
        .success-content h2 {
            color: #6a0dad;
            margin: 10px 0;
        }
        .success-details {
            font-size: 14px;
            color: #666;
            margin-top: 15px;
        }
    `;

            document.head.appendChild(style);
            document.body.appendChild(successMessage);
        }

        // Add visual feedback for goal selections
        function addGoalSelectionEffects() {
            const goalBoxes = document.querySelectorAll('.goal-box, .goal-item');

            goalBoxes.forEach(box => {
                const checkbox = box.querySelector('input[type="checkbox"]');

                if (checkbox) {
                    // Add change event for visual feedback
                    checkbox.addEventListener('change', function () {
                        if (this.checked) {
                            box.style.borderColor = '#6a0dad';
                            box.style.backgroundColor = '#f0e6ff';
                            box.style.transform = 'scale(1.02)';
                            box.style.boxShadow = '0 4px 12px rgba(106, 13, 173, 0.2)';
                        } else {
                            box.style.borderColor = '#ccc';
                            box.style.backgroundColor = 'white';
                            box.style.transform = 'scale(1)';
                            box.style.boxShadow = 'none';
                        }

                        updateSubmitButtonState();
                    });

                    // Add transition for smooth effects
                    box.style.transition = 'all 0.3s ease';

                    // Handle click on the entire box area
                    box.addEventListener('click', function (e) {
                        if (e.target !== checkbox && e.target.type !== 'checkbox') {
                            checkbox.checked = !checkbox.checked;
                            checkbox.dispatchEvent(new Event('change'));
                        }
                    });
                }
            });
        }

        // Update submit button state based on selections
        function updateSubmitButtonState() {
            const submitBtn = document.getElementById('submitBtn');
            const selectedGoals = document.querySelectorAll('input[type="checkbox"]:checked');

            if (submitBtn) {
                if (selectedGoals.length > 0) {
                    submitBtn.style.backgroundColor = '#6a0dad';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                } else {
                    submitBtn.style.backgroundColor = '#ccc';
                    submitBtn.style.opacity = '0.6';
                    submitBtn.disabled = true;
                }
            }
        }

        // Setup validation indicators
        function setupValidationIndicators() {
            updateSubmitButtonState();

            // Add selection counter
            const counter = document.createElement('div');
            counter.id = 'selection-counter';
            counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #6a0dad;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: bold;
        z-index: 1000;
        display: none;
    `;
            document.body.appendChild(counter);

            // Update counter on checkbox change
            document.addEventListener('change', function (e) {
                if (e.target.type === 'checkbox') {
                    const selectedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
                    if (selectedCount > 0) {
                        counter.textContent = `${selectedCount} goal${selectedCount === 1 ? '' : 's'} selected`;
                        counter.style.display = 'block';
                    } else {
                        counter.style.display = 'none';
                    }
                }
            });
        }

        // Export functions for external use if needed
        window.SubmissionPage = {
            handleFormSubmission,
            collectSelectedGoals,
            collectAllFormData,
            signout
        };