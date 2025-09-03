var _localStorage = {
  save: function (key, name, value) {
      if (!key) return "";
      if (window.localStorage)
          return window.localStorage.setItem(key + "_" + name, value);

      var saveObj = {}
      try {
          saveObj = JSON.parse(window.top.name);
      } catch (e) {
          saveObj[key] = {};
          window.top.name = "";
      }

      if (!saveObj[key]) {
          saveObj[key] = {};
          window.top.name = "";
      }
      saveObj[key][name] = String(value);
      window.top.name = JSON.stringify(saveObj);
  },
  load: function (key, name) {
      if (!key) return "";
      if (window.localStorage)
          return window.localStorage.getItem(key + "_" + name) || "";

      var saveObj = {}
      try {
          saveObj = JSON.parse(window.top.name);
      } catch (e) {
          return "";
      }

      if (!saveObj[key]) return "";

      return saveObj[key][name] || "";
  },
  remove: function (key, name) {
      if (!key) return "";
      if (window.localStorage)
          return window.localStorage.removeItem(this.key + "_" + name);

      var saveObj = {}
      try {
          saveObj = JSON.parse(window.top.name);
      } catch (e) {
          return "";
      }

      if (!saveObj[key]) return "";

      delete saveObj[key][name];
  },
  removeAll: function () {
      if (window.localStorage)
          return window.localStorage.clear();
      window.top.name = "";
  }
}

function get_storage(key, name) {
  return new Promise(resolve => {
      let is_data = _localStorage.load(key, name);
      if (is_data) {
          resolve(JSON.parse(is_data));
      } else {
          resolve(null);
      }
  });
}

function set_storage(key, name, data) {
  _localStorage.save(key, name, JSON.stringify(data));
}

// KbcActive 코드 통합
(function (root, name, factory) {
  if (root[name]) {
      throw new Error(name + " already defined.")
  } else {
      root[name] = factory();
  }
}(window, "KbcActive", function () {
  return (function (modules) {
      var exports = {}

      modules.forEach(function (m) {
          var module = { name: "", exports: {} };
          m.call(module.exports, module, exports);
          if (module.name) exports[module.name] = module.exports;
      });

      return exports;
  }([
      // 속성 정의
      (function (mod, EXP) {
          Object.defineProperties(EXP, {
              wrap: { value: { main: null } },
              isInit: {
                  value: false, writable: true, enumerable: true
              }
          });

          EXP.modeCallback = function () { };
      }),
      // 초기화 함수
      (function (mod, EXP) {
          function init(p, time) {
              EXP.wrap.main = document.body.querySelector(".main") || null;
              if (EXP.wrap.main.reset) EXP.wrap.main.reset();
              EXP.event.reset();
              EXP.isInit = true;
          }
          mod.name = "init";
          mod.exports = init;
      }),
      // 보안 서약서 작성 완료 이벤트
      (function (mod, EXP) {
          var event = {}

          event.finish = function () {
              try {
                  EXP.wrap.main.classList.add("event_finished");
              } catch (e) { }
          }

          event.reset = function () {
              try {
                  EXP.wrap.main.classList.remove("event_finished");
              } catch (e) { }
          }

          mod.name = "event";
          mod.exports = event;
      })
  ]));
}));

function oathend() {
  console.log("보안 서약서 제출 완료")
  $("#type11.typeA").addClass("over")
  Player.currentTime = Player.duration
  endFlag = true;
  toolTipFlag = true;
  progressControll = "Y";
  setTimeout(() => {
    quizComplete2()
  }, 400);
}

window.addEventListener("DOMContentLoaded", async () => {
  const replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}]/gi;
  const wraps = {
      belong: document.body.querySelector("#belong"),
      idNum: document.body.querySelector("#id_num"),
      name: document.body.querySelector("#name"),
      confirmBtn: document.body.querySelector("button.ck_ok")
  };
  const data = { belong: null, idNum: null, name: '' }
  const storageKey = "pledge";
  const storageName = "user";

  let getData = await get_storage(storageKey, storageName);
  if (!getData) {
      data.belong = "인사과";
      data.idNum = 20000201001;
      data.name = "홍길동";
  } else {
      data.belong = getData.belong;
      data.idNum = parseInt(getData.idNum, 10);
      data.name = getData.name;
  };

  wraps.belong.placeholder = data.belong;
  wraps.idNum.placeholder = data.idNum;
  wraps.name.placeholder = data.name;

  if (data.name == "홍길동") {
      data.name = wraps.name.value = "";
  } else {
      wraps.name.value = data.name;
      setTimeout(() => {
          KbcActive.event.finish();
      }, 1000);
  }

  wraps.belong.addEventListener("input", function () {
      data.belong = this.value;
  });

  wraps.idNum.addEventListener("input", function () {
      data.idNum = this.value;
  });

  wraps.name.addEventListener("input", function () {
      var x = this.value;
      if (x.length > 0 && x.match(replaceChar)) {
          x = x.replace(replaceChar, "");
      }
      this.value = x;
      data.name = this.value;
  });

  wraps.confirmBtn.addEventListener("click", function () {
      if (data.name == "" || data.belong == "" || data.idNum == "") {
          alert("입력되지 않은 문항이 있습니다.");
          return;
      }
      set_storage(storageKey, storageName, data);
      KbcActive.event.finish();
      alert(data.name + "님의 보안서약서 작성이 완료되었습니다.");
      oathend()
  });
});