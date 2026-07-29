import React, { useState, useEffect } from 'react';
import { Github, Key, CheckCircle2, Copy, Check, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface OAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (userData: any) => void;
}

export const OAuthModal: React.FC<OAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [redirectUri, setRedirectUri] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAuthUrl();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        // Authenticated!
        handleDemoConnect('alexdev');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const fetchAuthUrl = async () => {
    try {
      const res = await fetch('/api/auth/github/url');
      if (res.ok) {
        const data = await res.json();
        setAuthUrl(data.url);
        setRedirectUri(data.redirectUri || `${window.location.origin}/auth/callback`);
      }
    } catch (err) {
      console.error('Error fetching OAuth URL:', err);
    }
  };

  const handleOpenOAuthPopup = () => {
    if (!authUrl) return;
    window.open(authUrl, 'github_oauth_popup', 'width=600,height=700');
  };

  const handleDemoConnect = async (username: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (res.ok) {
        const data = await res.json();
        onSuccessLogin(data.user);
        onClose();
      }
    } catch (err) {
      console.error('Demo auth failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRedirect = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E1E1E]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E8E3D8] rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-xl">
        
        <div className="flex items-start justify-between border-b border-[#E8E3D8] pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Github className="w-5 h-5 text-[#1E1E1E]" />
              <span>GitHub OAuth Authentication</span>
            </h3>
            <p className="text-xs text-[#8B8680] font-medium mt-1">
              Connect your official GitHub account or use instant demo persona
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8B8680] hover:text-[#1E1E1E] text-lg font-mono p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Option 1: GitHub OAuth Popup */}
        <div className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] space-y-3">
          <div className="text-xs font-bold text-[#1E1E1E] flex items-center gap-2">
            <Key className="w-4 h-4 text-[#1E1E1E]" />
            <span>Option 1: Official GitHub OAuth Popup</span>
          </div>

          <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
            Callback Redirect URI to add in your GitHub Developer App settings:
          </p>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#E8E3D8] text-xs font-mono text-[#1E1E1E]">
            <span className="truncate flex-1">{redirectUri || `${window.location.origin}/auth/callback`}</span>
            <button
              onClick={handleCopyRedirect}
              className="p-1 hover:text-[#1E1E1E] text-[#8B8680] cursor-pointer"
              title="Copy Callback URL"
            >
              {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleOpenOAuthPopup}
            className="w-full py-2.5 bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub OAuth Login Window</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Option 2: Instant Demo Bypass */}
        <div className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] space-y-3">
          <div className="text-xs font-bold text-[#1E1E1E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>Option 2: Instant Demo Connect (No App Secret Needed)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleDemoConnect('alexdev')}
              disabled={loading}
              className="px-3 py-2 bg-white hover:bg-[#E8E3D8] border border-[#E8E3D8] text-[#1E1E1E] text-xs rounded-xl transition-colors font-medium text-left cursor-pointer"
            >
              <div className="font-extrabold text-[#1E1E1E]">@alexdev</div>
              <div className="text-[10px] text-[#8B8680] font-medium">Senior FullStack</div>
            </button>

            <button
              onClick={() => handleDemoConnect('student')}
              disabled={loading}
              className="px-3 py-2 bg-white hover:bg-[#E8E3D8] border border-[#E8E3D8] text-[#1E1E1E] text-xs rounded-xl transition-colors font-medium text-left cursor-pointer"
            >
              <div className="font-extrabold text-[#B45309]">@student</div>
              <div className="text-[10px] text-[#8B8680] font-medium">CS Graduate</div>
            </button>

            <button
              onClick={() => handleDemoConnect('opensource')}
              disabled={loading}
              className="px-3 py-2 bg-white hover:bg-[#E8E3D8] border border-[#E8E3D8] text-[#1E1E1E] text-xs rounded-xl transition-colors font-medium text-left cursor-pointer"
            >
              <div className="font-extrabold text-[#15803D]">@opensource</div>
              <div className="text-[10px] text-[#8B8680] font-medium">Maintainer</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
