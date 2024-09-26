// Wait helper function
function wait(ms) {
    return new Promise(time => setTimeout(time, ms));
}

// On page load
// Checks if the last page was an article. If so, do not
// play the sidebar in animation again.
window.onload = function() {
    // If we came from the homepage
    if (window.location.search.indexOf('?fromArticle=true') !== 0) {
        // Play sidebar in animation
        document.getElementById("sidebar").style.animation = "0.7s ease-out sidebarIn";
    }
}

function coverUp() {
    document.getElementById("screen-gal").style.top = "10%";
    document.getElementById("screen-cover").style.bottom = "100%";
}

function toHomeFromArticle() {
    // 1.5s to allow additional time for article to stay blacked out
    document.getElementById("article").style.animation = "1.5s ease-out articleOut"
    document.getElementById("sidebar").style.animation = "1s ease-out sidebarOut"
    wait(700).then(() => { 
        window.location.href = "index.html";
    });
}

function gotoPage(from, moveTo, destination) {
    console.log(from);
    var galleryChildren = document.getElementById("screen-gal").children;
    for (let i = 0; i < galleryChildren.length; i++) {
        if (galleryChildren[i] != from) {
            galleryChildren[i].style.opacity = "0%";
        }
        from.style.left = "" + moveTo + "%";
        // Wait for slide animation to finish, then fade the clicked card
        wait(1000).then(() => { 
            from.style.opacity = "0%";
            // Wait again for clicked card to fade, then load new page
            wait(1000).then(() => {
                window.location.href = destination;
            });
        });

    }
}

//