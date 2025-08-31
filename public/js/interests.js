function signout() {
    if (confirm("Are you sure you want to sign out?")) {
        // Clear session data (in a real environment)
        // sessionStorage.clear();
        // localStorage.clear();
        
        // Navigate to login page using relative path
    window.location.href = "/";
    }
}

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
    prevBtn.addEventListener('click', function() {
        // Navigate back to the profile page using relative path
        window.location.href = '/profile/user';
    });
}

// Add a click event listener to the "Next" button


// Function to collect the user's selected interests
function collectSelectedInterests() {
    const interests = [];
    const checkboxes = document.querySelectorAll('.interest-option input[type="checkbox"]');
    const otherField = document.querySelector('.other-field input[type="text"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Get the text from the parent label element
            const label = checkbox.closest('label');
            const interestText = label.innerText.trim();
            interests.push(interestText);
        }
    });

    if (otherField && otherField.value.trim() !== "") {
        interests.push(otherField.value.trim());
    }

    return interests;
}

// Add visual feedback for checkbox selection
document.addEventListener('DOMContentLoaded', function() {
    const interestOptions = document.querySelectorAll('.interest-option');
    
    interestOptions.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                option.style.borderColor = '#6a0dad';
                option.style.backgroundColor = '#f0e6ff';
            } else {
                option.style.borderColor = '#ccc';
                option.style.backgroundColor = 'white';
            }
        });
        
        // Also trigger on label click
        option.addEventListener('click', function(e) {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
});
