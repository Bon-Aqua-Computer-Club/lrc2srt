const fs = require('fs')

const lrc = `${fs.readFileSync('./test/test.lrc')}`

const lrcSplit = lrc.split('\r\n')
lrcSplit.pop()



function parseLine(line) {
  const lineTime = line.split(']')[0].replace('[','').replace('.',',')
  const lineLyric = line.split(']')[1].trim()
  return [lineTime, lineLyric]
}

let counter = 0
let lyricsStr = ''

while (counter < lrcSplit.length-2) {
  const [time0, lyric0] = parseLine(lrcSplit[counter])
  counter += 1
    const [time1] = parseLine(lrcSplit[counter])
    lyricsStr += `${counter}
00:${time0} --> 00:${time1}
${lyric0}

`
}

fs.writeFileSync(`./lyrics-${Date.now()}.srt`, lyricsStr)
