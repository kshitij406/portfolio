'use client';

import { useEffect, useRef, useState, type ReactNode, type ComponentType } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Heart,
  Mail,
  FileDown,
  SquareTerminal,
  Trash2,
  Wifi,
  Volume2,
  LogOut,
  Search,
  X,
  Minus,
  Square,
  ExternalLink,
  Coffee,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaSpotify } from 'react-icons/fa6';
import LetterboxdMark from '@/components/LetterboxdMark';
import { useDemo } from '@/components/DemoProvider';
import { setTheme } from '@/lib/theme';
import { PROFILE, SOCIAL_LINKS } from '@/data/site';
import { EXPERIENCE, EDUCATION, PROJECTS, STACK, OFF_CLOCK, FACTS } from '@/data/content';

const TASKBAR_H = 48;

// Pinned launchers next to the start button, distinct from the running-app
// list next to them, the way a real taskbar separates "things you might
// open" from "things that are open".
const PINNED_IDS = ['about', 'projects', 'terminal'];

type IconComp = ComponentType<{ size?: number | string; className?: string; style?: React.CSSProperties }>;

type AppDef = {
  id: string;
  name: string;
  sub: string;
  Icon: IconComp;
  color: string;
  category: 'About' | 'Development' | 'Internet';
  desktop?: boolean;
  w?: number;
  h?: number;
} & ({ kind: 'window'; render: () => ReactNode } | { kind: 'link'; href: string } | { kind: 'action'; run: () => void });

/**
 * One entry per "app". `kind: 'window'` opens a Window with `render()` as
 * its body; `'link'` and `'action'` never open a window, they just fire and
 * (for a start menu click) close the menu. This is the whole start menu and
 * the whole desktop icon layer, all sections included.
 */
function useApps(): AppDef[] {
  const { openDemo } = useDemo();

  return [
    {
      id: 'about',
      name: 'About Me',
      sub: PROFILE.role,
      Icon: User,
      color: '#3daee9',
      category: 'About',
      desktop: true,
      kind: 'window',
      w: 460,
      h: 420,
      render: () => (
        <div className="kde-app">
          <h3>{PROFILE.name}</h3>
          <p>{PROFILE.blurb}</p>
          {FACTS.map((f) => (
            <div className="kde-row" key={f.label}>
              <div className="kde-label">{f.label}</div>
              <div>{f.value}</div>
              {f.sub && <div style={{ color: 'var(--ktext-dim)', fontSize: '0.75rem' }}>{f.sub}</div>}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'work',
      name: 'Work Experience',
      sub: 'Internships and roles',
      Icon: Briefcase,
      color: '#f67400',
      category: 'About',
      kind: 'window',
      w: 560,
      h: 460,
      render: () => (
        <div className="kde-app">
          {EXPERIENCE.map((job) => (
            <div className="kde-row" key={job.company}>
              <div className="kde-label">
                {job.company} / {job.period}
              </div>
              <p style={{ margin: '0 0 4px', color: 'var(--ktext)' }}>{job.role}</p>
              <p>{job.lede}</p>
              <div className="kde-chips">
                {job.stack.map((s) => (
                  <span className="kde-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'education',
      name: 'Education',
      sub: 'University of Kent',
      Icon: GraduationCap,
      color: '#9c27b0',
      category: 'About',
      kind: 'window',
      w: 460,
      h: 340,
      render: () => (
        <div className="kde-app">
          {EDUCATION.map((e) => (
            <div className="kde-row" key={e.school}>
              <div className="kde-label">
                {e.school} / {e.period}
              </div>
              <p style={{ margin: '0 0 4px', color: 'var(--ktext)' }}>{e.qualification}</p>
              <p>{e.note}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'projects',
      name: 'Projects',
      sub: `${PROJECTS.length} things I've built`,
      Icon: FolderGit2,
      color: '#3daee9',
      category: 'Development',
      desktop: true,
      kind: 'window',
      w: 640,
      h: 520,
      render: () => (
        <div className="kde-app">
          {PROJECTS.map((p) => (
            <div className="kde-row" key={p.name}>
              <div className="kde-label">
                {p.lang}, {p.year}
                {p.tier === 'sprint' ? ' / weekend build' : ''}
              </div>
              <p style={{ margin: '0 0 4px', color: 'var(--ktext)', fontStyle: 'italic' }}>{p.why}</p>
              <p>{p.what}</p>
              <div className="kde-chips">
                {p.stack.map((s) => (
                  <span className="kde-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="kde-actions">
                {p.live && (
                  <button
                    type="button"
                    className="kde-btn kde-btn--accent"
                    onClick={() => openDemo({ title: p.name, url: p.live as string })}
                  >
                    Live demo
                  </button>
                )}
                {p.href && (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="kde-btn">
                    Source <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'stack',
      name: 'System Info',
      sub: 'Languages, frameworks, tools',
      Icon: Cpu,
      color: '#27ae60',
      category: 'Development',
      kind: 'window',
      w: 560,
      h: 380,
      render: () => (
        <div className="kde-app kde-fetch">
          <div className="kde-fetch__badge" aria-hidden="true">
            F
          </div>
          <dl className="kde-fetch__specs" style={{ margin: 0, flex: 1, minWidth: 0 }}>
            <dt>OS</dt>
            <dd>Fedora Linux (KDE Plasma), same as the daily driver</dd>
            <dt>Host</dt>
            <dd>kshitijj.me</dd>
            {STACK.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    },
    {
      id: 'interests',
      name: 'Interests',
      sub: 'The non-CV half',
      Icon: Heart,
      color: '#e91e63',
      category: 'About',
      kind: 'window',
      w: 560,
      h: 480,
      render: () => (
        <div className="kde-app">
          {OFF_CLOCK.map((item) => (
            <div className="kde-row" key={item.heading}>
              <div className="kde-label">{item.heading}</div>
              <p>{item.body}</p>
              {item.link && (
                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="kde-btn">
                  {item.link.label} <ExternalLink size={11} />
                </a>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'contact',
      name: 'Contact',
      sub: PROFILE.email,
      Icon: Mail,
      color: '#da4453',
      category: 'About',
      desktop: true,
      kind: 'window',
      w: 440,
      h: 320,
      render: () => (
        <div className="kde-app">
          <p>Looking for a 12-month placement starting July 2027. Questions welcome long before then.</p>
          <div className="kde-row">
            <div className="kde-label">Email</div>
            <div>{PROFILE.email}</div>
          </div>
          <div className="kde-row">
            <div className="kde-label">Based</div>
            <div>{PROFILE.from}</div>
          </div>
          <div className="kde-actions">
            <a href={`mailto:${PROFILE.email}`} className="kde-btn kde-btn--accent">
              Email me
            </a>
            <a href="/resume" target="_blank" rel="noopener noreferrer" className="kde-btn">
              View CV <ExternalLink size={11} />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      sub: 'Opens in a new tab',
      Icon: FileDown,
      color: '#eff0f1',
      category: 'Development',
      desktop: true,
      kind: 'link',
      href: '/resume',
    },
    {
      id: 'terminal',
      name: 'Terminal',
      sub: 'Same console as the ` key',
      Icon: SquareTerminal,
      color: '#2ecc71',
      category: 'Development',
      desktop: true,
      kind: 'action',
      // Reuses the site's hidden terminal rather than building a second
      // one: it listens on window for the same backtick keydown regardless
      // of who dispatches it.
      run: () => window.dispatchEvent(new KeyboardEvent('keydown', { key: '`' })),
    },
    { id: 'github', name: 'GitHub', sub: SOCIAL_LINKS.github.handle, Icon: FaGithub, color: '#6e40c9', category: 'Internet', kind: 'link', href: SOCIAL_LINKS.github.href },
    { id: 'linkedin', name: 'LinkedIn', sub: SOCIAL_LINKS.linkedin.handle, Icon: FaLinkedin, color: '#0a66c2', category: 'Internet', kind: 'link', href: SOCIAL_LINKS.linkedin.href },
    { id: 'letterboxd', name: 'Letterboxd', sub: SOCIAL_LINKS.letterboxd.handle, Icon: LetterboxdMark, color: '#eff0f1', category: 'Internet', kind: 'link', href: SOCIAL_LINKS.letterboxd.href },
    { id: 'spotify', name: 'Spotify', sub: 'What’s on while I debug', Icon: FaSpotify, color: '#1db954', category: 'Internet', kind: 'link', href: SOCIAL_LINKS.spotify.href },
    { id: 'instagram', name: 'Instagram', sub: SOCIAL_LINKS.instagram.handle, Icon: FaInstagram, color: '#e4405f', category: 'Internet', kind: 'link', href: SOCIAL_LINKS.instagram.href },
    { id: 'coffee', name: 'Buy Me a Coffee', sub: 'If a project saved you time', Icon: Coffee, color: '#ffdd57', category: 'Internet', kind: 'link', href: SOCIAL_LINKS.buymeacoffee.href },
  ];
}

type OpenWin = { id: string; app: AppDef; minimized: boolean; spawn: number };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function Desktop() {
  const apps = useApps();
  const [open, setOpen] = useState<OpenWin[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const spawnRef = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runApp = (app: AppDef) => {
    if (app.kind === 'link') {
      window.open(app.href, '_blank', 'noopener,noreferrer');
    } else if (app.kind === 'action') {
      app.run();
    } else {
      setOpen((prev) =>
        prev.some((w) => w.id === app.id)
          ? prev.map((w) => (w.id === app.id ? { ...w, minimized: false } : w))
          : [...prev, { id: app.id, app, minimized: false, spawn: spawnRef.current++ }]
      );
      setOrder((o) => [...o.filter((x) => x !== app.id), app.id]);
      setActiveId(app.id);
    }
    setStartOpen(false);
  };

  const bringToFront = (id: string) => {
    setOrder((o) => [...o.filter((x) => x !== id), id]);
    setActiveId(id);
    setOpen((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
  };

  const closeApp = (id: string) => {
    setOpen((prev) => prev.filter((w) => w.id !== id));
    setActiveId((a) => (a === id ? null : a));
  };

  const minimizeApp = (id: string) => {
    setOpen((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveId((a) => (a === id ? null : a));
  };

  const taskbarClick = (id: string) => {
    const w = open.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) bringToFront(id);
    else if (activeId === id) minimizeApp(id);
    else bringToFront(id);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  // Escape closes whichever floats on top: the start menu first, else nothing
  // (windows have their own close button; an Escape-closes-window binding
  // would fight typing Escape inside a text field for no real benefit here).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && startOpen) setStartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startOpen]);

  const desktopIcons = apps.filter((a) => a.desktop);
  const groups: AppDef['category'][] = ['About', 'Development', 'Internet'];
  const [clock, setClock] = useState<{ time: string; date: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock({
        time: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London', hour12: false }).format(now),
        date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: 'Europe/London' }).format(now),
      });
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="kde-desktop" onPointerDown={() => setStartOpen(false)}>
      <div className="kde-wallpaper" aria-hidden="true" />

      <div className="kde-icons">
        {desktopIcons.map((app) => (
          <button
            key={app.id}
            type="button"
            className="kde-icon"
            onClick={() => runApp(app)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="kde-icon__badge" style={{ background: app.color }}>
              <app.Icon size={20} style={{ color: '#0b1013' }} />
            </span>
            <span className="kde-icon__label">{app.name}</span>
          </button>
        ))}
        <button
          type="button"
          className="kde-icon"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => showToast("Empty. I don't believe in throwing code away.")}
        >
          <span className="kde-icon__badge" style={{ background: '#4b5157' }}>
            <Trash2 size={20} style={{ color: '#0b1013' }} />
          </span>
          <span className="kde-icon__label">Trash</span>
        </button>
      </div>

      {open
        .filter((w) => !w.minimized)
        .map((w) => (
          <Window
            key={w.id}
            win={w}
            active={activeId === w.id}
            zIndex={order.indexOf(w.id) + 1}
            onFocus={() => bringToFront(w.id)}
            onClose={() => closeApp(w.id)}
            onMinimize={() => minimizeApp(w.id)}
          />
        ))}

      {toast && <div className="kde-toast">{toast}</div>}

      {startOpen && <StartMenu apps={apps} groups={groups} onOpen={runApp} onLogOut={() => setTheme('light')} />}

      <div className="kde-taskbar" onPointerDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="kde-start-btn"
          aria-expanded={startOpen}
          aria-haspopup="menu"
          onClick={() => setStartOpen((v) => !v)}
        >
          <span className="kde-fedora-badge" aria-hidden="true">
            f
          </span>
          Applications
        </button>

        <div className="kde-pinned">
          {PINNED_IDS.map((id) => {
            const app = apps.find((a) => a.id === id);
            if (!app) return null;
            return (
              <button key={id} type="button" className="kde-pinned-btn" title={app.name} onClick={() => runApp(app)}>
                <app.Icon size={16} style={{ color: app.color }} />
              </button>
            );
          })}
        </div>

        <div className="kde-tasklist">
          {open.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`kde-task-btn${activeId === w.id && !w.minimized ? ' kde-task-btn--active' : ''}`}
              onClick={() => taskbarClick(w.id)}
              title={w.app.name}
            >
              <w.app.Icon size={14} style={{ color: w.app.color }} />
              <span>{w.app.name}</span>
            </button>
          ))}
        </div>

        <div className="kde-tray">
          <button type="button" title="Exit desktop mode" aria-label="Exit desktop mode" onClick={() => setTheme('light')}>
            <LogOut size={15} />
          </button>
          <Wifi size={15} aria-hidden="true" />
          <Volume2 size={15} aria-hidden="true" />
          {clock && (
            <span className="kde-clock">
              {clock.time}
              <br />
              {clock.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Window({
  win,
  active,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
}: {
  win: OpenWin;
  active: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
}) {
  const defaultW = win.app.kind === 'window' ? win.app.w ?? 520 : 520;
  const defaultH = win.app.kind === 'window' ? win.app.h ?? 420 : 420;

  const [pos, setPos] = useState(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const w = Math.min(defaultW, vw - 24);
    const h = Math.min(defaultH, vh - TASKBAR_H - 40);
    const cascade = (win.spawn % 6) * 28;
    return {
      w,
      h,
      x: clamp(40 + cascade, 0, Math.max(0, vw - w)),
      y: clamp(36 + cascade, 0, Math.max(0, vh - TASKBAR_H - h)),
    };
  });

  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number; id: number } | null>(null);

  const onTitleDown = (e: React.PointerEvent) => {
    onFocus();
    dragRef.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y, id: e.pointerId };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onTitleMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos((p) => ({
      ...p,
      x: clamp(d.ox + (e.clientX - d.x), -p.w + 120, vw - 120),
      y: clamp(d.oy + (e.clientY - d.y), 0, vh - TASKBAR_H - 32),
    }));
  };
  const onTitleUp = () => {
    dragRef.current = null;
  };

  const Icon = win.app.Icon;

  return (
    <div
      className={`kde-window${active ? ' kde-window--active' : ''}`}
      style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h, zIndex: 100 + zIndex }}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={win.app.name}
    >
      <div
        className="kde-window__titlebar"
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onPointerCancel={onTitleUp}
      >
        <span className="kde-window__title">
          <Icon size={14} style={{ color: win.app.color, flexShrink: 0 }} />
          {win.app.name}
        </span>
        <button type="button" className="kde-window__btn" onClick={onMinimize} aria-label="Minimize">
          <Minus size={13} />
        </button>
        <button type="button" className="kde-window__btn" aria-label="Maximize (not wired up, this isn't a full window manager)" disabled>
          <Square size={11} />
        </button>
        <button type="button" className="kde-window__btn kde-window__btn--close" onClick={onClose} aria-label="Close">
          <X size={14} />
        </button>
      </div>
      <div className="kde-window__body">{win.app.kind === 'window' ? win.app.render() : null}</div>
    </div>
  );
}

function StartMenu({
  apps,
  groups,
  onOpen,
  onLogOut,
}: {
  apps: AppDef[];
  groups: AppDef['category'][];
  onOpen: (app: AppDef) => void;
  onLogOut: () => void;
}) {
  const [q, setQ] = useState('');
  const filtered = q.trim() ? apps.filter((a) => a.name.toLowerCase().includes(q.trim().toLowerCase())) : null;

  return (
    <div className="kde-start" onPointerDown={(e) => e.stopPropagation()} role="menu" aria-label="Applications">
      <div className="kde-start__header">
        <span className="kde-start__avatar">{PROFILE.shortName}</span>
        <div style={{ minWidth: 0 }}>
          <div className="kde-start__name">{PROFILE.name}</div>
          <div className="kde-start__role">{PROFILE.role}</div>
        </div>
      </div>

      <div style={{ position: 'relative', margin: '10px 14px' }}>
        <Search
          size={14}
          style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--ktext-dim)' }}
        />
        <input
          className="kde-start__search"
          style={{ margin: 0, paddingLeft: 28, width: '100%' }}
          placeholder="Search applications"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
        />
      </div>

      <div className="kde-start__list">
        {filtered ? (
          filtered.length ? (
            filtered.map((app) => <StartRow key={app.id} app={app} onOpen={onOpen} />)
          ) : (
            <p className="kde-start__empty">No results.</p>
          )
        ) : (
          groups.map((g) => (
            <div key={g}>
              <div className="kde-start__group">{g}</div>
              {apps
                .filter((a) => a.category === g)
                .map((app) => (
                  <StartRow key={app.id} app={app} onOpen={onOpen} />
                ))}
            </div>
          ))
        )}
      </div>

      <div className="kde-start__footer">
        <button type="button" className="kde-start__leave" onClick={onLogOut}>
          <LogOut size={14} />
          Log out to light mode
        </button>
      </div>
    </div>
  );
}

function StartRow({ app, onOpen }: { app: AppDef; onOpen: (app: AppDef) => void }) {
  const Icon = app.Icon;
  return (
    <button type="button" className="kde-start__row" role="menuitem" onClick={() => onOpen(app)}>
      <span className="kde-start__row-icon" style={{ background: app.color }}>
        <Icon size={14} style={{ color: '#0b1013' }} />
      </span>
      <span className="kde-start__row-text">
        <div className="kde-start__row-name">{app.name}</div>
        <div className="kde-start__row-sub">{app.sub}</div>
      </span>
    </button>
  );
}
