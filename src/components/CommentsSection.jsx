"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "@/lib/auth-client"; // Better Auth
import { MessageSquare, Send, Pencil, Trash2, Loader2, X, Check } from "lucide-react";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

const API = "http://localhost:5000";

export default function CommentsSection({ ideaId }) {
    const { data: session } = useSession(); 
    const currentUser = session?.user;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null); 
    const [editContent, setEditContent] = useState("");
    const [editSubmitting, setEditSubmitting] = useState(false);

    // Comments load 
    const fetchComments = async () => {
        try {
            const res = await axios.get(`${API}/api/comments/${ideaId}`);
            setComments(res.data.comments);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ideaId) fetchComments();
    }, [ideaId]);

    // new comment submit
    const handleSubmit = async () => {
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const res = await axios.post(`${API}/api/comments/${ideaId}`, {
                content: newComment.trim(),
            });

            // new comment list add without refetching
            setComments((prev) => [res.data.comment, ...prev]);
            setNewComment("");
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error.response?.data?.message || "Could not post comment.",
                icon: "error",
                confirmButtonColor: "#ef4444",
                background: "#111111",
                color: "#ffffff",
            });
        } finally {
            setSubmitting(false);
        }
    };

    // Edit start
    const startEdit = (comment) => {
        setEditingId(comment._id);
        setEditContent(comment.content);
    };

    // Edit cancel
    const cancelEdit = () => {
        setEditingId(null);
        setEditContent("");
    };

    // Edit save
    const handleUpdate = async (commentId) => {
        if (!editContent.trim()) return;

        setEditSubmitting(true);
        try {
            const res = await axios.put(`${API}/api/comments/${commentId}`, {
                content: editContent.trim(),
            });

            setComments((prev) =>
                prev.map((c) => (c._id === commentId ? res.data.comment : c))
            );
            cancelEdit();
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error.response?.data?.message || "Could not update comment.",
                icon: "error",
                confirmButtonColor: "#ef4444",
                background: "#111111",
                color: "#ffffff",
            });
        } finally {
            setEditSubmitting(false);
        }
    };

    // Delete
    const handleDelete = async (commentId) => {
        const result = await Swal.fire({
            title: "Delete Comment?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#374151",
            confirmButtonText: "Yes, delete it",
            background: "#111111",
            color: "#ffffff",
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${API}/api/comments/${commentId}`);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error.response?.data?.message || "Could not delete comment.",
                icon: "error",
                confirmButtonColor: "#ef4444",
                background: "#111111",
                color: "#ffffff",
            });
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-orange-500" />
                <h2 className="text-sm font-black uppercase tracking-widest text-orange-500">
                    Comments
                </h2>
                <span className="text-xs text-gray-400 font-medium">
                    ({comments.length})
                </span>
            </div>

            {/* Comment Input —only logged in user */}
            {currentUser ? (
                <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 text-orange-500 text-xs font-black uppercase">
                        {currentUser.name?.[0] || "?"}
                    </div>
                    <div className="flex-1 flex gap-2">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts on this idea..."
                            rows={2}
                            className="flex-1 px-4 py-2.5 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 text-gray-900 dark:text-white placeholder-gray-400 resize-none transition-all"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !newComment.trim()}
                            className="self-end px-4 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl transition-all"
                        >
                            {submitting
                                ? <Loader2 size={16} className="animate-spin" />
                                : <Send size={16} />
                            }
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-gray-400 font-medium">
                    Please{" "}
                    <a href="/login" className="text-orange-500 hover:underline">
                        login
                    </a>{" "}
                    to leave a comment.
                </p>
            )}

            {/* Comments List */}
            {loading ? (
                <div className="flex justify-center py-6">
                    <Loader2 size={20} className="animate-spin text-orange-500" />
                </div>
            ) : comments.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">
                    No comments yet. Be the first to share your thoughts!
                </p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex gap-3 items-start group"
                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 text-orange-500 text-xs font-black uppercase">
                                {comment.authorName?.[0] || "?"}
                            </div>

                            <div className="flex-1 space-y-1">
                                {/* Name + Time */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                        {comment.authorName}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>

                                {/* Edit mode */}
                                {editingId === comment._id ? (
                                    <div className="flex gap-2 items-end">
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            rows={2}
                                            className="flex-1 px-3 py-2 bg-white dark:bg-[#0A0A0A] border border-orange-500 rounded-xl text-sm focus:outline-none text-gray-900 dark:text-white resize-none"
                                        />
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleUpdate(comment._id)}
                                                disabled={editSubmitting}
                                                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all"
                                            >
                                                {editSubmitting
                                                    ? <Loader2 size={13} className="animate-spin" />
                                                    : <Check size={13} />
                                                }
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg transition-all"
                                            >
                                                <X size={13} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {comment.content}
                                    </p>
                                )}
                            </div>

                            {/* Edit/Delete — only the owner's comment */}
                            {currentUser?.id === comment.authorId && editingId !== comment._id && (
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <button
                                        onClick={() => startEdit(comment)}
                                        className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}