console.log("common");

//변환
var trance = {
    //px삭제
    px: function (n) {
        n = n
            .split("px")
            .join("")
        return parseInt(n, 10)
    },
    //문자로 변환
    str: function (n) {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    },
    //배열로 변환
    array: function (n) {
        n = n
            .split(" ")
            .join("");
        return n.split(",");
    },
    //숫자로 변환
    number: function (n) {
        return parseInt(n, 10);
    },
    //아이콘 키로 변환
    icon: function (n) {
        switch (n) {
            case 'prev_play':
                return "backward"
                break;
            case 'play':
                return "play"
                break;
            case 'next_play':
                return "forward"
                break;
            case 'script':
                return "align-justify"
                break;
            case 'mute':
                return "volume-up"
                break;
            case 'full':
                //return "compress"
                return "expand"
                break;
            case 'replay':
                return "redo-alt"
                break;
            case 'additional':
                return "book"
                break;
            case 'index':
                return "th-large"
                break;
            case 'rate':
                return "clock"
                break;
            default:
        }
    },
    //밀리초로 변환
    mili: function (n) {
        return parseInt(n, 10) / 1000;
    },
    //초를 시간, 분, 초로 변환
    sec: function (n) {
        n = Math.round(n);
        var _hour = Math.floor(n / 3600);
        var _min = Math.floor((n - (_hour * 360)) / 60);
        var _sec = n - (_hour * 360) - (_min * 60);
        if (_hour > 0) {
            return trance.str(_hour) + ":" + trance.str(_min) + ":" + trance.str(_sec);
        } else {
            return trance.str(_min) + ":" + trance.str(_sec);
        }
    },
    //시간, 분, 초를 변환
    convertSec: function (n) {
        var _timeArray = n.split(":");
        let _sec = 0;
        if (_timeArray.length == 0) {
            return _sec;
        }

        _sec += Number(_timeArray.pop());
        if (_timeArray.length > 0) {
            _sec += trance.convertSec(_timeArray.join(":")) * 60;
        }

        return _sec;
    },
    korean: function (n) {
        //일부 단어를 번역하여 리턴
        switch (n) {
            case 'play':
                return "재생"
                break;
            case 'script':
                return "자막"
                break;
            case 'rate':
                return "배속"
                break;
            case 'mute':
                return "음량조절"
                break;
            case 'full':
                return "전체화면"
                break;
            case 'index':
                return "인덱스"
                break;
            case 'additional':
                return "부가메뉴"
                break;
            case 'PIP':
                return "PIP"
                break;

            case 'hand':
                return "수화"
                break;
            case 'down':
                return "교안 다운로드"
                break;

            case 'etc':
                return "기타"
                break;
            case 'road':
                return "러닝맵"
                break;
            case 'info':
                return "화면안내"
                break;
            case 'teacher':
                return "강사소개"
                break;
            case 'keyboard':
                return "단축키안내"
                break;
            case 'kor':
                return "한국어"
                break;
            case 'eng':
                return "영어"
                break;
            case 'chi':
                return "중국어"
                break;
            case 'jap':
                return "일본어"
                break;

            default:
        }
    }
}

//체크
var check = {
    //기기체크
    device: function () {
        var _device = (
            /iphone|ipad|macintosh|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())
        );
        if (_device) {
            var _userAgent = navigator
                .userAgent
                .toLowerCase();
            if ((_userAgent.search("android") > -1) && (_userAgent.search("mobile") > -1)) {
                return "ANDROID";
            } else if ((_userAgent.search("android") > -1) && !(_userAgent.search("mobile") > -1)) {
                return "ANDROID TABLET";
            } else if ((_userAgent.search("blackberry") > -1)) {
                return "BLACKBERRY";
            } else if ((_userAgent.search("iphone") > -1)) {
                return "IPHONE";
            } else if ((_userAgent.search("ipod") > -1)) {
                return "IPOD";
            } else if ((_userAgent.search("ipad") > -1)) {
                return "IPAD";
            } else if ((_userAgent.search("macintosh") > -1)) {
                return "IPAD";
            } else {
                return "UNKNOW";
            }
        } else {
            return "PC";
        }
    },
    //비디오 타입 체크
    video: function (n) {
        if (check.device() == "PC") {
            return "mp4";
        } else {
            if (n == "mp4" || n == "intro" || n == "html") {
                return "mp4";
            } else {
                if (_htmlmp4 && n.indexOf("quiz") != -1) {
                    return "mp4";
                }
                if (_htmlmp4 && n.indexOf("drag") != -1) {
                    return "mp4";
                }
                if (_htmlmp4 && n.indexOf("line") != -1) {
                    return "mp4";
                }
                if (_htmlmp4 && n.indexOf("icheck") != -1) {
                    return "mp4";
                }
                return "mp3";
            }
        }
    }
}

//Cookie
var cookie = {
    get: function (name) {
        if (localStorage) {
            return localStorage.getItem(name);
        } else {
            var _cookieArr = document
                .cookie
                .split(";");
            for (var _i = 0; _i < _cookieArr.length; _i++) {
                var _cookiePair = _cookieArr[_i].split("=");

                if (name == _cookiePair[0].trim()) {
                    return decodeURIComponent(_cookiePair[1]);
                }
            }

            return null;
        }
        return null
    },
    set: function (cname, cvalue) {
        if (localStorage) {
            localStorage.setItem(cname, cvalue);
        } else {
            var d = new Date();
            d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + "domain=mega.iptime.or" +
                    "g;path=/";
        }
    }
}