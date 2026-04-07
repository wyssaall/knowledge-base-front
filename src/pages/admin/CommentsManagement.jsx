import React, { useEffect, useState } from "react";
import { MessageSquareText, Trash2, Save } from "lucide-react";
import api from "../../services/api";
import Modal from "../../components/Modal";

function CommentsManagement() {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get("/api/comments", true);
      setComments(data || []);
    } catch (err) {
      setError(err.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const removeComment = async (id) => {
    try {
      await api.delete(`/api/comments/${id}`, true);
      setSuccess("Comment supprime");
      setDeleteId(null);
      fetchComments();
    } catch (err) {
      setError(err.message || "Failed to delete comment");
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditingContent(comment.commentContent);
  };

  const submitEdit = async () => {
    if (!editingId) return;
    try {
      await api.put(`/api/comments/${editingId}`, { commentContent: editingContent }, true);
      setEditingId(null);
      setEditingContent("");
      setSuccess("Comment modifie");
      fetchComments();
    } catch (err) {
      setError(err.message || "Failed to update comment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-3 text-white">
              <MessageSquareText size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Gestion des Comments</h1>
          </div>
        </div>

        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="mb-1 text-xs text-gray-500">
                  Article: {comment.article?.title || "N/A"} | Auteur: {comment.author?.name || "N/A"}
                </p>

                {editingId === comment._id ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="h-10 flex-1 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={submitEdit}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <Save size={14} /> Save
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800">{comment.commentContent}</p>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEdit(comment)}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(comment._id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-200"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        title="Supprimer ce comment ?"
      >
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteId(null)}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Annuler
          </button>
          <button
            onClick={() => removeComment(deleteId)}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CommentsManagement;
