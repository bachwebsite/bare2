const cloaks = [
  {
    name: "ixl",
    title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish",
    favicon: "https://www.ixl.com/favicon.ico",
  },
  {
    name: "clever",
    title: "Clever | Portal",
    favicon: "https://assets.clever.com/launchpad/1b48a8a36/favicon.ico",
  },
  {
    name: "desmos",
    title: "Desmos | Graphing Calculator",
    favicon: "https://www.desmos.com/favicon.ico",
  },
  {
    name: "zearn",
    title: "Zearn Math | K-5 Curriculum and Software",
    favicon:
      "https://assets.clever.com/resource-icons/apps/59125d8d4775fe00010a9d36/icon_e2efc1d.png",
  },
  {
    name: "dbq",
    title: "DBQ Online",
    favicon: "https://www.dbqonline.com/favicon.ico",
  },
  {
    name: "renaissance-learning",
    title: "Renaissance Learning",
    favicon:
      "https://s3-us-west-1.amazonaws.com/app-link-icons/nYAxbXKQkKe7aoLRzKUq_renaissance.jpg",
  },
  {
    name: "iready",
    title: "i-Ready | K-12 Adaptive Diagnostic for Reading and Mathematics",
    favicon:
      "https://assets.clever.com/resource-icons/apps/5148b6242e35482071000011/icon_964188f.png",
  },
  {
    name: "pear-assessment",
    title: "Pear Assessment",
    favicon:
      "https://assets.clever.com/resource-icons/apps/543eaa9c3d4d990610003bf1/icon_a6d8184.png",
  },
  {
    name: "greatminds",
    title: "Great Minds | Math, ELA, Science Curriculum",
    favicon:
      "https://assets.clever.com/resource-icons/apps/5f0f6640b5d38d000191cc4a/icon_eaf8cd5.png",
  },
  {
    name: "learning-ally",
    title: "Learning Ally | Dyslexia Solutions for Home and School",
    favicon:
      "https://assets.clever.com/resource-icons/apps/59d2cbeed0184000016c7a02/icon_754714b.png",
  },
  {
    name: "il-classroom",
    title: "Classes | IL Classroom",
    favicon:
      "https://assets.clever.com/resource-icons/apps/555134fd1174ee0100000002/icon_9cdc134.png",
  },
  {
    name: "parent-square",
    title: "ParentSquare",
    favicon: "https://www.parentsquare.com/favicon.ico",
  },
  {
    name: "khan-academy",
    title: "Khan Academy | Free Online Courses, Lessons & Practice",
    favicon: "https://www.khanacademy.org/favicon.ico",
  },
  {
    name: "gmail",
    title: "Gmail",
    favicon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
  },
  {
    name: "classroom",
    title: "Home",
    favicon: "//ssl.gstatic.com/classroom/ic_product_classroom_144.png",
  },
  {
    name: "google",
    title: "Google",
    favicon: "https://www.google.com/favicon.ico",
  },
  {
    name: "drive",
    title: "Google Drive: Sign-in",
    favicon:
      "https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico",
  },
  {
    name: "kami",
    title: "Kami | Digital Classroom Assistant",
    favicon: "/data/images/kami.png",
  },
];

const selectElement = document.getElementById("cloakSelect");

function printWithColor(a, b) {console.log("%c" + a, "color:" + b + ";font-weight:bold");}

function populateSelectOptions(cloaks) {
  cloaks.forEach((cloak) => {
    const option = document.createElement("option");
    option.value = cloak.name;
    option.textContent = cloak.name;
    printWithColor("created option: " + option.textContent, "#00ff00");
    selectElement.appendChild(option);
  });
}

populateSelectOptions(cloaks);

selectElement.addEventListener("change", function (event) {
  const selectedOption = event.target.value;
  const selectedCloak = cloaks.find((cloak) => cloak.name === selectedOption);
  const existingTitle = document.querySelector("head title");
  if (existingTitle) {
    existingTitle.remove();
  }
  const newTitle = document.createElement("title");
  newTitle.textContent = selectedCloak.title;
  document.head.appendChild(newTitle);
  const existingFavicon = document.querySelector('head link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.remove();
  }
  const newFavicon = document.createElement("link");
  newFavicon.rel = "icon";
  newFavicon.href = selectedCloak.favicon;
  document.head.appendChild(newFavicon);

  localStorage.setItem("selectedCloak", JSON.stringify(selectedCloak));
});

function updateTitleAndFavicon(selectedCloak) {
  const existingTitle = document.querySelector("head title");
  if (existingTitle) {
    existingTitle.remove();
  }
  const newTitle = document.createElement("title");
  newTitle.textContent = selectedCloak.title;
  document.head.appendChild(newTitle);

  const existingFavicon = document.querySelector('head link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.remove();
  }
  const newFavicon = document.createElement("link");
  newFavicon.rel = "icon";
  newFavicon.href = selectedCloak.favicon;
  document.head.appendChild(newFavicon);

  printWithColor(newTitle.textContent, "yellow");
  printWithColor(newFavicon.href, "yellow");
}

window.addEventListener("load", function () {
  const storedCloak = JSON.parse(localStorage.getItem('selectedCloak'));
  if (storedCloak) {
    updateTitleAndFavicon(storedCloak);
    const existingTitle = document.querySelector("head title");
    if (existingTitle) {
      existingTitle.remove();
    }
    const newTitle = document.createElement("title");
    newTitle.textContent = storedCloak.title;
    document.head.appendChild(newTitle);

    const existingFavicon = document.querySelector('head link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = storedCloak.favicon;
    document.head.appendChild(newFavicon);
    printWithColor(newTitle.textContent, "yellow");
    printWithColor(newFavicon.href, "yellow");
  }
});
