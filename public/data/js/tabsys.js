
class ThemeSystem {
  constructor() {
    this.config = {}; // is there even a need for this
    this.themes = [];
    this.themeCount = 0;
    this.activeTheme = null;
    this.lastTheme = null;
  }

  getThemeFromName(name) {
    for (let i = 0; i < this.themes.length; i++) {
      if (this.themes[i].getName() == name) {
        return this.themes[i];
      }
    }
  }

  addTheme(theme) {
    for (let i = 0; i < this.themes.length; i++) {
      if (this.themes[i].getName() == theme.getName()) {
        console.error(
          "A theme with the name " + theme.getName() + " already exists!"
        );
        return;
      }
    }
    if (this.lastTheme != theme) {
      this.themes.push(theme);
      this.themeCount++;
    }
    return theme;
  }

  setActiveTheme(theme) {
    if (this.activeTheme != null) {
      this.activeTheme.disable();
    }
    this.activeTheme = theme;
    this.activeTheme.apply();
  }

  getActiveTheme() {
    return this.activeTheme;
  }

  getThemes() {
    return this.themes;
  }

  getThemeCount() {
    return this.themeCount;
  }

  genRanId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  deleteTheme(theme) {
    if (this.themeCount > 1 || force == true) {
      for (let i = 0; i < this.themes.length; i++) {
        if (this.themes[i].id == theme.id) {
          this.themes.splice(i, 1);
          this.themeCount--;
          if (this.activeTheme.id == theme.id) {
            this.setActiveTheme(this.themes[0]);
          }
        }
      }
    }
  }

  deleteThemes(themes) {
    if (this.themeCount > 1) {
      for (let i = 0; i < themes.length; i++) {
        this.deleteTheme(themes[i]);
      }
    }
  }

  genCSS(css) {
    var style = document.createElement("style");
    style.innerHTML = css;
    style.disabled = true;
    document.head.appendChild(style);
    return style;
  }

  genCSSFile(url, enabled) {
    for (let i = 0; i < this.themes.length; i++) {
      if (
        this.themes[i].getCSSElem() &&
        this.themes[i].getCSSElem().href == url
      ) {
        console.error("A theme with the url " + url + " already exists!");
        return;
      }
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
    link.disabled = true;
    if (enabled) link.disabled = false;
    return link;
  }

  getConfig() {
    return this.config;
  }
}

class Theme {
  constructor(elem, name) {
    if (typeof elem == "object") {
      this.csselem = elem;
    } else {
      this.url = elem;
    }
    this.store = elem;
    this.name = name;
    // check for a duplicate theme
    for (let i = 0; i < tHs.getThemes().length; i++) {
      if (tHs.getThemes()[i].getName() == this.name) {
        console.error(
          "A theme with the name " + this.name + " already exists!"
        );
        delete this;
        return;
      }
    }
  }

  apply() {
    if (typeof this.store == "object") {
      this.csselem.disabled = false;
    } else {
      this.csselem = tHs.genCSSFile(this.url, true);
    }
  }

  disable() {
    if (typeof this.store == "object") {
      this.csselem.disabled = true;
    } else {
      this.csselem.remove();
      this.csselem = null;
    }
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getURL() {
    return this.url;
  }

  setURL(url) {
    this.url = url;
  }

  getCSSElem() {
    return this.csselem;
  }

  setCSSElem(elem) {
    this.csselem = elem;
  }
}
// OP TAB SYSTEM V2.2.0

// LICENSE:
/*

        Copyright (c) 2023 Code-Alt
    	
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.

*/

// DOCS:

// here are some prerequisites:
// you must have a tab container, a btn container, a tab template, and a btn template, and a search bar.
// btw this might be hard to set up, set up your own classes and CSS until you find it satisfactory.

// new TabSystem() - Initializes the TabSystem class, used for holding all the information about the tab system, and it's functions.
// TabSystem.addTab(tab) - Adds a tab to the tab system. Returns the tab.
// TabSystem.getTabTemplate() - Returns the tab template.
// TabSystem.getBtnTemplate() - Returns the tab button template.
// TabSystem.createTabBtn(id) - Creates a tab button with the specified id. Returns the tab button.
// TabSystem.createTabFrame(id) - Creates a tab frame with the specified id. Returns the tab frame.
// TabSystem.setActiveTab(tab) - Sets the active tab to the specified tab.
// TabSystem.getActiveTab() - Returns the active tab.
// TabSystem.getTabs() - Returns all tabs.
// TabSystem.getTabCount() - Returns the amount of tabs.
// TabSystem.genRanId() - Generates a random id. Returns the id.
// TabSystem.deleteTab(tab, force) - Deletes the specified tab. If force is true, it will delete the tab even if it's the last tab.
// TabSystem.deleteTabs(tabs, force) - Deletes the specified tabs. If force is true, it will delete the tabs even if it's the last tab.
// TabSystem.deleteAllTabs() - Deletes all tabs.
// TabSystem.deleteAllTabsExcept(tab) - Deletes all tabs except the specified tab.
// TabSystem.deleteAllTabsExceptThese(tabs) - Deletes all tabs except the specified tabs.
// new Tab() - Initializes the Tab class, used for holding all the information about the tab frame and the button used to activate it.
// Tab.getConnectedElement() - Returns the connected element.
// Tab.getTabElement() - Returns the tab element.
// Tab.setTabElement(tabElement) - Sets the tab element.
// Tab.setConnectedElement(connectedElement) - Sets the connected element.

var dp = "Starting Page";
var conf = {};
var mainTS;
var _OPTabSys_callbacks = {
  tabChange: [],
  tabAdd: [],
  tabDelete: [],
};

class TabSystem {
  constructor(object) {
    this.config = {
      tabContainer:
        object.tabContainer || document.getElementById("tabContainer"),
      tabTemplate: object.tabTemplate || document.getElementById("tabTemplate"),
      btnTemplate: object.btnTemplate || document.getElementById("btnTemplate"),
      tabBtnContainer:
        object.tabBtnContainer || document.getElementById("tabBtnContainer"),
      URLBar: object.URLBar || document.getElementById("adrbar"),
      defaultPlaceholder: object.defaultPlaceholder || "Starting Page",
      closePlaceholder: object.closePlaceholder || "No tab open",
      tabActiveClass: object.tabActiveClass || "op-tabs-active",
    };
    conf = this.config;
    dp = this.config.defaultPlaceholder;
    this.tabs = [];
    this.tabCount = 0;
    this.activeTab = null;
    this.config.tabTemplate.style.display = "none";
    this.config.btnTemplate.style.display = "none";
    mainTS = this;
  }

  on(event, callback) {
    switch (event) {
      case "tabChange":
        if (_OPTabSys_callbacks == null) _OPTabSys_callbacks = {};
        if (_OPTabSys_callbacks.tabChange == null)
          _OPTabSys_callbacks.tabChange = [];
        _OPTabSys_callbacks.tabChange.push(callback);
        break;
      case "tabAdd":
        if (_OPTabSys_callbacks == null) _OPTabSys_callbacks = {};
        if (_OPTabSys_callbacks.tabAdd == null) _OPTabSys_callbacks.tabAdd = [];
        _OPTabSys_callbacks.tabAdd.push(callback);
        break;
      case "tabDelete":
        if (_OPTabSys_callbacks == null) _OPTabSys_callbacks = {};
        if (_OPTabSys_callbacks.tabDelete == null)
          _OPTabSys_callbacks.tabDelete = [];
        _OPTabSys_callbacks.tabDelete.push(callback);
        break;
      default:
        return console.error("Invalid event!");
    }
  }

  addTab(tab) {
    this.tabs.push(tab);
    this.tabCount++;
    if (_OPTabSys_callbacks != null) {
      if (_OPTabSys_callbacks.tabAdd != null) {
        for (var i = 0; i < _OPTabSys_callbacks.tabAdd.length; i++) {
          _OPTabSys_callbacks.tabAdd[i](tab);
        }
      }
    }
    return tab;
  }

  getTabTemplate() {
    return this.config.tabTemplate;
  }

  getBtnTemplate() {
    return this.config.btnTemplate;
  }

  createTabBtn(id) {
    const btn = this.getBtnTemplate().cloneNode(true);
    if (id == null) id = "";
    btn.id = id;
    btn.style = btn.style.toString().replace(/display:( )*none(;){0,1}/g, "");
    this.config.tabBtnContainer.appendChild(btn);
    btn.style.width = "0px";
    btn.style.opacity = "0";
    setTimeout(() => {
      btn.style.width = "300px";
      btn.style.opacity = "1";
    }, 0);
    return btn;
  }

  createTabFrame(id) {
    const frame = this.getTabTemplate().cloneNode(true);
    if (id == null) id = "";
    frame.id = id;
    frame.style.display = "none";
    this.config.tabContainer.appendChild(frame);
    return frame;
  }

  setActiveTab(tab) {
    if (_OPTabSys_callbacks != null) {
      if (_OPTabSys_callbacks.tabChange != null) {
        for (var i = 0; i < _OPTabSys_callbacks.tabChange.length; i++) {
          _OPTabSys_callbacks.tabChange[i](tab);
        }
      }
    }
    if (!this.tabs.includes(tab) && tab != null) {
      this.addTab(tab);
    }
    if (this.activeTab != null) {
      this.activeTab.getConnectedElement().classList.remove(this.config.tabActiveClass);
      this.activeTab.setSearchBarContent(this.config.URLBar.value);
      this.activeTab.setPlaceholder(this.config.URLBar.placeholder);
    }
    this.config.URLBar.value = "";
    if (tab != null && tab.getSearchBarContent()) {
      this.config.URLBar.value = tab.getSearchBarContent();
    }
    this.activeTab = tab;
    if (tab != null && this.activeTab.getPlaceholder()) {
      this.config.URLBar.placeholder = this.activeTab.getPlaceholder();
    }
    if (this.activeTab == null) {
      this.config.URLBar.placeholder = this.config.closePlaceholder;
    }
    for (var t = 0; t < this.tabs.length; t++) {
      if (this.tabs[t] == tab && tab != null) {
        if (this.tabs[t].tabElement != null) {
          this.tabs[t].tabElement.style.display = "initial";
        }
        if (this.tabs[t].connectedElement != null) {
          this.tabs[t].connectedElement.classList.add(this.config.tabActiveClass);
        }
      } else {
        if (this.tabs[t].tabElement != null && tab != null) {
          this.tabs[t].tabElement.style.display = "none";
        }
        if (this.tabs[t].connectedElement != null && tab != null) {
          this.tabs[t].connectedElement.classList.remove(this.config.tabActiveClass);
        }
      }
    }
  }

  getActiveTab() {
    return this.activeTab;
  }

  getTabs() {
    return this.tabs;
  }

  getTabCount() {
    return this.tabCount;
  }

  genRanId() {
    return Date.now() + Math.floor(Math.random() * 1000000000);
  }

  deleteTab(tab, force) {
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i] == tab) {
        if (this.tabs[i] == this.activeTab) {
          if (this.tabs[i - 1] != null) {
            this.setActiveTab(this.tabs[i - 1]);
          } else if (this.tabs[i + 1] != null) {
            this.setActiveTab(this.tabs[i + 1]);
          } else {
            if (force != true) {
              return alert("You can't delete the last tab!");
            } else {
              this.setActiveTab(null);
            }
          }
        }
        this.tabs[i].connectedElement.remove();
        this.tabs[i].tabElement.remove();
        this.tabs.splice(i, 1);
        this.tabCount--;
        if (_OPTabSys_callbacks != null) {
          if (_OPTabSys_callbacks.tabDelete != null) {
            for (var tC = 0; tC < _OPTabSys_callbacks.tabDelete.length; tC++) {
              _OPTabSys_callbacks.tabDelete[tC](this.activeTab);
            }
          }
        }
        break;
      }
    }
  }

  deleteTabs(tabs) {
    const tabsToDelete = tabs.slice();
    for (let i = 0; i < tabsToDelete.length; i++) {
      const tab = tabsToDelete[i];
      if (tab === this.activeTab) {
        if (this.tabs[i - 1]) {
          this.setActiveTab(this.tabs[i - 1]);
        } else if (this.tabs[i + 1]) {
          this.setActiveTab(this.tabs[i + 1]);
        } else {
          this.setActiveTab(null);
        }
      }
      tab.connectedElement.remove();
      tab.tabElement.remove();
      this.tabs.splice(this.tabs.indexOf(tab), 1);
      this.tabCount--;
    }
    if (_OPTabSys_callbacks?.tabDelete) {
      _OPTabSys_callbacks.tabDelete.forEach((callback) =>
        callback(this.activeTab)
      );
    }
  }

  deleteAllTabs() {
    this.deleteTabs(this.tabs);
  }

  deleteAllTabsExcept(tab) {
    const tabsToDelete = this.tabs.slice();
    tabsToDelete.splice(tabsToDelete.indexOf(tab), 1);
    this.deleteTabs(tabsToDelete);
  }

  deleteAllTabsExceptThese(tabs) {
    const tabsToDelete = this.tabs.slice();
    tabsToDelete.forEach((tab) => {
      if (tabs.includes(tab)) {
        tabsToDelete.splice(tabsToDelete.indexOf(tab), 1);
      }
    });
    this.deleteTabs(tabsToDelete);
  }

  getConfig() {
    return this.config;
  }
}

class Tab {
  constructor(connectedElement, tabFrame, searchBarContent, placeholder) {
    this.connectedElement =
      connectedElement || mainTS.createTabBtn(mainTS.genRanId());
    this.tabElement = tabFrame || mainTS.createTabFrame(mainTS.genRanId());
    if (searchBarContent == null) searchBarContent = "";
    this.searchBarContent = searchBarContent;
    if (placeholder == null) placeholder = dp;
    this.placeholder = placeholder;
    this.connectedElement.addEventListener("click", () => {
      if (window.tryClose) {
        this.connectedElement.style.width="0px";
        this.connectedElement.style.opacity="0";
        window.setTimeout(() => {
          mainTS.deleteTab(this, window.allowForce);
          window.tryClose = false;
        }, 200);
        return;
      }
      mainTS.setActiveTab(this);
    });
  }

  getConnectedElement() {
    return this.connectedElement;
  }

  getTabElement() {
    return this.tabElement;
  }

  setSearchBarContent(searchBarContent) {
    this.searchBarContent = searchBarContent;
  }

  getSearchBarContent() {
    return this.searchBarContent;
  }

  findFirstIFrame() {
    return this.tabElement.querySelector("iframe");
  }

  hasIFrame() {
    if (this.findIFrame() != null) {
      return true;
    } else {
      return false;
    }
  }

  setPlaceholder(placeholder) {
    this.placeholder = placeholder;
  }

  getPlaceholder() {
    return this.placeholder;
  }
}

window.TabSystem = TabSystem;
window.Tab = Tab;
window.allowForce = true;

window.tHs = new ThemeSystem();

var darkTheme = new Theme(document.getElementById("default-theme"), "Abyss (Moon)"); // I do not have programming ineptitude, it's just that this works and I don't really care to change it from the older version of the theme system.
tHs.addTheme(darkTheme);
tHs.setActiveTheme(darkTheme);


let workerLoaded;

async function worker() {
  return await navigator.serviceWorker.register("/sw.js", {
    scope: "/service",
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  await worker();
  workerLoaded = true;
});

function prependHttps(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

var chosenBackend = localStorage.getItem("backend") || "uv";

function setBackend(backend) {
  localStorage.setItem("backend", backend);
  chosenBackend = backend;
  document.querySelectorAll('.uv, .dynamic').forEach((e) => {
    e.classList.remove('active');
  });
  document.querySelectorAll('.' + backend).forEach((e) => {
    e.classList.add('active');
  });
}

switch (chosenBackend) {
  case "uv":
    document.getElementById("settings-temp").querySelector(".uv").classList.add("active");
    break;
  case "dynamic":
    document.getElementById("settings-temp").querySelector(".dynamic").classList.add("active");
    break;
  default:
    document.getElementById("settings-temp").querySelector(".uv").classList.add("active");
    break;
}

var themeSelected = localStorage.getItem("theme") || "Abyss (Moon)";

function themeSwitch(sel) {
  tHs.setActiveTheme(tHs.getThemeFromName(sel.value));
  document.querySelectorAll("select").forEach((e) => {
    e.value = sel.value;
  });
  localStorage.setItem("theme", sel.value);
}

function log() {
  setTimeout(
    console.log.bind(
      console,
      "%cAbyss Web",
      "background: #6670FF;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px; font-size:30px;"
    )
  );
  setTimeout(
    console.log.bind(
      console,
      "%cIf you are seeing this, the main script system has loaded.",
      "background: #6670FF;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px; font-size:24px;"
    )
  );
  setTimeout(
    console.log.bind(
      console,
      "%cIf you encounter an error, contact the development team on our discord. DM the info below.",
      "background: #6670FF;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px; font-size:16px;"
    )
  );
  setTimeout(
    console.log.bind(
      console,
      "%cDo not share output to anyone but trusted Abyss developers with a role in the server! Someone may steal your info.",
      "background: #6670FF;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px; font-size:16px;"
    )
  );
  let online = navigator.onLine;
  let userAgent = navigator.userAgent;
  let browserName;
  let diagnosticDomain = window.location.href;
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else {
    browserName = "Browser not detected!";
  }
  setTimeout(
    console.log.bind(
      console,
      `%c Information: \n Online: ${online} \n URL: ${diagnosticDomain} \n Browser: ${browserName} \n UA: ${userAgent}`,
      "background: grey;color:white;padding:5px;line-height: 26px; border-radius: 5px;font-size:12px;"
    )
  );
}

log();

function handleAutocomplete(data) {
  var datalist = document.getElementById("autofill-results");
  datalist.innerHTML = "";
  data[1].forEach((element) => {
    var option = document.createElement("option");
    option.value = element;
    datalist.appendChild(option);
  });
}

const recordKeys = (elem, timeLimit) => {
  if (!elem) return;
  elem.placeholder = "Press a key...";
  window.panicKeys = null;
  let savePush = [];
  let firstKeyHit = false;
  const keydownHandler = (e) => {
    if (!firstKeyHit) {
      firstKeyHit = true;
      setTimeout(() => {
        document.removeEventListener("keydown", keydownHandler);
        window.panicKeys = savePush;
        localStorage.setItem("panicKeys", JSON.stringify(savePush));
      }, timeLimit);
    }
    savePush.push(e.key);
    elem.placeholder = "Selected Panic Keys: " + savePush.join(" + ");
    document.querySelectorAll(".panic").forEach((e) => {
      e.placeholder = "Selected Panic Keys: " + savePush.join(" + ");
    });
  };
  document.addEventListener("keydown", keydownHandler);
};

const cloakTitle = (title) => {
  if (title.trim() == "") {
    title = "Abyss";
  }
  document.title = title;
  localStorage.setItem("title", title);
  document.querySelectorAll(".tabTitle").forEach((e) => {
    e.placeholder = title;
  });
};

let savedFavicon;
if (document.querySelector("link[rel*='icon']")) {
  savedFavicon = document.querySelector("link[rel*='icon']").href;
}

const cloakFavicon = (url) => {
  if (url.trim() == "") {
    url = savedFavicon;
  }
  let link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
  localStorage.setItem("favicon", url);
  document.querySelectorAll(".tabIcon").forEach((e) => {
    e.placeholder = url;
  });
};

const cloakURL = (url) => {
  if (url.trim() == "") {
    url = "https://google.com";
  }
  window.panicURL = url;
  localStorage.setItem("panicURL", url);
  document.querySelectorAll(".panicURL").forEach((e) => {
    e.value = url;
  });
};

window.panicURL = localStorage.getItem("panicURL") || "https://google.com";
window.panicKeys = JSON.parse(localStorage.getItem("panicKeys"));

if (window.panicKeys !== null) {
  document.getElementById("settings-temp").querySelector(".panic").placeholder = "Selected Panic Keys: " + window.panicKeys.join(" + ");
}
if (window.panicURL !== null) {
  document.getElementById("settings-temp").querySelector(".panicURL").value = window.panicURL;
}

let hitKeys = [];
let hitKeyRetention = false;
const keydownHandler = (e) => {
  if (window.panicKeys == null) return;
  if (!hitKeyRetention) {
    hitKeyRetention = true;
    setTimeout(() => {
      hitKeyRetention = false;
      hitKeys = [];
    }, 1000);
  }
  hitKeys.push(e.key);
  if (hitKeys.length >= window.panicKeys.length) {
    let hitKeysSet = new Set(hitKeys);
    let panicKeysSet = new Set(window.panicKeys);
    if (
      new Set([...hitKeysSet].filter((x) => panicKeysSet.has(x))).size ===
      panicKeysSet.size
    ) {
      window.open(window.panicURL);
    }
  }
};

document.addEventListener("keyup", keydownHandler);

if (localStorage.getItem("title")) {
  document.title = localStorage.getItem("title");
}

if (localStorage.getItem("favicon")) {
  let link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = localStorage.getItem("favicon");
  document.getElementsByTagName("head")[0].appendChild(link);
}

function addDropElem(name) {
  var select = document.getElementById("themeSelect");
  var option = document.createElement("option");
  option.value = name;
  option.innerText = name;
  select.appendChild(option);
}

async function getThemes() {
  await fetch("/assets/themes.json")
    .then((res) => res.json())
    .then((json) => {
      for (var theme = 0; theme < json.length; theme++) {
        var themeName = json[theme].name;
        var themeURL = json[theme].url;
        console.log(
          "%cDEV:%c Found %c" + themeName + " %c" + themeURL,
          "font-weight: bold",
          "font-weight: normal",
          "font-weight: bold",
          "font-weight: normal"
        );
        tHs.addTheme(new Theme(themeURL, themeName));
        addDropElem(themeName);
      }
    });
}

const openNewtab = () => {
		ts.setActiveTab(ts.addTab(new Tab()));
};

const runService = async (url) => {
  if (url.trim() == "") return;
  if (ts.getActiveTab() == null) {
    openNewtab();
  }
  const activeTab = ts.getActiveTab();
  if (activeTab) {
    const tabElement = activeTab.getTabElement();
    const adrbarInput = document.getElementById("adrbar");
    if (adrbarInput instanceof HTMLInputElement) {
      adrbarInput.value = "";
    }
    const mainStartElement = tabElement.querySelector(".mainStart");
    if (mainStartElement) {
      mainStartElement.style.display = "none";
    }
    if (/^(abyss:)(\/)*[a-z]*/.test(url)) {
      url = url.replace(/^(abyss:)(\/)*/, "");
      const adrbarInputElement = document.getElementById("adrbar");
      if (adrbarInputElement instanceof HTMLInputElement) {
        adrbarInputElement.value = "";
      }
      switch (url) {
        case "newtab":
          const defaultPlaceholder = ts.getConfig().defaultPlaceholder;
          if (tabElement.querySelectorAll(".extFrame").length > 0) {
            tabElement.querySelectorAll(".extFrame").forEach((frame) => {
              frame.remove();
            });
          }
          const firstIFrame = activeTab.findFirstIFrame();
          if (firstIFrame) {
            firstIFrame.remove();
          }
          const newTabTemplate = document
            .querySelector(".mainStartContain")
            .cloneNode(true);
          tabElement.appendChild(newTabTemplate);
          activeTab.getConnectedElement().querySelector("span").innerText =
            "New Tab";
          document.getElementById("adrbar").placeholder = defaultPlaceholder;
          return;
        case "games":
          runService("https://radon.games/");
          return;
        case "settings":
          const settingsPlaceholder = "Abyss Settings (abyss://settings)";
          if (tabElement.querySelectorAll(".extFrame").length > 0) {
            tabElement.querySelectorAll(".extFrame").forEach((frame) => {
              frame.remove();
            });
          }
          const settingsTemplate = document
            .getElementById("settings-temp")
            .cloneNode(true);
          if (settingsTemplate instanceof HTMLDivElement) {
            settingsTemplate.id = "";
            settingsTemplate.style.display = "initial";
            settingsTemplate.querySelector("#themeSelect").value = tHs.getActiveTheme().getName();
            settingsTemplate
              .querySelector("#themeSelect")
              .removeAttribute("id");
            tabElement.appendChild(settingsTemplate);
            settingsTemplate.querySelectorAll(".uv, .dyn").forEach((e) => {
              e.classList.remove("active");
            });
            settingsTemplate.querySelector("." + chosenBackend).classList.add("active");
	    if (window.panicKeys !== null) {
              settingsTemplate.querySelector(".panic").placeholder = "Selected Panic Keys: " + window.panicKeys.join(" + ");
            }            settingsTemplate.querySelector(".panicURL").value = window.panicURL;
            settingsTemplate.querySelector(".tabTitle").placeholder = localStorage.getItem("title") || "Abyss";
            settingsTemplate.querySelector(".tabIcon").placeholder = localStorage.getItem("favicon") || "Default Favicon";
            activeTab.getConnectedElement().querySelector("span").innerText =
              "Settings";
            document.getElementById("adrbar").placeholder = settingsPlaceholder;
          }
          return;
        default:
          if (tabElement.querySelectorAll(".extFrame").length > 0) {
            tabElement.querySelectorAll(".extFrame").forEach((frame) => {
              frame.remove();
            });
          }
          const invalidMainTemplate = document
            .getElementById("invalid-temp")
            .cloneNode(true);
          if (invalidMainTemplate instanceof HTMLDivElement) {
            invalidMainTemplate.id = "";
            invalidMainTemplate.style.display = "initial";
            tabElement.appendChild(invalidMainTemplate);
            activeTab.getConnectedElement().querySelector("span").innerText =
              "Invalid";
          }
          return;
      }
    } else {
      if (tabElement.querySelectorAll(".extFrame").length > 0) {
        tabElement.querySelectorAll(".extFrame").forEach((frame) => {
          frame.remove();
        });
      }
      if (
        !/^(https?:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,30}/i.test(url)
      ) {
        url = "https://www.google.com/search?q=" + url;
      } if (!/^(https?:\/\/)/.test(url)) {
        url = "https://" + url;
      }
      
      activeTab.getConnectedElement().querySelector("span").innerText = "Website";
      const adrbarInputElement = document.getElementById("adrbar");
      if (adrbarInputElement instanceof HTMLInputElement) {
        adrbarInputElement.value = "";
        adrbarInputElement.placeholder = url;
      }
      const iframe = document.createElement("iframe");
      // iframe.src =
      //   "/service/route?url=" +
      //   encodeURIComponent(url);
      switch (chosenBackend) {
        case "uv":
          iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
          break;
        case "dynamic":
          iframe.src =
            "/service/route?url=" +
            encodeURIComponent(url);
          break;
        default:
          iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
          break;
      }
      iframe.className = "extFrame";
      iframe.style.width = "100%";
      iframe.style.height = "calc(100% - 133px)";
      iframe.style.border = "none";
      iframe.style.background = "#111";
      tabElement.appendChild(iframe);
    }
  }
};

// setInterval(() => {
//   window.location.reload();
// }, 1000);

var idleTimeout;
document.getElementById('adrbar').addEventListener('input', function() {
  clearTimeout(idleTimeout);
  var savedInput = document.getElementById('adrbar').value;
  idleTimeout = setTimeout(function() {
    if (document.getElementById('adrbar').value === '') return;
    if (document.getElementById('autocompleteScript'))
      document.getElementById('autocompleteScript').remove();
    if (savedInput === document.getElementById('adrbar').value) {
      var script = document.createElement('script');
      script.id = 'autocompleteScript';
      script.src =
        'https://suggestqueries.google.com/complete/search?client=firefox&q=' +
        document.getElementById('adrbar').value +
        '&callback=handleAutocomplete';
      document.body.appendChild(script);
    }
  }, 0);
});

const ts = new TabSystem({
  tabContainer: document.querySelector("#tabContainer"),
  tabTemplate: document.querySelector("#tabTemplate"),
  btnTemplate: document.querySelector("#tabBtnTemplate"),
  tabBtnContainer: document.querySelector("#tabsBar"),
  URLBar: document.querySelector("#adrbar"),
  defaultPlaceholder: "Insert URL or Type to search...",
  closePlaceholder: "No tabs open, click the plus icon to open a new tab.",
});

const createNewTab = () => {
  ts.setActiveTab(ts.addTab(new Tab()));
}

createNewTab();

document.getElementById('adrbar').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (document.getElementById('adrbar').value === '') return;
    runService(document.getElementById('adrbar').value);
    document.getElementById('adrbar').value;
  }
});

let tb = document.getElementById("tabsBar");
if (tb) {
  tb.addEventListener(
    "wheel",
    (evt) => {
      evt.preventDefault();
      let scrollAmount;
      if (evt.deltaY >= -15 && evt.deltaY <= 15) {
        scrollAmount = evt.deltaY * 20;
      } else {
        scrollAmount = evt.deltaY * 2.5;
      }
      tb.scrollTo({
        left: tb.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    },
    { passive: false }
  );
}

let ad = document.getElementById("adrbar");
if (ad) {
  ad.addEventListener(
    "wheel",
    (evt) => {
      evt.preventDefault();
      let scrollAmount;
      if (evt.deltaY >= -15 && evt.deltaY <= 15) {
        scrollAmount = evt.deltaY * 20;
      } else {
        scrollAmount = evt.deltaY * 2.5;
      }
      ad.scrollTo({
        left: ad.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    },
    { passive: false }
  );
}

const back = () => {
  const activeTab = ts.getActiveTab();
  if (activeTab) {
    const firstIFrame = activeTab.findFirstIFrame();
    if (firstIFrame) {
      firstIFrame.contentWindow.history.back();
    }
  }
}

const forward = () => {
  const activeTab = ts.getActiveTab();
  if (activeTab) {
    const firstIFrame = activeTab.findFirstIFrame();
    if (firstIFrame) {
      firstIFrame.contentWindow.history.forward();
    }
  }
}

const refresh = () => {
  const activeTab = ts.getActiveTab();
  if (activeTab) {
    const firstIFrame = activeTab.findFirstIFrame();
    if (firstIFrame) {
      firstIFrame.contentWindow.location.reload();
    }
  }
}

function opNT() {
  if (ts.getActiveTab() != null) {
    if (ts.getActiveTab().findFirstIFrame() != null) {
      var win = window.open("about:blank", "_blank");
      const frame = document.createElement("iframe");
      frame.src = ts.getActiveTab().findFirstIFrame().src;
      win.document.body.appendChild(frame);
      ts.deleteTab(ts.getActiveTab(), true);
      frame.style.cssText =
        "margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 1000000; border: none; border-radius: 0;";
    }
  }
}

function addDropElem(name) {
		var select = document.getElementById('themeSelect');
		var option = document.createElement('option');
		option.value = name;
		option.innerText = name;
		select.appendChild(option);
}

function getThemes() {
  fetch("assets/themes.json")
    .then((res) => res.json())
    .then((json) => {
      for (var theme = 0; theme < json.length; theme++) {
        var themeName = json[theme].name;
        var themeURL = json[theme].url;
        console.log(
          "%cDEV:%c Found %c" + themeName + " %c" + themeURL,
          "font-weight: bold",
          "font-weight: normal",
          "font-weight: bold",
          "font-weight: normal"
        );
        tHs.addTheme(new Theme(themeURL, themeName));
        addDropElem(themeName);
      }
        if (localStorage.getItem("theme") != null &&  tHs.getThemeFromName(localStorage.getItem("theme"))) {
        tHs.setActiveTheme(tHs.getThemeFromName(localStorage.getItem("theme")));
      }
    });
}

getThemes();
