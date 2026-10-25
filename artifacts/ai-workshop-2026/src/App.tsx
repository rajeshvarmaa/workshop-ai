import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BrainCircuit,
  CalendarDays,
  Check,
  Code2,
  Compass,
  Lightbulb,
  MapPin,
  MousePointer2,
  Network,
  Sparkles,
  UsersRound,
  WandSparkles,
} from 'lucide-react';
import { eventDetails, schedule } from './event-data';

const slideLabels = [
  'Welcome',
  'The idea',
  'What you will learn',
  'Schedule',
  'Experiences',
  'Your journey',
  'The community',
  'Join us',
];

function Eyebrow({ children }: { children: string }) {
  return <div className="slide-eyebrow">{children}</div>;
}

function HeroSlide({ goTo }: { goTo: (index: number) => void }) {
  return (
    <section className="slide-stage hero-slide" aria-label="Welcome to AI Workshop 2026" data-testid="slide-content-1">
      <div className="slide-inner hero-layout">
        <div>
          <p className="hero-kicker">A student-led day of discovery · Hyderabad, India</p>
          <h1 className="hero-title display-font">AI<br />WORKSHOP<br /><em>2026</em></h1>
          <p className="hero-subtitle">Explore. Innovate. Build the Future.</p>
          <p className="slide-copy" style={{ maxWidth: 500, marginTop: 12 }}>
            A hands-on Artificial Intelligence workshop organized by the {eventDetails.organizer}.
          </p>
          <div className="hero-actions">
            <button className="primary-cta" onClick={() => goTo(1)} data-testid="button-explore-workshop">
              Explore the Workshop <ArrowRight size={16} />
            </button>
            <button className="secondary-cta" onClick={() => goTo(3)} data-testid="button-view-schedule">
              View Schedule <ArrowDownRight size={15} />
            </button>
          </div>
          <div className="closing-meta" style={{ marginTop: 25 }}>
            <span className="pill"><CalendarDays size={14} />{eventDetails.date}</span>
            <span className="pill"><MapPin size={14} />{eventDetails.location}</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract orbital intelligence illustration" role="img" data-testid="visual-ai-orbits">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <span className="orbit-node node-a" />
          <span className="orbit-node node-b" />
          <span className="orbit-node node-c" />
          <div className="core-disc"><BrainCircuit size={76} strokeWidth={1.2} /></div>
          <span className="art-caption">human ideas / machine possibility</span>
        </div>
      </div>
    </section>
  );
}

function IntroSlide() {
  const cards = [
    { title: 'Discover AI', copy: 'Understand AI and machine learning fundamentals.', icon: BrainCircuit },
    { title: 'Experience Innovation', copy: 'Explore generative AI, intelligent automation, and real-world applications.', icon: Sparkles },
    { title: 'Build the Future', copy: 'Turn ideas into practical AI-powered projects.', icon: Lightbulb },
  ];
  return (
    <section className="slide-stage" aria-label="Beyond imagination, into intelligence" data-testid="slide-content-2">
      <div className="slide-inner">
        <Eyebrow>01 / Why this workshop</Eyebrow>
        <h2 className="slide-title" style={{ margin: '18px 0 12px', maxWidth: 820 }}>Beyond Imagination.<br />Into Intelligence.</h2>
        <p className="slide-copy" style={{ maxWidth: 760 }}>
          Helping students understand AI, explore emerging technologies, and gain practical experience with AI-powered tools.
        </p>
        <div className="card-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return <article className="info-card" key={card.title} data-testid={`card-workshop-pillar-${index + 1}`}>
              <span className="card-index">0{index + 1}</span>
              <span className="card-icon"><Icon size={19} /></span>
              <h3>{card.title}</h3><p>{card.copy}</p>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

function LearningSlide() {
  const cards = [
    { title: 'AI Fundamentals', copy: 'How AI systems work and where they are used.', icon: Network },
    { title: 'Generative AI', copy: 'Assistants, text and image generation, prompt engineering.', icon: WandSparkles },
    { title: 'Hands-on Practice', copy: 'Guided experiments with AI tools.', icon: Code2 },
    { title: 'Innovation & Collaboration', copy: 'Develop ideas and collaborate with fellow students.', icon: UsersRound },
  ];
  return (
    <section className="slide-stage" aria-label="What you will learn" data-testid="slide-content-3">
      <div className="slide-inner">
        <Eyebrow>02 / Your toolkit</Eyebrow>
        <h2 className="slide-title" style={{ margin: '18px 0 4px' }}>What You Will Learn</h2>
        <p className="slide-copy">A practical starting point for your next big question.</p>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: 900 }}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return <article className="info-card" key={card.title} data-testid={`card-learning-${index + 1}`}>
              <span className="card-index">0{index + 1}</span><span className="card-icon"><Icon size={19} /></span>
              <h3>{card.title}</h3><p>{card.copy}</p>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

function ScheduleSlide() {
  return (
    <section className="slide-stage" aria-label="Proposed workshop schedule" data-testid="slide-content-4">
      <div className="slide-inner">
        <Eyebrow>03 / The day, in motion</Eyebrow>
        <h2 className="slide-title" style={{ margin: '16px 0 0' }}>One Day.<br className="mobile-break" /> Endless Possibilities.</h2>
        <div className="timeline" data-testid="schedule-timeline">
          {schedule.map(([time, title], index) => <div className="timeline-item" key={time} data-testid={`schedule-item-${index + 1}`}>
            <span className="timeline-time">{time}</span><span className="timeline-name">{title}</span>
          </div>)}
        </div>
        <div className="schedule-note"><Sparkles size={13} /> Proposed schedule — subject to confirmation</div>
      </div>
    </section>
  );
}

function ActivitiesSlide() {
  const activities = [
    { title: 'Prompt Engineering Lab', copy: 'Learn effective prompts.', icon: MousePointer2 },
    { title: 'Generative AI Studio', copy: 'Experiment with text and image generation.', icon: Sparkles },
    { title: 'AI Innovation Challenge', copy: 'Work in teams on a practical problem.', icon: Lightbulb },
    { title: 'Mini Project Showcase', copy: 'Present creative ideas and demonstrate learning.', icon: Compass },
  ];
  return (
    <section className="slide-stage" aria-label="Workshop activities" data-testid="slide-content-5">
      <div className="slide-inner">
        <Eyebrow>04 / Make it real</Eyebrow>
        <h2 className="slide-title" style={{ margin: '18px 0 0', maxWidth: 820 }}>Don't Just Learn AI.<br />Experience It.</h2>
        <div className="activity-grid">
          {activities.map((item, index) => {
            const Icon = item.icon;
            return <article className="activity-card" key={item.title} data-testid={`card-activity-${index + 1}`}>
              <span className="card-icon"><Icon size={18} /></span>
              <h3>{item.title}</h3><p>{item.copy}</p>
            </article>;
          })}
        </div>
        <div className="build-banner" data-testid="banner-learn-by-building"><strong>Learn by Building</strong><ArrowUpRight size={20} /></div>
      </div>
    </section>
  );
}

function JourneySlide() {
  const audience = [
    'Students from all engineering and technology branches',
    'Beginners curious about AI',
    'Programmers and aspiring AI developers',
    'Innovators, designers, and technology enthusiasts',
  ];
  const benefits = [
    'Practical AI tool exposure',
    'Stronger problem-solving and creative thinking',
    'Collaboration with fellow students',
    'Certificate of participation, if offered by organizers',
  ];
  return (
    <section className="slide-stage" aria-label="Who should join and what you gain" data-testid="slide-content-6">
      <div className="slide-inner">
        <Eyebrow>05 / Find your starting point</Eyebrow>
        <h2 className="slide-title" style={{ margin: '18px 0 0' }}>Your AI Journey<br />Starts Here.</h2>
        <div className="audience-layout">
          <div>
            <h3 className="list-heading">Made for curious minds</h3>
            {audience.map((item, i) => <div className="list-row" key={item} data-testid={`audience-item-${i + 1}`}><ArrowUpRight size={16} />{item}</div>)}
          </div>
          <div>
            <h3 className="list-heading">What you take with you</h3>
            {benefits.map((item, i) => <div className="list-row" key={item} data-testid={`benefit-item-${i + 1}`}><Check size={16} />{item}</div>)}
            <p className="conditional-note">Certificate availability is conditional on organizer confirmation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySlide() {
  const values = ['Collaboration', 'Experimentation', 'Innovation', 'Continuous learning'];
  return (
    <section className="slide-stage" aria-label="Meet the organizing community" data-testid="slide-content-7">
      <div className="slide-inner">
        <Eyebrow>06 / Built by students, for students</Eyebrow>
        <h2 className="slide-title" style={{ margin: '18px 0 9px', maxWidth: 950 }}>Powered by Curiosity.<br />Driven by Innovation.</h2>
        <p className="slide-copy" style={{ maxWidth: 750 }}>
          The {eventDetails.organizer} brings students together to explore artificial intelligence, learn by doing, and imagine what comes next.
        </p>
        <div className="team-grid" data-testid="team-placeholder-grid">
          {eventDetails.team.map((role, index) => <article className="team-card" key={role} data-testid={`team-role-${index + 1}`}>
            <span>{role}</span><span>Organizer name / details</span>
          </article>)}
        </div>
        <div className="community-strip">
          <h3>Why Join Our AI Community?</h3>
          <div className="community-values">{values.map((value) => <span key={value}>{value}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function ClosingSlide() {
  return (
    <section className="slide-stage closing-slide" aria-label="Register for AI Workshop 2026" data-testid="slide-content-8">
      <div className="slide-inner closing-layout">
        <div>
          <Eyebrow>07 / Your next idea starts here</Eyebrow>
          <h2 className="closing-title">THE FUTURE<br />IS <span>INTELLIGENT.</span><br />ARE YOU READY?</h2>
          <p className="slide-copy" style={{ maxWidth: 550 }}>
            Join us for a day of exploration, creativity, collaboration, and hands-on artificial intelligence.
          </p>
          <div className="closing-meta">
            <span className="pill">{eventDetails.date}</span>
            <span className="pill"><MapPin size={14} />{eventDetails.location}</span>
          </div>
          <p className="tagline">Imagine. Innovate. Intelligence.</p>
        </div>
        <aside className="closing-card" data-testid="registration-details">
          <h3>Make room for what's next.</h3>
          <a
            className="primary-cta closing-action"
            href={eventDetails.registrationUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="link-register-now"
            aria-label={eventDetails.registrationUrlIsPlaceholder ? 'Register Now — registration link placeholder' : 'Register Now'}
          >
            Register Now <ArrowUpRight size={16} />
          </a>
          {eventDetails.registrationUrlIsPlaceholder && <div className="conditional-note">Registration link to be confirmed</div>}
          <div className="contact-row"><strong>Date</strong><span>{eventDetails.date}</span></div>
          <div className="contact-row"><strong>Venue</strong><span>{eventDetails.location}</span></div>
          <div className="contact-row"><strong>Organized by</strong><span>{eventDetails.organizer}</span></div>
          <div className="contact-row"><strong>Contact</strong><span>{eventDetails.contactEmail}<br />{eventDetails.contactPhone}</span></div>
          <div className="qr-placeholder" role="img" aria-label="Registration QR code placeholder" data-testid="registration-qr-placeholder">
            <div className="qr-block" aria-hidden="true">QR</div>
            <span className="qr-copy">REGISTRATION<br />QR PLACEHOLDER</span>
          </div>
          <div className="social-links" aria-label="Contact and social links">
            {eventDetails.contactLinks.map((link) => <a href={link.href} key={link.label} data-testid={`link-${link.label.toLowerCase().replaceAll(' ', '-')}`} aria-label={link.placeholder ? `${link.label} placeholder link` : link.label}>{link.label}</a>)}
            {eventDetails.socialLinks.map((link) => <a href={link.href} key={link.label} target="_blank" rel="noreferrer" data-testid={`link-social-${link.label.toLowerCase()}`} aria-label={link.placeholder ? `${link.label} placeholder link` : link.label}>{link.label}</a>)}
          </div>
        </aside>
      </div>
    </section>
  );
}

type SlideProps = { goTo: (index: number) => void };
const slides: Array<(props: SlideProps) => ReactElement> = [
  HeroSlide, IntroSlide, LearningSlide, ScheduleSlide, ActivitiesSlide, JourneySlide, CommunitySlide, ClosingSlide,
];

function App() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)));
  }, []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        setCurrent((value) => Math.min(slides.length - 1, value + 1));
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setCurrent((value) => Math.max(0, value - 1));
      } else if (event.key === 'Home') setCurrent(0);
      else if (event.key === 'End') setCurrent(slides.length - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.title = 'AI Workshop 2026 — Explore. Innovate. Build the Future.';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', 'A hands-on Artificial Intelligence workshop for students, organized by the College Artificial Intelligence Club in Hyderabad on 30 October 2026.');
  }, []);

  const ActiveSlide = slides[current];
  const motionProps = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.34, ease: 'easeOut' as const } };

  return (
    <main
      className={`workshop-shell grain${current === 0 || current === slides.length - 1 ? ' dark-chrome' : ''}${current === 0 ? ' hero-chrome' : ''}`}
      onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) dx < 0 ? next() : previous();
        touchStart.current = null;
      }}
      data-testid="presentation-app"
    >
      <header className="topbar">
        <div className="brand-mark" data-testid="text-event-brand"><span className="brand-symbol"><Atom size={20} /></span><span>AI WORKSHOP <span style={{ color: '#a68521' }}>2026</span></span></div>
        <div className="top-meta">{eventDetails.organizer}</div>
        <div className="top-meta" data-testid="status-current-slide">{String(current + 1).padStart(2, '0')} / 08</div>
      </header>

      <div aria-live="polite" aria-atomic="true" className="sr-only" data-testid="text-slide-announcement">
        Slide {current + 1} of 8: {slideLabels[current]}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={current} {...motionProps}>
          <ActiveSlide goTo={goTo} />
        </motion.div>
      </AnimatePresence>

      <nav className="nav-footer" aria-label="Presentation navigation">
        <div className="nav-arrows">
          <button className="nav-button" type="button" onClick={previous} disabled={current === 0} aria-label="Previous slide" data-testid="button-previous-slide">
            <ArrowLeft size={18} />
          </button>
          <button className="nav-button" type="button" onClick={next} disabled={current === slides.length - 1} aria-label="Next slide" data-testid="button-next-slide">
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="slide-index">
          <span className="slide-number" data-testid="text-slide-counter">{String(current + 1).padStart(2, '0')}<span style={{ color: '#a99eb2' }}> / 08</span></span>
          <div className="progress-track" role="progressbar" aria-label="Presentation progress" aria-valuemin={1} aria-valuemax={8} aria-valuenow={current + 1} data-testid="progress-slide">
            <div className="progress-fill" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
          </div>
          <div className="slide-dots" aria-label="Go to slide">
            {slideLabels.map((label, index) => <button
              key={label}
              className={`slide-dot${current === index ? ' active' : ''}`}
              onClick={() => goTo(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}: ${label}`}
              aria-current={current === index ? 'step' : undefined}
              data-testid={`button-slide-${index + 1}`}
            />)}
          </div>
        </div>
      </nav>
    </main>
  );
}

export default App;
