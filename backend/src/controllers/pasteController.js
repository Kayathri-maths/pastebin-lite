import Paste from "../models/Paste.js";
import { getNow } from "../utils/getNow.js";

//  HEALTH CHECK

export async function healthz(req, res) {
  try {
    await Paste.findOne().lean();
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}

//  CREATE PASTE

export async function createPaste(req, res) {
  const { content, ttl_seconds, max_views } = req.body;
  console.log(req.body);
  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
  ) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views < 1)
  ) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  // Deterministic creation time
  const now = getNow(req);

  const expiresAt = ttl_seconds ? new Date(now + ttl_seconds * 1000) : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null,
  });

  return res.status(201).json({
    id: paste._id.toString(),
    url: `${process.env.BASE_URL}/p/${paste._id}`,
  });
}

//  FETCH PASTE (API JSON)

export async function fetchPaste(req, res) {
  const now = getNow(req);

  const paste = await Paste.findOneAndUpdate(
    {
      _id: req.params.id,
      $and: [
        { $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date(now) } }] },
        {
          $or: [
            { maxViews: null },
            { $expr: { $lt: ["$viewCount", "$maxViews"] } },
          ],
        },
      ],
    },
    { $inc: { viewCount: 1 } },
    { new: true }
  ).lean();

  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.status(200).json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null
        ? null
        : Math.max(paste.maxViews - paste.viewCount, 0),
    expires_at: paste.expiresAt,
  });
}

//  VIEW PASTE (HTML)

export async function viewPasteHTML(req, res) {
  const now = getNow(req);
  console.log("Viewing paste:", req.params.id);
  const paste = await Paste.findOneAndUpdate(
    {
      _id: req.params.id,
      $and: [
        { $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date(now) } }] },
        {
          $or: [
            { maxViews: null },
            { $expr: { $lt: ["$viewCount", "$maxViews"] } },
          ],
        },
      ],
    },
    { $inc: { viewCount: 1 } },
    { new: true }
  );

  if (!paste) {
    return res.status(404).send("Not Found");
  }

  // Safe rendering
  const escaped = paste.content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return res.status(200).send(`
    <html>
      <body>
        <pre>${escaped}</pre>
      </body>
    </html>
  `);
}
