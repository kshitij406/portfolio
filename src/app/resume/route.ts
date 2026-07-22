/**
 * GET /resume
 *
 * Renders the CV from `src/data/resume.ts` and serves it inline, so the browser
 * displays the PDF rather than dropping a file in Downloads. Editing the CV
 * means editing that data file: no binary in the repo, nothing to re-upload.
 *
 * `?download=1` forces a save instead, for anyone who wants the file itself.
 *
 * `createElement` rather than JSX because Next only picks up route handlers
 * named `route.ts`, and JSX needs a `.tsx` extension.
 */

import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume-pdf";

export const runtime = "nodejs";

const FILENAME = "Kshitij-Jha-CV.pdf";

export async function GET(request: Request) {
  const buffer = await renderToBuffer(createElement(ResumeDocument));
  const download = new URL(request.url).searchParams.has("download");

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${FILENAME}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
