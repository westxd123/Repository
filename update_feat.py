
with open('index.html', encoding='utf-8') as f:
    content = f.read()

# ── Find bounds ──────────────────────────────────────────────────────
FEAT_START = content.find('    <!-- Features Grid -->')
CTA_START  = content.find('    <!-- Final CTA -->')

if FEAT_START == -1 or CTA_START == -1:
    print('ERROR: markers not found', FEAT_START, CTA_START)
    exit(1)

# ── New features section + CTA ───────────────────────────────────────
NEW_FEAT = '''    <!-- Features Grid -->
    <section class="mb-60 reveal">
      <div class="text-center mb-24">
        <div data-i18n="feat.badge" class="inline-flex items-center gap-3 px-5 py-2 mb-8 text-[10px] font-black tracking-[0.4em] uppercase border border-brand-accent/30 rounded-full bg-brand-accent/10 text-brand-accent">Platform // Features</div>
        <h2 data-i18n="feat.title" class="text-impact text-5xl md:text-7xl font-black uppercase italic mb-6">Why Prodify?</h2>
        <p data-i18n="feat.subtitle" class="text-gray-500 text-lg">Every feature engineered for commerce at scale.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- F1: Lightning Fast — Amber -->
        <div class="group relative rounded-[32px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-default" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
          <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" style="background:rgba(245,158,11,0.12)"></div>
          <div class="relative w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]" style="background:linear-gradient(135deg,rgba(245,158,11,0.25),rgba(245,158,11,0.06));border:1px solid rgba(245,158,11,0.3);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h4 data-i18n="feat.f1-title" class="text-sm font-black uppercase tracking-widest text-white mb-3 group-hover:text-[#f59e0b] transition-colors duration-300">Lightning Fast</h4>
          <p data-i18n="feat.f1-desc" class="text-gray-500 text-[13px] leading-relaxed">Content generated in under 3 seconds. Multi-model fallback ensures 99.9% uptime even during AI provider outages.</p>
        </div>

        <!-- F2: SEO Optimized — Green (brand) -->
        <div class="group relative rounded-[32px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-default" style="background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.12);">
          <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" style="background:rgba(16,185,129,0.15)"></div>
          <div class="relative w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]" style="background:linear-gradient(135deg,rgba(16,185,129,0.25),rgba(16,185,129,0.06));border:1px solid rgba(16,185,129,0.35);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
          <h4 data-i18n="feat.f2-title" class="text-sm font-black uppercase tracking-widest text-white mb-3 group-hover:text-[#10b981] transition-colors duration-300">SEO-Optimized</h4>
          <p data-i18n="feat.f2-desc" class="text-gray-500 text-[13px] leading-relaxed">AI-crafted titles built around e-commerce search patterns. Your products rank higher on Trendyol, Amazon, and Hepsiburada searches.</p>
        </div>

        <!-- F3: Multi-Platform — Blue -->
        <div class="group relative rounded-[32px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-default" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
          <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" style="background:rgba(59,130,246,0.12)"></div>
          <div class="relative w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]" style="background:linear-gradient(135deg,rgba(59,130,246,0.25),rgba(59,130,246,0.06));border:1px solid rgba(59,130,246,0.3);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <h4 data-i18n="feat.f3-title" class="text-sm font-black uppercase tracking-widest text-white mb-3 group-hover:text-[#3b82f6] transition-colors duration-300">Multi-Platform</h4>
          <p data-i18n="feat.f3-desc" class="text-gray-500 text-[13px] leading-relaxed">One product entry, three outputs: marketplace description, SEO meta title, and Instagram-ready caption. Zero extra effort.</p>
        </div>

        <!-- F4: Clean Output — Purple -->
        <div class="group relative rounded-[32px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-default" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
          <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" style="background:rgba(139,92,246,0.12)"></div>
          <div class="relative w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]" style="background:linear-gradient(135deg,rgba(139,92,246,0.25),rgba(139,92,246,0.06));border:1px solid rgba(139,92,246,0.3);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <h4 data-i18n="feat.f4-title" class="text-sm font-black uppercase tracking-widest text-white mb-3 group-hover:text-[#8b5cf6] transition-colors duration-300">Clean Output</h4>
          <p data-i18n="feat.f4-desc" class="text-gray-500 text-[13px] leading-relaxed">Enterprise-grade, clean corporate copy. No filler emojis or fluff — pure professional language that builds brand trust.</p>
        </div>

        <!-- F5: 4 Content Tones — Pink (center highlight) -->
        <div class="group relative rounded-[32px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-default" style="background:rgba(236,72,153,0.03);border:1px solid rgba(236,72,153,0.15);">
          <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" style="background:rgba(236,72,153,0.2)"></div>
          <div class="relative w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]" style="background:linear-gradient(135deg,rgba(236,72,153,0.25),rgba(236,72,153,0.06));border:1px solid rgba(236,72,153,0.3);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          </div>
          <h4 data-i18n="feat.f5-title" class="text-sm font-black uppercase tracking-widest text-white mb-3 group-hover:text-[#ec4899] transition-colors duration-300">4 Content Tones</h4>
          <p data-i18n="feat.f5-desc" class="text-gray-500 text-[13px] leading-relaxed">Choose from Professional, Exciting, Luxury, or Sincere tones. The AI adapts its language to perfectly match your brand voice.</p>
        </div>

        <!-- F6: Turkish Market — Cyan -->
        <div class="group relative rounded-[32px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-default" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">
          <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" style="background:rgba(6,182,212,0.12)"></div>
          <div class="relative w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]" style="background:linear-gradient(135deg,rgba(6,182,212,0.25),rgba(6,182,212,0.06));border:1px solid rgba(6,182,212,0.3);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h4 data-i18n="feat.f6-title" class="text-sm font-black uppercase tracking-widest text-white mb-3 group-hover:text-[#06b6d4] transition-colors duration-300">Turkish Market Focus</h4>
          <p data-i18n="feat.f6-desc" class="text-gray-500 text-[13px] leading-relaxed">Trained on Turkish e-commerce patterns. Understands local buyer psychology, platform conventions, and high-converting keyword structures.</p>
        </div>

      </div>
    </section>

    <!-- Final CTA -->
    <section class="mb-60 relative rounded-[60px] p-20 text-center overflow-hidden reveal" style="background:linear-gradient(135deg,rgba(16,185,129,0.06) 0%,rgba(6,78,59,0.12) 50%,rgba(16,185,129,0.04) 100%);border:1px solid rgba(16,185,129,0.15);">
      <div class="absolute inset-0 bg-brand-accent/5 blur-[120px] pointer-events-none"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-accent/40 to-transparent"></div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-brand-accent/40 to-transparent"></div>
      <div class="inline-flex items-center gap-2 px-4 py-2 mb-10 text-[9px] font-black tracking-[0.4em] uppercase border border-brand-accent/30 rounded-full bg-brand-accent/10 text-brand-accent">
        <span class="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping inline-block"></span>
        System Ready
      </div>
      <h2 data-i18n-html="cta.title" class="text-4xl md:text-6xl font-black mb-12 relative z-10 text-impact uppercase italic">Future of Commerce <br/> starts here.</h2>
      <a href="auth.html?mode=register" data-i18n="cta.btn" class="btn-premium px-16 py-6 rounded-full text-sm uppercase tracking-widest relative z-10 inline-block shadow-[0_20px_60px_rgba(16,185,129,0.25)]">Claim Your Workspace</a>
    </section>'''

new_content = content[:FEAT_START] + NEW_FEAT + content[CTA_START + len('    <!-- Final CTA -->') + content[CTA_START:].find('</section>') + len('</section>'):]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('SUCCESS. Lines:', new_content.count('\n'))
