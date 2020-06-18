export function CountDownTimer(dt, countDownHandler) {
    const end = new Date(dt);
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    const _day = _hour * 24;
    let timer;

    function showRemaining() {
        const now = new Date();
        const distance = end - now;

        // 시간 종료 시 뜨는 문구
        if (distance < 0) {
            clearInterval(timer);
            countDownHandler("곧 시작합니다!");
            //document.getElementById(id).innerHTML = '곧 시작합니다!';
            return null;
        }

        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);

        countDownHandler({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
    }

    timer = setInterval(showRemaining, 1000);
    return timer;
}