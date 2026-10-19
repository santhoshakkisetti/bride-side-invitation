/* Create the decorative mandala */
(() => {
  let h =
    '<circle r="96"/>' +
    '<circle r="90" stroke-dasharray="1.5 3.5"/>' +
    '<circle r="26"/>' +
    '<circle r="70" stroke-dasharray="1 3"/>';

  for (let i = 0; i < 12; i++) {
    h += `<ellipse cy="-58" rx="11" ry="24" transform="rotate(${i * 30})"/>`;
    h += `<path d="M0-34L6-26 0-18-6-26Z" transform="rotate(${i * 30 + 15})"/>`;
  }

  for (let i = 0; i < 24; i++) {
    h += `<circle cy="-81" r="1.5" fill="currentColor" transform="rotate(${i * 15})"/>`;
  }

  document.getElementById("mand").innerHTML = h;
})();

/* WhatsApp sharing
   Set SITE_URL after publishing the website online.
*/
const SITE_URL = "";
const invitationLink = (SITE_URL || location.href).split("#")[0];

const invitationText =
  "🙏 స్వాతి weds శ్రీహర్ష\n" +
  "You are warmly invited to our wedding on 29 October 2026, Amalapuram.";

const whatsappButton = document.getElementById("wa");

whatsappButton.href =
  "https://wa.me/?text=" +
  encodeURIComponent(invitationText + "\n" + invitationLink);

whatsappButton.onclick = event => {
  if (navigator.share) {
    event.preventDefault();

    navigator.share({
      title: "Swathi weds Sri Harsha",
      text: invitationText,
      url: invitationLink
    }).catch(() => {});
  }
};

/* Background music controls */
const bgm = document.getElementById("bgm");
const musicButton = document.getElementById("music");

async function music(on) {
  if (!bgm) {
    alert("Audio element not found!");
    return;
  }

  if (on) {
    try {
      bgm.volume = 1;
      await bgm.play();
      musicButton?.classList.add("on");
      console.log("Music started successfully");
    } catch (error) {
      console.error("Music playback error:", error);
      alert("Music error: " + error.message);
    }
  } else {
    bgm.pause();
    musicButton?.classList.remove("on");
  }
}

if (musicButton) {
  musicButton.addEventListener("click", () => {
    music(bgm.paused);
  });
}

bgm?.addEventListener("error", () => {
  console.error("Audio file failed to load:", bgm.error);
  alert("Audio file failed to load. Check the MP3 path.");
});

/* Open invitation doors and release falling petals */
document.getElementById("open").onclick = () => {
  document.getElementById("gate").classList.add("open");

  bgm.volume = 0.7;
  music(true);

  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("span");
    const size = 8 + Math.random() * 8;

    petal.className = "petal";

    petal.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size * 1.3}px;
      --t: ${9 + Math.random() * 9}s;
      --dl: ${Math.random() * 8}s;
      --x: ${(Math.random() - 0.5) * 160}px;
    `;

    document.body.appendChild(petal);
  }
};

/* Countdown to wedding muhurtham: Indian Standard Time */
const weddingDate = new Date("2026-10-29T19:31:00+05:30");
const countdown = document.getElementById("count");

function updateCountdown() {
  let seconds = Math.max(
    0,
    Math.floor((weddingDate - Date.now()) / 1000)
  );

  countdown.innerHTML = [
    ["Days", 86400],
    ["Hours", 3600],
    ["Mins", 60],
    ["Secs", 1]
  ].map(([label, unit]) => {
    const value = Math.floor(seconds / unit);
    seconds %= unit;

    return `
      <div>
        <b>${value}</b>
        <span>${label}</span>
      </div>
    `;
  }).join("");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Reveal sections when they enter the screen */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(section => {
  observer.observe(section);
});