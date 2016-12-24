'use strict'

const fs        = require('fs')
const rss       = require('node-rss')
const loadJson  = require('load-json-file')

let title = 'Sweet and Sour'
let link = 'http://sweetandsour.fm'
let desc = 'A podcast about this Asian American life'
let author = 'katie zhu and Nicole Zhu'
let feedLink = 'http://sweetandsour.fm/feed.rss'
let options = {
  'image_url': 'http://sweetandsour.fm/assets/img/sweetandsour.png',
  'itunes:subtitle': 'A show about this Asian American life',
  'itunes:image': 'http://sweetandsour.fm/assets/img/sweetandsour.png',
  'itunes:summary': 'Sweet and Sour is a podcast exploring different facets of Asian American life.',
  'itunes:category': 'Society & Culture',
  'copyright': '2016 Sweet and Sour FM',
  custom_namespaces: {
    'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
  }
}

let feed = rss.createNewFeed(title, link, desc, author, feedLink, options)

loadJson('./dist/assets/data/episodes.json').then(episodeJson => {
  let episodeList = episodeJson.rows
  let episode

  for (var i = 0; i < episodeList.length; i++) {
    episode = episodeList[i]

    let itemTitle = episode.title
    let itemLink = episode.url
    let pubDate = episode.date
    let description = episode.description
    let fields = {
      'itunes:author': episode.itunesauthor,
      'itunes:subtitle': episode.itunessubtitle,
      'itunes:image': episode.itunesimage,
      'itunes:duration': episode.itunesduration
    }

    feed.addNewItem(itemTitle, itemLink, pubDate, description, fields)
  }

  console.warn('feed with items!!', rss.getFeedXML(feed))
  var xml = rss.getFeedXML(feed)
  console.log(xml)

  fs.writeFileSync('feed.rss', xml, 'utf8')
})
