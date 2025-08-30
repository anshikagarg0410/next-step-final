function signout() {
            if (confirm("Are you sure you want to sign out?")) {
                // Clear session data (in a real environment)
                // sessionStorage.clear();
                // localStorage.clear();

                // Navigate to login page using relative path
                window.location.href = "/";
            }
        }

        // Improved tab functionality with error handling and additional features
        function initializeTabs() {
            const tabs = document.querySelectorAll(".tab");
            const contents = document.querySelectorAll(".tab-content");

            // Check if tabs exist
            if (tabs.length === 0) {
                console.warn("No tabs found with class '.tab'");
                return;
            }

            if (contents.length === 0) {
                console.warn("No tab contents found with class '.tab-content'");
                return;
            }

            // Function to switch tabs
            function switchTab(activeTab) {
                const targetId = activeTab.dataset.tab;
                const targetContent = document.getElementById(targetId);

                if (!targetContent) {
                    console.error(`No content found with ID: ${targetId}`);
                    return;
                }

                // Remove active class from all tabs and contents
                tabs.forEach(tab => tab.classList.remove("active"));
                contents.forEach(content => content.classList.remove("active"));

                // Add active class to clicked tab and corresponding content
                activeTab.classList.add("active");
                targetContent.classList.add("active");

                // Optional: Store active tab in sessionStorage for persistence
                // sessionStorage.setItem('activeTab', targetId);
            }

            // Add click event listeners to tabs
            tabs.forEach(tab => {
                tab.addEventListener("click", (e) => {
                    e.preventDefault(); // Prevent any default action
                    switchTab(tab);
                });

                // Optional: Add keyboard navigation support
                tab.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        switchTab(tab);
                    }
                });

                // Make tabs focusable if they aren't already
                if (!tab.hasAttribute('tabindex')) {
                    tab.setAttribute('tabindex', '0');
                }
            });

            // Optional: Restore previously active tab from sessionStorage
            // const savedTab = sessionStorage.getItem('activeTab');
            // if (savedTab) {
            //     const savedTabElement = document.querySelector(`[data-tab="${savedTab}"]`);
            //     if (savedTabElement) {
            //         switchTab(savedTabElement);
            //         return;
            //     }
            // }

            // Set first tab as active by default if no tab is currently active
            const activeTab = document.querySelector(".tab.active");
            if (!activeTab && tabs.length > 0) {
                switchTab(tabs[0]);
            }
        }

        // Initialize everything when DOM is ready
        function initializePage() {
            // Initialize tabs
            initializeTabs();

            // Add sign out event listener
            const signoutBtn = document.querySelector('.signout');
            if (signoutBtn) {
                signoutBtn.addEventListener('click', signout);
            } else {
                console.warn("Sign out button not found with class '.signout'");
            }
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializePage);
        } else {
            initializePage();
        }

        // Optional: Re-initialize tabs if they are dynamically added
        function reinitializeTabs() {
            initializeTabs();
        }

        // Export functions for external use if needed
        window.TabsAndSignout = {
            reinitializeTabs,
            signout
        };