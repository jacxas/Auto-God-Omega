import { useState } from 'react';
import { Sparkles, Image as ImageIcon, Video, Music, Search, Play, Download, Loader2, Send } from 'lucide-react';

export function MultimodalStudioView() {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'music' | 'search'>('image');

  // Image state
  const [imagePrompt, setImagePrompt] = useState('Cinematic architectural rendering of a quantum neural server rack in neon obsidian style');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Video state
  const [videoPrompt, setVideoPrompt] = useState('A glowing holographic neural network pulsing with blue energy');
  const [videoOperation, setVideoOperation] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Music state
  const [musicPrompt, setMusicPrompt] = useState('Futuristic cyberpunk ambient electronic soundtrack 30 seconds');
  const [musicAudioUrl, setMusicAudioUrl] = useState<string | null>(null);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicLyrics, setMusicLyrics] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('Latest breakthroughs in autonomous neural architecture search 2026');
  const [searchResult, setSearchResult] = useState<{ text: string; grounding: any } | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Handlers
  const handleGenerateImage = async () => {
    setImageLoading(true);
    try {
      const res = await fetch('/api/gemini/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const data = await res.json();
      if (data.imageUrl) setGeneratedImageUrl(data.imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    setVideoLoading(true);
    setVideoUrl(null);
    try {
      const res = await fetch('/api/gemini/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: videoPrompt, aspectRatio: '16:9' }),
      });
      const data = await res.json();
      if (data.operationName) {
        setVideoOperation(data.operationName);
        // Poll status
        pollVideoStatus(data.operationName);
      }
    } catch (err) {
      console.error(err);
      setVideoLoading(false);
    }
  };

  const pollVideoStatus = async (opName: string) => {
    try {
      const res = await fetch('/api/gemini/video-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName }),
      });
      const data = await res.json();
      if (data.done) {
        setVideoUrl(data.videoUrl);
        setVideoLoading(false);
      } else {
        setTimeout(() => pollVideoStatus(opName), 4000);
      }
    } catch (err) {
      console.error(err);
      setVideoLoading(false);
    }
  };

  const handleGenerateMusic = async () => {
    setMusicLoading(true);
    setMusicAudioUrl(null);
    try {
      const res = await fetch('/api/gemini/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: musicPrompt }),
      });
      const data = await res.json();
      if (data.audioBase64) {
        const binary = atob(data.audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        setMusicAudioUrl(URL.createObjectURL(blob));
        setMusicLyrics(data.lyrics || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMusicLoading(false);
    }
  };

  const handleSearchGrounding = async () => {
    setSearchLoading(true);
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: searchQuery }),
      });
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini Multimodal & Generative Suite</span>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Multimodal Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate high-resolution images, Veo cinematic videos, Lyria music tracks, and Google Search grounded insights.
          </p>
        </div>

        {/* Studio Subtabs */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'image' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Image Studio</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'video' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <Video className="w-4 h-4" />
            <span>Veo Video</span>
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'music' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <Music className="w-4 h-4" />
            <span>Lyria Music</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'search' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <Search className="w-4 h-4" />
            <span>Search Grounding</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Image Studio */}
      {activeTab === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-white">Generate Image (Gemini Flash Image)</h2>
            <p className="text-xs text-slate-400">Describe the visual asset you want to synthesize.</p>
            <textarea
              rows={4}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleGenerateImage}
              disabled={imageLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {imageLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{imageLoading ? 'Synthesizing Image...' : 'Generate Image Asset'}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
            {imageLoading ? (
              <div className="flex flex-col items-center gap-3 text-indigo-400 font-mono text-xs">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>Synthesizing high-res image...</span>
              </div>
            ) : generatedImageUrl ? (
              <div className="space-y-4 w-full">
                <img src={generatedImageUrl} alt="Generated AI Asset" className="rounded-xl w-full object-cover max-h-[300px] border border-slate-800" />
                <a
                  href={generatedImageUrl}
                  download="omega_generated_asset.png"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </a>
              </div>
            ) : (
              <div className="text-slate-500 font-mono text-xs text-center">
                Generated image asset will appear here.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Veo Video */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-white">Generate Video (Veo 3 Fast Preview)</h2>
            <p className="text-xs text-slate-400">Create cinematic motion videos from text prompts.</p>
            <textarea
              rows={4}
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleGenerateVideo}
              disabled={videoLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {videoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
              <span>{videoLoading ? 'Rendering Veo Video (Polling)...' : 'Generate Veo Video'}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
            {videoLoading ? (
              <div className="flex flex-col items-center gap-3 text-indigo-400 font-mono text-xs">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>Rendering video with Veo 3 (this takes ~30-60s)...</span>
              </div>
            ) : videoUrl ? (
              <div className="space-y-4 w-full">
                <video src={videoUrl} controls autoPlay loop className="rounded-xl w-full max-h-[300px] border border-slate-800" />
                <a
                  href={videoUrl}
                  download="omega_veo_video.mp4"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Video</span>
                </a>
              </div>
            ) : (
              <div className="text-slate-500 font-mono text-xs text-center">
                Generated video preview will appear here.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Lyria Music */}
      {activeTab === 'music' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-white">Generate Music (Lyria Clip Preview)</h2>
            <p className="text-xs text-slate-400">Compose 30-second AI musical soundscapes and tracks.</p>
            <textarea
              rows={4}
              value={musicPrompt}
              onChange={(e) => setMusicPrompt(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleGenerateMusic}
              disabled={musicLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {musicLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Music className="w-4 h-4" />}
              <span>{musicLoading ? 'Composing Track...' : 'Generate Lyria Music'}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
            {musicLoading ? (
              <div className="flex flex-col items-center gap-3 text-indigo-400 font-mono text-xs">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>Composing AI audio stream...</span>
              </div>
            ) : musicAudioUrl ? (
              <div className="space-y-4 w-full">
                <audio src={musicAudioUrl} controls className="w-full" />
                {musicLyrics && (
                  <div className="p-4 bg-slate-800/50 rounded-xl text-xs font-mono text-slate-300">
                    <strong>Lyrics / Metadata:</strong> {musicLyrics}
                  </div>
                )}
                <a
                  href={musicAudioUrl}
                  download="omega_lyria_track.wav"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Audio WAV</span>
                </a>
              </div>
            ) : (
              <div className="text-slate-500 font-mono text-xs text-center">
                Generated audio track will appear here.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Search Grounding */}
      {activeTab === 'search' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-white">Google Search Grounded Research Assistant</h2>
          <p className="text-xs text-slate-400">Query real-time web knowledge with Gemini 3.5 Flash and Google Search grounding.</p>

          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-850 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ask anything about autonomous AI, neural search, or tech trends..."
            />
            <button
              onClick={handleSearchGrounding}
              disabled={searchLoading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {searchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Search</span>
            </button>
          </div>

          {searchResult && (
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {searchResult.text}
              </div>
              {searchResult.grounding?.webSearchQueries && (
                <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
                  <span className="text-indigo-400 font-semibold">Search Queries used:</span> {searchResult.grounding.webSearchQueries.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
