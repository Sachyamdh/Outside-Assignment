document.addEventListener("DOMContentLoaded", () => {
  const socialIcons = [
    {
      href: "https://facebook.com",
      icon: "mdi:facebook",
      alt: "Facebook",
    },
    {
      href: "https://twitter.com",
      icon: "mdi:twitter",
      alt: "Twitter",
    },
    {
      href: "https://instagram.com",
      icon: "mdi:instagram",
      alt: "Instagram",
    },
    {
      href: "https://youtube.com",
      icon: "mdi:youtube",
      alt: "YouTube",
    },
    {
      href: "https://linkedin.com",
      icon: "mdi:linkedin",
      alt: "LinkedIn",
    },
  ];

  const footerItems = [
    ["About", "Impact", "Our Approach", "Programs"],
    ["Resources", "Get Involved", "Financials", "Careers", "Contact"],
  ];

  const socialIconsContainer = document.getElementById("social-icons");
  const footerItemsContainer = document.getElementById("footer-items");

  socialIcons.forEach((icon) => {
    const a = document.createElement("a");
    a.href = icon.href;
    a.target = "_blank";
    const span = document.createElement("span");
    span.classList.add("iconify");
    span.setAttribute("data-icon", icon.icon);
    span.setAttribute("data-inline", "false");
    span.setAttribute("alt", icon.alt);
    a.appendChild(span);
    socialIconsContainer.appendChild(a);
  });

  footerItems.forEach((group) => {
    const div = document.createElement("div");
    div.classList.add("item-holder");

    group.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      div.appendChild(span);
    });

    footerItemsContainer.appendChild(div);
  });
});
