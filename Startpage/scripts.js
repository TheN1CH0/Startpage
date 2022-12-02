/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Yx519yoLsSfo8yl2","label":"reddit","bookmarks":[{"id":"L1r4c92YEp8nA6eG","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"ekyH1VmntGqjqF2r","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"INeb3kyKTWleY8l9","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"07QgAWgo71kWxCQ6","label":"design tools","bookmarks":[{"id":"KK9rPUciMypChhze","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"4rgYmW1fsAzjKz18","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"8VXVPOGhiZf2SpZb","label":"haikei","url":"https://app.haikei.app/"},{"id":"KvLG0n0etghzUw7X","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"mb5RqupXpn2gNHDN","label":"worth reading","bookmarks":[{"id":"7w7zUGr89QH9gGuf","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"CXDvXZXLTK6wfgWr","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"n7rtcdykJDRuLIom","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"7UsthYz4ffR6SbpQ","label":"sources","bookmarks":[{"id":"f3MdhoeXUaNAOfEQ","label":"icons","url":"https://feathericons.com/"},{"id":"CUn8yBtZFy8uJQRq","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"XqP3aWrfAAIZmoT8","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"7R95vi12sn4Jd1Yr","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
