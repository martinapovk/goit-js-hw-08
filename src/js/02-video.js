import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

import { load, save } from './storage.js';

const iframeRef = document.querySelector('iframe');
const CURRENT_TIME_KEY = 'videoplayer-current-time';

let currentTime = load(CURRENT_TIME_KEY) ?? 0;
const player = new Player(iframeRef);

player.setCurrentTime(currentTime);
player.on('timeupdate', throttle(timeUpdateHandle, 1000));

function timeUpdateHandle(data) {
  currentTime = data.seconds;
  save(CURRENT_TIME_KEY, currentTime);
}
