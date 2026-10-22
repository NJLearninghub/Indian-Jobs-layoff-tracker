/*
 * Small runtime that gives the tracker page the same `dash` API it uses inside
 * Claude, backed by the JSON files in /data. Edit DATASETS to add a source.
 */
(function () {
  const DATASETS = {
    events: 'data/layoffs.json',
    sectors: 'data/sectors.json',
    hiring: 'data/hiring.json',
    demand: 'data/demand.json',
    workforce: 'data/workforce.json',
    govt: 'data/govt.json',
    signals: 'data/signals.json',
    risk_rules: 'data/risk_rules.json',
  };
  const DEFAULT_PARAMS = { year: 'All', sector: 'All', segment: 'All' };

  const store = {};
  const calcs = {};
  const calcCache = {};
  const listeners = [];
  let params = { ...DEFAULT_PARAMS };
  let version = 0;

  Object.keys(DATASETS).forEach((id) => { store[id] = { status: 'loading', data: [], message: '' }; });

  function notify() {
    version++;
    listeners.forEach((fn) => {
      try { fn(); } catch (e) { console.error(e); }
    });
  }

  function load(id) {
    const v = (window.DATA_VERSION || '');
    return fetch(DATASETS[id] + (v ? '?v=' + v : ''), { cache: 'no-cache' })
      .then((r) => { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then((j) => {
        const rows = Array.isArray(j) ? j : j.rows || j.data || j.results || [];
        store[id] = { status: 'ok', data: rows, columns: rows.length ? Object.keys(rows[0]) : [], message: '' };
      })
      .catch((e) => { store[id] = { status: 'error', data: [], message: String(e.message || e) }; })
      .finally(notify);
  }

  function data(id) {
    if (calcs[id]) {
      const c = calcs[id];
      const ins = c.inputs.map((i) => data(i));
      if (ins.some((x) => x.status === 'error')) return { status: 'error', data: [], message: 'An input failed to load' };
      if (ins.some((x) => x.status !== 'ok')) return { status: 'loading', data: [] };
      if (calcCache[id] && calcCache[id].v === ins.map((x) => x.data.length).join(',') + '|' + ins.map((x) => x.data).length) return calcCache[id].res;
      let res;
      try { res = { status: 'ok', data: c.fn(...ins.map((x) => x.data)) }; }
      catch (e) { console.error(e); res = { status: 'error', data: [], message: String(e.message || e) }; }
      calcCache[id] = { v: ins.map((x) => x.data.length).join(',') + '|' + ins.length, res };
      return res;
    }
    return store[id] || { status: 'missing', data: [] };
  }

  let resizeTimer, lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; notify(); } }, 150);
  });

  window.dash = {
    data,
    calc(id, def) { calcs[id] = { inputs: def.inputs || [], fn: def.fn }; },
    loader() {},
    onData(fn) { listeners.push(fn); try { fn(); } catch (e) { console.error(e); } },
    params() { return { ...params }; },
    setParams(p) { params = { ...params, ...p }; notify(); },
    resetParams() { params = { ...DEFAULT_PARAMS }; notify(); },
    refresh() {},
    setLink(name) { try { history.replaceState(null, '', '#' + name); } catch (e) { /* ignore */ } },
    colors: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ec4899', '#06b6d4', '#f97316', '#84cc16'],
  };

  Object.keys(DATASETS).forEach(load);
})();
