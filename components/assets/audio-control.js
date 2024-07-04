import zapAudio from '../../public/audio/laser.mp3'
import engineAudio from '../../public/audio/engine.mp3'
import engine2Audio from '../../public/audio/engine2.mp3'
import bgAudio from '../../public/audio/bg.mp3'
import warpAudio from '../../public/audio/warp.mp3'
import clickAudio from '../../public/audio/click.mp3'
import explosionAudio from '../../public/audio/explosion.mp3'

const mp3 = { explosion: explosionAudio }

const zap = new Audio(zapAudio)
const engine = new Audio(engineAudio)
const engine2 = new Audio(engine2Audio)
const bg = new Audio(bgAudio)
const warp = new Audio(warpAudio)
const click = new Audio(clickAudio)
const explosion = new Audio(explosionAudio)

export { zap, engine, engine2, bg, warp, click, explosion, mp3 }
