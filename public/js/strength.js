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
            const nextBtn = document.getElementById('nextBtn');

            // Add a click event listener to the "Previous" button
            if (prevBtn) {
                prevBtn.addEventListener('click', function () {
                    // Navigate back to the interests page using relative path
                    window.location.href = '/profile/interests';
                });
            } else {
                console.warn("Previous button not found with ID 'prevBtn'");
            }


            // Add visual feedback for checkbox selections
            addStrengthSelectionEffects();
        });

        // Function to collect the user's selected strengths
        function collectSelectedStrengths() {
            const strengths = [];
            const checkboxes = document.querySelectorAll('.strength-options input[type="checkbox"]');

            if (checkboxes.length === 0) {
                console.warn("No strength checkboxes found with selector '.strength-options input[type=\"checkbox\"]'");
                // Fallback: try different selectors
                const fallbackCheckboxes = document.querySelectorAll('input[type="checkbox"]');
                if (fallbackCheckboxes.length > 0) {
                    console.log("Using fallback checkbox selector");
                    return collectFromCheckboxes(fallbackCheckboxes);
                }
                return [];
            }

            return collectFromCheckboxes(checkboxes);
        }

        // Helper function to collect data from checkboxes
        function collectFromCheckboxes(checkboxes) {
            const strengths = [];

            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    // Get the text from the parent label element
                    const label = checkbox.closest('label');
                    if (label) {
                        const strengthText = label.innerText.trim();
                        strengths.push(strengthText);
                    } else {
                        // Fallback: try to get text from next sibling or parent
                        const parent = checkbox.parentElement;
                        if (parent) {
                            const text = parent.textContent.trim();
                            if (text && text !== '') {
                                strengths.push(text);
                            }
                        }
                    }
                }
            });

            return strengths;
        }

        // Add visual feedback for strength selections
        function addStrengthSelectionEffects() {
            const strengthOptions = document.querySelectorAll('.strength-options label, .strength-option');

            if (strengthOptions.length === 0) {
                // Try alternative selectors
                const alternativeOptions = document.querySelectorAll('label:has(input[type="checkbox"]), .option, .strength-item');
                strengthOptions.push(...alternativeOptions);
            }

            strengthOptions.forEach(option => {
                const checkbox = option.querySelector('input[type="checkbox"]');

                if (checkbox) {
                    // Add change event for visual feedback
                    checkbox.addEventListener('change', function () {
                        if (this.checked) {
                            option.style.borderColor = '#6a0dad';
                            option.style.backgroundColor = '#f0e6ff';
                            option.style.transform = 'scale(1.02)';
                        } else {
                            option.style.borderColor = '#ccc';
                            option.style.backgroundColor = 'white';
                            option.style.transform = 'scale(1)';
                        }
                    });

                    // Add transition for smooth effects
                    option.style.transition = 'all 0.3s ease';

                    // Handle click on the entire option area
                    option.addEventListener('click', function (e) {
                        if (e.target !== checkbox) {
                            checkbox.checked = !checkbox.checked;
                            checkbox.dispatchEvent(new Event('change'));
                        }
                    });
                }
            });
        }

        // Function to show selection count (optional enhancement)
        function showSelectionCount() {
            const selectedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
            let countDisplay = document.querySelector('.selection-count');

            if (!countDisplay) {
                countDisplay = document.createElement('div');
                countDisplay.className = 'selection-count';
                countDisplay.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: #6a0dad;
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            z-index: 1000;
        `;
                document.body.appendChild(countDisplay);
            }

            if (selectedCount > 0) {
                countDisplay.textContent = `${selectedCount} strength${selectedCount === 1 ? '' : 's'} selected`;
                countDisplay.style.display = 'block';
            } else {
                countDisplay.style.display = 'none';
            }
        }

        // Add real-time selection count updates
        document.addEventListener('change', function (e) {
            if (e.target.type === 'checkbox') {
                showSelectionCount();
            }
        });

        // Export functions for external use if needed
        window.StrengthsPage = {
            collectSelectedStrengths,
            signout,
            addStrengthSelectionEffects
        };
