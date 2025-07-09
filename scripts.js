// *--------- Glossary ---------*
// 🎵 Global Audio Setup
// 🎼 Music Toggle
// 🚀 Nav Links Hover + Click
// 🧙‍♂️ Main Menu "Load Character" Loader
// 📚 Inventory Tabs
// 📖 Lore Entry Book Navigation
// 🐉 Lore Entry Story Renderer  <-- only runs on lore entry page


// ===============================
// 🎵 Global Audio Setup
// ===============================
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');
const noClickSound = document.getElementById('noClickSound');
const pageTurnSound = document.getElementById('pageTurnSound');
const medievalFantasyMusic = document.getElementById('medievalFantasyMusic');
const travelerMusic = document.getElementById('travelerMusic');
const harpNstringsMusic = document.getElementById('harpNstringsMusic');
const kingdomMusic = document.getElementById('kingdomMusic');

// Set volumes, with checks for existence
if (hoverSound) hoverSound.volume = 0.9;
if (clickSound) clickSound.volume = 0.9;
if (noClickSound) noClickSound.volume = 0.8; // Ensure this has a volume
if (pageTurnSound) pageTurnSound.volume = 0.7;
if (medievalFantasyMusic) medievalFantasyMusic.volume = 0.9;
if (travelerMusic) travelerMusic.volume = 0.7;
if (harpNstringsMusic) harpNstringsMusic.volume = 0.5;
if (kingdomMusic) kingdomMusic.volume = 1.0;


// ========================================
// 🎼 Music Toggle + Unlock on first click
// ========================================
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.querySelector("audio[id*='Music']");
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  if (bgMusic) {
    bgMusic.play().then(() => {
      if (musicToggle) musicToggle.textContent = "🪕";
    }).catch(() => {
      if (musicToggle) musicToggle.textContent = "⚔️";
    });
  }
}

document.addEventListener("click", () => unlockAudio(), { once: true });

if (musicToggle) {
  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!audioUnlocked) {
      unlockAudio();
    } else if (bgMusic) {
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = "🪕";
      } else {
        bgMusic.pause();
        musicToggle.textContent = "⚔️";
      }
    }
  });
}


// ==================================
// 🚀 All links hover + click sounds
// ==================================
// ===================
// HOVER HANDLERS
// ===================

// Only hover sound on .menu-button if NOT .non-clickable
document.querySelectorAll(".menu-button").forEach(el => {
    el.addEventListener("mouseenter", () => {
        if (!el.classList.contains("non-clickable")) {
            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
            }
        }
    });
});

// Always play hover on back arrow and regular <a> that are NOT inside menu-buttons
document.querySelectorAll("a").forEach(el => {
    el.addEventListener("mouseenter", () => {
        // If inside a menu-button, skip (handled above)
        if (!el.closest(".menu-button")) {
            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
            }
        }
    });
});


// ===================
// CLICK HANDLERS
// ===================

// For menu-button clicks
document.querySelectorAll(".menu-button").forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        if (el.classList.contains("non-clickable")) {
            if (noClickSound) {
                noClickSound.currentTime = 0;
                noClickSound.play().catch(() => {});
            }
        } else {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {});
            }
            const href = el.getAttribute("href");
            if (href) {
                setTimeout(() => {
                    window.location.href = href;
                }, 450);
            }
        }
    });
});

// For regular <a> clicks (like back arrow)
document.querySelectorAll("a").forEach(el => {
    el.addEventListener("click", (e) => {
        if (!el.closest(".menu-button")) {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {});
            }
        }
    });
});

// For sheer buttons
document.querySelectorAll('.sheer-button').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // stop immediate navigation

        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }

        setTimeout(() => {
            window.location.href = link.href;
        }, 450); // adjust delay to match your sound duration
    });
});


// =============================================
// 🧙‍♂️ Main Menu (Index) "Load Character" Loader
// =============================================
const loadCharacterBtn = document.getElementById('loadCharacterBtn');
const loadingMessage = document.getElementById('loadingMessage');

if (loadCharacterBtn) {
    loadCharacterBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Play click sound for this button
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }

        loadCharacterBtn.textContent = 'Loading...';
        loadCharacterBtn.disabled = true;
        loadCharacterBtn.style.cursor = 'not-allowed';
        loadCharacterBtn.style.opacity = '0.7';

        document.querySelectorAll('.menu-button:not(#loadCharacterBtn)').forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });

        if (loadingMessage) loadingMessage.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'character-stats.html';
        }, 800);
    });
    if (loadingMessage) loadingMessage.style.display = 'none';
}


// ===============================
// 📚 Inventory Tabs
// ===============================
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

if (tabs.length) {
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            const target = tab.getAttribute("data-tab");
            const content = document.getElementById(target);
            if (content) content.classList.add("active");

            if (pageTurnSound) { // Using pageTurnSound for tabs too
                pageTurnSound.currentTime = 0;
                pageTurnSound.play().catch(() => {});
            }
        });
    });
}


// =======================================
// 📖 Lore Entry Book Navigation (Arrows)
// =======================================
const arrows = document.querySelectorAll('.arrow');

if (arrows.length) {
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (pageTurnSound) {
                pageTurnSound.currentTime = 0;
                pageTurnSound.play().catch(() => {});
            }
        });
    });
}


// =================================================================
// 🔙 Ensure BACK arrow on all pages plays click sound immediately
// =================================================================
document.querySelectorAll('a[href="mainmenu.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // stop the browser from immediately going to the link

        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }

        setTimeout(() => {
            window.location.href = link.href; // now navigate after the delay
        }, 450); // adjust this ms to match your click sound length
    });
});


// ========================================
// 📖 Lore Entry closed book bounce & open
// ========================================
const closedBook = document.querySelector('.closed-book');

if (closedBook) {
    closedBook.addEventListener('animationend', (e) => {
        if (e.animationName === 'bookBounceOnce') {
            closedBook.classList.remove('bounce');
            closedBook.style.animation = 'floatBounce 2.5s ease-in-out infinite';
        }
    });

    closedBook.addEventListener('click', () => {
        closedBook.style.display = 'none';
        const book = document.querySelector('.book-container');
        if (book) {
            book.style.display = 'block';
            setTimeout(() => {
                book.classList.add('show');
            }, 10);

            // Play page turn sound slightly delayed
            setTimeout(() => {
                if (pageTurnSound) {
                    pageTurnSound.currentTime = 0;
                    pageTurnSound.play().catch(() => {});
                }
            }, 200);

            // ⏳ Slight delay to let book open before inserting side comments
            setTimeout(() => {
                renderPage();
            }, 400); 
        }
    });
}


// ===============================
// 🐉 Lore Entry Story Renderer
// ===============================
if (document.body.id === 'lentry-body') {
    const story = `<center>⚔ Legends of Eldryn ⚔</center>

        Long before mortals carved kingdoms from the earth, Eldryn stood cloaked in silver mists.
        It was an age when dragons soared on sapphire wings, dryads danced through emerald groves, and rivers sang songs older than the sun.

        The world trembled beneath the weight of dreams woven by gods now forgotten.
        Few dare recall these times, for truth sharper than any blade lies waiting.

        The first highborn elves, known as the Syl’darien, emerged beneath moonlit boughs, their laughter bright as falling stars.
        Guided by starlight, they wove towers from living crystal, each spire a hymn to the mysteries of night.

        Yet even in this dawn, shadows gathered. From chasms beneath Eldryn rose nameless horrors, clawing at the veil of the waking world. The Syl’darien found their songs must be tempered with steel. 🗡

        It is told that King Aerion of House Vaelith gathered twelve star-forged knights, their oaths bound by blood and breath, to seal the rift at Tharos Deep.
        Down they marched into blackness, lanterns dimming with each step.
        They faced beasts whose names unmake sanity. Of the twelve, only four returned, their eyes hollow, and none spoke of what they saw.

        Peace returned, fragile as spun glass.The highborn turned inward, courts gleaming with cold splendor, unaware that centuries pass like whispers.

        Men and dwarves rose from mud and stone, carving keeps along Eldryn’s fringes. The old blood watched, amused, never foreseeing how mortal steel might one day topple their moonlit thrones.
        And so came the Breaking. Human warlords, clad in iron and guided by prophets, rallied under banners of sun and hammer.
        
        The elves, for all their old magicks, faltered before the tide. Forests burned, crystal towers shattered. By dawn’s light, the age of the Syl’darien had ended.

        Yet all legends breathe, even in ruin. It is whispered that deep within Eldryn’s hollows, the last blood of Vaelith endures, guarding a blade wrought from starfall, waiting for a hand brave — or foolish — enough to claim it.
        Should you find yourself wandering those mists, tread softly, traveler.
        Some stories sleep lightly, and wake hungry.

        So the world spins on, balanced on the edge of half-remembered pacts.
        Some say Eldryn is merely sleeping, gathering its strength for a bloom of ruin yet unseen.
        
        Others believe the land itself was cursed the moment first blood soaked into its soil, and no cleansing will ever lift that shadow. Between these tales, travelers carve their own fates, often ending as little more than rumors whispered in taverns a hundred leagues away.

        Should you walk these paths, heed the signs: stones etched with eyes that never close, wind that carries voices not your own, and pools that ripple though nothing stirs them.
        Mark well each standing stone and leave offerings of bread and wine.
        Walk onward without pausing to listen to the voices that follow, for they are patient, and once noticed, they seldom let go.

        <center>☀ Prophecy of the Dawnspire ☽</center>
        It is woven in the vaults of starlight,
        etched where mortal eyes dare not lift —
        that when the sun weeps gold
        upon Eldryn’s hills once more,
        the age-old wounds shall mend,
        and rivers sing in silver tongues.

        In that hour,
        a hand shall reach through veils of time,
        to grasp the hilt of a blade
        crowned with dawnfire,
        forged not by kings, nor by gods,
        but by every quiet hope
        that ever blossomed in a mortal heart.

        And Eldryn,
        veiled so long in sorrow’s hush,
        shall awaken clothed
        in songs of emerald and sapphire,
        the laughter of children rising
        where ghosts once walked.

        So let your steps be light
        and your spirit bold,
        for even the smallest breath
        may stir the world,
        and legends, it is said,
        begin always with a single soul
        who dares to dream beyond the dusk.
        `;


    const paragraphs = story.split(/\n\s*\n/).map(p => `<p>${p.trim()}</p>`);
    const title = paragraphs.shift();
    const byline = "by Corvinus Elathar, Chronicler of the Ninth Archive.";

    let pageTexts = [];
    pageTexts.push(`${title}
        <div class="page-symbol">⚜</div>
        <div class="page-footer">${byline}</div>
    `);

    for (let i = 0; i < paragraphs.length; i += 2) {
        let page = paragraphs.slice(i, i + 2).join('');
        pageTexts.push(page);
    }

    pageTexts[pageTexts.length - 1] += `<div class="page-symbol-end">⚜</div>`;

    let pageIndex = 0;

    function applyDropcap(content) {
        if (content.includes("<center")) return content;
        let i = 0, inTag = false;
        while (i < content.length) {
            let char = content[i];
            if (char === "<") inTag = true;
            else if (char === ">") inTag = false;
            else if (!inTag && /[A-Za-z]/.test(char)) {
                return content.slice(0, i) + "<span class='dropcap'>" + char + "</span>" + content.slice(i + 1);
            }
            i++;
        }
        return content;
    }

    function addSideComments() {
        if (pageIndex === pageTexts.length - 3) return;  // Skip adding side comments on the 3rd-from-last page pair

        if (Math.random() >= 0.5) return;

        const sideComments = [
            "👁 You feel as though you are being watched… but by whom?",
            "🔥 The pages feel oddly warm under your hands.",
            "🍃 You think you heard something. Was it the wind?",
            "🖋 Ink seems to pool and dance when you aren’t looking.",
            "📜 The ink on this story smudges, like it's rewriting itself.",
            "🕯 Shadows dance like they're trying to warn you.",
            "💫 You feel lighter, as if gravity forgot you for a breath.",
            "🚪 Somewhere, a door closes. Or did it open?",
            "🌙 The moon seems to listen in silence.",
            "👂 You hear your name, softly, though no lips move.",
            "🌫 Fog coils around your ankles like curious fingers.",
            "🧭 You lose your sense of direction — north feels wrong.",
            "👣 Have you been here before? Or dreamed you had?",
            "⏳ Sand rushes upward in an invisible hourglass.",
            "👣 You spot a second set of footprints beside yours, fading fast.",
            "🌠 You see a shooting star through the window. For a breath, you almost wish.",
            "🔍 You could swear the text shifted when you blinked.",
            "🕯 The candlelight bends strangely, bowing toward you.",
            "👂 You hear your own voice echoing back something you never said.",
            "🍃 The pages flutter, though there’s no breeze.",
            "🫳 Your hand hovers. The paper seems to sigh under your fingers.",
            "🎼 You almost hear a song. When you try to listen, it hides."
        ];

        const pages = [document.getElementById('leftPage'), document.getElementById('rightPage')];

        pages.forEach(page => {
            if (!page.innerHTML.trim()) return;
            if (page.querySelector(".side-comment")) return;

            if (Math.random() < 0.6) {             // 🎯 Each page independently gets a 60% chance
            const commentText = sideComments[Math.floor(Math.random() * sideComments.length)];
            const commentEl = document.createElement("p");
            commentEl.className = "side-comment";
            commentEl.textContent = commentText;
            commentEl.style.color = "rgba(255, 217, 103, 0.76)";
            commentEl.style.textShadow = "1px 1px 0px rgba(43, 7, 0, 0.8)";
            commentEl.style.opacity = "0";
            commentEl.style.transition = "opacity 5s ease";

            const paragraphs = page.querySelectorAll("p");
            if (paragraphs.length) {
                const randIndex = Math.floor(Math.random() * paragraphs.length);
                paragraphs[randIndex].after(commentEl);
            } else {
                page.appendChild(commentEl);
            }

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    commentEl.style.opacity = "1";
                });
            });
        }
    });
}

    function renderPage() {
        const leftPage = document.getElementById('leftPage');
        const rightPage = document.getElementById('rightPage');
        const totalPages = pageTexts.length;

        let leftContent = pageTexts[pageIndex] || "";
        let rightContent = pageTexts[pageIndex + 1] || "";

        if (pageIndex < totalPages - 2) leftContent = applyDropcap(leftContent);
        if (pageIndex + 1 < totalPages - 2) rightContent = applyDropcap(rightContent);

        leftPage.innerHTML = leftContent;
        rightPage.innerHTML = rightContent;

        document.querySelector('.nav-left').style.display = (pageIndex === 0) ? 'none' : 'block';
        document.querySelector('.nav-right').style.display = (pageIndex + 2 >= totalPages) ? 'none' : 'block';

        requestAnimationFrame(() => {
            addSideComments();
        });
    }

    window.nextPage = function() {
        if (pageIndex + 2 < pageTexts.length) {
            pageIndex += 2;
            renderPage();
            if (pageTurnSound) {
                pageTurnSound.currentTime = 0;
                pageTurnSound.play().catch(() => {});
            }
        }
    };

    window.prevPage = function() {
        if (pageIndex - 2 >= 0) {
            pageIndex -= 2;
            renderPage();
            if (pageTurnSound) {
                pageTurnSound.currentTime = 0;
                pageTurnSound.play().catch(() => {});
            }
        }
    };

}