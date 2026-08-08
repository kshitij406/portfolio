'use client';

import { useEffect } from 'react';
import { UNLINK_EVENT } from '@/components/Nav';

const DRAG_THRESHOLD = 4; // px of movement before a pointer-down counts as a drag, not a click
const NAV_HEIGHT = 64; // Nav.tsx's h-16, so cards don't slide under the fixed header

type Drag = {
  el: HTMLElement;
  pointerId: number;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  moved: boolean;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/**
 * Global "unlink" gimmick: every card (`.plate`) on the page, not just one
 * section's. Mounted once at the root instead of duplicated per section,
 * the drag math is identical everywhere and the cards live in unrelated
 * component trees, so one imperative DOM layer is simpler than lifting
 * shared drag state through five different section components.
 */
export default function CardDragMode() {
  useEffect(() => {
    const offsets = new WeakMap<HTMLElement, { x: number; y: number }>();
    const justDragged = new WeakSet<HTMLElement>();
    let drag: Drag | null = null;

    const cards = () => Array.from(document.querySelectorAll<HTMLElement>('.plate'));

    const onPointerDown = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const pos = offsets.get(el) ?? { x: 0, y: 0 };
      drag = {
        el,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origX: pos.x,
        origY: pos.y,
        moved: false,
      };
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag || drag.el !== e.currentTarget || drag.pointerId !== e.pointerId) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (!drag.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        drag.moved = true;
        drag.el.classList.add('is-dragging');
      }
      if (!drag.moved) return;

      // Bounds are the full viewport (minus the fixed header), not the
      // card's own section: the whole page is the play area now.
      const cur = offsets.get(drag.el) ?? { x: 0, y: 0 };
      const rect = drag.el.getBoundingClientRect();
      const baseLeft = rect.left - cur.x;
      const baseTop = rect.top - cur.y;

      const nx = clamp(drag.origX + dx, -baseLeft, window.innerWidth - baseLeft - rect.width);
      const ny = clamp(drag.origY + dy, NAV_HEIGHT - baseTop, window.innerHeight - baseTop - rect.height);

      offsets.set(drag.el, { x: nx, y: ny });
      drag.el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!drag || drag.el !== e.currentTarget || drag.pointerId !== e.pointerId) return;
      drag.el.classList.remove('is-dragging');
      if (drag.moved) justDragged.add(drag.el);
      drag = null;
    };

    // A drag that ends over a link/button inside the card would otherwise
    // still fire that element's click. Swallow the one click that follows
    // a real drag, at the capture phase so it never reaches React's handler.
    const onClickCapture = (e: MouseEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>('.plate');
      if (card && justDragged.has(card)) {
        justDragged.delete(card);
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const attach = (el: HTMLElement) => {
      el.addEventListener('pointerdown', onPointerDown);
      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);
      el.addEventListener('pointercancel', onPointerUp);
    };
    const detach = (el: HTMLElement) => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };

    const onToggle = (e: Event) => {
      const enabled = (e as CustomEvent<boolean>).detail;
      for (const el of cards()) {
        if (enabled) {
          el.classList.add('is-unlinked');
          attach(el);
        } else {
          el.classList.remove('is-unlinked', 'is-dragging');
          el.style.transform = '';
          detach(el);
          offsets.delete(el);
        }
      }
    };

    window.addEventListener(UNLINK_EVENT, onToggle);
    window.addEventListener('click', onClickCapture, true);
    return () => {
      window.removeEventListener(UNLINK_EVENT, onToggle);
      window.removeEventListener('click', onClickCapture, true);
      cards().forEach(detach);
    };
  }, []);

  return null;
}
