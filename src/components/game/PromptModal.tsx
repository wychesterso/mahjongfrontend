import React from "react";

export default function PromptModal({ prompt }: { prompt: string | null }) {
    if (!prompt) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-sm">
                <p>{prompt}</p>
            </div>
        </div>
    );
}
