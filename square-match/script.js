
'use strict';
// ==================== CONFIG ====================
const COLS = 8, ROWS = 8, TYPES = 5, MOVES_START = 30, MATCH_MIN = 3;
const POWER_NONE = null, POWER_BOMB = 'bomb', POWER_RAINBOW = 'rainbow';
const TYPE_RAINBOW = -2; // tipo virtual para no matchear por color

// ==================== STATE ====================
let board = []; // [r][c] -> { type:number|null, power:'bomb'|'rainbow'|null, el:HTMLElement }
let selected = null; // {r,c}
let busy = false; let score = 0; let moves = MOVES_START;
let lastMove = null; // {from:{r,c}, to:{r,c}}

// ==================== DOM ====================
const $board = document.getElementById('board');
const $score = document.getElementById('score');
const $moves = document.getElementById('moves');
const $restart = document.getElementById('restart');

// ==================== UTILS ====================
const rand = n => Math.floor(Math.random() * n);
const inBounds = (r, c) => r >= 0 && r < ROWS && c >= 0 && c < COLS;
const isAdj = (a, b) => Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1;

function renderCandy(cell) {
    const el = cell.el; while (el.firstChild) el.removeChild(el.firstChild);
    if (cell.type === null && cell.power !== POWER_RAINBOW) return;
    const candy = document.createElement('div');
    if (cell.power === POWER_RAINBOW) {
        candy.className = 'candy power-rainbow';
    } else {
        candy.className = `candy t-${cell.type}`;
        if (cell.power === POWER_BOMB) candy.classList.add('power-bomb');
    }
    el.appendChild(candy);
}

function visibleType(cell) {
    return (cell.power === POWER_RAINBOW) ? TYPE_RAINBOW : cell.type;
}

function makeCell(r, c, t) {
    const cell = document.createElement('div');
    cell.className = 'cell'; cell.dataset.r = r; cell.dataset.c = c;
    const node = { type: t, power: POWER_NONE, el: cell };
    renderCandy(node);
    cell.addEventListener('pointerdown', onSelect);
    return node;
}

function fillBoard(initial = false) {
    for (let r = 0; r < ROWS; r++) {
        if (!board[r]) board[r] = [];
        for (let c = 0; c < COLS; c++) {
            if (!board[r][c]) {
                const t = rand(TYPES);
                const cell = makeCell(r, c, t);
                board[r][c] = cell; $board.appendChild(cell.el);
                if (initial) {
                    gsap.set(cell.el, { scale: 0 });
                    gsap.to(cell.el, { scale: 1, duration: .25, delay: (r * COLS + c) * 0.01, ease: 'back.out(1.8)' });
                }
            }
        }
    }
    // evitar matches gratis iniciales
    let tries = 0; while (findMatches().size > 0 && tries < 50) {
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
            const t = rand(TYPES); board[r][c].type = t; board[r][c].power = POWER_NONE; renderCandy(board[r][c]);
        }
        tries++;
    }
}

function onSelect(e) {
    if (busy || moves <= 0) return;
    const r = +e.currentTarget.dataset.r, c = +e.currentTarget.dataset.c;
    if (!selected) { selected = { r, c }; board[r][c].el.classList.add('selected'); return; }
    const a = selected, b = { r, c };
    board[a.r][a.c].el.classList.remove('selected'); selected = null;
    if (isAdj(a, b)) attemptSwap(a, b); else { selected = b; board[r][c].el.classList.add('selected'); }
}

function swapData(a, b) {
    const A = board[a.r][a.c], B = board[b.r][b.c];
    const tmpT = A.type; A.type = B.type; B.type = tmpT;
    const tmpP = A.power; A.power = B.power; B.power = tmpP;
    renderCandy(A); renderCandy(B);
}

async function animateSwap(a, b, { yoyo = false } = {}) {
    const A = board[a.r][a.c].el, B = board[b.r][b.c].el;
    const gap = parseFloat(getComputedStyle($board).gap) || 0;
    const dx = (b.c - a.c) * (A.offsetWidth + gap);
    const dy = (b.r - a.r) * (A.offsetHeight + gap);
    const tl = gsap.timeline();
    tl.to(A, { x: dx, y: dy, duration: .18, ease: 'power1.inOut' }, 0)
        .to(B, { x: -dx, y: -dy, duration: .18, ease: 'power1.inOut' }, 0);
    if (yoyo) {
        tl.to(A, { x: 0, y: 0, duration: .18, ease: 'power1.inOut' })
            .to(B, { x: 0, y: 0, duration: .18, ease: 'power1.inOut' }, '<');
    } else {
        tl.add(() => { gsap.set([A, B], { clearProps: 'x,y' }); });
    }
    await tl;
}

function findMatches() {
    const set = new Set();
    // horizontales
    for (let r = 0; r < ROWS; r++) {
        let runT = visibleType(board[r][0]), start = 0;
        for (let c = 1; c <= COLS; c++) {
            const t = c < COLS ? visibleType(board[r][c]) : -1;
            if (t !== runT) {
                if (runT !== null && runT !== TYPE_RAINBOW && c - start >= MATCH_MIN) { for (let k = start; k < c; k++) set.add(`${r},${k}`); }
                runT = t; start = c;
            }
        }
    }
    // verticales
    for (let c = 0; c < COLS; c++) {
        let runT = visibleType(board[0][c]), start = 0;
        for (let r = 1; r <= ROWS; r++) {
            const t = r < ROWS ? visibleType(board[r][c]) : -1;
            if (t !== runT) {
                if (runT !== null && runT !== TYPE_RAINBOW && r - start >= MATCH_MIN) { for (let k = start; k < r; k++) set.add(`${k},${c}`); }
                runT = t; start = r;
            }
        }
    }
    return set;
}

function buildRuns() {
    const runs = [];
    // horizontales
    for (let r = 0; r < ROWS; r++) {
        let runT = visibleType(board[r][0]), start = 0;
        for (let c = 1; c <= COLS; c++) {
            const t = c < COLS ? visibleType(board[r][c]) : -1;
            if (t !== runT) {
                const len = c - start;
                if (runT !== null && runT !== TYPE_RAINBOW && len >= MATCH_MIN) { const cells = []; for (let k = start; k < c; k++) cells.push({ r, c: k }); runs.push({ orientation: 'h', len, type: runT, cells }); }
                runT = t; start = c;
            }
        }
    }
    // verticales
    for (let c = 0; c < COLS; c++) {
        let runT = visibleType(board[0][c]), start = 0;
        for (let r = 1; r <= ROWS; r++) {
            const t = r < ROWS ? visibleType(board[r][c]) : -1;
            if (t !== runT) {
                const len = r - start;
                if (runT !== null && runT !== TYPE_RAINBOW && len >= MATCH_MIN) { const cells = []; for (let k = start; k < r; k++) cells.push({ r: k, c }); runs.push({ orientation: 'v', len, type: runT, cells }); }
                runT = t; start = r;
            }
        }
    }
    return runs;
}

async function attemptSwap(a, b) {
    busy = true; lastMove = { from: a, to: b };

    // Caso especial: ARCOÍRIS + color — limpia todas las del color (y bombas encadenan)
    const A = board[a.r][a.c], B = board[b.r][b.c];
    const isRainbowA = (A.power === POWER_RAINBOW);
    const isRainbowB = (B.power === POWER_RAINBOW);

    await animateSwap(a, b, { yoyo: false });
    swapData(a, b);

    if (isRainbowA || isRainbowB) {
        const color = isRainbowA ? board[b.r][b.c].type : board[a.r][a.c].type;
        if (color !== null && color !== TYPE_RAINBOW) {
            const toClear = new Set();
            for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (board[r][c].type === color || board[r][c].power === POWER_BOMB) toClear.add(`${r},${c}`);
            // incluir las dos del swap
            toClear.add(`${b.r},${b.c}`); toClear.add(`${a.r},${a.c}`);
            const runs = buildRuns();
            moves--; updateHUD();
            await resolveBoard(toClear, runs);
            busy = false; return;
        }
    }

    let matches = findMatches();
    if (matches.size === 0) {
        swapData(a, b);
        await animateSwap(a, b, { yoyo: true });
        busy = false; return;
    }
    const runs = buildRuns();
    moves--; updateHUD();
    await resolveBoard(matches, runs);
    busy = false;
}

function addNeighbors(set, r, c) {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc; if (dr === 0 && dc === 0) continue; if (inBounds(nr, nc)) set.add(`${nr},${nc}`);
    }
}

async function resolveBoard(matches, runs) {
    let total = 0; let firstIteration = true;
    while (matches.size > 0) {
        // expandir bombas con reacción en cadena
        const expanded = new Set(matches);
        let changed = true;
        while (changed) {
            changed = false;
            const snap = Array.from(expanded);
            for (const kx of snap) { const [rr, cc] = kx.split(',').map(Number); if (board[rr][cc].power === POWER_BOMB) { const before = expanded.size; addNeighbors(expanded, rr, cc); if (expanded.size > before) changed = true; } }
        }

        // Crear especial (primera iteración): arcoíris EXACTAMENTE 5; si no, bomba EXACTAMENTE 4
        let protectKey = null; let makePower = null; // 'bomb' | 'rainbow'
        if (firstIteration && runs) {
            const isMoveCell = (pos, cell) => pos && pos.r === cell.r && pos.c === cell.c;
            const runs5 = runs.filter(run => run.len === 5);
            const runs4 = runs.filter(run => run.len === 4);
            let target = null;
            if (runs5.length) {
                for (const run of runs5) {
                    if (run.cells.some(cell => isMoveCell(lastMove?.to, cell))) { target = lastMove.to; break; }
                    if (run.cells.some(cell => isMoveCell(lastMove?.from, cell))) { target = lastMove.from; break; }
                }
                if (!target) target = runs5[0].cells[Math.floor(runs5[0].cells.length / 2)];
                makePower = POWER_RAINBOW;
            } else if (runs4.length) {
                for (const run of runs4) {
                    if (run.cells.some(cell => isMoveCell(lastMove?.to, cell))) { target = lastMove.to; break; }
                    if (run.cells.some(cell => isMoveCell(lastMove?.from, cell))) { target = lastMove.from; break; }
                }
                if (!target) target = runs4[0].cells[1] || runs4[0].cells[0];
                makePower = POWER_BOMB;
            }
            if (target) { const key = `${target.r},${target.c}`; if (expanded.has(key)) protectKey = key; }
        }

        const cells = [...expanded].map(k => { const [r, c] = k.split(',').map(Number); return { r, c, ref: board[r][c] }; });
        // puntaje: 10 por celda normal; specials creados no suman de inmediato
        total += cells.length - (protectKey ? 1 : 0);

        // animar caramelos (excepto protegido)
        const candies = cells.filter(({ r, c }) => `${r},${c}` !== protectKey).map(({ ref }) => ref.el.firstElementChild).filter(Boolean);
        if (candies.length) await gsap.to(candies, { scale: 0, duration: .2, ease: 'back.in(1.7)' });

        // quitar/limpiar (excepto protegido)
        for (const { r, c, ref } of cells) { if (`${r},${c}` === protectKey) continue; if (ref.el.firstChild) ref.el.firstChild.remove(); ref.type = null; ref.power = POWER_NONE; }

        // si hay protegido -> convertirlo
        if (protectKey) { const [pr, pc] = protectKey.split(',').map(Number); const cell = board[pr][pc]; cell.power = makePower; if (makePower === POWER_RAINBOW) { cell.type = null; } renderCandy(cell); }

        gsap.set(cells.map(({ ref }) => ref.el), { clearProps: 'scale' });
        await dropCells();
        await spawnNew();
        matches = findMatches(); runs = buildRuns(); firstIteration = false; protectKey = null; makePower = null;
    }
    score += total * 10; updateHUD(); runTests();
}

async function dropCells() {
    const animations = [];
    for (let c = 0; c < COLS; c++) {
        const vals = []; const pows = [];
        for (let r = ROWS - 1; r >= 0; r--) { if (board[r][c].type !== null || board[r][c].power === POWER_RAINBOW) { vals.push(board[r][c].type); pows.push(board[r][c].power); } }
        for (let r = ROWS - 1, idx = 0; r >= 0; r--) {
            const t = idx < vals.length ? vals[idx] : null;
            const p = idx < vals.length ? pows[idx] : POWER_NONE; idx++;
            board[r][c].type = t; board[r][c].power = p; renderCandy(board[r][c]);
            if (t !== null || p === POWER_RAINBOW) animations.push(gsap.fromTo(board[r][c].el, { y: -16 }, { y: 0, duration: .14, ease: 'power2.out' }));
        }
    }
    await Promise.all(animations.map(a => a.then ? a : Promise.resolve()));
}

async function spawnNew() {
    const anims = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c].type === null && board[r][c].power !== POWER_RAINBOW) {
                board[r][c].type = rand(TYPES); board[r][c].power = POWER_NONE; renderCandy(board[r][c]);
                anims.push(gsap.from(board[r][c].el, { y: -20, duration: .15 }));
            }
        }
    }
    await Promise.all(anims.map(a => a.then ? a : Promise.resolve()));
}

function updateHUD() { $score.textContent = score; $moves.textContent = moves; }

function reset() { busy = false; selected = null; score = 0; moves = MOVES_START; updateHUD(); $board.innerHTML = ''; board = []; fillBoard(true); runTests(); }

// ==================== TESTS ====================
function matrix(r, c) { return board[r]?.[c]; }
function transformIsZero(el) { const t = getComputedStyle(el).transform; if (!t || t === 'none') return false; const m = t.match(/matrix\(([^)]+)\)/); if (!m) return false; const parts = m[1].split(',').map(parseFloat); const a = parts[0], d = parts[3]; return (Math.abs(a) < 0.001 || Math.abs(d) < 0.001); }
function runTests() {
    try {
        // T1: coherencia DOM/type (incluye arcoíris)
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
            const cell = matrix(r, c);
            if ((cell.type !== null || cell.power === POWER_RAINBOW)) { if (!cell.el.firstElementChild) throw new Error(`T1 @${r},${c}`); }
            else { if (cell.el.firstElementChild) throw new Error(`T1b @${r},${c}`); }
        }
        // T2: celdas sin scale:0
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (transformIsZero(matrix(r, c).el)) throw new Error(`T2 @${r},${c}`);
        // T3: no gaps en columnas
        for (let c = 0; c < COLS; c++) { let solid = false; for (let r = ROWS - 1; r >= 0; r--) { const cell = matrix(r, c); const filled = (cell.type !== null || cell.power === POWER_RAINBOW); if (filled) solid = true; else if (solid) throw new Error(`T3 col ${c}`); } }
        // T4: bombas marcadas
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { const cell = matrix(r, c); if (cell.power === POWER_BOMB) { if (!cell.el.querySelector('.power-bomb')) throw new Error(`T4 bomb @${r},${c}`); } }
        // T5: arcoíris marcado
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { const cell = matrix(r, c); if (cell.power === POWER_RAINBOW) { if (!cell.el.querySelector('.power-rainbow')) throw new Error(`T5 rainbow @${r},${c}`); } }

    } catch (err) { console.error(err) }
}

$restart.addEventListener('click', reset);

// init
document.documentElement.style.setProperty('--cols', COLS);
fillBoard(true); 