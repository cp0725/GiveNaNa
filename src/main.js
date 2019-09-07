/*
 * @Author: 常培
 * @Date: 2019-08-24 17:14:53
 * @LastEditTime: 2019-09-06 21:54:33
 * @Description: main.js
 */
import marked from 'marked'
import config from './config'
import markdown from './markdown.md'
import './style/style.css'
import './style/md.css'

const requireAll = req => req.keys().map(req)
const req = require.context('./chapter', false /* 不查询子目录 */, /\.md$/)
const mdList = requireAll(req)

const targetDom = config.target.map((item, index) => {
  const className = index < mdList.length ? 'get' : ''
  return `<p class="${className}" attr-index="${index}"> ${item} </p>`
}).join('')
const targetWrap = document.createElement('div')
targetWrap.innerHTML = '<h1>目标</h1>' + targetDom
document.querySelector('#topic').appendChild(targetWrap)

const startTime = 1566172800000 // 2019-08-19
const interval = 604800000 // 7天 
const planDom = config.plan.map((item, index) => {
  const planTime = (index + 1) * interval + startTime
  const nowTime = Date.now()
  const className = nowTime > planTime ? 'past' : ''
  return `<p class="${className}"> ${item} ${className && '(应完成)'}</p>`
}).join('')
const planWrap = document.createElement('div')
planWrap.innerHTML = '<h1>计划</h1>' + planDom
document.querySelector('#topic').appendChild(planWrap)

document.querySelector('#topic').addEventListener('click', _e => {
  const className = _e.target.className
  const index = _e.target.getAttribute('attr-index')
  if (className === '' || index === null) return
  const mdStr = mdList[Number(index)]
  const repStr = '<a target="_blank" href='
  const mdHtml = marked(mdStr).replace(/<a href=/g, repStr)
  document.querySelector('#answer').innerHTML = mdHtml
})

document.querySelector('#answer').innerHTML = marked(markdown)

// 热更新
// declare const module: any
// module.hot && module.hot.accept()