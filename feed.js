'use strict'

const fs        = require('fs')
const Rss       = require('rss')
const loadJson  = require('load-json-file')

let feedOptions = {
    title: 'Sweet and Sour',
    description: 'A podcast about this Asian American life',
    feed_url: 'http://sweetandsour.fm/feed/episodes.rss',
    site_url: 'http://sweetandsour.fm',
    image_url: 'http://sweetandsour.fm/feed/assets/img/sweetandsour.png' ,
    docs: 'https://cyber.harvard.edu/rss/rss.html',
    managingEditor: 'to.kzhu@gmail.com (katie zhu)',
    webMaster: 'to.kzhu@gmail.com (katie zhu)',
    copyright: '2016 Sweet and Sour FM',
    language: 'en',
    categories: ['Culture','Lifestyle','Asian America'],
    pubDate: 'December 21, 2016 08:00:00 GMT',
    ttl: '60',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      {'itunes:subtitle': 'A show about this Asian American life'},
      {'itunes:explicit': 'clean'},
      {'itunes:author': 'katie zhu and Nicole Zhu'},
      {'itunes:summary': 'Sweet and Sour is a show exploring different facets of Asian American life.'},
      {'itunes:owner': [
        {'itunes:name': 'katie zhu and Nicole Zhu'},
        {'itunes:email': 'to.kzhu@gmail.com'}
      ]},
      {'itunes:image': {
        _attr: {
          href: 'http://sweetandsour.fm/feed/assets/img/sweetandsour.png'
        }
      }},
      {'itunes:category': [
        {_attr: {
          text: 'Society & Culture'
        }},
        {'itunes:category': {
          _attr: {
            text: 'Personal Journals'
          }
        }}
      ]}
    ]
  }

let feed = new Rss(feedOptions)

loadJson('./dist/assets/data/episodes.json').then(episodeJson => {
  let episodeList = episodeJson.rows
  let episode

  for (var i = 0; i < episodeList.length; i++) {
    episode = episodeList[i]

    feed.item({
    title: episode.title,
    description: episode.description,
    url: episode.url,
    date: episode.date,
    guid: 'http://sweetandsour.fm/feed/assets/audio' + episode.guid,
    enclosure: {
      url: episode.url,
      length: episode.bytelength,
      type: 'audio/m4a'
    },
    author: 'katie zhu and Nicole Zhu',
    custom_elements: [
        {'itunes:author': episode.itunesauthor},
        {'itunes:subtitle': episode.itunessubtitle},
        {'itunes:image': {
          _attr: {
            href: episode.itunesimage
          }
        }},
        {'itunes:duration': episode.itunesduration }
      ]
    })
  }

  var xml = feed.xml()

  fs.writeFileSync('episodes.rss', xml, 'utf8')
})
