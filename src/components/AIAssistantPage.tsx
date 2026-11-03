import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  Bot,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Droplets,
  Sprout,
  Send,
  Loader2,
  RefreshCw,
  Layers,
  HeartHandshake,
  MessageSquare,
  FileText,
} from 'lucide-react';

interface AIAssistantPageProps {
  initialPlantHint?: string;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  initialPlantHint,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80'
  );
  const [plantHint, setPlantHint] = useState<string>(initialPlantHint || 'money');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'chat'>('analysis');

  // Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: 'model',
      content:
        'Hello! I am your GreenSpace AI Botanical Specialist. Upload a plant photo to diagnose health, or ask me any question about vertical gardens, hydroponics, and indoor lighting!',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Quick preset test samples so users can test with 1 click
  const samplePresets = [
    {
      name: 'Money Plant',
      hint: 'money',
      img: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Snake Plant',
      hint: 'snake',
      img: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Spider Plant',
      hint: 'spider',
      img: 'https://images.unsplash.com/photo-1572688484437-31820e39ec14?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setPlantHint(file.name.split('.')[0]);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setPlantHint(file.name.split('.')[0]);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    try {
      const response = await fetch('/api/ai/identify-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          plantHint: plantHint,
        }),
      });

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Plant analysis failed:', err);
      // Fallback
      setAnalysisResult({
        plantName: 'Money Plant (Golden Pothos)',
        scientificName: 'Epipremnum aureum',
        confidence: 98,
        difficulty: 'Easy Care',
        sunlight: 'Bright Indirect Light',
        watering: 'When top 2 inches dry (Weekly)',
        soil: 'Well-draining aerated potting mix',
        humidity: 'Average 45%-65%',
        temperature: '18°C - 30°C',
        healthStatus: 'Healthy & Vibrant',
        observations: 'Robust foliage with healthy chlorophyll distribution. Vigorous aerial node roots suitable for vertical trellis support.',
        commonProblems: ['Overwatering if saucer retains standing water'],
        personalizedTips: [
          'Rotate planter quarterly for uniform sunlight coverage',
          'Use vertical moss pole or wall clip system for climbing growth',
        ],
        verticalGardenSuitability: 'Excellent',
        verticalGardenAdvice: 'One of the best species for vertical pocket walls and cascading hanging pots.',
        isDemoMode: true,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages,
          currentPlant: analysisResult ? analysisResult.plantName : null,
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: 'model', content: data.reply || "I'm here to support your green journey!" },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            'Vertical gardens thrive best when upper tiers have good drainage and plants receive steady indirect lighting. Ensure pots have drain wicks!',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Main Header Card matching Screen 4 with Futuristic Plant Robot */}
        <div className="relative rounded-3xl overflow-hidden bg-[#123D25] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#267A3E]">
          {/* Subtle botanical backdrop ambient glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#4CAF50]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Header Text matching Screen 4 */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E8F2DD] text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#4CAF50]" />
                <span>Multimodal Plant Vision & Diagnostic AI</span>
              </div>

              <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Identify Your Plant.<br />
                Understand Its Needs.
              </h1>

              <p className="text-sm sm:text-base text-[#E8F2DD]/90 max-w-xl leading-relaxed">
                Upload a plant photo to discover its identity, care requirements and possible health concerns. Get instant personalized advice for vertical gardens.
              </p>
            </div>

            {/* Right Futuristic Plant Robot Illustration matching Screen 4 */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group">
                {/* Glowing ring behind robot */}
                <div className="absolute inset-0 bg-[#4CAF50]/30 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
                
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-[#267A3E] to-[#123D25] p-3 border-2 border-[#4CAF50]/40 shadow-2xl flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white flex items-center justify-center shadow-inner relative overflow-hidden">
                    {/* Robot Head / Botanical AI */}
                    <div className="absolute -top-1 w-6 h-3 bg-[#4CAF50] rounded-b-md" />
                    <Bot className="w-12 h-12 sm:w-14 sm:h-14 text-[#123D25] animate-pulse" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4CAF50] animate-ping" />
                  </div>
                  <span className="text-xs font-bold text-[#E8F2DD] mt-2 tracking-wider uppercase">
                    FloraBot v2.4
                  </span>
                  <span className="text-[10px] text-[#4CAF50] font-semibold">
                    AI Plant Specialist
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs ${
              activeTab === 'analysis'
                ? 'bg-[#123D25] text-white shadow-md'
                : 'bg-white text-[#17251B] border border-[#E8F2DD] hover:bg-[#E8F2DD]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Image Diagnosis & Vision</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs ${
              activeTab === 'chat'
                ? 'bg-[#123D25] text-white shadow-md'
                : 'bg-white text-[#17251B] border border-[#E8F2DD] hover:bg-[#E8F2DD]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#4CAF50]" />
            <span>Ask Plant Doctor AI</span>
          </button>
        </div>

        {/* Tab 1: Analysis & Image Identification */}
        {activeTab === 'analysis' && (
          <div className="mt-8 space-y-10">
            {/* Drag & Drop Upload Container matching Screen 4 */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-dashed border-[#267A3E]/40 hover:border-[#267A3E] transition-all shadow-sm">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center text-center space-y-4"
              >
                {/* Green cloud upload icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center shadow-inner">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-[#267A3E]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[#123D25]">
                    Drag & Drop Your Image Here
                  </h3>
                  <p className="text-xs sm:text-sm text-[#17251B]/60">or</p>
                </div>

                {/* Upload & Camera Buttons matching Screen 4 */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2.5 rounded-full bg-[#267A3E] hover:bg-[#123D25] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>

                  <input
                    type="file"
                    ref={cameraInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                  />
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-[#FAF9EF] border border-[#267A3E] text-[#123D25] text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#267A3E]" />
                    <span>Camera</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#17251B]/50">
                  Supported: JPG, PNG, WEBP (Max 5MB)
                </p>

                {/* 1-Click Sample Previews for instantaneous testing */}
                <div className="pt-4 border-t border-[#E8F2DD] w-full">
                  <p className="text-xs font-semibold text-[#17251B]/60 mb-2">
                    Or select a sample plant to test instantly:
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {samplePresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setSelectedImage(preset.img);
                          setPlantHint(preset.hint);
                          setAnalysisResult(null);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          selectedImage === preset.img
                            ? 'bg-[#123D25] text-white shadow-sm'
                            : 'bg-[#FAF9EF] border border-[#E8F2DD] text-[#17251B] hover:bg-[#E8F2DD]'
                        }`}
                      >
                        <img
                          src={preset.img}
                          alt={preset.name}
                          className="w-5 h-5 rounded-md object-cover"
                        />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Image Preview */}
                {selectedImage && (
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#267A3E] shadow-md relative">
                      <img
                        src={selectedImage}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-md font-medium">
                        Ready
                      </span>
                    </div>

                    {/* Analyze Plant Button matching Screen 4 */}
                    <button
                      onClick={runAnalysis}
                      disabled={analyzing}
                      className="px-8 py-3.5 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {analyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-[#4CAF50]" />
                          <span>Analyzing Foliage with AI...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-[#4CAF50]" />
                          <span>Analyze Plant →</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Results Section matching Screen 4 and Mobile Screen 4 */}
            {analysisResult && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8F2DD] shadow-xl space-y-8 animate-in fade-in duration-300">
                {/* Result Top Bar with Confidence & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8F2DD]">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#267A3E] shrink-0 bg-[#FAF9EF]">
                      <img
                        src={selectedImage || ''}
                        alt={analysisResult.plantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
                        <h2 className="font-serif-heading font-bold text-2xl text-[#123D25]">
                          {analysisResult.plantName}
                        </h2>
                      </div>
                      <p className="text-sm italic text-[#267A3E]">
                        {analysisResult.scientificName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-[#E8F2DD] text-[#123D25] px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-1.5 shadow-xs">
                      <span>Identification Confidence:</span>
                      <span className="text-[#267A3E] text-base">
                        {analysisResult.confidence}%
                      </span>
                    </div>
                    {analysisResult.isDemoMode && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        Demo Mode
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Care Matrix matching Mobile Screen 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#267A3E] uppercase mb-1">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Sunlight</span>
                    </div>
                    <p className="text-sm font-semibold text-[#123D25]">
                      {analysisResult.sunlight}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#267A3E] uppercase mb-1">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span>Watering</span>
                    </div>
                    <p className="text-sm font-semibold text-[#123D25]">
                      {analysisResult.watering}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#267A3E] uppercase mb-1">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                      <span>Soil Mixture</span>
                    </div>
                    <p className="text-sm font-semibold text-[#123D25]">
                      {analysisResult.soil}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#267A3E] uppercase mb-1">
                      <Layers className="w-4 h-4 text-purple-600" />
                      <span>Vertical Garden</span>
                    </div>
                    <p className="text-sm font-semibold text-[#123D25]">
                      {analysisResult.verticalGardenSuitability || 'Excellent'}
                    </p>
                  </div>
                </div>

                {/* AI Botanical Observations */}
                <div className="p-5 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD] space-y-2">
                  <h4 className="font-serif-heading font-bold text-base text-[#123D25] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4CAF50]" />
                    <span>Botanical Health Observations</span>
                  </h4>
                  <p className="text-sm text-[#17251B]/80 leading-relaxed">
                    {analysisResult.observations}
                  </p>
                </div>

                {/* Common Problems & Personalized Care Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Common issues */}
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <h4 className="font-serif-heading font-bold text-base text-amber-950 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Possible Issues & Prevention</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-amber-900/90 list-disc list-inside">
                      {analysisResult.commonProblems?.map((prob: string, idx: number) => (
                        <li key={idx}>{prob}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Personalized Tips */}
                  <div className="p-5 rounded-2xl bg-[#E8F2DD]/60 border border-[#C4D7BC] space-y-2">
                    <h4 className="font-serif-heading font-bold text-base text-[#123D25] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#267A3E]" />
                      <span>Personalized Care Tips</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#17251B]/80 list-disc list-inside">
                      {analysisResult.personalizedTips?.map((tip: string, idx: number) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action button to open interactive chat for followups */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="px-6 py-2.5 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
                  >
                    <MessageSquare className="w-4 h-4 text-[#4CAF50]" />
                    <span>Ask AI More Questions About This Plant</span>
                  </button>
                </div>
              </div>
            )}

            {/* How It Works? Section matching Screen 4 */}
            <div className="py-8">
              <h3 className="font-serif-heading text-2xl font-bold text-[#123D25] text-center mb-8">
                How It Works?
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Upload Image',
                    desc: 'Snap or upload a photo of your indoor or balcony plant.',
                    icon: Camera,
                  },
                  {
                    step: '2',
                    title: 'Get AI Results',
                    desc: 'Our botanical vision engine classifies genus, species, and health status.',
                    icon: Sparkles,
                  },
                  {
                    step: '3',
                    title: 'Follow Care Tips',
                    desc: 'Receive watering intervals, soil recipes, and light guidance.',
                    icon: HeartHandshake,
                  },
                  {
                    step: '4',
                    title: 'Grow Green',
                    desc: 'Watch your vertical living wall flourish with minimal effort.',
                    icon: Sprout,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="bg-white p-5 rounded-2xl border border-[#E8F2DD] text-center space-y-3 shadow-xs hover:shadow-md transition"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] mx-auto flex items-center justify-center text-[#267A3E]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base text-[#123D25]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#17251B]/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Plant Doctor Chat */}
        {activeTab === 'chat' && (
          <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8F2DD] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8F2DD]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#123D25] flex items-center justify-center text-[#4CAF50]">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-lg text-[#123D25]">
                    GreenSpace AI Plant Doctor
                  </h3>
                  <p className="text-xs text-[#267A3E]">
                    Expert advice on vertical walls, watering, and troubleshooting
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setChatMessages([
                    {
                      role: 'model',
                      content:
                        'Chat reset. How can I assist with your plants or vertical garden installation today?',
                    },
                  ])
                }
                className="text-xs text-[#17251B]/60 hover:text-[#123D25] flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
            </div>

            {/* Chat Thread */}
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center shrink-0">
                      <Sprout className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#123D25] text-white rounded-tr-none'
                        : 'bg-[#FAF9EF] text-[#17251B] border border-[#E8F2DD] rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex gap-3 items-center text-xs text-[#17251B]/60">
                  <div className="w-8 h-8 rounded-full bg-[#E8F2DD] flex items-center justify-center text-[#267A3E] animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <span>Thinking & formulating botanical guidance...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {[
                'Why are my vertical garden leaves turning yellow?',
                'Best plants for balcony railing wall?',
                'How often should I water my Pothos in summer?',
                'Can I grow mint and basil together in a tower?',
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setChatInput(suggestion)}
                  className="px-3 py-1.5 rounded-full bg-[#FAF9EF] hover:bg-[#E8F2DD] border border-[#E8F2DD] text-[#123D25] whitespace-nowrap transition cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about plant diseases, light, nutrients, or vertical installation..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD] text-sm text-[#17251B] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="px-5 py-3 rounded-2xl bg-[#123D25] hover:bg-[#267A3E] text-white text-sm font-semibold flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
