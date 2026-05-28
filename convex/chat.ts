import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ─── Queries ────────────────────────────────────────────────────────────────

export const listThreads = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("chatThreads")
      .withIndex("by_updated")
      .order("desc")
      .take(50);
  },
});

export const getThread = query({
  args: { threadId: v.id("chatThreads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.threadId);
  },
});

export const getMessages = query({
  args: { threadId: v.id("chatThreads") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chatMessages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();
  },
});

// ─── Mutations ──────────────────────────────────────────────────────────────

export const createThread = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("chatThreads", {
      title: args.title,
      createdAt: now,
      updatedAt: now,
      messageCount: 0,
    });
  },
});

export const addMessage = mutation({
  args: {
    threadId: v.id("chatThreads"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const msgId = await ctx.db.insert("chatMessages", {
      threadId: args.threadId,
      role: args.role,
      content: args.content,
      createdAt: now,
    });

    // Update thread
    const thread = await ctx.db.get(args.threadId);
    if (thread) {
      await ctx.db.patch(args.threadId, {
        updatedAt: now,
        messageCount: thread.messageCount + 1,
      });
    }

    return msgId;
  },
});

export const updateThreadTitle = mutation({
  args: { threadId: v.id("chatThreads"), title: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.threadId, { title: args.title });
  },
});
