(function () {
    const gModule = {
        symbols: { 1: '✕', 0: '⚪' },
        win: {},
        turn: false,
        moves: 0,
        getChar: function () {
            this.turn = !this.turn;
            return this.turn ? [this.symbols[1]] : [this.symbols[0]];
        },
        playSound: (e) => new Audio(`./${e}.mp3`).play(),
        isWin: function (c, n) {
            for (let i = 0; i < this.win[c].length; i++) {
                this.win[c][i] = this.win[c][i].replace(n, '');
                if (this.win[c][i] == '') {
                    this.playSound('win');
                    this.setStatus(`Player "${c}" Won!!`);
                    document.getElementById("reload").classList.remove("hidden");
                    return true;
                }
            }
        },
        setStatus: function (msg) {
             const c = document.createElement("li");
            c.innerHTML = msg;
            document.getElementById("status").appendChild(c);
        },
        isDraw: function () {
            if (this.moves < 9)
                return false;

            this.playSound('draw');
            this.setStatus(`Match Draw...`);
            document.getElementById("reload").classList.remove("hidden");

        },
        start: function () {
            const playArea = document.getElementById("play-area");
            const winMap = ['123', '456', '789', '147', '258', '369', '357', '159'];
            this.win = {
                [this.symbols[1]]: [...winMap],
                [this.symbols[0]]: [...winMap]
            }
            for (let i = 1; i < 10; i++) {
                setTimeout(() => {
                    const block = document.createElement("div");
                    block.className = "block";
                    block.setAttribute("index", i);
                    playArea.appendChild(block);
                }, i * 100);
            }

            const _this = this;
            playArea.addEventListener("click", function (e) {
                const el = e.target;
                if (el.innerHTML == "") {
                    _this.moves++;
                    const c = _this.getChar();
                    const position = el.getAttribute("index");
                    _this.setStatus(`Player "${c}" choose ${position}.`);
                    el.innerHTML = c;
                    _this.playSound('click');
                    _this.isWin(c, position) || _this.isDraw();
                }
            })
        }
    }.start()
})();