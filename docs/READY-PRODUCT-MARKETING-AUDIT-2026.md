# NeXora Ready — Product marketing analysis / 4 concepts
**29 October 2026 · Content and positioning audit · draft for approval**

## Scope and evidence
This report analyzes the four current Ready concepts using the NeXora source-of-truth files `src/data/readySites.ts` and `src/data/readyStories.ts`, plus the previously reviewed demo-project repositories. This is a **marketing positioning analysis**, not a validated conversion experiment. Benefits are mechanisms supported by the designs; they are not guaranteed business outcomes.

Keep the existing distinct SEO-friendly product routes at `/building-preview/ready/[slug]/story`. The same React template is preferable to four copy-pasted page implementations; differentiate the *strategy, copy, proof and product demo*, not basic spacing, buttons or colour tokens. Product names (MIDA, LEA NORD, FACET, MEDIA KIT) are demo labels, not categorical limitations.

## MIDA — A consultative, high-information service website
**Audience job-to-be-done:** Help a visitor understand a complicated or consequential service before making an enquiry.
**Proposed hero:** «Когда клиент понимает услугу, ему проще сделать первый шаг».
**Subhead:** «Подробные страницы процедур, цены, специалисты и реальные примеры работ собраны в понятный путь от первого вопроса до обращения».
**Emotional lever:** Decrease uncertainty; show competence and seriousness through concrete information.
**Three proof moments:** (1) navigate to a treatment page explaining process and prices; (2) show the specialist and actual case section; (3) show RU/HE and RTL navigation if actually operating in the live demo.
**Strengths grounded in product data:** many-page architecture, service/price structure, clinic/doctor pages, case gallery before/after, RU/HE & RTL, inquiry CTA, mobile, SEO scaffolding.
**Tradeoffs / objections to handle:** Needs meaningful procedure descriptions, verifiable cases, authentic staff photos and permissions; too much structure for someone with only one simple service; adapting to unrelated industries might need new components and separate pricing. Medical outcome imagery and claims should be approved and accurate.
**Who should choose it:** Businesses where trust, explanation, a service catalogue and evaluation before contact matter.
**Not a universal claim:** It isn't a “ready website for every clinic” nor a marketing guarantee.
**Concise conversion CTA:** «Хочу сайт, который понятно объясняет мои услуги».

## LEA NORD — The specialist is the reason to choose
**Audience job-to-be-done:** Understand who the person is and how the collaboration/lesson feels before reaching out.
**Proposed hero:** «Ваш подход — причина, по которой вас выбирают».
**Subhead:** «Сайт знакомит с вами, показывает атмосферу работы, объясняет форматы занятий и помогает перейти к первому разговору».
**Emotional lever:** Recognition and trust in a named professional, not a faceless provider.
**Three proof moments:** (1) personal introduction / professional story; (2) how the lesson works / formats; (3) questions, languages and a clear contact path.
**Strengths grounded in product data:** personality-led landing page, approach to teaching, class formats, FAQ, simple enquiry, RU/HE with RTL, mobile adaptability and SEO skeleton.
**Tradeoffs / objections to handle:** Can look generic if the person provides no genuine photography and strong first-person copy; not meant for complex course platforms, booking backends, multi-teacher portals or LMS without separate scope.
**Who should choose it:** Individual experts, educators, teachers, mentors, professional consultants whose reputation and personal method matter.
**Concise conversion CTA:** «Покажем ваш подход — на вашем сайте».

## FACET — Results first, minimum friction
**Audience job-to-be-done:** Judge the provider's real work, find suitable services/price and enquire quickly, primarily on mobile.
**Proposed hero:** «Сначала ваши работы. Потом — запись».
**Subhead:** «Портфолио, услуги, цены и контакты собраны на одной аккуратной странице — чтобы человеку не пришлось искать главное».
**Emotional lever:** Visual confidence, speed and a straightforward next step.
**Three proof moments:** (1) show portfolio of real work; (2) show mobile services and price block; (3) follow WhatsApp CTA and demonstrate where booking begins.
**Strengths grounded in product data:** compact architecture, gallery, personal profile, visible services/prices, mobile-first contact route, WhatsApp link, base SEO.
**Tradeoffs / objections to handle:** Authentic quality photos are decisive; a weak portfolio reduces this concept's value. The compact structure is not ideal for a large service catalogue or complex checkout. WhatsApp enquiry is **not** a live scheduling calendar. The current base concept is Russian-language; extra languages are additional scope.
**Who should choose it:** Small visually led service practices and solo professionals who want to show real work and reduce steps to contact.
**Concise conversion CTA:** «Хочу показать свои работы на сайте».

## MEDIA KIT — A credible business partnership pitch
**Audience job-to-be-done:** Help an advertiser evaluate an author/creator quickly and send a useful collaboration request.
**Proposed hero:** «Покажите бренду, что он получает от сотрудничества».
**Subhead:** «Аудитория, реальные показатели, лучшие публикации, кейсы и форматы интеграций — в одной ссылке вместо разрозненных файлов».
**Emotional lever:** Professionalism, clarity and fewer back-and-forth questions.
**Three proof moments:** (1) open audience stats/demography; (2) show short-form video/content, cases; (3) demonstrate brand/agency paths and advertiser brief.
**Strengths grounded in product data:** creator identity, Instagram/YouTube statistics, geographic and demographic breakdown, media gallery with modals, collaboration cases, advertiser formats, rights/dates, brief/contact.
**Tradeoffs / objections to handle:** The quality and truthfulness of the numbers and cases must be verified. The underlying data is populated from client-supplied information; **do not imply automatic real-time API updates**. Ongoing manual maintenance may be needed. It is designed for partnerships, not universal creator e-commerce.
**Who should choose it:** Creators who pitch brands/agencies and need a live, professional business presentation.
**Concise conversion CTA:** «Хочу медиакит для переговоров с брендами».

## Unified product-page composition — not four long brochures
1. Shared NeXora skyline hero **at identical source framing and height**, 1 concise distinct commercial headline, one supporting sentence, no oversized opaque panel.
2. Large genuine working site demo with Desktop / Phone toggle; the selected mode should display the website directly, without a green pseudo-device backdrop. Include full-screen original demo link.
3. Compact purchase rail/panel visible early: 2 pricing formats, one clear primary CTA, fast three-item differentiator summary.
4. After demo, one *proof section* made of three short, concept-specific claims with directly inspectable page examples, NOT 3 generic numbered text cards cloned for every product. Proof type can differ: MIDA process + doctor + RU/HE; LEA personal story + method + FAQ; FACET full gallery + services + CTA; MEDIA stats + video + brand/agency paths.
5. A subtle demo-to-client transformation that specifies what can change; no promise that every design, structural module or custom backend is covered.
6. Details/conditions available via accessible disclosures; always include verified pricing, what's included, and potential separate work. Optional “who this suits / when you need more” disclosure helps qualified buying.
7. Product-specific SEO title/meta (once production), canonical under each permanent URL, clear h1, OG media derived from authentic screenshots, mobile keyboard and 200% zoom QA.

## System-level design decisions
- Same design tokens, typography, nav, city image crop, relative hero height, buttons, price blocks and disclosures on all Ready stories.
- Individuality comes from **real screenshots, content proof and commercial proposition**, not arbitrarily changing frame colours.
- Visual hierarchy matters more than words: demo is the lead proof; first-screen copy only has headline, short lead, offer and action.
- Mobile: prioritize 1 column; avoid giant stacked copy blocks, partially overlapped headings, tiny iframes inside a miniature green phone, or three extensive one-below-another stories.
- Keep the home and pricing pages visually consistent with Ready; price model must use existing `CurrencyPrice` and `readySites` data source.

## Completion gate (not merely 'looks good')
- Final original screenshots or reliable embed fallback for all 4 products.
- Real Safari desktop + mobile rendering, frame CSP and inner scroll, all breakpoints 320/375/390/768/1024/1440, no title overlap.
- Currency selection (ILS/RUB/USD) with approved localized price points and no invented automatic exchange pricing.
- Real links/CTA analytics, enquiry path works, clear subscription vs buy vs custom scope, FAQ/legal documents, footer.
- Next production build, speed/CLS/LCP, image ownership/loading and basic accessibility/SEO.
- Only after these checks are passed, ship the new home, pricing and Ready pages.

## Design research context
Baymard updated 2026 studies: clear product images, skimmable characteristics and proper navigation are necessary for product evaluation, with mobile especially error-prone. This suggests a proof-first presentation, not claims of guaranteed conversion.
- https://baymard.com/research-articles/current-state-ecommerce-product-page-ux
- https://baymard.com/research-articles/ecommerce-navigation-best-practice
- https://baymard.com/research-articles/product-images-descriptive-text
