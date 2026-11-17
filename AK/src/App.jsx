import { useEffect, useState } from 'react';

const courses = [
  {
    id: 'cartoon',
    image: '/courses/cartoon-art.jpg',
    title: 'Cartoon Art',
    level: 'Beginner',
    rating: '4.8',
    price: 49,
    duration: '4 weeks',
    description: 'Learn bold cartoon characters, expressions and creative drawing techniques.',
  },
  {
    id: 'figure',
    image: '/courses/figure-art.jpg',
    title: 'Figure Art',
    level: 'Intermediate',
    rating: '4.9',
    price: 79,
    duration: '6 weeks',
    description: 'Master human anatomy, body proportions and pose drawing.',
  },
  {
    id: 'portrait',
    image: '/courses/portrait-art.jpg',
    title: 'Portrait Art',
    level: 'Beginner',
    rating: '4.7',
    price: 39,
    duration: '3 weeks',
    description: 'Explore facial features, expressions, shading and portrait techniques.',
  },
  {
    id: 'landscape',
    image: '/courses/landscape-art.jpg',
    title: 'Landscape Art',
    level: 'Intermediate',
    rating: '4.6',
    price: 49,
    duration: '5 weeks',
    description: 'Create beautiful scenic compositions using depth and texture.',
  },
  {
    id: 'watercolor',
    image: '/courses/watercolor-art.jpg',
    title: 'Watercolor Art',
    level: 'Beginner',
    rating: '4.8',
    price: 59,
    duration: '4 weeks',
    description: 'Discover watercolor techniques, blending and color theory.',
  },
  {
    id: 'oil',
    image: '/courses/oil-painting.jpg',
    title: 'Oil Painting',
    level: 'Intermediate',
    rating: '4.9',
    price: 69,
    duration: '6 weeks',
    description: 'Learn rich color, expressive brushwork and layered oil techniques.',
  },
];

const navigation = [
  { id: 'courses', label: 'Courses' },
  { id: 'my-courses', label: 'My Courses' },
  { id: 'upload', label: 'Upload' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

function PaletteIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 160" aria-hidden="true">
      <path
        fill="#ff9b88"
        d="M80 13C43 13 13 42 13 78c0 34 27 62 61 62h11c10 0 17-8 17-18 0-5-2-9-5-13-3-4-4-8-2-12 2-5 7-8 13-8h8c15 0 28-13 28-29 0-25-30-47-64-47Z"
      />
      <circle cx="53" cy="48" r="9" fill="#8440df" />
      <circle cx="82" cy="39" r="9" fill="#ed3f91" />
      <circle cx="108" cy="53" r="9" fill="#43bdd1" />
      <circle cx="43" cy="78" r="9" fill="#48b96b" />
      <circle cx="74" cy="94" r="9" fill="#3c84e4" />
      <circle cx="109" cy="77" r="13" fill="#fff6f5" />
    </svg>
  );
}

function ArtworkIcon({ type, className }) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (type === 'mail') {
    return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  }
  if (type === 'location') {
    return <svg {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  }
  if (type === 'send') {
    return <svg {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>;
  }
  if (type === 'cloud-upload') {
    return <svg {...props}><path d="M7 18a4.5 4.5 0 1 1 .8-9A5.5 5.5 0 0 1 18 10a4 4 0 0 1-.2 8" /><path d="M12 22v-9m-4 4 4-4 4 4" /></svg>;
  }
  if (type === 'award') {
    return <svg {...props}><circle cx="12" cy="8" r="6" /><path d="m8.2 13.3-1.1 8 4.9-2.8 4.9 2.8-1.1-8" /></svg>;
  }
  if (type === 'image') {
    return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></svg>;
  }
  return <svg {...props}><rect x="3" y="3" width="13" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m4 17 4-4 3 3 2-2 2 2M19 3v6m-3-3h6" /></svg>;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [points, setPoints] = useState(0);
  const [toast, setToast] = useState('');
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const ownedCourses = courses.filter((course) => purchasedIds.includes(course.id));

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.scroll-section'));
    let frameId = 0;
    const updateActiveSection = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const currentSection = sections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= 150 && bounds.bottom > 150;
        });
        if (currentSection) setActiveSection(currentSection.id);
      });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  function navigate(sectionId) {
    setActiveSection(sectionId);
    setMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function purchaseCourse(course) {
    if (purchasedIds.includes(course.id)) return;
    setPurchasedIds((current) => [...current, course.id]);
    setPoints((current) => current + 10);
    setToast(`${course.title} added to My Courses. You earned 10 points!`);
  }

  function addArtwork(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    const supportedType = ['image/png', 'image/jpeg'].includes(file.type) || /\.(png|jpe?g)$/i.test(file.name);
    if (!supportedType || file.size > 8 * 1024 * 1024) {
      setUploadMessage('Choose a PNG or JPG image up to 8 MB.');
      return;
    }

    if (selectedArtwork) URL.revokeObjectURL(selectedArtwork.image);
    setSelectedArtwork({ image: URL.createObjectURL(file) });
    setArtworkTitle(file.name.replace(/\.[^/.]+$/, ''));
    setUploadMessage('');
  }

  function shareArtwork(event) {
    event.preventDefault();
    if (!selectedArtwork) {
      setUploadMessage('Choose an artwork before sharing.');
      return;
    }

    const title = artworkTitle.trim();
    if (!title) {
      setUploadMessage('Enter a title for your artwork.');
      return;
    }

    setArtworks((current) => [{
      id: selectedArtwork.image,
      image: selectedArtwork.image,
      name: title,
      artist: artistName.trim(),
    }, ...current]);
    setSelectedArtwork(null);
    setArtworkTitle('');
    setArtistName('');
    setUploadMessage('Your artwork was shared with the community.');
  }

  function removeArtwork(id) {
    const artwork = artworks.find((item) => item.id === id);
    if (artwork) URL.revokeObjectURL(artwork.image);
    setArtworks((current) => current.filter((item) => item.id !== id));
  }

  function renderCourseCard(course, { owned = false, removable = false } = {}) {
    const expanded = expandedCourse === course.id;

    return (
      <article className="course-card" key={course.id}>
        <button
          className="course-image-button"
          type="button"
          onClick={() => setExpandedCourse(expanded ? null : course.id)}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Hide' : 'View'} details for ${course.title}`}
        >
          <img className="course-art" src={course.image} alt="" loading="lazy" />
        </button>
        <div className="course-content">
          <div className="course-meta">
            <span className="level-pill">{course.level}</span>
            <span className="rating" aria-label={`Rated ${course.rating} out of 5`}>
              {course.rating} <span aria-hidden="true">★</span>
            </span>
          </div>
          <h2>{course.title}</h2>
          {expanded && (
            <div className="course-details">
              <p>{course.description}</p>
              <div>
                <span>⏱ {course.duration}</span>
                <span>🎨 {course.level}</span>
              </div>
            </div>
          )}
          <div className="course-buy-row">
            <strong>${course.price}</strong>
            {owned ? (
              <button className="purchased-button" type="button" disabled>
                <span aria-hidden="true">✓</span> Already Purchased
              </button>
            ) : (
              <button className="primary-button" type="button" onClick={() => purchaseCourse(course)}>
                Buy Now <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
          {removable && (
            <button
              className="remove-button"
              type="button"
              onClick={() => setPurchasedIds((current) => current.filter((id) => id !== course.id))}
            >
              Remove Course
            </button>
          )}
        </div>
      </article>
    );
  }

  function renderHome() {
    return (
      <section className="hero-section scroll-section" id="home">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true">✨</span> Your creative journey</p>
            <h1>Turn Your <span>Creativity</span> Into Beautiful Art</h1>
            <p className="hero-description">
              Learn drawing, painting and creative skills through simple and enjoyable art courses.
            </p>
            <button className="primary-button" type="button" onClick={() => navigate('courses')}>
              Explore Courses <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-palette"><PaletteIcon className="palette-art" /></div>
            <span className="paint-dot dot-one" />
            <span className="paint-dot dot-two" />
            <span className="paint-dot dot-three" />
          </div>
        </div>
      </section>
    );
  }

  function renderCourses() {
    return (
      <section className="page-main courses-page scroll-section" id="courses">
        <div className="section-shell">
          <div className="section-heading centered page-heading">
            <p className="eyebrow">Learn something new</p>
            <h1>Explore Our Courses</h1>
            <p>Choose a course and start your creative journey.</p>
          </div>
          <div className="course-grid">
            {courses.map((course) => renderCourseCard(course, { owned: purchasedIds.includes(course.id) }))}
          </div>
        </div>
      </section>
    );
  }

  function renderMyCourses() {
    return (
      <section className="page-main collection-page scroll-section" id="my-courses">
        <div className="section-shell">
          <div className="section-heading centered page-heading">
            <p className="eyebrow">Your collection</p>
            <h1>My Courses <span aria-hidden="true">📚</span></h1>
            <p>Courses you have purchased will appear here.</p>
          </div>
          {ownedCourses.length > 0 ? (
            <div className="collection-grid">
              {ownedCourses.map((course) => renderCourseCard(course, { owned: true, removable: true }))}
            </div>
          ) : (
            <div className="empty-collection">
              <div className="empty-icon" aria-hidden="true">🎨</div>
              <h2>Your collection is waiting</h2>
              <p>Explore the courses and find something you would love to create.</p>
              <button className="primary-button" type="button" onClick={() => navigate('courses')}>
                Explore Courses
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  function renderUpload() {
    return (
      <section className="page-main upload-page scroll-section" id="upload">
        <div className="section-shell">
          <div className="section-heading centered page-heading upload-heading">
            <p className="eyebrow">Share your creativity</p>
            <h1>Upload Your Art <ArtworkIcon type="image-plus" className="upload-title-icon" /></h1>
            <p>Share your work and inspire other artists on their creative journey.</p>
          </div>
          <div className="upload-layout">
            <form className="upload-form upload-card" onSubmit={shareArtwork}>
              <div className="upload-dropzone">
                {selectedArtwork ? (
                  <img className="upload-preview" src={selectedArtwork.image} alt="Selected artwork preview" />
                ) : (
                  <>
                    <ArtworkIcon type="cloud-upload" className="upload-cloud-icon" />
                    <h2>Choose an artwork</h2>
                    <p>PNG or JPG, up to 8MB</p>
                  </>
                )}
                <label className="upload-browse-button">
                  Browse image
                  <input type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" onChange={addArtwork} />
                </label>
              </div>
              <label className="field-label">
                Artwork title
                <input
                  type="text"
                  placeholder="Give your artwork a name"
                  value={artworkTitle}
                  onChange={(event) => setArtworkTitle(event.target.value)}
                  required
                />
              </label>
              <label className="field-label">
                Your name <span>optional</span>
                <input
                  type="text"
                  placeholder="How should we credit you?"
                  value={artistName}
                  onChange={(event) => setArtistName(event.target.value)}
                />
              </label>
              <button className="primary-button full-button" type="submit">
                Share Artwork <ArtworkIcon type="send" />
              </button>
              {uploadMessage && <p className="form-message" role="status">{uploadMessage}</p>}
            </form>

            <section className="gallery-panel">
              <div className="gallery-heading">
                <div>
                  <p className="eyebrow">Community gallery</p>
                  <h2>Fresh inspiration</h2>
                </div>
                <ArtworkIcon type="award" />
              </div>
              {artworks.length > 0 ? (
                <div className="artwork-grid">
                  {artworks.map((artwork) => (
                    <article className="artwork-card" key={artwork.id}>
                      <img src={artwork.image} alt={`Artwork: ${artwork.name}`} />
                      <div>
                        <h3>{artwork.name}</h3>
                        {artwork.artist && <p>by {artwork.artist}</p>}
                        <button
                          type="button"
                          aria-label={`Remove ${artwork.name}`}
                          onClick={() => removeArtwork(artwork.id)}
                        >
                          ×
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="gallery-empty">
                  <ArtworkIcon type="image" />
                  <p>Your shared artwork will appear here.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    );
  }

  function renderAbout() {
    return (
      <section className="page-main about-page scroll-section" id="about">
        <div className="section-shell">
          <section className="about-hero">
            <div className="about-icon" aria-hidden="true">🎨</div>
            <p className="eyebrow">Our story</p>
            <h1>Creativity is for everyone</h1>
            <p>
              New Journey is a welcoming place to learn, create and find inspiration.
              Our friendly art courses help you enjoy every step of making something new.
            </p>
          </section>
          <div className="values-grid">
            <article><span aria-hidden="true">✏️</span><h2>Learn at your pace</h2><p>Clear lessons make it easy to build new skills one step at a time.</p></article>
            <article><span aria-hidden="true">🌈</span><h2>Try something new</h2><p>Explore drawing, painting and new ways to express your ideas.</p></article>
            <article><span aria-hidden="true">💛</span><h2>Enjoy the process</h2><p>Every sketch and brushstroke is part of your creative journey.</p></article>
          </div>
          <section className="about-cta">
            <div><p className="eyebrow">Ready to make something?</p><h2>Start your creative journey today.</h2></div>
            <button className="primary-button" type="button" onClick={() => navigate('courses')}>Explore Courses</button>
          </section>
        </div>
      </section>
    );
  }

  function renderContact() {
    return (
      <section className="page-main contact-page scroll-section" id="contact">
        <div className="section-shell">
          <div className="section-heading">
            <p className="eyebrow">We would love to hear from you</p>
            <h1>Contact Us</h1>
            <p>Have a question about a course or want to share your creative story? Reach out and we will get back to you soon.</p>
          </div>
          <div className="contact-grid">
            <article>
              <ArtworkIcon type="mail" />
              <h2>Email</h2>
              <p><a href="mailto:hello@newjourney.art">hello@newjourney.art</a></p>
            </article>
            <article>
              <ArtworkIcon type="location" />
              <h2>Studio</h2>
              <p>123 Art Street<br />Creativity City, 45678</p>
            </article>
            <article>
              <ArtworkIcon type="send" />
              <h2>Keep creating</h2>
              <p>Follow your curiosity and make something beautiful today.</p>
            </article>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" type="button" onClick={() => navigate('home')} aria-label="New Journey home">
            <span className="brand-mark"><PaletteIcon className="brand-palette" /></span>
            <span>
              <strong>New Journey</strong>
              <small>Learn · Create · Inspire</small>
            </span>
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navigation.map((item) => (
              <button
                className={activeSection === item.id ? 'is-active' : ''}
                type="button"
                key={item.id}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button className="points-pill" type="button" onClick={() => navigate('my-courses')}>
            <span aria-hidden="true">⭐</span> {points} Points
          </button>
        </div>
      </header>

      {toast && (
        <div className="toast" role="status">
          <span aria-hidden="true">🎉</span> {toast}
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast('')}>×</button>
        </div>
      )}

      <main>
        {renderHome()}
        {renderCourses()}
        {renderMyCourses()}
        {renderUpload()}
        {renderAbout()}
        {renderContact()}
      </main>

      <footer className="site-footer">
        <button type="button" onClick={() => navigate('home')}>
          <span aria-hidden="true">🎨</span> New Journey
        </button>
        <p>Learn · Create · Inspire</p>
      </footer>
    </div>
  );
}

export default App;
