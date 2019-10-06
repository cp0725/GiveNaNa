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

const domTopic = document.querySelector('#topic')
const domAnswer = document.querySelector('#answer')
const domReturn = document.querySelector('#return')
const moveWidth = 800  // 移动端宽度临界值
const isMove = window.screen.width < moveWidth
if (isMove){
  document.querySelector('body').id = 'move'
  domAnswer.style.display = 'none'
}

const requireAll = req => req.keys().map(req)
const req = require.context('./chapter', false /* 不查询子目录 */, /\.md$/)
const mdList = requireAll(req)

const targetDom = config.target.map((item, index) => {
  const className = index < mdList.length ? 'get' : ''
  return `<p class="${className}" attr-index="${index}"> ${item} </p>`
}).join('')
const targetWrap = document.createElement('div')
targetWrap.innerHTML = '<h1>目标</h1>' + targetDom
domTopic.appendChild(targetWrap)

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
domTopic.appendChild(planWrap)

domTopic.addEventListener('click', _e => {
  const className = _e.target.className
  const index = _e.target.getAttribute('attr-index')
  if (className === '' || index === null) return
  const mdStr = mdList[Number(index)]
  const repStr = '<a target="_blank" href='
  const mdHtml = marked(mdStr).replace(/<a href=/g, repStr)
  domAnswer.innerHTML = mdHtml
  if (isMove){
    domTopic.style.display = 'none'
    domAnswer.style.display = 'block'
    domReturn.style.display = 'block'
  }
})

domReturn.addEventListener('click', _e => {
  domTopic.style.display = 'block'
  domAnswer.style.display = 'none'
  domReturn.style.display = 'none'
})

domAnswer.innerHTML = marked(markdown)

// 热更新
// declare const module: any
// module.hot && module.hot.accept()