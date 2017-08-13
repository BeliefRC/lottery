class Timer {
    //倒计时函数，end截止时间，update时间更新的回调，handle倒计时结束后操作
    countDown(end, update, handle) {
        const now = new Date().getTime();
        const _this = this;
        // 判断是否结束
        if (now - end) {
            handle.call(_this);
        }
        else {
            //倒计时剩余时间
            let lastTime = end - now;
            const theDay = 24 * 60 * 60 * 1000;
            const theHour = 60 * 60 * 1000;
            const theMinute = 60 * 1000;
            const theSecond = 1000;
            let lastDay = Math.floor(lastTime / theDay);
            let lastHour = Math.floor((lastTime - lastDay * theDay) / theHour);
            let lastMinute = Math.floor((lastTime - lastDay * theDay - lastHour * theHour) / theMinute);
            let lastSecond = Math.floor((lastTime - lastDay * theDay - lastHour * theHour - lastMinute * theMinute) / theSecond);
            // 将剩余时间的信息保存到时间结果中
            let timeResult = [];
            if (lastDay > 0) {
                timeResult.push(`<em>${lastDay}</em>`)
            }
            if (timeResult.length || lastHour > 0) {
                timeResult.push(`<em>${lastHour}</em>`)
            }
            if (timeResult.length || lastMinute > 0) {
                timeResult.push(`<em>${lastMinute}</em>`)
            }
            if (timeResult.length || lastSecond > 0) {
                timeResult.push(`<em>${lastSecond}</em>`)
            }
            _this.lastTime = timeResult.join('');
            //更新
            update.call(_this, timeResult.join(''));
            // 每秒轮询一次
            setTimeout(() => {
                _this.countDown(end, update, handle)
            }, 1e3)
        }
    }
}

export default Timer;